require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('./db');
const { sendResetPasswordEmail } = require('./utils/email');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambialo_en_prod';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Requiere privilegios de administrador' });
  }
};

// --- RUTAS DE AUTENTICACIÓN ---

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    if (user.status === 'suspended') return res.status(403).json({ error: 'Tu cuenta ha sido suspendida' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.json({ success: true, message: 'Si el correo existe, se envió un enlace.' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    db.run('UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?', [token, expires, user.id], async (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      try {
        await sendResetPasswordEmail(user.email, token);
        res.json({ success: true, message: 'Si el correo existe, se envió un enlace.' });
      } catch (error) {
        console.error('Error enviando correo', error);
        res.status(500).json({ error: 'No se pudo enviar el correo' });
      }
    });
  });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Token y nueva contraseña son requeridos' });

  db.get('SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > ?', [token, new Date().toISOString()], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'Token inválido o expirado' });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    db.run('UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hash, user.id], (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    });
  });
});

// --- RUTAS DE USUARIOS ---

app.post('/api/users', authenticateToken, isAdmin, (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y password requeridos' });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const userRole = role === 'admin' ? 'admin' : 'user';

  db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name || null, email, hash, userRole], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: this.lastID, name, email, role: userRole });
  });
});

app.put('/api/users/:id', authenticateToken, isAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email, password, role } = req.body;
  if (!email) return res.status(400).json({ error: 'Email es requerido' });

  const userRole = role === 'admin' ? 'admin' : 'user';

  if (password && password.trim() !== '') {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db.run('UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?', [name || null, email, hash, userRole, id], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) return res.status(400).json({ error: 'El email ya está en uso' });
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ success: true });
    });
  } else {
    db.run('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name || null, email, userRole, id], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) return res.status(400).json({ error: 'El email ya está en uso' });
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ success: true });
    });
  }
});

app.get('/api/users', authenticateToken, isAdmin, (req, res) => {
  db.all('SELECT id, name, email, role, status FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.put('/api/users/:id/status', authenticateToken, isAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;
  if (status !== 'active' && status !== 'suspended') return res.status(400).json({ error: 'Estado inválido' });

  db.run('UPDATE users SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ success: true });
  });
});

app.delete('/api/users/:id', authenticateToken, isAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (id === req.user.id) return res.status(400).json({ error: 'No puedes eliminarte a ti mismo' });

  db.get('SELECT count(*) as count FROM projects WHERE owner_id = ?', [id], (err, row1) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (row1.count > 0) return res.status(400).json({ error: 'El usuario tiene proyectos propios. Por favor suspéndelo en su lugar.' });

    db.get('SELECT count(*) as count FROM project_users WHERE user_id = ?', [id], (err, row2) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (row2.count > 0) return res.status(400).json({ error: 'El usuario es colaborador en proyectos. Por favor suspéndelo en su lugar.' });

      db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ success: true });
      });
    });
  });
});

// --- RUTAS DE PROYECTOS ---

app.get('/api/projects', authenticateToken, (req, res) => {
  const query = req.user.role === 'admin' 
    ? 'SELECT p.id, p.name, p.data, p.owner_id, p.created_at, p.updated_at, u.email as owner, (SELECT GROUP_CONCAT(user_id) FROM project_users WHERE project_id = p.id) as collaborator_ids FROM projects p LEFT JOIN users u ON p.owner_id = u.id ORDER BY p.updated_at DESC'
    : 'SELECT p.id, p.name, p.data, p.owner_id, p.created_at, p.updated_at FROM projects p WHERE p.owner_id = ? OR p.id IN (SELECT project_id FROM project_users WHERE user_id = ?) ORDER BY p.updated_at DESC';
  
  const params = req.user.role === 'admin' ? [] : [req.user.id, req.user.id];

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    rows.forEach(r => {
      if (r.data) {
        try { r.data = JSON.parse(r.data); } catch(e) { r.data = {}; }
      }
      if (r.collaborator_ids) {
        r.collaborators = r.collaborator_ids.split(',').map(Number);
      } else {
        r.collaborators = [];
      }
    });
    res.json(rows);
  });
});

app.get('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = req.user.role === 'admin' 
    ? 'SELECT p.*, (SELECT GROUP_CONCAT(user_id) FROM project_users WHERE project_id = p.id) as collaborator_ids FROM projects p WHERE p.id = ?'
    : 'SELECT p.*, (SELECT GROUP_CONCAT(user_id) FROM project_users WHERE project_id = p.id) as collaborator_ids FROM projects p WHERE p.id = ? AND (p.owner_id = ? OR p.id IN (SELECT project_id FROM project_users WHERE user_id = ?))';
  const params = req.user.role === 'admin' ? [id] : [id, req.user.id, req.user.id];

  db.get(query, params, (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'Proyecto no encontrado o sin permisos' });
    
    if (row.data) row.data = JSON.parse(row.data);
    if (row.collaborator_ids) {
      row.collaborators = row.collaborator_ids.split(',').map(Number);
    } else {
      row.collaborators = [];
    }
    res.json(row);
  });
});

