import React, { useState } from 'react';
import { X, Send, User, Clock, CheckCircle, CheckSquare, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { generateAIContent } from '../api';

export default function TaskModal({ task, onClose, onUpdate, users, data, collaborators = [], systemUsers = [] }) {
  const [comment, setComment] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);

  if (!task) return null;

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    // Usuario mock o desde localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const authorName = currentUser.email || 'Usuario Local';
    
    const newComment = {
      id: Date.now().toString(),
      text: comment.trim(),
      author: authorName,
      timestamp: new Date().toISOString()
    };
    
    onUpdate({
      ...task,
      comments: [...(task.comments || []), newComment]
    });
    setComment('');
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    const st = { id: Date.now().toString(), title: newSubtask.trim(), done: false };
    onUpdate({ ...task, subtasks: [...(task.subtasks || []), st] });
    setNewSubtask('');
  };

  const toggleSubtask = (stId) => {
    const newSubtasks = task.subtasks.map(st => st.id === stId ? { ...st, done: !st.done } : st);
    onUpdate({ ...task, subtasks: newSubtasks });
  };

  const removeSubtask = (stId) => {
    const newSubtasks = task.subtasks.filter(st => st.id !== stId);
    onUpdate({ ...task, subtasks: newSubtasks });
  };

  const completedSubtasks = task.subtasks?.filter(st => st.done).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progressPct = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const handleGenerateAISubtasks = async () => {
    if (task.subtasks && task.subtasks.length > 0) {
      const confirmed = window.confirm("Ya tienes subtareas creadas. Si continúas, las subtareas actuales se borrarán y serán reemplazadas por las generadas por la IA. ¿Deseas continuar?");
      if (!confirmed) return;
    }
    
    setGeneratingAI(true);
    try {
      const planningData = { ...data };
      delete planningData.execution; // Solo enviar planificación, no la ejecución
      const contextStr = JSON.stringify(planningData).substring(0, 4000);
      
      const prompt = `Analiza la tarea "${task.title}" dentro del contexto general de la planificación de este proyecto.
Contexto del proyecto: ${contextStr}

Tu objetivo es desglosar esta tarea principal en subtareas técnicas, lógicas y accionables. 
No hay un límite mínimo ni máximo de subtareas. Analiza la complejidad real de la tarea y genera exactamente la cantidad de subtareas que consideres necesarias y suficientes para completarla con éxito.

Devuelve ÚNICAMENTE un array en JSON válido con el siguiente formato, sin texto adicional:
[
  {"title": "Ejemplo de subtarea 1"},
  {"title": "Ejemplo de subtarea 2"}
]`;
      
      const result = await generateAIContent(prompt, `Tarea actual: ${task.title}. Asignado: ${task.assignee}`);
      let text = result.text.trim();
      if (text.startsWith('```json')) text = text.replace(/^```json/, '').replace(/```$/, '').trim();
      if (text.startsWith('```')) text = text.replace(/^```/, '').replace(/```$/, '').trim();
      
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("No es un array");

      const newSubtasks = parsed.map((st, idx) => ({ 
        id: Date.now().toString() + idx, 
        title: st.title, 
        done: false 
      }));
      
      onUpdate({ ...task, subtasks: newSubtasks });
    } catch (e) {
      alert("Hubo un error al generar con IA. Revisa la consola o intenta de nuevo.");
      console.error(e);
    } finally {
      setGeneratingAI(false);
    }
  };

  // Parsear duración (Ej: "5 H" o "2 D")
  const durationStr = task.duration || '';
  const durNum = durationStr.replace(/[^0-9.]/g, '');
  const durUnit = durationStr.toLowerCase().includes('d') ? 'D' : 'H';

  // Obtener responsables únicos del proyecto (desde el cronograma)
  const uniqueAssignees = Array.from(new Set(
    (data?.cronograma?.tareas || []).map(t => t.responsable).filter(Boolean)
  ));
  
  // Agregar también los que existan en ejecución y no en cronograma
  if (data?.execution?.tasks) {
    Object.values(data.execution.tasks).forEach(t => {
      if (t.assignee && !uniqueAssignees.includes(t.assignee)) uniqueAssignees.push(t.assignee);
    });
  }
  
  // Función auxiliar para obtener un nombre limpio
  const getDisplayName = (u) => {
    if (u.name) return u.name;
    if (u.email) {
      let part = u.email.split('@')[0].replace(/[0-9]/g, '');
      if (part.length === 0) part = u.email.split('@')[0];
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }
    return "Desconocido";
  };

  // Agregar también a los colaboradores reales del sistema asignados a este proyecto
  const projectCollaborators = systemUsers.filter(u => collaborators.includes(u.id));
  projectCollaborators.forEach(u => {
    const disp = getDisplayName(u);
    // Evitar duplicados si ya hay un nombre similar (ej. "Cristian" vs "Durancristian")
    const exists = uniqueAssignees.some(existing => 
      existing.toLowerCase() === disp.toLowerCase() || 
      existing.toLowerCase().includes(disp.toLowerCase()) || 
      disp.toLowerCase().includes(existing.toLowerCase())
    );
    if (!exists) uniqueAssignees.push(disp);
  });
  
  // Agregar al usuario actual conectado (por si acaso no viene en systemUsers)
  try {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser.email) {
      const disp = getDisplayName(currentUser);
      const exists = uniqueAssignees.some(existing => 
        existing.toLowerCase() === disp.toLowerCase() || 
        existing.toLowerCase().includes(disp.toLowerCase()) || 
        disp.toLowerCase().includes(existing.toLowerCase())
      );
      if (!exists) uniqueAssignees.push(disp);
    }
  } catch (e) {}

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Detalles de Tarea</div>
            <h2 className="text-xl font-bold text-slate-800 leading-tight">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Estimación</label>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Clock size={16} className="text-cyan-600 shrink-0" />
                <div className="flex bg-white rounded border border-slate-200 overflow-hidden focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 flex-1">
                  <input 
                    type="number"
                    min="0"
                    value={durNum}
                    onChange={(e) => onUpdate({ ...task, duration: `${e.target.value} ${durUnit}` })}
                    placeholder="Cant."
                    className="bg-transparent border-none outline-none w-16 text-center text-sm px-2 py-1.5"
                  />
                  <select 
                    value={durUnit}
                    onChange={(e) => onUpdate({ ...task, duration: `${durNum || 0} ${e.target.value}` })}
                    className="bg-slate-50 border-l border-slate-200 outline-none text-sm px-2 py-1.5 font-bold text-slate-600 cursor-pointer flex-1"
                  >
                    <option value="H">Horas (H)</option>
                    <option value="D">Días (D)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Responsable Asignado</label>
              <div className="flex items-center gap-2 text-slate-700 font-medium bg-white px-3 py-1.5 rounded border border-slate-200 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                <User size={16} className="text-cyan-600 shrink-0" />
                <select 
                  value={task.assignee || ''}
                  onChange={(e) => onUpdate({ ...task, assignee: e.target.value })}
                  className="bg-transparent border-none outline-none w-full text-sm cursor-pointer"
                >
                  <option value="">Sin asignar</option>
                  {uniqueAssignees.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Subtasks Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <CheckSquare size={16} className="text-cyan-600" /> Subtareas
                </h3>
                <button 
                  onClick={handleGenerateAISubtasks} 
                  disabled={generatingAI}
                  className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded transition-colors disabled:opacity-50"
                >
                  {generatingAI ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  {generatingAI ? 'Generando...' : 'IA'}
                </button>
              </div>
              {totalSubtasks > 0 && (
                <div className="text-xs font-semibold text-slate-500">
                  {completedSubtasks}/{totalSubtasks} ({progressPct}%)
                </div>
              )}
            </div>
            
            {totalSubtasks > 0 && (
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4 border border-slate-200">
                <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progressPct}%` }} />
              </div>
            )}

            <div className="space-y-2 mb-4">
              {(task.subtasks || []).map(st => (
                <div key={st.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={st.done} 
                      onChange={() => toggleSubtask(st.id)}
                      className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500 cursor-pointer"
                    />
                    <span className={`text-sm ${st.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                      {st.title}
                    </span>
                  </div>
                  <button onClick={() => removeSubtask(st.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={newSubtask} 
                onChange={e => setNewSubtask(e.target.value)} 
                placeholder="Añadir una nueva subtarea..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddSubtask(); } }}
              />
              <button onClick={handleAddSubtask} className="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors border border-slate-200">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              Comentarios <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">{task.comments?.length || 0}</span>
            </h3>
            
            <div className="space-y-4 mb-6">
              {!task.comments || task.comments.length === 0 ? (
                <p className="text-sm text-slate-400 italic text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  No hay comentarios en esta tarea aún.
                </p>
              ) : (
                task.comments.map(c => (
                  <div key={c.id} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-700">{c.author}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(c.timestamp).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{c.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer (Add Comment) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex gap-2 relative">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 min-h-[60px] max-h-[120px] rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-y"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <button
              onClick={handleAddComment}
              disabled={!comment.trim()}
              className="self-end bg-cyan-600 text-white p-3 rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Presiona Enter para enviar, Shift+Enter para salto de línea.</p>
        </div>
      </div>
    </div>
  );
}
