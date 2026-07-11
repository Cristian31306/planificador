import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronDown, ChevronRight, Check, Circle, Plus, Trash2, Download,
  Printer, RotateCcw, FileText, Save, ListChecks, Layers, ArrowLeft, Menu, X, MoreVertical, Wand2, Info, Layout, LayoutList, BookOpen
} from "lucide-react";
import { getProject, updateProject, generateAIContent, getUsers } from "../api";
import mermaid from 'mermaid';
import ReactMarkdown from 'react-markdown';

/* ------------------------------------------------------------------ */
/* ESQUEMA DE FASES (Igual al original)                               */
/* ------------------------------------------------------------------ */

import { PHASES, ALL_ITEMS, TOTAL_ITEMS, defaultValueFor, emptyRow, itemHasContent } from "../constants";
import KanbanBoard from "../components/KanbanBoard";
import ProjectGuides from "../components/ProjectGuides";
import MermaidChart from "../components/MermaidChart";
/* ------------------------------------------------------------------ */
/* SUBCOMPONENTES DE CAMPO                                             */
/* ------------------------------------------------------------------ */

function FieldLabel({ children, onGenerate, isGenerating, help }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
        {children}
        {help && (
          <div className="group relative flex items-center">
            <Info size={14} className="text-slate-400 hover:text-cyan-600 cursor-help transition-colors" />
            <div className="pointer-events-none absolute left-0 bottom-full mb-2 w-64 opacity-0 transition-opacity group-hover:opacity-100 z-50">
              <div className="rounded-lg bg-slate-800 p-3 text-xs text-white shadow-xl normal-case tracking-normal">
                {help}
                <div className="absolute -bottom-1 left-1.5 h-3 w-3 rotate-45 bg-slate-800"></div>
              </div>
            </div>
          </div>
        )}
      </label>
      {onGenerate && (
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="text-cyan-600 hover:text-cyan-800 disabled:opacity-50 text-xs flex items-center gap-1 font-medium transition-colors"
          title="Autocompletar con IA"
        >
          {isGenerating ? <div className="animate-spin h-3 w-3 border-2 border-cyan-600 rounded-full border-t-transparent" /> : <Wand2 size={14} />}
          <span>Generar</span>
        </button>
      )}
    </div>
  );
}

function TextAreaField({ field, value, onChange, onGenerate, isGenerating }) {
  return (
    <div className="mb-6">
      <FieldLabel onGenerate={onGenerate} isGenerating={isGenerating} help={field.help}>{field.label}</FieldLabel>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Escribe aquí..."
        className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 placeholder:text-slate-400"
      />
    </div>
  );
}