app.post('/api/projects', authenticateToken, (req, res) => {
  const { name, data } = req.body;
  const dataStr = JSON.stringify(data || {});
  const owner_id = req.user.id;

  db.run('INSERT INTO projects (name, data, owner_id) VALUES (?, ?, ?)', [name || 'Nuevo Proyecto', dataStr, owner_id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ id: this.lastID, name: name || 'Nuevo Proyecto' });
  });
});

app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, data } = req.body;
  const dataStr = JSON.stringify(data || {});

  const checkQuery = req.user.role === 'admin' 
    ? 'SELECT id FROM projects WHERE id = ?' 
    : 'SELECT id FROM projects WHERE id = ? AND (owner_id = ? OR id IN (SELECT project_id FROM project_users WHERE user_id = ?))';
  const checkParams = req.user.role === 'admin' ? [id] : [id, req.user.id, req.user.id];

  db.get(checkQuery, checkParams, (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'Proyecto no encontrado o sin permisos' });

    db.run('UPDATE projects SET name = ?, data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, dataStr, id], function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ success: true });
    });
  });
});

app.put('/api/projects/:id/assign', authenticateToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const { user_ids } = req.body;
  if (!Array.isArray(user_ids)) return res.status(400).json({ error: 'user_ids debe ser un arreglo' });

  db.run('DELETE FROM project_users WHERE project_id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (user_ids.length === 0) return res.json({ success: true });

    const placeholders = user_ids.map(() => '(?, ?)').join(',');
    const values = user_ids.flatMap(userId => [id, userId]);

    db.run(`INSERT INTO project_users (project_id, user_id) VALUES ${placeholders}`, values, function(err) {
      if (err) return res.status(500).json({ error: 'Database error insertando colaboradores' });
      res.json({ success: true });
    });
  });
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  const checkQuery = req.user.role === 'admin' 
    ? 'SELECT id FROM projects WHERE id = ?' 
    : 'SELECT id FROM projects WHERE id = ? AND owner_id = ?';
  const checkParams = req.user.role === 'admin' ? [id] : [id, req.user.id];

  db.get(checkQuery, checkParams, (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'Proyecto no encontrado o no tienes permisos de dueño' });

    db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ success: true });
    });
  });
});

app.post('/api/generate', authenticateToken, async (req, res) => {
  const { prompt, currentContent, fieldType, section, projectName, context } = req.body;
  
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key de Gemini no configurada en el servidor' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

    let systemPrompt = `Eres un asistente experto en planificación y gestión de proyectos de software.
Debes devolver ÚNICAMENTE el contenido solicitado en formato Markdown. 
No incluyas explicaciones adicionales, ni saludos, ni confirmaciones.
Asegúrate de que la salida sea profesional y detallada.`;

    if (projectName) {
      systemPrompt += `\nEl nombre del proyecto es: "${projectName}". Utilízalo para contextualizar tu respuesta.`;
    }

    if (currentContent) {
      systemPrompt += `\n\nEl usuario ya ha definido el siguiente contexto del proyecto:\n\n${currentContent}\n\nUtiliza esta información para que tu respuesta sea coherente y no contradiga lo establecido.`;
    }

    if (fieldType) {
      systemPrompt += `\n\nEstás generando contenido específicamente para el campo o sección: "${fieldType}". Asegúrate de que el formato y contenido sea apropiado para esta sección.`;
    }

    if (section === 'tareas') {
      systemPrompt += `\n\nPara esta sección de tareas, genera un listado detallado de subtareas recomendadas basadas en el proyecto. 
Formato requerido: Para cada tarea, usa un guión, seguido de un checkbox [ ], luego la estimación de tiempo entre paréntesis cuadrados ej. [2 H] o [3 D] donde H es horas y D es días, luego el nombre de la persona responsable asignada entre @ ej. @Juan Perez@ (si no sabes el responsable pon @Sin Asignar@), y finalmente la descripción de la tarea.
Ejemplo: - [ ] [4 H] @Maria@ Diseñar la base de datos de usuarios
No numeres la cantidad de tareas, genera las que consideres necesarias inteligentemente (pueden ser 3, 5, 10, etc) para abarcar el requerimiento.`;
    }

    if (context) {
      systemPrompt += `\n\nEl usuario ya ha definido el siguiente contexto del proyecto:\n\n${context}\n\nUtiliza esta información para que tu respuesta sea coherente y no contradiga lo establecido.`;
    }

    const finalPrompt = `${systemPrompt}\n\nRequerimiento del usuario:\n${prompt}`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ text: text.trim() });
  } catch (error) {
    console.error('Error generando contenido con AI:', error);
    res.status(500).json({ error: 'Error interno generando el contenido', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
