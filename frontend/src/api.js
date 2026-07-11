const API_URL = import.meta.env.VITE_API_URL || '/api';

function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Credenciales inválidas');
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error obteniendo proyectos');
  return res.json();
}

export async function getProject(id) {
  const res = await fetch(`${API_URL}/projects/${id}`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error obteniendo proyecto');
  return res.json();
}

export async function createProject(name, data = {}) {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, data })
  });
  if (!res.ok) throw new Error('Error creando proyecto');
  return res.json();
}

export async function updateProject(id, name, data) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ name, data })
  });
  if (!res.ok) throw new Error('Error actualizando proyecto');
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Error eliminando proyecto');
  return res.json();
}

export async function assignProject(id, user_ids) {
  const res = await fetch(`${API_URL}/projects/${id}/assign`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ user_ids })
  });
  if (!res.ok) throw new Error('Error asignando proyecto');
  return res.json();
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error('Error en la solicitud');
  return res.json();
}

export async function resetPassword(token, newPassword) {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  });
  if (!res.ok) throw new Error('Error al restablecer la contraseña');
  return res.json();
}

export async function generateAIContent(prompt, context) {
  const res = await fetch(`${API_URL}/generate`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ prompt, context })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.details || errorData.error || 'Error en la generación de IA');
  }
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error obteniendo usuarios');
  return res.json();
}

export async function createUser(name, email, password, role) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password, role })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error creando usuario');
  }
  return res.json();
}

export async function updateUser(id, name, email, password, role) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password, role })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error actualizando usuario');
  }
  return res.json();
}

export async function toggleUserStatus(id, status) {
  const res = await fetch(`${API_URL}/users/${id}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error cambiando estado del usuario');
  }
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error eliminando usuario');
  }
  return res.json();
}
