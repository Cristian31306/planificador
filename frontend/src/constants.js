export const PHASES = [
  {
    id: "f1",
    name: "Descubrimiento y definición del problema",
    items: [
      {
        id: "vision",
        name: "Documento de visión / Project Charter",
        fields: [
          { id: "problema", type: "textarea", label: "¿Qué problema resuelve el software?", help: "Describe en detalle la necesidad o dolor que motiva la creación de este software. Ayudará a entender por qué existe." },
          { id: "paraQuien", type: "textarea", label: "¿Para quién es? (usuarios objetivo)", help: "Define quiénes serán los usuarios finales del sistema. Ejemplo: Médicos, pacientes, contadores, clientes casuales." },
          { id: "valor", type: "textarea", label: "¿Qué valor aporta o qué lo diferencia de alternativas existentes?", help: "La propuesta única de valor. ¿Por qué deberían usar este software y no uno de la competencia o Excel?" },
          { id: "objetivos", type: "list", label: "Objetivos medibles", placeholder: "Ej: reducir tiempo de facturación en 50%", help: "Lista objetivos concretos y cuantificables para saber si el proyecto tuvo éxito. Ej: Alcanzar 1000 usuarios, reducir el tiempo de respuesta en un 30%." },
        ],
      },
      {
        id: "stakeholders",
        name: "Análisis de stakeholders",
        fields: [
          {
            id: "tabla", type: "table", label: "Stakeholders", help: "Mapea a las personas interesadas o afectadas por el proyecto para saber a quién consultar o informar.",
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
            id: "funcionales", type: "table", label: "Requerimientos funcionales", help: "Lo que el sistema DEBE hacer. Ejemplo: El sistema debe permitir registrar usuarios con email y contraseña.",
            columns: [
              { key: "id", label: "ID", type: "auto-id", prefix: "RF-" },
              { key: "descripcion", label: "El sistema debe permitir que...", type: "text" },
              { key: "prioridad", label: "Prioridad", type: "select", options: ["Alta", "Media", "Baja"] },
            ],
          },
          {
            id: "historias", type: "table", label: "Historias de usuario", help: "Formato ágil de los requerimientos centrados en el usuario. Ej: Como cliente quiero ver mi historial para volver a comprar.",
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
            id: "noFuncionales", type: "table", label: "Requerimientos no funcionales", help: "Cómo debe comportarse el sistema (velocidad, seguridad, tecnologías, concurrencia).",
            columns: [
              { key: "id", label: "ID", type: "auto-id", prefix: "RNF-" },
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
          { id: "reglas", type: "list", label: "Reglas de negocio", placeholder: "Ej: un pedido no puede facturarse si el stock es 0", help: "Condiciones estrictas de la lógica de negocio que deben cumplirse siempre." },
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
            id: "matriz", type: "table", label: "Trazabilidad", help: "Sirve para relacionar de dónde viene cada requerimiento y si ya fue cubierto.",
            columns: [
              { key: "requerimiento", label: "Requerimiento", type: "req-select" },
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
            id: "moscow", type: "table", label: "Priorización", help: "Método para decidir qué hacer primero: Must (Debe), Should (Debería), Could (Podría), Won't (No se hará por ahora).",
            columns: [
              { key: "item", label: "Ítem / funcionalidad", type: "req-select" },
              { key: "categoria", label: "Categoría", type: "select", options: ["Must have", "Should have", "Could have", "Won't have"] },
            ],
          },
        ],
      },
      {
        id: "flujo-procesos",
        name: "Diagrama de flujo de procesos",
        fields: [
          { id: "descripcion", type: "textarea", label: "Describe el flujo principal paso a paso", help: "Por ejemplo: 1. El usuario entra, 2. Se registra, 3. Recibe un email, 4. Inicia sesión, 5. Sube una foto." },
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
          { id: "pantallas", type: "list", label: "Listado de pantallas necesarias", help: "Haz un inventario de las pantallas del sistema. Ej: Pantalla de Login, Dashboard, Perfil, Configuración." },
          { id: "notas", type: "textarea", label: "Notas de diseño / enlace a Figma u otra herramienta", help: "Pega aquí enlaces de inspiración, paleta de colores, o el enlace a tus prototipos de Figma." },
        ],
      },
      {
        id: "modelo-datos",
        name: "Modelo de datos",
        fields: [
          {
            id: "campos", type: "table", label: "Diccionario de datos", help: "Define la base de datos. Llena las tablas y relaciones y el sistema dibujará automáticamente el Diagrama Entidad-Relación.",
            columns: [
              { key: "tabla", label: "Tabla", type: "text" },
              { key: "campo", label: "Campo", type: "text" },
              { key: "tipoDato", label: "Tipo de dato", type: "select", options: ["Entero (Int)", "Entero Grande (BigInt)", "Texto (Varchar)", "Texto Largo (Text)", "Booleano", "Booleano (TinyInt)", "Fecha (Date)", "Fecha y Hora (DateTime/Timestamp)", "Decimal / Float", "JSON", "JSONB", "Array", "Enum", "UUID", "ObjectId (MongoDB)"] },
              { key: "obligatorio", label: "Obligatorio", type: "select", options: ["Sí", "No"] },
              { key: "relacion", label: "Relación (Hacia qué otra tabla)", type: "text" },
            ],
          },
        ],
      },
      {
        id: "arquitectura",
        name: "Arquitectura del sistema",
        fields: [
          { id: "stack", type: "textarea", label: "Stack tecnológico", help: "Ej: Frontend en React (Vite), Backend en Node.js, Base de datos PostgreSQL alojada en AWS." },
          { id: "componentes", type: "list", label: "Componentes / capas del sistema", help: "Ej: Base de datos, API REST, Aplicación Web, Aplicación Móvil." },
        ],
      },
      {
        id: "api",
        name: "Diseño de API",
        fields: [
          {
            id: "endpoints", type: "table", label: "Contrato de endpoints", help: "Define cómo se comunicará tu frontend con tu backend de manera técnica.",
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
            id: "tareas", type: "table", label: "Tareas", help: "Desglosa todo en pequeñas tareas. Llena esto para generar automáticamente el Diagrama de Gantt.",
            columns: [
              { key: "tarea", label: "Tarea", type: "text" },
              { key: "responsable", label: "Responsable", type: "user-select" },
              { key: "estimacion", label: "Estimación (días o horas)", type: "duration" },
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
            id: "riesgos", type: "table", label: "Riesgos", help: "Identifica qué podría salir mal y cómo solucionarlo antes de que pase (ej: desarrollador enfermo, servidor caído).",
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
          { id: "criterios", type: "checklist", label: "Criterios para considerar una funcionalidad terminada", help: "Ej: Código subido a GitHub, Pruebas unitarias pasan, Revisado por otro desarrollador, Desplegado en QA." },
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
          { id: "notas", type: "textarea", label: "Estrategia de ramas, convenciones de commits, etc.", help: "Ej: Usaremos GitFlow (main, develop, feature/x). Commits en inglés empezando por el verbo." },
        ],
      },
      {
        id: "estandares",
        name: "Estándares de código",
        fields: [
          { id: "notas", type: "textarea", label: "Guía de estilo, convenciones de nombres", help: "Ej: Usar camelCase para variables, PascalCase para Clases, Prettier configurado al guardar." },
        ],
      },
      {
        id: "plan-pruebas",
        name: "Plan de pruebas",
        fields: [
          {
            id: "pruebas", type: "table", label: "Plan de pruebas", help: "Escribe qué quieres que se pruebe rigurosamente. (Ej: probar login con contraseña incorrecta).",
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
            id: "entornos", type: "table", label: "Entornos", help: "Links de donde vivirán los sistemas en pruebas y en producción, para tenerlos a mano.",
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
            id: "checklist", type: "fixedChecklist", label: "Checklist final", help: "Asegúrate de marcar todo antes de tirar la primera línea de código para un proyecto profesional.",
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

export const ALL_ITEMS = PHASES.flatMap((p) => p.items.map((it) => ({ ...it, phaseId: p.id, phaseName: p.name })));
export const TOTAL_ITEMS = ALL_ITEMS.length;

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */

export function defaultValueFor(field) {
  if (field.type === "table" || field.type === "list" || field.type === "checklist") return [];
  if (field.type === "fixedChecklist") return {};
  return "";
}

export function emptyRow(columns) {
  const row = {};
  columns.forEach((c) => (row[c.key] = ""));
  return row;
}

export function itemHasContent(itemData, item) {
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
