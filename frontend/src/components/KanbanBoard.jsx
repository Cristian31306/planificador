import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock, User, Calendar, CheckCircle } from 'lucide-react';
import TaskModal from './TaskModal';

export default function KanbanBoard({ data, updateData, collaborators = [], systemUsers = [] }) {
  const [columns, setColumns] = useState({
    todo: { id: 'todo', title: 'Por Hacer', taskIds: [] },
    inProgress: { id: 'inProgress', title: 'En Progreso', taskIds: [] },
    done: { id: 'done', title: 'Terminado', taskIds: [] }
  });
  const [tasks, setTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Sincronizar desde cronograma si existe
    const cronogramaTareas = data.cronograma?.tareas || [];
    const execution = data.execution || { tasks: {}, columns: {
      todo: { id: 'todo', title: 'Por Hacer', taskIds: [] },
      inProgress: { id: 'inProgress', title: 'En Progreso', taskIds: [] },
      done: { id: 'done', title: 'Terminado', taskIds: [] }
    }};

    let currentTasks = { ...execution.tasks };
    let currentColumns = { ...execution.columns };
    let hasChanges = false;

    // Sincronizar tareas nuevas del cronograma
    cronogramaTareas.forEach((t, i) => {
      const taskId = `task-${i}`;
      if (!currentTasks[taskId]) {
        currentTasks[taskId] = {
          id: taskId,
          title: t.tarea || `Tarea ${i+1}`,
          duration: t.estimacion || '',
          originalStatus: t.estado || '',
          assignee: t.responsable || '',
          comments: [],
          subtasks: []
        };
        // Agregar a "todo" por defecto
        if (!currentColumns.todo.taskIds.includes(taskId) && 
            !currentColumns.inProgress.taskIds.includes(taskId) && 
            !currentColumns.done.taskIds.includes(taskId)) {
          
          if (t.estado === 'Terminado') currentColumns.done.taskIds.push(taskId);
          else if (t.estado === 'En progreso') currentColumns.inProgress.taskIds.push(taskId);
          else currentColumns.todo.taskIds.push(taskId);
        }
        hasChanges = true;
      } else {
        // Actualizar título, duración y responsable si cambiaron en el cronograma
        if (currentTasks[taskId].title !== t.tarea || 
            currentTasks[taskId].duration !== t.estimacion || 
            currentTasks[taskId].assignee !== t.responsable) {
          currentTasks[taskId] = { 
            ...currentTasks[taskId], 
            title: t.tarea || `Tarea ${i+1}`, 
            duration: t.estimacion || '', 
            assignee: t.responsable || '' 
          };
          hasChanges = true;
        }
      }
    });

    setTasks(currentTasks);
    setColumns(currentColumns);

    if (hasChanges) {
      updateData(prev => ({ ...prev, execution: { ...(prev.execution || {}), tasks: currentTasks, columns: currentColumns } }));
    }
  }, [data.cronograma]);

  const handleUpdateTask = (updatedTask) => {
    const newTasks = { ...tasks, [updatedTask.id]: updatedTask };
    setTasks(newTasks);
    setSelectedTask(updatedTask);

    updateData(prev => {
      let newCronograma = { ...(prev.cronograma || {}) };
      if (newCronograma.tareas) {
         const index = parseInt(updatedTask.id.replace('task-', ''));
         if (!isNaN(index) && newCronograma.tareas[index]) {
            newCronograma.tareas[index] = {
              ...newCronograma.tareas[index],
              responsable: updatedTask.assignee,
              estimacion: updatedTask.duration
            };
         }
      }
      return { 
        ...prev, 
        cronograma: newCronograma, 
        execution: { ...(prev.execution || {}), tasks: newTasks, columns } 
      };
    });
  };

  const getTaskStatus = (taskId) => {
    if (columns.todo?.taskIds.includes(taskId)) return 'todo';
    if (columns.inProgress?.taskIds.includes(taskId)) return 'inProgress';
    if (columns.done?.taskIds.includes(taskId)) return 'done';
    return 'todo';
  };

  const handleChangeStatus = (taskId, newStatusId, e) => {
    e.stopPropagation();
    const newColumns = { ...columns };
    
    // Remover de columnas anteriores
    Object.keys(newColumns).forEach(colId => {
      newColumns[colId].taskIds = newColumns[colId].taskIds.filter(id => id !== taskId);
    });
    
    // Agregar a nueva
    newColumns[newStatusId].taskIds.push(taskId);
    setColumns(newColumns);
    updateData(prev => ({ ...prev, execution: { ...(prev.execution || {}), tasks, columns: newColumns } }));
  };

  // Ordenar tareas: En Progreso -> Por Hacer -> Terminado
  const statusOrder = { 'inProgress': 1, 'todo': 2, 'done': 3 };
  const allTasks = Object.values(tasks).sort((a, b) => {
    return statusOrder[getTaskStatus(a.id)] - statusOrder[getTaskStatus(b.id)];
  });

  return (
    <div className="h-full flex flex-col p-4 md:p-8 overflow-y-auto pb-24 bg-slate-50">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden shrink-0">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="text-cyan-600" /> Ejecución
          </h3>
          <div className="text-xs text-slate-500 font-medium bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            Total tareas: {allTasks.length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-2/5">Tarea</th>
                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Responsable</th>
                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Progreso</th>
                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Duración</th>
                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400">
                    No hay tareas para ejecutar. Configura el cronograma primero.
                  </td>
                </tr>
              ) : (
                allTasks.map((t) => {
                  const status = getTaskStatus(t.id);
                  const totalSt = t.subtasks?.length || 0;
                  const doneSt = t.subtasks?.filter(st => st.done).length || 0;
                  
                  let progPct = 0;
                  if (totalSt > 0) {
                    progPct = Math.round((doneSt / totalSt) * 100);
                  } else {
                    if (status === 'done') progPct = 100;
                    else if (status === 'inProgress') progPct = 50;
                  }
                  
                  return (
                    <tr key={t.id} onClick={() => setSelectedTask(t)} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                      <td className="py-4 px-5">
                        <div className="text-sm font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">{t.title}</div>
                        {(t.comments?.length > 0) && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                            <MessageSquare size={10} /> {t.comments.length} comentarios
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-5 text-sm text-slate-500">
                        {t.assignee ? (
                           <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium"><User size={12}/> {t.assignee}</span>
                        ) : <span className="text-slate-400 italic text-xs">Sin asignar</span>}
                      </td>
                      <td className="py-4 px-5">
                        <div className="w-32">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                            <span>{totalSt > 0 ? `${doneSt}/${totalSt}` : 'Sin subtareas'}</span>
                            <span className={progPct === 100 ? 'text-emerald-500' : ''}>{progPct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div className={`h-full transition-all ${progPct === 100 ? 'bg-emerald-500' : 'bg-cyan-500'}`} style={{ width: `${progPct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Clock size={14} className="text-slate-400"/> {t.duration || '-'}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <select 
                          value={status}
                          onChange={(e) => handleChangeStatus(t.id, e.target.value, e)}
                          onClick={(e) => e.stopPropagation()}
                          className={`text-xs font-bold uppercase tracking-wider rounded-lg px-2 py-1.5 border-2 outline-none cursor-pointer text-center text-ellipsis ${
                            status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300' : 
                            status === 'inProgress' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300' : 
                            'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <option value="todo">Por Hacer</option>
                          <option value="inProgress">En Progreso</option>
                          <option value="done">Terminado</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedTask && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onUpdate={handleUpdateTask} 
          data={data}
          collaborators={collaborators}
          systemUsers={systemUsers}
        />
      )}
    </div>
  );
}
