const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error abriendo la base de datos', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    // Tabla de Usuarios
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user',
      status TEXT DEFAULT 'active',
      reset_password_token TEXT,
      reset_password_expires DATETIME
    )`);
    
    // Migración por si la tabla ya existía
    db.run(`ALTER TABLE users ADD COLUMN name TEXT`, (err) => {});
    db.run(`ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active'`, (err) => {});
    db.run(`ALTER TABLE users ADD COLUMN reset_password_token TEXT`, (err) => {});
    db.run(`ALTER TABLE users ADD COLUMN reset_password_expires DATETIME`, (err) => {});

    // Tabla de Proyectos
    db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      data TEXT,
      owner_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users (id)
    )`);

    // Tabla de asignación de usuarios a proyectos (Colaboradores)
    db.run(`CREATE TABLE IF NOT EXISTS project_users (
      project_id INTEGER,
      user_id INTEGER,
      PRIMARY KEY (project_id, user_id),
      FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`);

    // Crear usuario admin por defecto si no existe
    const adminEmail = 'durancristian31306@gmail.com';
    const adminPasswordRaw = 'Cristian_5732988$';

    db.get('SELECT id FROM users WHERE email = ?', [adminEmail], (err, row) => {
      if (!row) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(adminPasswordRaw, salt);
        db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [adminEmail, hash, 'admin'], (err) => {
          if (err) {
            console.error('Error creando usuario admin:', err.message);
          } else {
            console.log('Usuario admin por defecto creado con éxito.');
          }
        });
      }
    });
  });
}

module.exports = db;