function ListField({ field, value, onChange, onGenerate, isGenerating }) {
  const items = value || [];
  const update = (idx, text) => {
    const next = [...items];
    next[idx] = text;
    onChange(next);
  };
  const add = () => onChange([...items, ""]);
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
  return (
    <div className="mb-6">
      <FieldLabel onGenerate={onGenerate} isGenerating={isGenerating} help={field.help}>{field.label}</FieldLabel>
      <div className="space-y-2">
        {items.map((v, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 w-5">{String(idx + 1).padStart(2, "0")}</span>
            <input
              value={v}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={field.placeholder || ""}
              className="flex-1 min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 placeholder:text-slate-400"
            />
            <button onClick={() => remove(idx)} className="text-slate-400 hover:text-red-600 p-2 min-h-[44px]" aria-label="Eliminar">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button
          onClick={add}
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-cyan-700 hover:text-cyan-900"
        >
          <Plus size={14} /> Agregar
        </button>
      </div>
    </div>
  );
}

function ChecklistField({ field, value, onChange, onGenerate, isGenerating }) {
  const items = value || [];
  const add = () => onChange([...items, { text: "", done: false }]);
  const update = (idx, text) => {
    const next = [...items];
    next[idx] = { ...next[idx], text };
    onChange(next);
  };
  const toggle = (idx) => {
    const next = [...items];
    next[idx] = { ...next[idx], done: !next[idx].done };
    onChange(next);
  };
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
  return (
    <div className="mb-6">
      <FieldLabel help={field.help} onGenerate={onGenerate} isGenerating={isGenerating}>{field.label}</FieldLabel>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <button
              onClick={() => toggle(idx)}
              className={`shrink-0 w-6 h-6 rounded-md border flex items-center justify-center ${
                it.done ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-400 bg-white text-transparent"
              }`}
            >
              <Check size={16} />
            </button>
            <input
              value={it.text}
              onChange={(e) => update(idx, e.target.value)}
              placeholder="Criterio..."
              className={`flex-1 min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 placeholder:text-slate-400 ${
                it.done ? "line-through text-slate-400" : "text-slate-800"
              }`}
            />
            <button onClick={() => remove(idx)} className="text-slate-400 hover:text-red-600 p-2 min-h-[44px]">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button
          onClick={add}
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-cyan-700 hover:text-cyan-900"
        >
          <Plus size={14} /> Agregar criterio
        </button>
      </div>
    </div>
  );
}

function FixedChecklistField({ field, value, onChange, onGenerate, isGenerating }) {
  const state = value || {};
  const toggle = (idx) => onChange({ ...state, [idx]: !state[idx] });
  const doneCount = field.items.filter((_, i) => state[i]).length;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <FieldLabel help={field.help} onGenerate={onGenerate} isGenerating={isGenerating}>{field.label}</FieldLabel>
        <span className="font-mono text-[11px] text-slate-500">{doneCount}/{field.items.length}</span>
      </div>
      <div className="space-y-2 rounded-sm border border-slate-300 bg-white p-3">
        {field.items.map((label, idx) => (
          <label key={idx} className="flex items-start gap-2.5 cursor-pointer select-none">
            <button
              onClick={() => toggle(idx)}
              className={`shrink-0 mt-0.5 w-6 h-6 rounded-md border flex items-center justify-center ${
                state[idx] ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-400 bg-white text-transparent"
              }`}
            >
              <Check size={16} />
            </button>
            <span className={`text-sm ${state[idx] ? "text-slate-400 line-through" : "text-slate-800"}`}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function TableField({ field, value, onChange, onGenerate, isGenerating, data, systemUsers, collaborators }) {
  const rows = value || [];
  const columns = field.columns;
  const updateCell = (rowIdx, key, val) => {
    const next = rows.map((r, i) => (i === rowIdx ? { ...r, [key]: val } : r));
    onChange(next);
  };
  const addRow = () => onChange([...rows, emptyRow(columns)]);
  const removeRow = (idx) => onChange(rows.filter((_, i) => i !== idx));

  return (
    <div className="mb-6">
      <FieldLabel help={field.help} onGenerate={onGenerate} isGenerating={isGenerating}>{field.label}</FieldLabel>
      <div className="overflow-x-auto rounded-sm border border-slate-300 bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              {columns.map((c) => (
                <th key={c.key} className="text-left font-mono text-[10px] uppercase tracking-wider text-slate-500 px-3 py-2 whitespace-nowrap">
                  {c.label}
                </th>
              ))}
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-4 text-center text-xs text-slate-400">
                  Sin filas todavía
                </td>
              </tr>
            )}
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-slate-100 last:border-0">
                {columns.map((c) => (
                  <td key={c.key} className="px-2 py-1.5 align-top">
                    {c.type === "select" ? (
                      <select
                        value={row[c.key] || ""}
                        onChange={(e) => updateCell(rIdx, c.key, e.target.value)}
                        className="w-full min-w-[120px] min-h-[44px] rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      >
                        <option value="">—</option>
                        {c.options.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : c.type === "auto-id" ? (
                      <input
                        value={c.prefix + String(rIdx + 1).padStart(2, '0')}
                        readOnly
                        className="w-full min-w-[80px] min-h-[44px] rounded-lg border border-transparent bg-slate-50 px-2 py-1 text-sm font-mono font-bold text-slate-500 cursor-not-allowed"
                      />
                    ) : c.type === "req-select" ? (
                      <select
                        value={row[c.key] || ""}
                        onChange={(e) => updateCell(rIdx, c.key, e.target.value)}
                        className="w-full min-w-[150px] min-h-[44px] rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      >
                        <option value="">— Seleccionar —</option>
                        {(()=>{
                          const rfs = data?.['req-funcionales']?.['funcionales'] || [];
                          const rnfs = data?.['req-no-funcionales']?.['noFuncionales'] || [];
                          return (
                            <>
                              {rfs.length > 0 && <optgroup label="Funcionales">
                                {rfs.map((r, idx) => {
                                  const rId = r.id || `RF-${String(idx + 1).padStart(2, '0')}`;
                                  return <option key={rId} value={rId}>{rId} - {r.descripcion ? r.descripcion.substring(0,30) + '...' : ''}</option>;
                                })}
                              </optgroup>}
                              {rnfs.length > 0 && <optgroup label="No Funcionales">
                                {rnfs.map((r, idx) => {
                                  const rId = r.id || `RNF-${String(idx + 1).padStart(2, '0')}`;
                                  return <option key={rId} value={rId}>{rId} - {r.descripcion ? r.descripcion.substring(0,30) + '...' : ''}</option>;
                                })}
                              </optgroup>}
                            </>
                          );
                        })()}
                      </select>
                    ) : c.type === "user-select" ? (
                      <select
                        value={row[c.key] || ""}
                        onChange={(e) => updateCell(rIdx, c.key, e.target.value)}
                        className="w-full min-w-[150px] min-h-[44px] rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 cursor-pointer"
                      >
                        <option value="">Sin asignar</option>
                        {(() => {
                           const getDisplayName = (u) => {
                              if (u.name) return u.name;
                              if (u.email) {
                                let part = u.email.split('@')[0].replace(/[0-9]/g, '');
                                if (part.length === 0) part = u.email.split('@')[0];
                                return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                              }
                              return "Desconocido";
                           };
                           const projectCollaborators = (systemUsers||[]).filter(u => (collaborators||[]).includes(u.id));
                           const assignees = projectCollaborators.map(getDisplayName);
                           const uniqueAssignees = [...new Set(assignees)];
                           return uniqueAssignees.map(a => (
                             <option key={a} value={a}>{a}</option>
                           ));
                        })()}
                      </select>
                    ) : c.type === "duration" ? (
                      <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 min-w-[120px] min-h-[44px]">
                        {(() => {
                           const durationStr = row[c.key] || '';
                           const durNum = durationStr.replace(/[^0-9.]/g, '');
                           const durUnit = durationStr.toLowerCase().includes('d') ? 'D' : 'H';
                           return (
                             <>
                               <input 
                                 type="number"
                                 min="0"
                                 value={durNum}
                                 onChange={(e) => updateCell(rIdx, c.key, `${e.target.value} ${durUnit}`)}
                                 placeholder="Cant."
                                 className="bg-transparent border-none outline-none w-16 text-center text-sm px-2 py-1.5"
                               />
                               <select 
                                 value={durUnit}
                                 onChange={(e) => updateCell(rIdx, c.key, `${durNum || 0} ${e.target.value}`)}
                                 className="bg-slate-50 border-l border-slate-200 outline-none text-sm px-2 py-1.5 font-bold text-slate-600 cursor-pointer flex-1"
                               >
                                 <option value="H">H</option>
                                 <option value="D">D</option>
                               </select>
                             </>
                           );
                        })()}
                      </div>
                    ) : (
                      <input
                        value={row[c.key] || ""}
                        onChange={(e) => updateCell(rIdx, c.key, e.target.value)}
                        className="w-full min-w-[160px] min-h-[44px] rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      />
                    )}
                  </td>
                ))}
                <td className="px-1 text-center">
                  <button onClick={() => removeRow(rIdx)} className="text-slate-400 hover:text-red-600 p-1">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-cyan-700 hover:text-cyan-900"
      >
        <Plus size={14} /> Agregar fila
      </button>
    </div>
  );
}

function FieldRenderer({ field, value, onChange, onGenerate, isGenerating, data, systemUsers, collaborators }) {
  switch (field.type) {
    case "textarea": return <TextAreaField field={field} value={value} onChange={onChange} onGenerate={onGenerate} isGenerating={isGenerating} />;
    case "list": return <ListField field={field} value={value} onChange={onChange} onGenerate={onGenerate} isGenerating={isGenerating} />;
    case "checklist": return <ChecklistField field={field} value={value} onChange={onChange} onGenerate={onGenerate} isGenerating={isGenerating} />;
    case "fixedChecklist": return <FixedChecklistField field={field} value={value} onChange={onChange} onGenerate={onGenerate} isGenerating={isGenerating} />;
    case "table": return <TableField field={field} value={value} onChange={onChange} onGenerate={onGenerate} isGenerating={isGenerating} data={data} systemUsers={systemUsers} collaborators={collaborators} />;
    default: return null;
  }
}

/* ------------------------------------------------------------------ */
/* EXPORTACIÓN A MARKDOWN                                              */
/* ------------------------------------------------------------------ */

function fieldToMarkdown(field, value) {
  let out = `**${field.label}**\n\n`;
  if (field.type === "textarea") {
    out += (value && value.trim()) ? `${value}\n` : "_(sin completar)_\n";
  } else if (field.type === "list") {
    const items = (value || []).filter((v) => v && v.trim());
    out += items.length ? items.map((v) => `- ${v}`).join("\n") + "\n" : "_(sin completar)_\n";
  } else if (field.type === "checklist") {
    const items = value || [];
    out += items.length
      ? items.map((it) => `- [${it.done ? "x" : " "}] ${it.text}`).join("\n") + "\n"
      : "_(sin completar)_\n";
  } else if (field.type === "fixedChecklist") {
    out += field.items.map((label, idx) => `- [${(value || {})[idx] ? "x" : " "}] ${label}`).join("\n") + "\n";
  } else if (field.type === "table") {
    const rows = value || [];
    if (rows.length === 0) {
      out += "_(sin filas)_\n";
    } else {
      const cols = field.columns;
      out += `| ${cols.map((c) => c.label).join(" | ")} |\n`;
      out += `| ${cols.map(() => "---").join(" | ")} |\n`;
      rows.forEach((row) => {
        out += `| ${cols.map((c) => (row[c.key] || "").toString().replace(/\|/g, "/")).join(" | ")} |\n`;
      });
    }
  }
  return out + "\n";
}

function buildMarkdown(projectName, data) {
  const date = new Date().toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  let md = `# ${projectName || "Proyecto sin nombre"}\n\nDocumento de planificación generado el ${date}\n\n---\n\n`;
  PHASES.forEach((phase, pIdx) => {
    md += `## Fase ${pIdx + 1}. ${phase.name}\n\n`;
    phase.items.forEach((item) => {
      md += `### ${item.name}\n\n`;
      item.fields.forEach((field) => {
        const itemData = data[item.id] || {};
        md += fieldToMarkdown(field, itemData[field.id]);
      });
    });
  });
  return md;
}

function downloadMarkdown(projectName, data) {
  const md = buildMarkdown(projectName, data);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeName = (projectName || "proyecto").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  a.download = `${safeName || "proyecto"}-planificacion.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/* VISUALIZACIONES (Diagramas)                                         */
/* ------------------------------------------------------------------ */

function DiagramsView({ data }) {
  let ganttChart = '';
  const tareas = data.cronograma?.tareas;
  if (tareas && tareas.length > 0) {
    ganttChart = "gantt\n    title Cronograma del Proyecto\n    dateFormat YYYY-MM-DD\n    axisFormat %d/%m/%Y\n    section Tareas\n";
    tareas.forEach((t, i) => {
      const taskName = t.tarea || t.Tarea || t.nombre || t.Nombre || t.task || '';
      if (taskName) {
         let estimacion = String(t.estimacion || t.Estimacion || t.duracion || '1d');
         let duration = parseInt(estimacion.replace(/[^0-9]/g, '')) || 1;
         let unit = estimacion.toLowerCase().includes('hora') || estimacion.toLowerCase().includes('h') ? 'h' : 'd';
         let estado = String(t.estado || t.Estado || '');
         let status = estado.toLowerCase().includes('terminado') || estado.toLowerCase().includes('done') ? 'done' : estado.toLowerCase().includes('progreso') ? 'active' : '';
         let safeName = taskName.replace(/[^a-zA-Z0-9_ áéíóúÁÉÍÓÚñÑ]/g, '').trim(); // Dejar tildes y espacios
         if (safeName.length > 45) safeName = safeName.substring(0, 42) + '...';
         if (!safeName) safeName = `Tarea ${i + 1}`;
         const today = new Date().toISOString().split('T')[0];
         ganttChart += `    ${safeName} :${status ? status + ', ' : ''}id${i}, ${i === 0 ? today : 'after id'+(i-1)}, ${duration}${unit}\n`;
      }
    });
  }

  let erChart = '';
  const campos = data['modelo-datos']?.campos;
  if (campos && campos.length > 0) {
    erChart = "erDiagram\n";
    const tables = {};
    campos.forEach(c => {
      if (c.tabla && c.campo) {
        const tName = c.tabla.replace(/[^a-zA-Z0-9_]/g, '_');
        const cType = (c.tipoDato || 'string').replace(/[^a-zA-Z0-9_]/g, '_');
        const cName = c.campo.replace(/[^a-zA-Z0-9_]/g, '_');
        if (!tables[tName]) tables[tName] = [];
        tables[tName].push(`${cType} ${cName}`);
      }
    });
    Object.keys(tables).forEach(t => {
      erChart += `    ${t} {\n`;
      tables[t].forEach(f => {
        erChart += `        ${f}\n`;
      });
      erChart += `    }\n`;
    });
    const tableKeys = Object.keys(tables);
    campos.forEach(c => {
      let rel = (c.relacion || '').trim();
      if (!rel) return;
      
      const lowerRel = rel.toLowerCase();
      if (['n/a', 'na', 'ninguna', 'no', '-', 'pk', 'primary key'].includes(lowerRel)) return;
      if (lowerRel.startsWith('pk') || lowerRel.includes('primary key')) return;
      
      let targetTable = null;
      
      for (const tk of tableKeys) {
        if (rel.includes(tk) || rel.includes(c.tabla)) {
            if (tk !== c.tabla.replace(/[^a-zA-Z0-9_]/g, '_') && rel.includes(tk)) {
                targetTable = tk;
                break;
            }
        }
      }
      
      if (!targetTable) {
        const words = rel.split(/[^a-zA-Z0-9_]/).filter(w => w.length > 2 && w.toLowerCase() !== 'fk');
        if (words.length > 0) {
            targetTable = words[0];
        }
      }
      
      if (targetTable && c.tabla) {
        const sourceTable = c.tabla.replace(/[^a-zA-Z0-9_]/g, '_');
        erChart += `    ${sourceTable} ||--o{ ${targetTable} : "relacion"\n`;
      }
    });
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 print:px-0">
      <h2 className="font-mono text-2xl font-semibold text-slate-900 mb-8">Visualizaciones Automáticas</h2>
      
      {ganttChart && (
        <div className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-slate-200 break-inside-avoid">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Cronograma (Gantt)</h3>
          <MermaidChart id="gantt-diagram" chart={ganttChart} />
        </div>
      )}

      {erChart && (
        <div className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-slate-200 break-inside-avoid">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Modelo Entidad-Relación</h3>
          <MermaidChart id="er-diagram" chart={erChart} />
        </div>
      )}

      {!ganttChart && !erChart && (
        <p className="text-slate-500 text-sm">Completa el "Cronograma" o el "Modelo de datos" para ver los diagramas automáticos.</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* VISTA DE DOCUMENTO COMPLETO (para imprimir / revisar)               */
/* ------------------------------------------------------------------ */

function FullDocumentView({ projectName, data }) {
  const dateStr = new Date().toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  return (
    <div className="max-w-3xl mx-auto py-10 px-6 print:px-0">
      <h1 className="font-mono text-2xl font-semibold text-slate-900 mb-1">{projectName || "Proyecto sin nombre"}</h1>
      <p className="text-sm text-slate-500 mb-8">Documento de planificación · {dateStr}</p>
      {PHASES.map((phase, pIdx) => (
        <div key={phase.id} className="mb-10 break-inside-avoid">
          <h2 className="font-mono text-xs uppercase tracking-widest text-cyan-700 border-b border-slate-300 pb-2 mb-4">
            Fase {pIdx + 1} — {phase.name}
          </h2>
          {phase.items.map((item) => {
            const itemData = data[item.id] || {};
            return (
              <div key={item.id} className="mb-6">
                <h3 className="text-base font-semibold text-slate-800 mb-2">{item.name}</h3>
                {item.fields.map((field) => (
                  <div key={field.id} className="mb-3 text-sm">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">{field.label}</div>
                    {field.type === "textarea" && (
                      <div className="prose prose-sm prose-slate prose-cyan max-w-none text-slate-700">
                        {itemData[field.id] ? <ReactMarkdown>{itemData[field.id]}</ReactMarkdown> : "—"}
                      </div>
                    )}
                    {field.type === "list" && (
                      <ul className="list-disc list-inside text-slate-700">
                        {(itemData[field.id] || []).filter((v) => v).map((v, i) => <li key={i}>{v}</li>)}
                        {(!itemData[field.id] || itemData[field.id].length === 0) && <li className="text-slate-400 list-none">—</li>}
                      </ul>
                    )}
                    {field.type === "checklist" && (
                      <ul className="text-slate-700 space-y-0.5">
                        {(itemData[field.id] || []).map((it, i) => (
                          <li key={i}>{it.done ? "☑" : "☐"} {it.text}</li>
                        ))}
                      </ul>
                    )}
                    {field.type === "fixedChecklist" && (
                      <ul className="text-slate-700 space-y-0.5">
                        {field.items.map((label, i) => (
                          <li key={i}>{(itemData[field.id] || {})[i] ? "☑" : "☐"} {label}</li>
                        ))}
                      </ul>
                    )}
                    {field.type === "table" && (
                      <table className="w-full text-xs border-collapse mt-1">
                        <thead>
                          <tr>
                            {field.columns.map((c) => (
                              <th key={c.key} className="text-left border-b border-slate-300 py-1 pr-3 text-slate-500 font-mono uppercase tracking-wide text-[9px]">{c.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(itemData[field.id] || []).map((row, i) => (
                            <tr key={i} className="border-b border-slate-100">
                              {field.columns.map((c) => (
                                <td key={c.key} className="py-1 pr-3 text-slate-700">{row[c.key] || "—"}</td>
                              ))}
                            </tr>
                          ))}
                          {(!itemData[field.id] || itemData[field.id].length === 0) && (
                            <tr><td colSpan={field.columns.length} className="text-slate-400 py-1">—</td></tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* APP PRINCIPAL (Editor)                                              */
/* ------------------------------------------------------------------ */

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [data, setData] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);
  const [expandedPhases, setExpandedPhases] = useState(() => Object.fromEntries(PHASES.map((p) => [p.id, true])));
  const [currentItemId, setCurrentItemId] = useState(ALL_ITEMS[0].id);
  const [loaded, setLoaded] = useState(false);
  const [fullView, setFullView] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [generatingFields, setGeneratingFields] = useState({});
  const [activeTab, setActiveTab] = useState("planificacion");
  const saveTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const proj = await getProject(id);
        setProjectName(proj.name || "");
        setData(proj.data || {});
        setCollaborators([...(proj.collaborators || []), proj.owner_id].filter(Boolean));
        setLoaded(true);
      } catch (err) {
        if (err.message.includes('Token')) {
          navigate('/login');
        } else {
          alert("Error cargando proyecto. Regresando al dashboard.");
          navigate('/');
        }
      }
    })();
    
    getUsers().then(setSystemUsers).catch(e => console.error("Error fetching users", e));
  }, [id, navigate]);

  useEffect(() => {
    if (!loaded) return;
    setSaveStatus("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await updateProject(id, projectName, data);
        setSaveStatus("saved");
      } catch (e) {
        setSaveStatus("error");
      }
    }, 1000);
    return () => clearTimeout(saveTimer.current);
  }, [projectName, data, loaded, id]);

  const handleGenerateAI = async (itemId, fieldId) => {
    const itemData = data[itemId];
    const fieldDef = ALL_ITEMS.find(it => it.id === itemId).fields.find(f => f.id === fieldId);
    
    // Verificar si ya hay contenido
    if (itemData && itemData[fieldId] !== undefined && itemData[fieldId] !== null) {
      const v = itemData[fieldId];
      let hasContent = false;
      
      if (typeof v === "string" && v.trim().length > 0) hasContent = true;
      else if (Array.isArray(v) && v.length > 0) {
        if (fieldDef.type === "table") hasContent = v.some(row => Object.values(row).some(c => String(c || "").trim().length > 0));
        else hasContent = true;
      } else if (fieldDef.type === "fixedChecklist" && typeof v === "object") {
        hasContent = Object.values(v).some(Boolean);
      }
      
      if (hasContent) {
        const confirmed = window.confirm("Ya tienes información guardada en este campo. Si continúas, se borrará y será reemplazada por el contenido generado por la IA. ¿Deseas continuar?");
        if (!confirmed) return;
      }
    }

    if (!projectName) {
      alert("Por favor, ingresa un nombre para el proyecto primero.");
      return;
    }
    
    // Obtener contexto de TODO el proyecto hasta el momento
    const context = buildMarkdown(projectName, data);

    const fieldKey = `${itemId}_${fieldId}`;
    setGeneratingFields(prev => ({ ...prev, [fieldKey]: true }));

    try {
      const fieldDef = ALL_ITEMS.find(it => it.id === itemId).fields.find(f => f.id === fieldId);
      let prompt = `Genera contenido para el campo "${fieldDef.label}". `;
      
      if (fieldDef.type === 'table') {
        const cols = fieldDef.columns.map(c => `"${c.key}": "valor"`).join(', ');
        prompt += `Devuelve EXCLUSIVAMENTE un arreglo JSON válido de objetos con esta estructura exacta: [{${cols}}]. Genera todas las filas que consideres necesarias según el contexto previo del proyecto (roles, requerimientos, etc). No incluyas markdown (ni \`\`\`json), solo el arreglo puro.\n\n`;
        
        fieldDef.columns.forEach(c => {
          if (c.type === 'select' && c.options) {
            prompt += `Para la columna "${c.key}", DEBES elegir EXACTAMENTE uno de estos valores (sin variaciones ni inventar nada): [${c.options.join(', ')}].\n`;
          }
          if (c.type === 'req-select') {
            const rf = (data['req-funcionales']?.funcionales || []).map(r => r.id).filter(Boolean);
            const rnf = (data['req-no-funcionales']?.noFuncionales || []).map(r => r.id).filter(Boolean);
            const todos = [...rf, ...rnf];
            if (todos.length > 0) {
              prompt += `Para la columna "${c.key}", DEBES elegir EXACTAMENTE uno de estos IDs de requerimientos existentes: [${todos.join(', ')}]. No inventes IDs nuevos.\n`;
            } else {
              prompt += `Para la columna "${c.key}", deja el valor vacío ("") ya que no hay requerimientos creados aún.\n`;
            }
          }
          if (c.type === 'user-select') {
            const projectUsers = systemUsers.filter(u => collaborators.includes(u.id));
            if (projectUsers.length > 0) {
              const getDisplayName = (u) => {
                  if (u.name) return u.name;
                  if (u.email) {
                    let part = u.email.split('@')[0].replace(/[0-9]/g, '');
                    if (part.length === 0) part = u.email.split('@')[0];
                    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                  }
                  return "Desconocido";
              };
              const names = projectUsers.map(getDisplayName).join(', ');
              prompt += `Para la columna "${c.key}", DEBES asignar la tarea EXCLUSIVAMENTE a uno de estos nombres exactos (es OBLIGATORIO): [${names}]. NO uses correos electrónicos ni inventes otras personas.\n`;
            } else {
              prompt += `Para la columna "${c.key}", asigna la tarea a "Sin Asignar".\n`;
            }
          }
        });
        
      } else if (fieldDef.type === 'checklist') {
        prompt += `Devuelve EXCLUSIVAMENTE un arreglo JSON válido de strings con las tareas/criterios. Ejemplo: ["Criterio 1", "Criterio 2"]. No incluyas markdown ni comillas triples, solo el arreglo puro.`;
      } else if (fieldDef.type === 'list') {
        prompt += `Devuelve los elementos separados por salto de línea sin viñetas. Sé conciso y directo, sin saludos ni introducciones.`;
      } else {
        prompt += `Sé conciso y directo, sin saludos ni introducciones. Escribe en formato texto/markdown simple.`;
      }
      
      const result = await generateAIContent(prompt, context);
      let text = result.text.trim();
      
      // Limpieza preventiva si Gemini devuelve markdown a pesar de la instrucción
      if (text.startsWith('```json')) text = text.replace(/^```json/, '').replace(/```$/, '').trim();
      if (text.startsWith('```')) text = text.replace(/^```/, '').replace(/```$/, '').trim();
      
      if (fieldDef.type === 'table') {
        try {
          const newRows = JSON.parse(text);
          updateField(itemId, fieldId, newRows);
        } catch (e) {
          console.error("Error parseando JSON de tabla:", text);
          alert("La IA no generó el formato esperado para la tabla. Inténtalo de nuevo.");
        }
      } else if (fieldDef.type === 'checklist') {
        try {
          const items = JSON.parse(text);
          const newChecklist = items.map(t => ({ text: t, done: false }));
          updateField(itemId, fieldId, newChecklist);
        } catch (e) {
          console.error("Error parseando JSON de checklist:", text);
          alert("La IA no generó el formato esperado. Inténtalo de nuevo.");
        }
      } else if (fieldDef.type === 'list') {
        const newItems = text.split('\n').map(l => l.replace(/^[-*•]\s*/, '').trim()).filter(Boolean);
        updateField(itemId, fieldId, newItems);
      } else {
        updateField(itemId, fieldId, text);
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al generar el contenido con IA.");
    } finally {
      setGeneratingFields(prev => ({ ...prev, [fieldKey]: false }));
    }
  };

  const updateField = useCallback((itemId, fieldId, value) => {
    setData((prev) => ({ ...prev, [itemId]: { ...(prev[itemId] || {}), [fieldId]: value } }));
  }, []);

  const togglePhase = (phaseId) => setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));

  const resetAll = async () => {
    if (!window.confirm("Esto borrará todo lo que has llenado. ¿Seguro que quieres reiniciar?")) return;
    setProjectName("");
    setData({});
    try { await updateProject(id, "", {}); } catch (e) {}
  };

  if (!loaded) return <div className="h-screen flex items-center justify-center">Cargando...</div>;

  const currentItem = ALL_ITEMS.find((it) => it.id === currentItemId);
  const currentPhase = PHASES.find((p) => p.id === currentItem.phaseId);
  const globalIndex = ALL_ITEMS.findIndex((it) => it.id === currentItemId) + 1;
  const phaseIndex = PHASES.findIndex((p) => p.id === currentPhase.id) + 1;
  const answeredCount = ALL_ITEMS.filter((it) => itemHasContent(data[it.id], it)).length;
  const progressPct = Math.round((answeredCount / TOTAL_ITEMS) * 100);

  const totalTasks = data.execution?.tasks ? Object.keys(data.execution.tasks).length : 0;
  const completedTasks = data.execution?.columns?.done?.taskIds?.length || 0;
  const executionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const goToItem = (id) => { setCurrentItemId(id); setFullView(false); };
  const goNext = () => {
    const idx = ALL_ITEMS.findIndex((it) => it.id === currentItemId);
    if (idx < ALL_ITEMS.length - 1) setCurrentItemId(ALL_ITEMS[idx + 1].id);
  };
  const goPrev = () => {
    const idx = ALL_ITEMS.findIndex((it) => it.id === currentItemId);
    if (idx > 0) setCurrentItemId(ALL_ITEMS[idx - 1].id);
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans">
      
      {/* BARRA SUPERIOR (Tema Claro) */}
      <div className="no-print shrink-0 border-b border-slate-200 bg-white px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-4 shadow-sm">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-500 p-2 -ml-2 rounded-lg hover:bg-slate-100 flex items-center justify-center min-h-[44px]">
          <Menu size={20} />
        </button>
        <Link to="/" className="flex text-slate-400 hover:text-slate-600 transition-colors mr-2 min-h-[44px] items-center">
          <ArrowLeft size={18} />
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-cyan-600 shrink-0">
          <Layers size={18} />
          <span className="font-mono text-xs uppercase tracking-widest font-semibold hidden lg:inline">Planificador</span>
        </div>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Nombre del proyecto"
          className="flex-1 min-w-[120px] max-w-[300px] bg-transparent border-b border-transparent focus:border-cyan-500 text-slate-800 text-sm md:text-base font-medium px-1 py-1 focus:outline-none placeholder:text-slate-400 min-h-[44px]"
        />
        <div className="flex flex-col gap-1 md:gap-1.5 ml-auto shrink-0 border-r border-slate-100 pr-3 md:pr-4">
          <div className="text-[9px] font-mono uppercase tracking-widest text-cyan-600 font-semibold hidden md:block">Planificación</div>
          <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-mono text-slate-500">
            <div className="w-16 md:w-24 lg:w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="hidden sm:inline">{answeredCount}/{TOTAL_ITEMS}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-1.5 shrink-0">
          <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 font-semibold hidden md:block">Ejecución</div>
          <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-mono text-slate-500">
            <div className="w-16 md:w-24 lg:w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${executionPct}%` }} />
            </div>
            <span className="hidden sm:inline">{completedTasks}/{totalTasks}</span>
          </div>
        </div>

        <span className="hidden sm:flex items-center shrink-0 ml-auto md:ml-4" title={saveStatus === "saving" ? "Guardando..." : saveStatus === "error" ? "Error al guardar" : "Guardado"}>
          <Save size={22} className={saveStatus === "saving" ? "animate-pulse text-amber-500" : saveStatus === "error" ? "text-red-500" : "text-emerald-500"} />
        </span>
        <div className="flex items-center gap-1.5 ml-auto sm:ml-4 shrink-0">
          {activeTab === 'planificacion' && (
            <>
              <button
                onClick={() => setFullView((v) => !v)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 min-h-[44px] text-xs font-mono uppercase tracking-wide text-slate-600 hover:bg-slate-50 shadow-sm"
              >
                <FileText size={16} /> <span className="hidden md:inline">{fullView ? "Volver" : "Ver"}</span>
              </button>
              <button
                onClick={() => downloadMarkdown(projectName, data)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cyan-600 px-3 min-h-[44px] text-xs font-mono uppercase tracking-wide text-white hover:bg-cyan-700 shadow-sm"
              >
                <Download size={16} /> <span className="hidden md:inline">Descargar .MD</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="bg-white border-b border-slate-200 px-6 flex gap-8">
        <button 
          onClick={() => setActiveTab("planificacion")}
          className={`flex items-center gap-2 py-3 border-b-2 transition-colors font-semibold text-sm ${activeTab === "planificacion" ? "border-cyan-600 text-cyan-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <LayoutList size={18} /> Planificación
        </button>
        <button 
          onClick={() => setActiveTab("kanban")}
          className={`flex items-center gap-2 py-3 border-b-2 transition-colors font-semibold text-sm ${activeTab === "kanban" ? "border-cyan-600 text-cyan-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <Layout size={18} /> Ejecución
        </button>
        <button 
          onClick={() => setActiveTab("guias")}
          className={`flex items-center gap-2 py-3 border-b-2 transition-colors font-semibold text-sm ${activeTab === "guias" ? "border-cyan-600 text-cyan-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          <BookOpen size={18} /> Guías de Proyecto
        </button>
      </div>

      {/* CUERPO */}
      <div className="flex-1 flex min-h-0 print-area relative">
        {activeTab === "planificacion" && sidebarOpen && (
          <div className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        )}

        {activeTab === "planificacion" && !fullView && (
          <div className={`no-print w-72 md:w-80 shrink-0 border-r border-slate-200 bg-white overflow-y-auto fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex md:hidden items-center justify-between p-4 border-b border-slate-100 sticky top-0 bg-white z-10 shadow-sm">
              <span className="font-mono text-sm uppercase tracking-widest font-semibold text-cyan-700 flex items-center gap-2">
                <Layers size={18}/> Fases del Proyecto
              </span>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-500 p-2 -mr-2 rounded-lg hover:bg-slate-100 flex items-center justify-center min-h-[44px]">
                <X size={20} />
              </button>
            </div>
            <div className="p-2">
              <button
                onClick={resetAll}
                className="w-full flex items-center gap-2 px-3 py-3 text-left hover:bg-slate-50 text-red-600 transition-colors border-b border-slate-100 md:hidden rounded-lg mb-2 min-h-[44px]"
              >
                <RotateCcw size={16} />
                <span className="text-sm font-medium">Reiniciar Proyecto</span>
              </button>

              {PHASES.map((phase, pIdx) => {
                const phaseAnswered = phase.items.filter((it) => itemHasContent(data[it.id], it)).length;
                return (
                  <div key={phase.id} className="border-b border-slate-100 last:border-0">
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className="w-full flex items-center gap-3 px-3 py-4 text-left hover:bg-slate-50 transition-colors rounded-lg min-h-[44px]"
                    >
                      {expandedPhases[phase.id] ? <ChevronDown size={16} className="text-slate-400 shrink-0" /> : <ChevronRight size={16} className="text-slate-400 shrink-0" />}
                      <span className="font-mono text-[11px] text-slate-400 shrink-0">{String(pIdx + 1).padStart(2, "0")}</span>
                      <span className="text-sm md:text-xs font-semibold text-slate-700 flex-1 leading-tight">{phase.name}</span>
                      <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 shrink-0">{phaseAnswered}/{phase.items.length}</span>
                    </button>
                    {expandedPhases[phase.id] && (
                      <div className="pb-3 px-1">
                        {phase.items.map((item) => {
                          const has = itemHasContent(data[item.id], item);
                          const active = item.id === currentItemId;
                          return (
                            <button
                              key={item.id}
                              onClick={() => { goToItem(item.id); setSidebarOpen(false); }}
                              className={`w-full flex items-center gap-3 pl-8 pr-3 py-3 md:py-2 text-left text-sm md:text-xs border-l-2 transition-all rounded-r-lg min-h-[44px] ${
                                active ? "border-cyan-500 bg-cyan-50/80 text-cyan-800 font-medium shadow-sm" : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                              }`}
                            >
                              {has ? <Check size={14} className="text-emerald-500 shrink-0" /> : <Circle size={14} className="text-slate-300 shrink-0" />}
                              <span className="leading-tight">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto paper-grid bg-slate-50 print:bg-white w-full">
          {fullView ? (
            <div className="print-content bg-white">
              <FullDocumentView projectName={projectName} data={data} />
              <DiagramsView data={data} />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 w-full pb-24">
              <div className="mb-6">
                <div className="font-mono text-[10px] md:text-[11px] text-cyan-700 tracking-widest mb-1 leading-relaxed">
                  HOJA {String(globalIndex).padStart(2, "0")} / {TOTAL_ITEMS} <br className="md:hidden" /><span className="hidden md:inline">—</span> FASE {phaseIndex} · {currentPhase.name.toUpperCase()}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{currentItem.name}</h1>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm">
                {currentItem.fields.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    value={(data[currentItem.id] || {})[field.id] ?? defaultValueFor(field)}
                    onChange={(val) => updateField(currentItem.id, field.id, val)}
                    onGenerate={["textarea", "list", "table", "checklist"].includes(field.type) ? () => handleGenerateAI(currentItem.id, field.id) : undefined}
                    isGenerating={generatingFields[`${currentItem.id}_${field.id}`]}
                    data={data}
                    systemUsers={systemUsers}
                    collaborators={collaborators}
                  />
                ))}
              </div>

              <div className="fixed bottom-0 left-0 right-0 md:relative md:mt-8 p-4 md:p-0 bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t border-slate-200 md:border-none flex items-center justify-between no-print z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-none">
                <button
                  onClick={goPrev}
                  disabled={globalIndex === 1}
                  className="text-xs font-mono uppercase tracking-wide text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2.5 min-h-[44px] border border-slate-200 rounded-lg bg-white hover:bg-slate-50 shadow-sm font-medium w-[48%] md:w-auto flex items-center justify-center gap-2"
                >
                  ← Anterior
                </button>
                <button
                  onClick={goNext}
                  disabled={globalIndex === TOTAL_ITEMS}
                  className="text-xs font-mono uppercase tracking-wide text-white hover:bg-cyan-700 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2.5 min-h-[44px] border border-transparent rounded-lg bg-cyan-600 shadow-sm font-medium w-[48%] md:w-auto flex items-center justify-center gap-2"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
        
        {activeTab === "kanban" && (
          <div className="absolute inset-0 bg-white z-20 flex-1 w-full h-full overflow-hidden">
            <KanbanBoard 
              data={data} 
              updateData={setData} 
              collaborators={collaborators}
              systemUsers={systemUsers}
            />
          </div>
        )}

        {activeTab === "guias" && (
          <div className="absolute inset-0 bg-white z-20 flex-1 w-full h-full overflow-hidden">
            <ProjectGuides data={data} projectName={projectName} updateData={setData} />
          </div>
        )}
      </div>
    </div>
  );
}
