import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, FileText, Code, GitBranch, Edit2, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateAIContent } from '../api';

export default function ProjectGuides({ data, projectName, updateData }) {
  const [guides, setGuides] = useState(data.execution?.guides || []);
  const [generating, setGenerating] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const handleSelectGuide = (guide) => {
    setSelectedGuide(guide);
    setIsEditing(false);
    setEditContent(guide.content);
  };

  const handleSaveEdit = () => {
    if (!selectedGuide) return;
    const newGuide = { ...selectedGuide, content: editContent, updatedAt: new Date().toISOString() };
    const newGuides = [...guides.filter(g => g.id !== selectedGuide.id), newGuide];
    setGuides(newGuides);
    setSelectedGuide(newGuide);
    setIsEditing(false);
    
    if (updateData) {
      updateData(prev => ({ 
        ...prev, 
        execution: { ...(prev.execution || {}), guides: newGuides } 
      }));
    }
  };

  const guideTypes = [
    { id: 'readme', name: 'README del Proyecto', icon: FileText, prompt: 'Genera un README.md profesional para este proyecto basándote en la planificación. Incluye descripción, características principales, tecnologías, y cómo empezar. Devuelve sólo el Markdown.' },
    { id: 'setup', name: 'Guía de Entorno de Desarrollo', icon: Code, prompt: 'Genera una guía paso a paso para configurar el entorno de desarrollo local para este proyecto (comandos, variables de entorno necesarias, pre-requisitos). Devuelve sólo el Markdown.' },
    { id: 'git', name: 'Reglas de Ramas y Commits', icon: GitBranch, prompt: 'Define una estrategia de Git (GitFlow o similar) recomendada para este proyecto y estandariza el formato de los mensajes de commit. Devuelve sólo el Markdown.' }
  ];

  const handleGenerate = async (type) => {
    if (generating) return;
    
    const exists = guides.find(g => g.id === type.id);
    if (exists) {
      const confirmed = window.confirm(`Ya tienes información guardada en la guía "${type.name}". Si continúas, se borrará y será reemplazada por el contenido generado por la IA. ¿Deseas continuar?`);
      if (!confirmed) return;
    }

    setGenerating(type.id);
    
    try {
      // Reconstruir contexto desde data (una simplificación de buildMarkdown)
      const contextStr = JSON.stringify(data, null, 2).substring(0, 5000); // Enviamos el JSON limitado para que sirva de contexto.

      const result = await generateAIContent(
        type.prompt + "\n\nIMPORTANTE: Devuelve únicamente el texto Markdown, sin comillas triples iniciales ni finales.", 
        `Proyecto: ${projectName}\nDatos planificados: ${contextStr}`
      );

      let text = result.text.trim();
      if (text.startsWith('```markdown')) text = text.replace(/^```markdown/, '').replace(/```$/, '').trim();
      if (text.startsWith('```')) text = text.replace(/^```/, '').replace(/```$/, '').trim();

      const newGuide = {
        id: type.id,
        title: type.name,
        content: text,
        updatedAt: new Date().toISOString()
      };

      const newGuides = [...guides.filter(g => g.id !== type.id), newGuide];
      setGuides(newGuides);
      handleSelectGuide(newGuide);
      
      if (updateData) {
        updateData(prev => ({ 
          ...prev, 
          execution: { ...(prev.execution || {}), guides: newGuides } 
        }));
      }
    } catch (e) {
      alert("Hubo un error al generar la guía. Intenta nuevamente.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-full bg-slate-50">
      {/* Sidebar de Guías */}
      <div className="w-80 bg-white border-r border-slate-200 p-6 flex flex-col h-full">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen size={24} className="text-cyan-600" />
          Guías del Proyecto
        </h2>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Generar Automáticamente</h3>
          {guideTypes.map(type => {
            const exists = guides.find(g => g.id === type.id);
            const Icon = type.icon;
            
            return (
              <div key={type.id} className="flex items-center gap-2">
                <button
                  onClick={() => exists ? handleSelectGuide(exists) : handleGenerate(type)}
                  className={`flex-1 flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors border ${
                    selectedGuide?.id === type.id 
                      ? 'bg-cyan-50 border-cyan-200 text-cyan-800' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} className={selectedGuide?.id === type.id ? 'text-cyan-600' : 'text-slate-400'} />
                  {type.name}
                </button>
                <button
                  onClick={() => handleGenerate(type)}
                  disabled={generating}
                  title="Regenerar con IA"
                  className="p-3 border border-slate-200 rounded-lg text-slate-400 hover:text-cyan-600 hover:border-cyan-200 hover:bg-cyan-50 transition-colors disabled:opacity-50"
                >
                  <Sparkles size={18} className={generating === type.id ? 'animate-spin' : ''} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visor de Guías */}
      <div className="flex-1 p-8 overflow-y-auto pb-24 h-full">
        {selectedGuide ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-1">{selectedGuide.title}</h1>
                <span className="text-xs text-slate-400 font-mono">
                  Última actualización: {new Date(selectedGuide.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                {isEditing ? (
                  <button onClick={handleSaveEdit} className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-700 transition-colors">
                    <Save size={16} /> Guardar
                  </button>
                ) : (
                  <button onClick={() => { setEditContent(selectedGuide.content); setIsEditing(true); }} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors border border-slate-200">
                    <Edit2 size={16} /> Editar
                  </button>
                )}
              </div>
            </div>
            
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full min-h-[500px] p-6 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            ) : (
              <div className="prose prose-slate prose-cyan max-w-none prose-sm md:prose-base bg-slate-50 p-6 rounded-lg border border-slate-100 min-h-[500px]">
                <ReactMarkdown>{selectedGuide.content}</ReactMarkdown>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <BookOpen size={64} className="mb-4 opacity-20" />
            <p className="text-lg">Selecciona o genera una guía para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}
