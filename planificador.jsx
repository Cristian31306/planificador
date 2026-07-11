import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronDown, ChevronRight, Check, Circle, Plus, Trash2, Download,
  Printer, RotateCcw, FileText, Save, ListChecks, Layers
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* ESQUEMA DE FASES                                                    */
/* ------------------------------------------------------------------ */

const PHASES = [
  {
    id: "f1",
    name: "Descubrimiento y definición del problema",
    items: [
      {
        id: "vision",
        name: "Documento de visión / Project Charter",
        fields: [
          { id: "problema", type: "textarea", label: "¿Qué problema resuelve el software?" },
          { id: "paraQuien", type: "textarea", label: "¿Para quién es? (usuarios objetivo)" },
          { id: "valor", type: "textarea", label: "¿Qué valor aporta o qué lo diferencia de alternativas existentes?" },
          { id: "objetivos", type: "list", label: "Objetivos medibles", placeholder: "Ej: reducir tiempo de facturación en 50%" },
        ],
      },
      {
        id: "stakeholders",
        name: "Análisis de stakeholders",
        fields: [
          {
            id: "tabla", type: "table", label: "Stakeholders",
            columns: [
              { key: "nombre", label: "Nombre / rol", type: "text" },
              { key: "interes", label: "Interés en el proyecto", type: "text" },
              { key: "tipo", label: "Tipo", type: "select", options: ["Solicita", "Usa", "Mantiene", "Otro"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "f2",
    name: "Levantamiento de requerimientos",
    items: [
      {
        id: "req-funcionales",
        name: "Requerimientos funcionales",
        fields: [
          {
            id: "funcionales", type: "table", label: "Requerimientos funcionales",
            columns: [
              { key: "id", label: "ID", type: "text" },
              { key: "descripcion", label: "El sistema debe permitir que...", type: "text" },
              { key: "prioridad", label: "Prioridad", type: "select", options: ["Alta", "Media", "Baja"] },
            ],
          },
          {
            id: "historias", type: "table", label: "Historias de usuario",
            columns: [
              { key: "como", label: "Como (rol)", type: "text" },
              { key: "quiero", label: "Quiero (acción)", type: "text" },
              { key: "para", label: "Para (beneficio)", type: "text" },
            ],
          },
        ],
      },
      {
        id: "req-no-funcionales",
        name: "Requerimientos no funcionales",
        fields: [
          {
            id: "noFuncionales", type: "table", label: "Requerimientos no funcionales",
            columns: [
              { key: "categoria", label: "Categoría", type: "select", options: ["Rendimiento", "Seguridad", "Escalabilidad", "Disponibilidad", "Compatibilidad", "Otro"] },
              { key: "descripcion", label: "Descripción", type: "text" },
            ],
          },
        ],
      },
      {
        id: "reglas-negocio",
        name: "Reglas de negocio",
        fields: [
          { id: "reglas", type: "list", label: "Reglas de negocio", placeholder: "Ej: un pedido no puede facturarse si el stock es 0" },
        ],
      },
    ],
  },
  {
    id: "f3",
    name: "Análisis y especificación",
    items: [
      {
        id: "trazabilidad",
        name: "Matriz de trazabilidad de requerimientos",
        fields: [
          {
            id: "matriz", type: "table", label: "Trazabilidad",
            columns: [
              { key: "requerimiento", label: "Requerimiento", type: "text" },
              { key: "origen", label: "Origen (quién lo pidió)", type: "text" },
              { key: "prioridad", label: "Prioridad", type: "select", options: ["Alta", "Media", "Baja"] },
              { key: "estado", label: "Estado", type: "select", options: ["Pendiente", "En análisis", "Aprobado"] },
            ],
          },
        ],
      },
      {
        id: "moscow",
        name: "Priorización (MoSCoW)",
        fields: [
          {
            id: "moscow", type: "table", label: "Priorización",
            columns: [
              { key: "item", label: "Ítem / funcionalidad", type: "text" },
              { key: "categoria", label: "Categoría", type: "select", options: ["Must have", "Should have", "Could have", "Won't have"] },
            ],
          },
        ],
      },
      {
        id: "flujo-procesos",
        name: "Diagrama de flujo de procesos",
        fields: [
          { id: "descripcion", type: "textarea", label: "Describe el flujo principal paso a paso (cómo se mueve la información o el usuario en el sistema)" },
        ],
      },
    ],
  },
  {
    id: "f4",
    name: "Diseño",
    items: [
      {
        id: "wireframes",
        name: "Wireframes / Mockups",
        fields: [
          { id: "pantallas", type: "list", label: "Listado de pantallas necesarias" },
          { id: "notas", type: "textarea", label: "Notas de diseño / enlace a Figma u otra herramienta" },
        ],
      },
      {
        id: "modelo-datos",
        name: "Modelo de datos",
        fields: [
          {
            id: "campos", type: "table", label: "Diccionario de datos",
            columns: [
              { key: "tabla", label: "Tabla", type: "text" },
              { key: "campo", label: "Campo", type: "text" },
              { key: "tipoDato", label: "Tipo de dato", type: "text" },
              { key: "obligatorio", label: "Obligatorio", type: "select", options: ["Sí", "No"] },
              { key: "relacion", label: "Relación", type: "text" },
            ],
          },
        ],
      },
      {
        id: "arquitectura",
        name: "Arquitectura del sistema",
        fields: [
          { id: "stack", type: "textarea", label: "Stack tecnológico elegido y justificación (lenguaje, framework, base de datos, hosting)" },
          { id: "componentes", type: "list", label: "Componentes / capas del sistema" },
        ],
      },
      {
        id: "api",
        name: "Diseño de API",
        fields: [
          {
            id: "endpoints", type: "table", label: "Contrato de endpoints",
            columns: [
              { key: "metodo", label: "Método", type: "select", options: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
              { key: "ruta", label: "Ruta", type: "text" },
              { key: "parametros", label: "Parámetros", type: "text" },
              { key: "respuesta", label: "Respuesta esperada", type: "text" },
              { key: "errores", label: "Códigos de error", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "f5",
    name: "Planeación del proyecto",
    items: [
      {
        id: "cronograma",
        name: "Cronograma / Plan de trabajo",
        fields: [
          {
            id: "tareas", type: "table", label: "Tareas",
            columns: [
              { key: "tarea", label: "Tarea", type: "text" },
              { key: "responsable", label: "Responsable", type: "text" },
              { key: "estimacion", label: "Estimación", type: "text" },
              { key: "estado", label: "Estado", type: "select", options: ["Pendiente", "En progreso", "Terminado"] },
            ],
          },
        ],
      },
      {
        id: "riesgos",
        name: "Plan de gestión de riesgos",
        fields: [
          {
            id: "riesgos", type: "table", label: "Riesgos",
            columns: [
              { key: "riesgo", label: "Riesgo", type: "text" },
              { key: "probabilidad", label: "Probabilidad", type: "select", options: ["Alta", "Media", "Baja"] },
              { key: "impacto", label: "Impacto", type: "select", options: ["Alto", "Medio", "Bajo"] },
              { key: "mitigacion", label: "Plan de mitigación", type: "text" },
            ],
          },
        ],
      },
      {
        id: "definition-of-done",
        name: "Definición de \"Hecho\"",
        fields: [
          { id: "criterios", type: "checklist", label: "Criterios para considerar una funcionalidad terminada" },
        ],
      },
    ],
  },
  {
    id: "f6",
    name: "Preparación técnica del entorno",
    items: [
      {
        id: "repositorio",
        name: "Configuración de repositorio",
        fields: [
          { id: "notas", type: "textarea", label: "Estrategia de ramas, convenciones de commits, etc." },
        ],
      },
      {
        id: "estandares",
        name: "Estándares de código",
        fields: [
          { id: "notas", type: "textarea", label: "Guía de estilo, convenciones de nombres, estructura de carpetas" },
        ],
      },
      {
        id: "plan-pruebas",
        name: "Plan de pruebas",
        fields: [
          {
            id: "pruebas", type: "table", label: "Plan de pruebas",
            columns: [
              { key: "tipo", label: "Tipo de prueba", type: "select", options: ["Unitaria", "Integración", "Aceptación", "Otra"] },
              { key: "quePrueba", label: "Qué se prueba", type: "text" },
              { key: "criterio", label: "Criterio de aceptación", type: "text" },
            ],
          },
        ],
      },
      {
        id: "entornos",
        name: "Configuración de entornos",
        fields: [
          {
            id: "entornos", type: "table", label: "Entornos",
            columns: [
              { key: "entorno", label: "Entorno", type: "select", options: ["Desarrollo", "Pruebas / Staging", "Producción"] },
              { key: "config", label: "URL / configuración", type: "text" },
              { key: "notas", label: "Notas", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "f7",
    name: "Validación final",
    items: [
      {
        id: "checklist-final",
        name: "Checklist final antes de programar",
        fields: [
          {
            id: "checklist", type: "fixedChecklist", label: "Checklist final",
            items: [
              "Documento de requerimientos funcionales y no funcionales aprobado",
              "Historias de usuario o casos de uso priorizados",
              "Wireframes de pantallas principales",
              "Modelo de datos (DER) definido",
              "Arquitectura y stack tecnológico decididos y justificados",
              "Backlog o cronograma con tareas desglosadas",
              "Repositorio configurado con convenciones claras",
              "Definición de \"Hecho\" acordada",
              "Entornos de desarrollo listos",
            ],
          },
        ],
      },
    ],
  },
];

const ALL_ITEMS = PHASES.flatMap((p) => p.items.map((it) => ({ ...it, phaseId: p.id, phaseName: p.name })));
const TOTAL_ITEMS = ALL_ITEMS.length;

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */

function defaultValueFor(field) {
  if (field.type === "table" || field.type === "list" || field.type === "checklist") return [];
  if (field.type === "fixedChecklist") return {};
  return "";
}

function emptyRow(columns) {
  const row = {};
  columns.forEach((c) => (row[c.key] = ""));
  return row;
}

function itemHasContent(itemData, item) {
  if (!itemData) return false;
  return item.fields.some((f) => {
    const v = itemData[f.id];
    if (v === undefined || v === null) return false;
    if (typeof v === "string") return v.trim().length > 0;
    if (Array.isArray(v)) {
      if (f.type === "table") return v.some((row) => Object.values(row).some((c) => String(c || "").trim().length > 0));
      if (f.type === "checklist") return v.length > 0;
      return v.some((s) => String(s || "").trim().length > 0);
    }
    if (f.type === "fixedChecklist") return Object.values(v).some(Boolean);
    return false;
  });
}

/* ------------------------------------------------------------------ */
/* SUBCOMPONENTES DE CAMPO                                             */
/* ------------------------------------------------------------------ */

function FieldLabel({ children }) {
  return (
    <label className="block font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-2">
      {children}
    </label>
  );
}

function TextAreaField({ field, value, onChange }) {
  return (
    <div className="mb-6">
      <FieldLabel>{field.label}</FieldLabel>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Escribe aquí..."
        className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 placeholder:text-slate-400"
      />
    </div>
  );
}

function ListField({ field, value, onChange }) {
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
      <FieldLabel>{field.label}</FieldLabel>
      <div className="space-y-2">
        {items.map((v, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 w-5">{String(idx + 1).padStart(2, "0")}</span>
            <input
              value={v}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={field.placeholder || ""}
              className="flex-1 rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 placeholder:text-slate-400"
            />
            <button onClick={() => remove(idx)} className="text-slate-400 hover:text-red-600 p-1" aria-label="Eliminar">
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

function ChecklistField({ field, value, onChange }) {
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
      <FieldLabel>{field.label}</FieldLabel>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <button
              onClick={() => toggle(idx)}
              className={`shrink-0 w-5 h-5 rounded-sm border flex items-center justify-center ${
                it.done ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-400 text-transparent"
              }`}
              aria-label="Marcar"
            >
              <Check size={13} />
            </button>
            <input
              value={it.text}
              onChange={(e) => update(idx, e.target.value)}
              placeholder="Criterio..."
              className={`flex-1 rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 placeholder:text-slate-400 ${
                it.done ? "line-through text-slate-400" : "text-slate-800"
              }`}
            />
            <button onClick={() => remove(idx)} className="text-slate-400 hover:text-red-600 p-1" aria-label="Eliminar">
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

function FixedChecklistField({ field, value, onChange }) {
  const state = value || {};
  const toggle = (idx) => onChange({ ...state, [idx]: !state[idx] });
  const doneCount = field.items.filter((_, i) => state[i]).length;
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <FieldLabel>{field.label}</FieldLabel>
        <span className="font-mono text-[11px] text-slate-500">{doneCount}/{field.items.length}</span>
      </div>
      <div className="space-y-2 rounded-sm border border-slate-300 bg-white p-3">
        {field.items.map((label, idx) => (
          <label key={idx} className="flex items-start gap-2.5 cursor-pointer select-none">
            <button
              onClick={() => toggle(idx)}
              className={`shrink-0 mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center ${
                state[idx] ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-400 text-transparent"
              }`}
              aria-label="Marcar"
            >
              <Check size={13} />
            </button>
            <span className={`text-sm ${state[idx] ? "text-slate-400 line-through" : "text-slate-800"}`}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function TableField({ field, value, onChange }) {
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
      <FieldLabel>{field.label}</FieldLabel>
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
                        className="w-full min-w-[110px] rounded-sm border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      >
                        <option value="">—</option>
                        {c.options.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={row[c.key] || ""}
                        onChange={(e) => updateCell(rIdx, c.key, e.target.value)}
                        className="w-full min-w-[140px] rounded-sm border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                      />
                    )}
                  </td>
                ))}
                <td className="px-1 text-center">
                  <button onClick={() => removeRow(rIdx)} className="text-slate-400 hover:text-red-600 p-1" aria-label="Eliminar fila">
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

function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case "textarea": return <TextAreaField field={field} value={value} onChange={onChange} />;
    case "list": return <ListField field={field} value={value} onChange={onChange} />;
    case "checklist": return <ChecklistField field={field} value={value} onChange={onChange} />;
    case "fixedChecklist": return <FixedChecklistField field={field} value={value} onChange={onChange} />;
    case "table": return <TableField field={field} value={value} onChange={onChange} />;
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
  const date = new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
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
/* VISTA DE DOCUMENTO COMPLETO (para imprimir / revisar)               */
/* ------------------------------------------------------------------ */

function FullDocumentView({ projectName, data }) {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6 print:px-0">
      <h1 className="font-mono text-2xl font-semibold text-slate-900 mb-1">{projectName || "Proyecto sin nombre"}</h1>
      <p className="text-sm text-slate-500 mb-8">Documento de planificación · {new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}</p>
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
                      <p className="text-slate-700 whitespace-pre-wrap">{itemData[field.id] || "—"}</p>
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
/* APP PRINCIPAL                                                       */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "planificador:proyecto";

export default function App() {
  const [projectName, setProjectName] = useState("");
  const [data, setData] = useState({});
  const [expandedPhases, setExpandedPhases] = useState(() => Object.fromEntries(PHASES.map((p) => [p.id, true])));
  const [currentItemId, setCurrentItemId] = useState(ALL_ITEMS[0].id);
  const [loaded, setLoaded] = useState(false);
  const [fullView, setFullView] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved
  const saveTimer = useRef(null);

  // cargar datos guardados
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setProjectName(parsed.projectName || "");
          setData(parsed.data || {});
        }
      } catch (e) {
        // no hay datos guardados todavía
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // autoguardado con debounce
  useEffect(() => {
    if (!loaded) return;
    setSaveStatus("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify({ projectName, data }), false);
        setSaveStatus("saved");
      } catch (e) {
        setSaveStatus("idle");
      }
    }, 700);
    return () => clearTimeout(saveTimer.current);
  }, [projectName, data, loaded]);

  const updateField = useCallback((itemId, fieldId, value) => {
    setData((prev) => ({ ...prev, [itemId]: { ...(prev[itemId] || {}), [fieldId]: value } }));
  }, []);

  const togglePhase = (phaseId) => setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));

  const resetAll = async () => {
    if (!window.confirm("Esto borrará todo lo que has llenado. ¿Seguro que quieres reiniciar?")) return;
    setProjectName("");
    setData({});
    try { await window.storage.set(STORAGE_KEY, JSON.stringify({ projectName: "", data: {} }), false); } catch (e) {}
  };

  const currentItem = ALL_ITEMS.find((it) => it.id === currentItemId);
  const currentPhase = PHASES.find((p) => p.id === currentItem.phaseId);
  const currentItemIndexInPhase = currentPhase.items.findIndex((it) => it.id === currentItem.id);
  const globalIndex = ALL_ITEMS.findIndex((it) => it.id === currentItemId) + 1;
  const phaseIndex = PHASES.findIndex((p) => p.id === currentPhase.id) + 1;

  const answeredCount = ALL_ITEMS.filter((it) => itemHasContent(data[it.id], it)).length;
  const progressPct = Math.round((answeredCount / TOTAL_ITEMS) * 100);

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
    <div className="h-full w-full bg-slate-950 flex flex-col font-sans" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .paper-grid {
          background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
          background-size: 22px 22px;
        }
        @media print {
          .no-print { display: none !important; }
          .print-area { display: block !important; height: auto !important; overflow: visible !important; }
        }
      `}</style>

      {/* BARRA SUPERIOR */}
      <div className="no-print shrink-0 border-b border-slate-800 bg-slate-900 px-4 py-3 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-cyan-400">
          <Layers size={18} />
          <span className="font-mono text-xs uppercase tracking-widest">Planificador</span>
        </div>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Nombre del proyecto"
          className="flex-1 min-w-[160px] bg-transparent border-b border-slate-700 focus:border-cyan-500 text-slate-100 text-sm font-medium px-1 py-1 focus:outline-none placeholder:text-slate-500"
        />
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <span>{answeredCount}/{TOTAL_ITEMS}</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
          <Save size={12} className={saveStatus === "saving" ? "animate-pulse text-amber-400" : "text-emerald-500"} />
          {saveStatus === "saving" ? "guardando..." : "guardado"}
        </span>
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setFullView((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wide text-slate-300 hover:bg-slate-800"
          >
            <FileText size={13} /> {fullView ? "Volver a editar" : "Ver documento"}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wide text-slate-300 hover:bg-slate-800"
          >
            <Printer size={13} /> Imprimir / PDF
          </button>
          <button
            onClick={() => downloadMarkdown(projectName, data)}
            className="inline-flex items-center gap-1.5 rounded-sm bg-cyan-600 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wide text-white hover:bg-cyan-500"
          >
            <Download size={13} /> Exportar .md
          </button>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 rounded-sm border border-slate-700 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wide text-slate-400 hover:bg-slate-800 hover:text-red-400"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* CUERPO */}
      <div className="flex-1 flex min-h-0 print-area">
        {!fullView && (
          <div className="no-print w-72 shrink-0 border-r border-slate-800 bg-slate-900 overflow-y-auto">
            {PHASES.map((phase, pIdx) => {
              const phaseAnswered = phase.items.filter((it) => itemHasContent(data[it.id], it)).length;
              return (
                <div key={phase.id} className="border-b border-slate-800">
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-slate-800/60"
                  >
                    {expandedPhases[phase.id] ? <ChevronDown size={14} className="text-slate-500 shrink-0" /> : <ChevronRight size={14} className="text-slate-500 shrink-0" />}
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">{String(pIdx + 1).padStart(2, "0")}</span>
                    <span className="text-xs font-medium text-slate-200 flex-1 leading-tight">{phase.name}</span>
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">{phaseAnswered}/{phase.items.length}</span>
                  </button>
                  {expandedPhases[phase.id] && (
                    <div className="pb-1">
                      {phase.items.map((item) => {
                        const has = itemHasContent(data[item.id], item);
                        const active = item.id === currentItemId;
                        return (
                          <button
                            key={item.id}
                            onClick={() => goToItem(item.id)}
                            className={`w-full flex items-center gap-2 pl-8 pr-3 py-2 text-left text-xs border-l-2 ${
                              active ? "border-cyan-500 bg-slate-800 text-cyan-300" : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                            }`}
                          >
                            {has ? <Check size={12} className="text-emerald-500 shrink-0" /> : <Circle size={12} className="text-slate-600 shrink-0" />}
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
        )}

        <div className="flex-1 overflow-y-auto paper-grid bg-slate-50 print:bg-white">
          {fullView ? (
            <FullDocumentView projectName={projectName} data={data} />
          ) : (
            <div className="max-w-2xl mx-auto px-6 py-8">
              <div className="mb-6">
                <div className="font-mono text-[11px] text-cyan-700 tracking-widest mb-1">
                  HOJA {String(globalIndex).padStart(2, "0")} / {TOTAL_ITEMS} — FASE {phaseIndex} · {currentPhase.name.toUpperCase()}
                </div>
                <h1 className="text-xl font-semibold text-slate-900">{currentItem.name}</h1>
              </div>

              <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm">
                {currentItem.fields.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    value={(data[currentItem.id] || {})[field.id] ?? defaultValueFor(field)}
                    onChange={(val) => updateField(currentItem.id, field.id, val)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 no-print">
                <button
                  onClick={goPrev}
                  disabled={globalIndex === 1}
                  className="text-xs font-mono uppercase tracking-wide text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Anterior
                </button>
                <button
                  onClick={goNext}
                  disabled={globalIndex === TOTAL_ITEMS}
                  className="text-xs font-mono uppercase tracking-wide text-cyan-700 hover:text-cyan-900 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
