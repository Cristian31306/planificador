import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, createUser, updateUser, toggleUserStatus, deleteUser } from '../api';
import { Users, ArrowLeft, UserPlus, Edit2, X, Trash2, Ban, CheckCircle } from 'lucide-react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('Error cargando usuarios, puede que no seas admin');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingUserId) {
        await updateUser(editingUserId, name, email, password, role);
        setSuccess('Usuario actualizado exitosamente');
      } else {
        await createUser(name, email, password, role);
        setSuccess('Usuario creado exitosamente');
      }
      handleCancelEdit();
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (u) => {
    setEditingUserId(u.id);
    setName(u.name || '');
    setEmail(u.email);
    setRole(u.role);
    setPassword('');
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('user');
    setError('');
    setSuccess('');
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      await toggleUserStatus(id, newStatus);
      setSuccess(`Usuario ${newStatus === 'active' ? 'activado' : 'suspendido'} exitosamente`);
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario de forma permanente?')) return;
    try {
      await deleteUser(id);
      setSuccess('Usuario eliminado exitosamente');
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-4 min-h-[44px] px-2 -ml-2 rounded-lg hover:bg-slate-100">
            <ArrowLeft size={16} /> Volver al Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="text-cyan-600" /> Administración
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {editingUserId ? <Edit2 size={18} /> : <UserPlus size={18} />} 
                {editingUserId ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
              {success && <div className="mb-4 text-emerald-600 text-sm">{success}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    className="w-full min-h-[44px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full min-h-[44px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contraseña {editingUserId && <span className="text-xs text-slate-400 font-normal">(Opcional, dejar en blanco para no cambiar)</span>}
                  </label>
                  <input
                    type="text"
                    required={!editingUserId}
                    className="w-full min-h-[44px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rol</label>
                  <select
                    className="w-full min-h-[44px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 bg-white"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">Usuario (Solo ve sus proyectos)</option>
                    <option value="admin">Admin (Ve todo y crea usuarios)</option>
                  </select>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button type="submit" className="w-full min-h-[44px] bg-cyan-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors">
                    {editingUserId ? 'Guardar Cambios' : 'Crear Usuario'}
                  </button>
                  {editingUserId && (
                    <button type="button" onClick={handleCancelEdit} className="w-full flex items-center justify-center gap-1 min-h-[44px] bg-white border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                      <X size={16} /> Cancelar Edición
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[400px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Nombre</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Rol</th>
                    <th className="px-4 py-3 font-medium">Estado</th>
                    <th className="px-4 py-3 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-500">{u.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{u.name || '-'}</td>
                      <td className="px-4 py-3 font-medium">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${u.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {u.status === 'suspended' ? 'Suspendido' : 'Activo'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggleStatus(u.id, u.status)}
                            className={`p-1 rounded inline-flex items-center gap-1 text-xs font-medium transition-colors min-h-[32px] px-2 ${u.status === 'suspended' ? 'text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100' : 'text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100'}`}
                            title={u.status === 'suspended' ? 'Reactivar usuario' : 'Suspender usuario'}
                          >
                            {u.status === 'suspended' ? <CheckCircle size={14} /> : <Ban size={14} />}
                          </button>
                          <button 
                            onClick={() => handleEditClick(u)}
                            className="text-cyan-600 hover:text-cyan-800 p-1 bg-cyan-50 hover:bg-cyan-100 rounded inline-flex items-center gap-1 text-xs font-medium transition-colors min-h-[32px] px-2"
                            title="Editar usuario"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(u.id)}
                            className="text-red-600 hover:text-red-800 p-1 bg-red-50 hover:bg-red-100 rounded inline-flex items-center gap-1 text-xs font-medium transition-colors min-h-[32px] px-2"
                            title="Eliminar usuario"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan="6" className="px-4 py-4 text-center text-slate-500">No hay usuarios</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
