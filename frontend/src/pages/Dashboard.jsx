import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, createProject, deleteProject, getUsers, assignProject } from '../api';
import { Plus, Folder, Trash2, LogOut, Settings, Search, CheckCircle, Clock, ChevronDown, UserPlus } from 'lucide-react';
import { PHASES, TOTAL_ITEMS, itemHasContent } from '../constants';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('activos');
  const [openAssignId, setOpenAssignId] = useState(null);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      if (err.message.includes('Token')) {
        handleLogout();
      }
    }
  };

  const loadUsers = async () => {
    if (isAdmin) {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadProjects();
    loadUsers();
  }, []);

  const handleCreate = async () => {
    try {
      const newProj = await createProject('Nuevo Proyecto', {});
      navigate(`/project/${newProj.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto de forma permanente?')) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async (projectId, userIds) => {
    try {
      await assignProject(projectId, userIds);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCollaborator = (proj, userId) => {
    const current = proj.collaborators || [];
    const updated = current.includes(userId) 
      ? current.filter(id => id !== userId) 
      : [...current, userId];
    handleAssign(proj.id, updated);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const calculateProgress = (projData) => {
    let answered = 0;
    PHASES.forEach(phase => {
      phase.items.forEach(item => {
        if (itemHasContent(projData[item.id], item)) answered++;
      });
    });
    const planningPct = Math.round((answered / TOTAL_ITEMS) * 100);
    
    const totalTasks = projData.execution?.tasks ? Object.keys(projData.execution.tasks).length : 0;
    const completedTasks = projData.execution?.columns?.done?.taskIds?.length || 0;
    const executionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return { planningPct, executionPct, totalTasks };
  };

  const projectsWithProgress = projects.map(p => {
    const prog = calculateProgress(p.data || {});
    return {
      ...p,
      progress: prog.planningPct,
      executionProgress: prog.executionPct,
      totalTasks: prog.totalTasks
    };
  });

  const isProjectComplete = (p) => p.progress === 100 && p.executionProgress === 100 && p.totalTasks > 0;

  const tabProjects = projectsWithProgress.filter(p => 
    activeTab === 'completados' ? isProjectComplete(p) : !isProjectComplete(p)
  );

  const filteredProjects = tabProjects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Folder className="text-cyan-600" /> Centro de Control
            </h1>
            <p className="text-slate-500 text-sm mt-1">Gestiona y haz seguimiento a todos tus proyectos.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {isAdmin && (
              <Link to="/admin" className="flex-1 md:flex-none flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white px-3 py-2 md:py-2 rounded-lg border border-slate-200 shadow-sm min-h-[44px]">
                <Settings size={18} className="md:w-4 md:h-4" /> <span className="hidden md:inline">Admin</span>
              </Link>
            )}
            <button onClick={handleLogout} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 bg-white px-3 py-2 md:py-2 rounded-lg border border-slate-200 shadow-sm min-h-[44px]">
              <LogOut size={18} className="md:w-4 md:h-4" /> <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>

        {/* Pestañas y Buscador integrados */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-200 pb-4">
          <div className="flex gap-6 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('activos')}
              className={`pb-4 -mb-4.5 font-medium text-sm transition-colors relative ${activeTab === 'activos' ? 'text-cyan-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Proyectos Activos
              {activeTab === 'activos' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-600 rounded-t-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('completados')}
              className={`pb-4 -mb-4.5 font-medium text-sm transition-colors relative ${activeTab === 'completados' ? 'text-cyan-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Completados
              {activeTab === 'completados' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-600 rounded-t-full" />}
            </button>
          </div>
          
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2 w-full md:w-64">
            <Search className="text-slate-400 shrink-0" size={16} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 min-h-[32px] md:min-h-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <button 
            onClick={handleCreate}
            className="border-2 border-dashed border-cyan-200 bg-cyan-50/30 rounded-xl p-4 md:p-6 flex flex-row md:flex-col items-center justify-center gap-4 md:gap-0 text-cyan-600 hover:border-cyan-400 hover:bg-cyan-50 transition-all md:min-h-[220px] shadow-sm group col-span-full sm:col-span-1 min-h-[60px]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-cyan-600 group-hover:scale-110 transition-transform md:mb-3 shrink-0">
              <Plus size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="text-left md:text-center">
              <div className="font-semibold text-base md:text-lg">Nuevo Proyecto</div>
              <div className="text-[11px] md:text-xs text-cyan-700/60 hidden md:block mt-1">Crear plan de trabajo</div>
            </div>
          </button>

          {filteredProjects.map(proj => {
            const projIsComplete = isProjectComplete(proj);
            const overallProgress = Math.round((proj.progress + proj.executionProgress) / 2);
            
            return (
              <div key={proj.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col min-h-[220px] group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                  <div className={`h-full transition-all duration-500 ${projIsComplete ? 'bg-emerald-500' : 'bg-cyan-500'}`} style={{ width: `${overallProgress}%` }} />
                </div>
                
                <div className="flex justify-between items-start mb-3 pt-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    projIsComplete ? 'bg-emerald-100 text-emerald-700' : 
                    proj.progress > 0 || proj.executionProgress > 0 ? 'bg-cyan-100 text-cyan-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {projIsComplete ? <CheckCircle size={12}/> : <Clock size={12}/>}
                    {projIsComplete ? 'Completado' : proj.progress > 0 || proj.executionProgress > 0 ? 'En Progreso' : 'Nuevo'}
                  </span>
                  {isAdmin && (
                    <button onClick={() => handleDelete(proj.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1" aria-label="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight line-clamp-2">{proj.name}</h3>
                
                <p className="text-[11px] text-slate-400 mb-4 flex items-center gap-1">
                  Última edición: {new Date(proj.updated_at).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>

                <div className="mt-auto pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span className="uppercase tracking-widest text-cyan-600">Planificación</span>
                    <span className="text-cyan-700 font-bold">{proj.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span className="uppercase tracking-widest text-emerald-600">Ejecución</span>
                    <span className="text-emerald-700 font-bold">{proj.executionProgress}%</span>
                  </div>

                  {isAdmin && (
                    <div className="relative">
                      <button 
                        onClick={() => setOpenAssignId(openAssignId === proj.id ? null : proj.id)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer min-h-[36px]"
                      >
                        <div className="flex items-center gap-2">
                          <UserPlus size={14} className="text-slate-400" />
                          <span>Asignar ({proj.collaborators?.length || 0})</span>
                        </div>
                        <ChevronDown size={14} className="text-slate-400" />
                      </button>
                      
                      {openAssignId === proj.id && (
                        <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-slate-200 shadow-lg rounded-lg p-2 z-10 max-h-40 overflow-y-auto">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase mb-2 px-1">Colaboradores</div>
                          {users.map(u => {
                            const isAssigned = proj.collaborators?.includes(u.id);
                            return (
                              <label key={u.id} className="flex items-center gap-2 px-1 py-1.5 hover:bg-slate-50 rounded cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={isAssigned}
                                  onChange={() => toggleCollaborator(proj, u.id)}
                                  className="rounded text-cyan-600 focus:ring-cyan-500"
                                />
                                <span className="text-xs text-slate-700 truncate" title={u.email}>{u.name || u.email}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <Link 
                    to={`/project/${proj.id}`} 
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-cyan-700 transition-colors shadow-sm min-h-[44px]"
                  >
                    Abrir Editor
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
