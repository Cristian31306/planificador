# Ferapp

Documento de planificación generado el 10/07/2026, 04:34 p. m.

---

## Fase 1. Descubrimiento y definición del problema

### Documento de visión / Project Charter

**¿Qué problema resuelve el software?**

Las ferreterías manejan una operación bastante más compleja de lo que un punto de venta convencional está pensado para soportar, y eso genera fricción diaria tanto en el mostrador como en la administración del negocio. En concreto, el software busca resolver:

Falta de codificación estandarizada en gran parte del catálogo. A diferencia de un supermercado, donde casi todo trae código de barras de fábrica, en una ferretería buena parte del inventario —tornillería, pernos, tuercas, arandelas, repuestos de plomería sueltos, productos genéricos o importados sin marca, materiales cortados a la medida como cable, tubo o lámina— no viene con ningún código. Hoy eso obliga al cajero a "adivinar" el nombre exacto o a pedir ayuda a alguien más experimentado, lo que hace lentas las filas y da pie a errores de cobro. El sistema necesita permitir encontrar cualquier producto por nombre, sinónimo, categoría o descripción parcial, y asignar códigos internos propios cuando el proveedor no trae ninguno.

Un mismo producto se vende en distintas presentaciones y unidades de medida. El mismo artículo puede necesitar venderse por unidad suelta, por caja o paquete cerrado, por peso (kilos o libras, como puntillas o soldadura), por longitud (metros de cable, manguera o cadena) o por volumen (galones de pintura o thinner). Un POS genérico obliga a crear un producto distinto por cada presentación o a hacer conversiones a mano, lo que descuadra el inventario real y complica el precio según cómo se fraccione el producto.

Gestión diferenciada de cartera y crédito a clientes. Es habitual que ciertos clientes —contratistas, maestros de obra, constructoras, clientes de confianza— compren "fiado" y paguen después, mientras que otros pagan de contado en el momento. Hoy esto suele llevarse en cuadernos aparte o de memoria, con la consecuente pérdida de control sobre cuánto debe cada cliente, desde cuándo y cuál es el plazo acordado. El sistema necesita diferenciar el tipo de cliente, registrar las facturas pendientes por cobrar, permitir abonos parciales y dar alertas claras de mora.

Otros dolores relacionados que el software también busca cubrir:


Catálogos muy grandes y heterogéneos (miles de referencias entre eléctrico, plomería, construcción, pintura, herramientas, cerrajería, etc.), difíciles de organizar y mantener actualizados.
Precios diferenciados según el tipo de comprador (público general vs. maestro de obra o cliente mayorista).
Control de devoluciones y garantías de herramientas o productos dañados.
Varias formas de pago en una misma venta (efectivo, tarjeta, transferencia, billeteras digitales), incluyendo pagos mixtos (parte de contado, parte a cartera).
Falta de visibilidad en tiempo real para el dueño sobre ventas, cartera pendiente y stock disponible, cuando hoy esa información vive repartida entre cuadernos, memoria y hojas de Excel sueltas.


En resumen: el software existe porque las herramientas actuales —cuadernos, Excel o POS genéricos de retail— no fueron pensadas para la complejidad real de una ferretería, y ese desajuste se traduce en tiempo perdido en el mostrador, errores de cobro, cartera descontrolada e inventario que nunca cuadra del todo.

**¿Para quién es? (usuarios objetivo)**

Dueños o administradores de ferreterías (pequeñas y medianas): necesitan control del negocio completo —ventas, cartera, inventario— sin depender de ser expertos en tecnología.
Cajeros y vendedores de mostrador: usan el sistema todo el día; necesitan que sea rápido y simple incluso en las horas de más movimiento.
Encargados de bodega o inventario: gestionan entradas de mercancía, salidas, traslados entre bodegas y conteos físicos.
Personal contable o administrativo: necesita reportes financieros confiables, cartera al día y facturación electrónica correcta.
Clientes de la ferretería (contratistas, maestros de obra, constructoras, público en general): no usan el sistema directamente, pero se benefician de una atención más rápida, precios claros y, si tienen cuenta abierta, visibilidad de su propio saldo.
Si el software se piensa como producto a vender (no solo para un negocio propio): también cadenas de ferreterías con varios puntos de venta y ferreteros independientes que hoy trabajan con cuaderno o Excel y quieren dar el salto a un sistema real.

**¿Qué valor aporta o qué lo diferencia de alternativas existentes?**

Frente a Excel o cuadernos: automatiza el cobro, elimina el cálculo manual de vueltos y saldos, deja trazabilidad de cada venta y de cada cuenta por cobrar, y no depende de que una sola persona "sepa dónde quedó todo".
Frente a un POS genérico de retail o supermercado: esos sistemas asumen que todo tiene código de barras y una sola unidad de venta por producto. Este sistema nace pensando en que buena parte del catálogo no tiene código y en que un mismo producto puede venderse por unidad, caja, peso o metro sin duplicar referencias.
Frente a software contable general (el tipo que usan muchos negocios en Colombia para facturación y contabilidad): son fuertes en lo contable, pero no están pensados para la velocidad del mostrador ni para la lógica de búsqueda y presentaciones múltiples de una ferretería.


En una frase: es un POS que entiende cómo se vende realmente en una ferretería —sin código de barras completo, con presentaciones mixtas y con clientes que pagan distinto— en lugar de forzar ese negocio a encajar en la lógica de un sistema pensado para otro tipo de comercio.

**Objetivos medibles**

- Reducir el tiempo promedio de facturación por venta en al menos 30% frente al proceso actual (cuaderno o Excel).
- Lograr que al menos el 90% de las búsquedas de productos sin código se resuelvan en menos de 10 segundos.
- Reducir en 25% las diferencias entre inventario físico y el registrado en sistema, medido a los 3 meses de uso.
- Disminuir en al menos 40% el tiempo dedicado a conciliar cartera y cuentas por cobrar al cierre de mes.
- Alcanzar un número objetivo de ferreterías activas usando el sistema dentro de los primeros 6 a 12 meses de lanzamiento.
- Alcanzar un nivel alto de satisfacción (CSAT o NPS) tanto en dueños como en cajeros, medido con encuestas periódicas.

### Análisis de stakeholders

**Stakeholders**

| Nombre / rol | Interés en el proyecto | Tipo |
| --- | --- | --- |
| Dueño o gerente de la ferretería | Controlar ventas, cartera e inventario; decidir con datos reales | Solicita |
| Cajero o vendedor de mostrador | Herramienta rápida que no entorpezca la atención al cliente | Usa |
| Encargado de bodega / inventario | Control preciso de existencias, entradas, salidas y conteos | Usa |
| Contador / área administrativa | Cartera al día, reportes confiables, cumplimiento tributario | Usa |
| Cliente de la ferretería (contratista, maestro de obra, público) | Atención ágil, precios claros, visibilidad de su saldo si tiene cuenta abierta | Otro |
| Proveedores de la ferretería | Órdenes de compra claras, información de rotación de producto | Otro |
| Equipo de desarrollo / producto | Construir un sistema viable, escalable y mantenible | Mantiene |
| Inversionistas o socios del proyecto (si aplica) | Viabilidad y retorno del negocio de software | Otro |

## Fase 2. Levantamiento de requerimientos

### Requerimientos funcionales

**Requerimientos funcionales**

| ID | El sistema debe permitir que... | Prioridad |
| --- | --- | --- |
| FR001 | Permitir la gestión completa del catálogo de productos (creación, edición, eliminación, organización por categorías, marcas y atributos). | Alta |
| FR002 | Facilitar la asignación y gestión de códigos internos propios para productos que no traen código de barras de fábrica. | Alta |
| FR003 | Implementar un motor de búsqueda rápida de productos por nombre, sinónimo, descripción parcial o categoría para agilizar la identificación en el mostrador. | Alta |
| FR004 | Gestionar múltiples unidades de medida y presentaciones para un mismo producto (ej. unidad, caja, peso, longitud, volumen), con sus factores de conversión y precios asociados. | Alta |
| FR005 | Registrar ventas y generar facturas o tiquetes de venta de manera rápida y eficiente para el cajero o vendedor. | Media |
| FR006 | Soportar diversas formas de pago (efectivo, tarjeta, transferencia, billeteras digitales) y permitir pagos mixtos en una misma transacción. | Media |
| FR007 | Aplicar automáticamente precios diferenciados a los productos según el tipo de cliente (público general, contratista, mayorista). | Alta |
| FR008 | Gestionar el proceso de devoluciones y garantías de productos, incluyendo el ajuste de inventario y los saldos de clientes. | Media |
| FR010 | Registrar entradas de mercancía al inventario (compras a proveedores, ajustes positivos, traslados). | Media |
| FR011 | Registrar salidas de mercancía del inventario (ventas, ajustes negativos, mermas, traslados). | Media |
| FR012 | Mantener el stock de productos actualizado en tiempo real y generar alertas de bajo inventario. | Alta |
| FR013 | Permitir la realización de conteos físicos de inventario y ajustes para conciliar las existencias del sistema con las reales. | Media |
| FR014 | Gestionar un registro de clientes completo, incluyendo datos de contacto, tipo de cliente y su historial crediticio. | Baja |
| FR015 | Registrar y llevar un seguimiento detallado de las cuentas por cobrar generadas por ventas a crédito. | Alta |
| FR016 | Permitir el registro de abonos parciales a las cuentas por cobrar y su correcta aplicación a las facturas pendientes. | Alta |
| FR017 | Generar alertas automáticas de mora y reportes de cartera vencida a los administradores del negocio. | Media |
| FR018 | Ofrecer un panel de control (dashboard) con indicadores clave de ventas, cartera e inventario en tiempo real para los dueños o gerentes. | Media |
| FR019 | Generar reportes detallados de ventas (por producto, período, vendedor), inventario (existencias, rotación) y cartera (saldos pendientes, antigüedad de la deuda). | Media |
| FR020 | Implementar un sistema de gestión de usuarios y roles con niveles de permiso configurables para proteger la información y limitar accesos según el perfil del empleado. | Baja |

**Historias de usuario**

| Como (rol) | Quiero (acción) | Para (beneficio) |
| --- | --- | --- |
| Dueño o gerente de la ferretería | poder gestionar el catálogo de productos (crear, editar, eliminar, organizar por categorías, marcas y atributos) | mantener mi inventario organizado y mis productos correctamente clasificados |
| Encargado de bodega / inventario | poder asignar códigos internos propios a productos que no traen código de barras | que puedan ser identificados y vendidos fácilmente por los cajeros |
| Cajero o vendedor de mostrador | un motor de búsqueda rápida de productos por nombre, sinónimo, descripción parcial o categoría | encontrar cualquier artículo de forma eficiente y agilizar la venta |
| Dueño o gerente de la ferretería | que el sistema gestione múltiples unidades de medida y presentaciones para un mismo producto (ej. unidad, caja, peso, longitud, volumen) con sus factores de conversión y precios asociados | vender productos como cable por metro o clavos por kilo sin descuadres de inventario |
| Cajero o vendedor de mostrador | poder registrar ventas y generar facturas o tiquetes de venta de manera rápida y eficiente | atender a los clientes sin demoras y reducir el tiempo de facturación |
| Cajero o vendedor de mostrador | soportar diversas formas de pago (efectivo, tarjeta, transferencia, billeteras digitales) y permitir pagos mixtos en una misma transacción | dar flexibilidad a los clientes y registrar todas las operaciones correctamente |
| Dueño o gerente de la ferretería | que el sistema aplique automáticamente precios diferenciados a los productos según el tipo de cliente (público general, contratista, mayorista) | ofrecer tarifas especiales a mis clientes frecuentes o por volumen |
| Cajero o vendedor de mostrador | poder gestionar el proceso de devoluciones y garantías de productos | procesar estos casos de manera organizada y ajustar el inventario y los saldos de los clientes |
| Encargado de bodega / inventario | registrar entradas de mercancía (compras a proveedores, ajustes positivos, traslados) | mantener el inventario actualizado y reflejar las nuevas existencias |
| Encargado de bodega / inventario | registrar salidas de mercancía (ventas, ajustes negativos, mermas, traslados) | tener un control exacto de lo que sale del almacén |
| Dueño o gerente de la ferretería | que el stock de productos se actualice en tiempo real y se generen alertas de bajo inventario | saber qué necesito reponer y evitar quedarme sin existencias |
| Encargado de bodega / inventario | poder realizar conteos físicos de inventario y ajustes | conciliar las existencias del sistema con las reales y mantener un inventario preciso |
| Dueño o gerente de la ferretería | gestionar un registro de clientes completo, incluyendo datos de contacto, tipo de cliente y su historial crediticio | conocer mejor a mis clientes y gestionar sus cuentas de crédito |
| Contador / área administrativa | registrar y llevar un seguimiento detallado de las cuentas por cobrar generadas por ventas a crédito | tener un control preciso del dinero pendiente y gestionar la cartera eficazmente |
| Cajero o vendedor de mostrador | poder registrar abonos parciales a las cuentas por cobrar y que se apliquen correctamente a las facturas pendientes | facilitar los pagos a los clientes y mantener su saldo al día |
| Dueño o gerente de la ferretería | recibir alertas automáticas de mora y reportes de cartera vencida | tomar acciones a tiempo y reducir el riesgo de impago |
| Dueño o gerente de la ferretería | un panel de control (dashboard) con indicadores clave de ventas, cartera e inventario en tiempo real | tener una visión global del negocio y tomar decisiones informadas |
| Contador / área administrativa | generar reportes detallados de ventas (por producto, período, vendedor), inventario (existencias, rotación) y cartera (saldos pendientes, antigüedad de la deuda) | analizar el rendimiento del negocio, cumplir con obligaciones contables y planificar estrategias |
| Dueño o gerente de la ferretería | implementar un sistema de gestión de usuarios y roles con niveles de permiso configurables | proteger la información sensible y limitar accesos según el perfil de cada empleado |

### Requerimientos no funcionales

**Requerimientos no funcionales**

| ID | Categoría | Descripción |
| --- | --- | --- |
| NFR001 | Rendimiento | El sistema debe responder a las búsquedas de productos en menos de 2 segundos para el 90% de los casos. |
| NFR002 | Rendimiento | El proceso de registro de una venta y generación de factura/tiquete debe completarse en menos de 5 segundos. |
| NFR003 | Rendimiento | El panel de control (dashboard) debe cargar sus indicadores clave en menos de 3 segundos. |
| NFR004 | Disponibilidad | El sistema debe estar disponible el 99.5% del tiempo durante las horas laborales (7 a.m. a 7 p.m. de lunes a sábado). |
| NFR005 | Escalabilidad | El sistema debe ser capaz de soportar al menos 50 usuarios concurrentes sin degradación perceptible del rendimiento. |
| NFR006 | Escalabilidad | El sistema debe ser capaz de gestionar un catálogo de hasta 50,000 productos y un historial de 1 millón de transacciones anuales. |
| NFR007 | Otro | La interfaz de usuario para cajeros y vendedores debe ser intuitiva, requerir mínima capacitación y permitir operaciones rápidas mediante atajos de teclado. |
| NFR008 | Otro | El sistema debe proveer mensajes de error claros y acciones sugeridas para corregirlos. |
| NFR009 | Seguridad | El sistema debe autenticar a todos los usuarios antes de permitir el acceso y gestionar roles con permisos específicos. |
| NFR010 | Seguridad | Toda la información sensible (ej. datos de clientes, saldos de cartera, ventas) debe ser protegida contra acceso no autorizado y modificada solo por usuarios con los permisos adecuados. |
| NFR011 | Seguridad | El sistema debe registrar un historial de auditoría de todas las operaciones críticas (ej. ajustes de inventario, anulaciones de venta, modificaciones de precios, abonos de cartera). |
| NFR012 | Seguridad | El sistema debe garantizar la integridad de los datos de inventario, ventas y cartera, evitando inconsistencias o pérdidas de información. |
| NFR013 | Seguridad | El sistema debe implementar mecanismos de respaldo automático y recuperación de datos para prevenir la pérdida de información en caso de fallos. |
| NFR015 | Disponibilidad | El sistema debe ser compatible con los navegadores web modernos (Chrome, Firefox, Edge) en sus últimas versiones. |
| NFR016 | Compatibilidad | El sistema debe poder integrarse con diferentes pasarelas de pago para tarjetas de crédito/débito y billeteras digitales. |
| NFR017 | Escalabilidad | El código fuente del sistema debe seguir estándares de calidad, ser modular y fácilmente extensible para futuras funcionalidades. |
| NFR018 | Seguridad | El sistema debe generar logs detallados de eventos para facilitar la depuración y el monitoreo de errores. |
| NFR019 | Compatibilidad | El sistema debe manejar los formatos de moneda, fecha y hora estándar de Colombia. |

### Reglas de negocio

**Reglas de negocio**

- Un producto puede tener múltiples unidades de medida y presentaciones (unidad, caja, peso, longitud, volumen) con sus factores de conversión y precios asociados.
- Productos sin código de barras de fábrica deben poder tener códigos internos propios.
- Los precios de los productos pueden variar automáticamente según el tipo de cliente (público general, contratista, mayorista).
- Las ventas pueden ser de contado o a crédito.
- Las ventas a crédito generan cuentas por cobrar.
- Se permiten abonos parciales a las cuentas por cobrar.
- El sistema debe generar alertas de mora para cuentas por cobrar vencidas.
- Las ventas pueden ser pagadas con múltiples métodos de pago y combinaciones (efectivo, tarjeta, transferencia, billeteras digitales, crédito).
- El inventario debe actualizarse en tiempo real con cada entrada, salida o ajuste.
- Las operaciones críticas (ajustes de inventario, anulaciones de venta, modificaciones de precios, abonos de cartera) deben ser auditables.
- La búsqueda de productos debe soportar nombres, sinónimos, descripciones parciales o categorías.
- El acceso al sistema se basa en roles y permisos de usuario.
- Las devoluciones y garantías deben ajustar el inventario y, si aplica, los saldos de clientes.
- El sistema debe manejar los formatos de moneda, fecha y hora estándar de Colombia.

## Fase 3. Análisis y especificación

### Matriz de trazabilidad de requerimientos

**Trazabilidad**

| Requerimiento | Origen (quién lo pidió) | Prioridad | Estado |
| --- | --- | --- | --- |
| FR001: Gestión completa de catálogo de productos | Problema: Catálogos grandes y heterogéneos; Stakeholder: Dueño/Gerente, Encargado de bodega | Alta | Pendiente |
| US-DUE-CAT: Gestionar catálogo para inventario organizado | FR001 | Alta | Pendiente |
| FR002: Asignación y gestión de códigos internos | Problema: Falta de codificación estandarizada; Stakeholder: Cajero/Vendedor, Encargado de bodega | Alta | Pendiente |
| US-BOD-CODE: Asignar códigos internos para identificación de productos | FR002 | Alta | Pendiente |
| FR003: Motor de búsqueda rápida de productos | Problema: Lentitud en filas, errores de cobro; Stakeholder: Cajero/Vendedor | Alta | Pendiente |
| US-CAJ-BUSQ: Búsqueda rápida de productos para agilizar venta | FR003 | Alta | Pendiente |
| FR004: Gestión de múltiples unidades de medida y presentaciones | Problema: Un mismo producto se vende en distintas presentaciones; Stakeholder: Dueño/Gerente, Cajero/Vendedor | Alta | Pendiente |
| US-DUE-UM: Gestión de múltiples UoM para ventas sin descuadres | FR004 | Alta | Pendiente |
| FR005: Registro rápido de ventas y facturación | Problema: Tiempo perdido en el mostrador; Stakeholder: Cajero/Vendedor | Media | Pendiente |
| US-CAJ-VENT: Registro rápido de ventas para atención eficiente | FR005 | Media | Pendiente |
| FR006: Soporte a diversas formas de pago y pagos mixtos | Problema: Varias formas de pago en una misma venta; Stakeholder: Cajero/Vendedor | Media | Pendiente |
| US-CAJ-PAGO: Soportar diversas formas de pago y pagos mixtos | FR006 | Media | Pendiente |
| FR007: Aplicación automática de precios diferenciados | Problema: Precios diferenciados según tipo de comprador; Stakeholder: Dueño/Gerente | Alta | Pendiente |
| US-DUE-PRECIO: Aplicar precios diferenciados por tipo de cliente | FR007 | Alta | Pendiente |
| FR008: Gestión de devoluciones y garantías | Problema: Control de devoluciones y garantías; Stakeholder: Cajero/Vendedor, Encargado de bodega | Media | Pendiente |
| US-CAJ-DEV: Gestionar devoluciones y garantías de productos | FR008 | Media | Pendiente |
| FR010: Registro de entradas de mercancía | Problema: Falta de visibilidad/inventario descuadrado; Stakeholder: Encargado de bodega | Media | Pendiente |
| US-BOD-ENTR: Registrar entradas de mercancía para inventario actualizado | FR010 | Media | Pendiente |
| FR011: Registro de salidas de mercancía | Problema: Falta de visibilidad/inventario descuadrado; Stakeholder: Encargado de bodega | Media | Pendiente |
| US-BOD-SAL: Registrar salidas de mercancía para control exacto | FR011 | Media | Pendiente |
| FR012: Stock actualizado en tiempo real y alertas de bajo inventario | Problema: Falta de visibilidad/inventario descuadrado; Stakeholder: Dueño/Gerente, Encargado de bodega | Alta | Pendiente |
| US-DUE-STOCK: Stock en tiempo real y alertas de bajo inventario | FR012 | Alta | Pendiente |
| FR013: Conteo físico y ajustes de inventario | Problema: Inventario que nunca cuadra; Stakeholder: Encargado de bodega | Media | Pendiente |
| US-BOD-CONTEO: Realizar conteos físicos y ajustes de inventario | FR013 | Media | Pendiente |
| FR014: Gestión de registro de clientes (incl. historial crediticio) | Problema: Gestión diferenciada de cartera y crédito; Stakeholder: Dueño/Gerente, Contador/Admin | Baja | Pendiente |
| US-DUE-CLTE: Gestionar registro de clientes e historial crediticio | FR014 | Baja | Pendiente |
| FR015: Seguimiento detallado de cuentas por cobrar | Problema: Cartera descontrolada; Stakeholder: Contador/Admin, Dueño/Gerente | Alta | Pendiente |
| US-CON-CXC: Registrar y seguir cuentas por cobrar | FR015 | Alta | Pendiente |
| FR016: Registro de abonos parciales a cuentas por cobrar | Problema: Cartera descontrolada; Stakeholder: Cajero/Vendedor, Contador/Admin | Alta | Pendiente |
| US-CAJ-ABONO: Registrar abonos parciales a cuentas por cobrar | FR016 | Alta | Pendiente |
| FR017: Alertas automáticas de mora y reportes de cartera vencida | Problema: Cartera descontrolada, pérdida de control; Stakeholder: Dueño/Gerente, Contador/Admin | Media | Pendiente |
| US-DUE-MORA: Recibir alertas de mora y reportes de cartera vencida | FR017 | Media | Pendiente |
| FR018: Panel de control (dashboard) con indicadores clave | Problema: Falta de visibilidad en tiempo real; Stakeholder: Dueño/Gerente | Media | Pendiente |
| US-DUE-DASH: Dashboard con indicadores clave en tiempo real | FR018 | Media | Pendiente |
| FR019: Generación de reportes detallados (ventas, inventario, cartera) | Problema: Información repartida; Stakeholder: Contador/Admin, Dueño/Gerente | Media | Pendiente |
| US-CON-REPT: Generar reportes detallados (ventas, inv, cartera) | FR019 | Media | Pendiente |
| FR020: Sistema de gestión de usuarios y roles | Stakeholder: Dueño/Gerente (seguridad/control interno) | Baja | Pendiente |
| US-DUE-USERS: Gestión de usuarios y roles con permisos | FR020 | Baja | Pendiente |

### Priorización (MoSCoW)

**Priorización**

| Ítem / funcionalidad | Categoría |
| --- | --- |
| FR001 | Must Have |
| FR002 | Must Have |
| FR003 | Must Have |
| FR004 | Must Have |
| FR005 | Must Have |
| FR006 | Must Have |
| FR007 | Must Have |
| FR010 | Must Have |
| FR011 | Must Have |
| FR012 | Must Have |
| FR015 | Must Have |
| FR016 | Must Have |
| FR008 | Should Have |
| FR013 | Should Have |
| FR017 | Should Have |
| FR018 | Should Have |
| FR019 | Should Have |
| FR014 | Could Have |
| FR020 | Could Have |

### Diagrama de flujo de procesos

**Describe el flujo principal paso a paso**

**Describe el flujo principal paso a paso**

1.  **Inicio de Venta:** El cajero/vendedor inicia una nueva transacción en el mostrador.
2.  **Búsqueda y Adición de Producto:**
    *   El cajero utiliza el motor de búsqueda para encontrar productos por nombre, sinónimo, descripción parcial o código interno (propio o de barras).
    *   Selecciona el producto de la lista.
    *   Para productos con múltiples unidades de medida (ej. cable por metro, clavos por kilo), el cajero elige la unidad y la cantidad deseada.
    *   El sistema añade el producto a la lista de venta.
3.  **Identificación de Cliente (Opcional):**
    *   Si la venta es a crédito o el cliente tiene precios especiales, el cajero busca y selecciona al cliente del registro.
    *   El sistema aplica automáticamente los precios diferenciados si corresponde.
4.  **Selección de Formas de Pago:**
    *   El cajero selecciona una o varias formas de pago (efectivo, tarjeta, transferencia, billetera digital, crédito).
    *   Si la venta es a crédito, el monto se asigna a la cuenta por cobrar del cliente.
5.  **Procesamiento y Cierre de Venta:**
    *   El sistema procesa el pago y genera el comprobante (factura o tiquete de venta).
6.  **Actualización de Inventario y Cartera:**
    *   El inventario se actualiza en tiempo real, descontando los productos vendidos.
    *   Si hubo crédito, la cuenta por cobrar del cliente se actualiza con el nuevo saldo.

## Fase 4. Diseño

### Wireframes / Mockups

**Listado de pantallas necesarias**

- Punto de Venta (POS)
- Pantalla de Pagos
- Gestión de Productos / Catálogo
- Gestión de Inventario (Entradas y Salidas)
- Conteo y Ajustes de Inventario
- Gestión de Clientes
- Gestión de Cartera / Cuentas por Cobrar
- Gestión de Devoluciones y Garantías
- Dashboard / Panel de Control
- Generación de Reportes
- Gestión de Usuarios y Roles

**Notas de diseño / enlace a Figma u otra herramienta**

Las maquetas se desarrollarán en Figma, priorizando un diseño limpio, intuitivo y optimizado para la velocidad de operación en el mostrador (POS), tal como lo exige el NFR007. Se prestará especial atención a la ergonomía para el cajero, incluyendo el uso de atajos de teclado y flujos de trabajo eficientes. Los mensajes de error y confirmación serán claros y con acciones sugeridas (NFR008).

Enlace a prototipo de Figma: [URL_AQUI] (pendiente de creación)

### Modelo de datos

**Diccionario de datos**

| Tabla | Campo | Tipo de dato | Obligatorio | Relación (Hacia qué otra tabla) |
| --- | --- | --- | --- | --- |
| Productos | id_producto | INT | Sí | PK |
| Productos | nombre | VARCHAR(255) | Sí | N/A |
| Productos | descripcion | TEXT | No | N/A |
| Productos | codigo_interno | VARCHAR(50) | No | N/A |
| Productos | codigo_barras | VARCHAR(50) | No | N/A |
| Productos | id_categoria | INT | No | FK: Categorias(id_categoria) |
| Productos | id_marca | INT | No | FK: Marcas(id_marca) |
| Productos | stock_actual | DECIMAL(10,2) | Sí | N/A |
| Productos | costo_promedio | DECIMAL(10,2) | Sí | N/A |
| Productos | activo | BOOLEAN | Sí | N/A |
| Productos | fecha_creacion | DATETIME | Sí | N/A |
| Productos | ultima_actualizacion | DATETIME | Sí | N/A |
| Categorias | id_categoria | INT | Sí | PK |
| Categorias | nombre | VARCHAR(100) | Sí | N/A |
| Categorias | descripcion | VARCHAR(255) | No | N/A |
| Marcas | id_marca | INT | Sí | PK |
| Marcas | nombre | VARCHAR(100) | Sí | N/A |
| UnidadesDeMedida | id_unidad_medida | INT | Sí | PK |
| UnidadesDeMedida | nombre | VARCHAR(50) | Sí | N/A |
| UnidadesDeMedida | abreviatura | VARCHAR(10) | Sí | N/A |
| ProductoUnidadMedida | id_producto | INT | Sí | FK: Productos(id_producto) |
| ProductoUnidadMedida | id_unidad_medida | INT | Sí | FK: UnidadesDeMedida(id_unidad_medida) |
| ProductoUnidadMedida | factor_conversion | DECIMAL(10,4) | Sí | N/A |
| ProductoUnidadMedida | precio_general | DECIMAL(10,2) | Sí | N/A |
| ProductoUnidadMedida | precio_contratista | DECIMAL(10,2) | No | N/A |
| ProductoUnidadMedida | precio_mayorista | DECIMAL(10,2) | No | N/A |
| Clientes | id_cliente | INT | Sí | PK |
| Clientes | tipo_cliente | VARCHAR(50) | Sí | N/A |
| Clientes | nombre_razon_social | VARCHAR(255) | Sí | N/A |
| Clientes | identificacion | VARCHAR(20) | Sí | N/A |
| Clientes | direccion | VARCHAR(255) | No | N/A |
| Clientes | telefono | VARCHAR(20) | No | N/A |
| Clientes | email | VARCHAR(100) | No | N/A |
| Clientes | credito_disponible | DECIMAL(10,2) | Sí | N/A |
| Clientes | fecha_creacion | DATETIME | Sí | N/A |
| Ventas | id_venta | INT | Sí | PK |
| Ventas | id_cliente | INT | No | FK: Clientes(id_cliente) |
| Ventas | fecha_venta | DATETIME | Sí | N/A |
| Ventas | total_venta | DECIMAL(10,2) | Sí | N/A |
| Ventas | subtotal | DECIMAL(10,2) | Sí | N/A |
| Ventas | impuestos | DECIMAL(10,2) | Sí | N/A |
| Ventas | estado | VARCHAR(50) | Sí | N/A |
| Ventas | tipo_venta | VARCHAR(50) | Sí | N/A |
| Ventas | id_usuario_cajero | INT | Sí | FK: Usuarios(id_usuario) |
| DetalleVenta | id_detalle_venta | INT | Sí | PK |
| DetalleVenta | id_venta | INT | Sí | FK: Ventas(id_venta) |
| DetalleVenta | id_producto | INT | Sí | FK: Productos(id_producto) |
| DetalleVenta | id_unidad_medida | INT | Sí | FK: UnidadesDeMedida(id_unidad_medida) |
| DetalleVenta | cantidad | DECIMAL(10,2) | Sí | N/A |
| DetalleVenta | precio_unitario | DECIMAL(10,2) | Sí | N/A |
| DetalleVenta | subtotal_linea | DECIMAL(10,2) | Sí | N/A |
| FormasDePago | id_forma_pago | INT | Sí | PK |
| FormasDePago | nombre | VARCHAR(50) | Sí | N/A |
| FormasDePago | activo | BOOLEAN | Sí | N/A |
| PagosVenta | id_pago_venta | INT | Sí | PK |
| PagosVenta | id_venta | INT | Sí | FK: Ventas(id_venta) |
| PagosVenta | id_forma_pago | INT | Sí | FK: FormasDePago(id_forma_pago) |
| PagosVenta | monto_pagado | DECIMAL(10,2) | Sí | N/A |
| PagosVenta | referencia_pago | VARCHAR(100) | No | N/A |
| PagosVenta | fecha_pago | DATETIME | Sí | N/A |
| CuentasPorCobrar | id_cuenta_por_cobrar | INT | Sí | PK |
| CuentasPorCobrar | id_cliente | INT | Sí | FK: Clientes(id_cliente) |
| CuentasPorCobrar | id_venta | INT | Sí | FK: Ventas(id_venta) |
| CuentasPorCobrar | monto_total | DECIMAL(10,2) | Sí | N/A |
| CuentasPorCobrar | monto_pendiente | DECIMAL(10,2) | Sí | N/A |
| CuentasPorCobrar | fecha_generacion | DATETIME | Sí | N/A |
| CuentasPorCobrar | fecha_vencimiento | DATETIME | Sí | N/A |
| CuentasPorCobrar | estado | VARCHAR(50) | Sí | N/A |
| CuentasPorCobrar | observaciones | TEXT | No | N/A |
| AbonosCuentasPorCobrar | id_abono | INT | Sí | PK |
| AbonosCuentasPorCobrar | id_cuenta_por_cobrar | INT | Sí | FK: CuentasPorCobrar(id_cuenta_por_cobrar) |
| AbonosCuentasPorCobrar | monto_abonado | DECIMAL(10,2) | Sí | N/A |
| AbonosCuentasPorCobrar | fecha_abono | DATETIME | Sí | N/A |
| AbonosCuentasPorCobrar | id_forma_pago | INT | Sí | FK: FormasDePago(id_forma_pago) |
| AbonosCuentasPorCobrar | id_usuario_cajero | INT | Sí | FK: Usuarios(id_usuario) |
| MovimientosInventario | id_movimiento | INT | Sí | PK |
| MovimientosInventario | id_producto | INT | Sí | FK: Productos(id_producto) |
| MovimientosInventario | tipo_movimiento | VARCHAR(50) | Sí | N/A |
| MovimientosInventario | cantidad | DECIMAL(10,2) | Sí | N/A |
| MovimientosInventario | fecha_movimiento | DATETIME | Sí | N/A |
| MovimientosInventario | id_usuario | INT | Sí | FK: Usuarios(id_usuario) |
| MovimientosInventario | referencia | VARCHAR(255) | No | N/A |
| Usuarios | id_usuario | INT | Sí | PK |
| Usuarios | nombre_usuario | VARCHAR(50) | Sí | N/A |
| Usuarios | contrasena_hash | VARCHAR(255) | Sí | N/A |
| Usuarios | nombre_completo | VARCHAR(255) | Sí | N/A |
| Usuarios | email | VARCHAR(100) | No | N/A |
| Usuarios | id_rol | INT | Sí | FK: Roles(id_rol) |
| Usuarios | activo | BOOLEAN | Sí | N/A |
| Usuarios | fecha_creacion | DATETIME | Sí | N/A |
| Roles | id_rol | INT | Sí | PK |
| Roles | nombre_rol | VARCHAR(50) | Sí | N/A |
| Roles | descripcion | VARCHAR(255) | No | N/A |
| Permisos | id_permiso | INT | Sí | PK |
| Permisos | nombre_permiso | VARCHAR(100) | Sí | N/A |
| RolPermiso | id_rol | INT | Sí | FK: Roles(id_rol) |
| RolPermiso | id_permiso | INT | Sí | FK: Permisos(id_permiso) |
| Devoluciones | id_devolucion | INT | Sí | PK |
| Devoluciones | id_venta_original | INT | No | FK: Ventas(id_venta) |
| Devoluciones | id_cliente | INT | No | FK: Clientes(id_cliente) |
| Devoluciones | fecha_devolucion | DATETIME | Sí | N/A |
| Devoluciones | motivo | TEXT | Sí | N/A |
| Devoluciones | monto_total_devuelto | DECIMAL(10,2) | Sí | N/A |
| Devoluciones | tipo_reembolso | VARCHAR(50) | Sí | N/A |
| Devoluciones | id_usuario_cajero | INT | Sí | FK: Usuarios(id_usuario) |
| DetalleDevolucion | id_detalle_devolucion | INT | Sí | PK |
| DetalleDevolucion | id_devolucion | INT | Sí | FK: Devoluciones(id_devolucion) |
| DetalleDevolucion | id_producto | INT | Sí | FK: Productos(id_producto) |
| DetalleDevolucion | cantidad | DECIMAL(10,2) | Sí | N/A |
| DetalleDevolucion | precio_unitario | DECIMAL(10,2) | Sí | N/A |
| DetalleDevolucion | subtotal_linea | DECIMAL(10,2) | Sí | N/A |
| Garantias | id_garantia | INT | Sí | PK |
| Garantias | id_producto | INT | Sí | FK: Productos(id_producto) |
| Garantias | id_venta_original | INT | No | FK: Ventas(id_venta) |
| Garantias | id_cliente | INT | No | FK: Clientes(id_cliente) |
| Garantias | fecha_solicitud | DATETIME | Sí | N/A |
| Garantias | fecha_cierre | DATETIME | No | N/A |
| Garantias | descripcion_falla | TEXT | Sí | N/A |
| Garantias | accion_tomada | VARCHAR(100) | No | N/A |
| Garantias | estado | VARCHAR(50) | Sí | N/A |
| Garantias | id_usuario_responsable | INT | Sí | FK: Usuarios(id_usuario) |
| ConteoInventario | id_conteo_inventario | INT | Sí | PK |
| ConteoInventario | fecha_conteo | DATETIME | Sí | N/A |
| ConteoInventario | estado | VARCHAR(50) | Sí | N/A |
| ConteoInventario | id_usuario_responsable | INT | Sí | FK: Usuarios(id_usuario) |
| ConteoInventario | observaciones | TEXT | No | N/A |
| DetalleConteoInventario | id_detalle_conteo | INT | Sí | PK |
| DetalleConteoInventario | id_conteo_inventario | INT | Sí | FK: ConteoInventario(id_conteo_inventario) |
| DetalleConteoInventario | id_producto | INT | Sí | FK: Productos(id_producto) |
| DetalleConteoInventario | cantidad_sistema | DECIMAL(10,2) | Sí | N/A |
| DetalleConteoInventario | cantidad_fisica | DECIMAL(10,2) | Sí | N/A |
| DetalleConteoInventario | diferencia | DECIMAL(10,2) | Sí | N/A |
| DetalleConteoInventario | ajuste_aplicado | BOOLEAN | Sí | N/A |
| Auditoria | id_auditoria | INT | Sí | PK |
| Auditoria | tabla_afectada | VARCHAR(100) | Sí | N/A |
| Auditoria | id_registro_afectado | INT | Sí | N/A |
| Auditoria | tipo_operacion | VARCHAR(10) | Sí | N/A |
| Auditoria | campos_antiguos | JSON | No | N/A |
| Auditoria | campos_nuevos | JSON | No | N/A |
| Auditoria | fecha_operacion | DATETIME | Sí | N/A |
| Auditoria | id_usuario | INT | Sí | FK: Usuarios(id_usuario) |

### Arquitectura del sistema

**Stack tecnológico**

- **Frontend:** React (con TypeScript), Next.js (para Server-Side Rendering y optimización SEO, si aplica), Tailwind CSS (para diseño rápido y responsive).
- **Backend:** NestJS (Framework de Node.js progresivo para construir aplicaciones eficientes, escalables y mantenibles con TypeScript).
- **Base de Datos:** PostgreSQL (relacional, robusta, open-source, con soporte ACID para transacciones críticas de inventario y ventas).
- **Servidor de Caché:** Redis (para acelerar consultas frecuentes, datos de catálogo y sesiones de usuario).
- **Contenerización:** Docker (para empaquetar la aplicación y sus dependencias, asegurando consistencia entre entornos).
- **Orquestación (opcional, para alta escala):** Kubernetes.
- **Plataforma Cloud:** Amazon Web Services (AWS) - Utilizando EC2 para la aplicación, RDS para PostgreSQL, S3 para almacenamiento de activos, y CloudFront para CDN.
- **Control de Versiones:** Git (utilizando GitHub/GitLab para el repositorio).
- **CI/CD:** GitHub Actions / GitLab CI (para automatización de pruebas y despliegues).
- **Herramientas de monitoreo:** Prometheus y Grafana (para métricas de rendimiento y alertas).

**Componentes / capas del sistema**

- Interfaz de Usuario (Frontend Web)
- Servicios Backend (API REST)
- Lógica de Negocio (Módulos de Ventas, Inventario, Cartera, Clientes, Devoluciones)
- Capa de Acceso a Datos
- Base de Datos (PostgreSQL)
- Sistema de Caché (Redis)
- Servicios de Infraestructura Cloud (AWS: EC2, RDS, S3, CloudFront)
- Monitoreo y Alertas
- Sistema de Gestión de Identidad y Acceso

### Diseño de API

**Contrato de endpoints**

| Método | Ruta | Parámetros | Respuesta esperada | Códigos de error |
| --- | --- | --- | --- | --- |
| POST | /api/auth/login | Body: {nombre_usuario: string, contrasena: string} | 200 OK, Body: {token: string, usuario: {id: int, nombre_usuario: string, rol: string}} | 400 Bad Request (credenciales inválidas), 500 Internal Server Error |
| POST | /api/auth/logout | Headers: Authorization: Bearer <token> | 204 No Content | 401 Unauthorized, 500 Internal Server Error |
| GET | /api/users | Headers: Authorization: Bearer <token>, Query: page?: int, limit?: int, search?: string | 200 OK, Body: {usuarios: [...], total: int, page: int, limit: int} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| POST | /api/users | Headers: Authorization: Bearer <token>, Body: {nombre_usuario: string, contrasena: string, nombre_completo: string, email?: string, id_rol: int, activo: boolean} | 201 Created, Body: {id_usuario: int, nombre_usuario: string, ...} | 400 Bad Request (datos inválidos), 401 Unauthorized, 403 Forbidden, 409 Conflict (usuario ya existe), 500 Internal Server Error |
| GET | /api/users/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 200 OK, Body: {id_usuario: int, nombre_usuario: string, ...} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| PUT | /api/users/{id} | Headers: Authorization: Bearer <token>, Path: id: int, Body: {nombre_completo?: string, email?: string, id_rol?: int, activo?: boolean} | 200 OK, Body: {id_usuario: int, nombre_usuario: string, ...} | 400 Bad Request (datos inválidos), 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| DELETE | /api/users/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 204 No Content | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| GET | /api/roles | Headers: Authorization: Bearer <token> | 200 OK, Body: {roles: [{id_rol: int, nombre_rol: string, ...}]} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| POST | /api/roles | Headers: Authorization: Bearer <token>, Body: {nombre_rol: string, descripcion?: string, permisos: [int]} | 201 Created, Body: {id_rol: int, nombre_rol: string, ...} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/products | Headers: Authorization: Bearer <token>, Query: search?: string, category_id?: int, brand_id?: int, page?: int, limit?: int, include_inactive?: boolean | 200 OK, Body: {productos: [...], total: int, page: int, limit: int} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/products/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 200 OK, Body: {id_producto: int, nombre: string, descripcion: string, codigo_interno: string, ...} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| POST | /api/products | Headers: Authorization: Bearer <token>, Body: {nombre: string, descripcion?: string, codigo_interno?: string, codigo_barras?: string, id_categoria?: int, id_marca?: int, costo_promedio: decimal, stock_actual: decimal, activo: boolean, unidades_medida: [{id_unidad_medida: int, factor_conversion: decimal, precio_general: decimal, precio_contratista?: decimal, precio_mayorista?: decimal}]} | 201 Created, Body: {id_producto: int, ...resto del producto} | 400 Bad Request (datos inválidos), 401 Unauthorized, 403 Forbidden, 409 Conflict (código interno/barras ya existe), 500 Internal Server Error |
| PUT | /api/products/{id} | Headers: Authorization: Bearer <token>, Path: id: int, Body: {nombre?: string, descripcion?: string, codigo_interno?: string, codigo_barras?: string, id_categoria?: int, id_marca?: int, costo_promedio?: decimal, activo?: boolean, unidades_medida?: [...] (para actualizar UoMs)} | 200 OK, Body: {id_producto: int, ...resto del producto actualizado} | 400 Bad Request (datos inválidos), 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error |
| DELETE | /api/products/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 204 No Content | 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict (producto en uso), 500 Internal Server Error |
| GET | /api/categories | Headers: Authorization: Bearer <token>, Query: search?: string | 200 OK, Body: {categorias: [...]} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| POST | /api/categories | Headers: Authorization: Bearer <token>, Body: {nombre: string, descripcion?: string} | 201 Created, Body: {id_categoria: int, nombre: string} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 409 Conflict, 500 Internal Server Error |
| GET | /api/brands | Headers: Authorization: Bearer <token>, Query: search?: string | 200 OK, Body: {marcas: [...]} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| POST | /api/brands | Headers: Authorization: Bearer <token>, Body: {nombre: string} | 201 Created, Body: {id_marca: int, nombre: string} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 409 Conflict, 500 Internal Server Error |
| GET | /api/inventory/{productId}/stock | Headers: Authorization: Bearer <token>, Path: productId: int | 200 OK, Body: {id_producto: int, stock_actual: decimal, nombre: string} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| POST | /api/inventory/entries | Headers: Authorization: Bearer <token>, Body: {id_producto: int, cantidad: decimal, id_usuario: int, referencia?: string} | 201 Created, Body: {id_movimiento: int, ...} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found (producto), 500 Internal Server Error |
| POST | /api/inventory/exits | Headers: Authorization: Bearer <token>, Body: {id_producto: int, cantidad: decimal, id_usuario: int, referencia?: string} | 201 Created, Body: {id_movimiento: int, ...} | 400 Bad Request (cantidad insuficiente), 401 Unauthorized, 403 Forbidden, 404 Not Found (producto), 500 Internal Server Error |
| POST | /api/inventory/adjustments | Headers: Authorization: Bearer <token>, Body: {id_producto: int, cantidad_fisica: decimal, id_usuario: int, observaciones?: string} | 200 OK, Body: {id_movimiento: int, tipo_movimiento: 'Ajuste', cantidad: decimal, ...} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found (producto), 500 Internal Server Error |
| GET | /api/inventory/movements | Headers: Authorization: Bearer <token>, Query: product_id?: int, type?: string, start_date?: datetime, end_date?: datetime, page?: int, limit?: int | 200 OK, Body: {movimientos: [...], total: int} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/inventory/low-stock-alerts | Headers: Authorization: Bearer <token>, Query: threshold?: decimal | 200 OK, Body: {productos_bajo_stock: [{id_producto: int, nombre: string, stock_actual: decimal}]} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| POST | /api/sales | Headers: Authorization: Bearer <token>, Body: {id_cliente?: int, id_usuario_cajero: int, tipo_venta: 'contado' / 'credito', productos: [{id_producto: int, id_unidad_medida: int, cantidad: decimal}], pagos?: [{id_forma_pago: int, monto_pagado: decimal, referencia_pago?: string}]} | 201 Created, Body: {id_venta: int, total_venta: decimal, ...resto de la venta} | 400 Bad Request (datos inválidos, stock insuficiente, cliente sin crédito), 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/sales/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 200 OK, Body: {id_venta: int, fecha_venta: datetime, total_venta: decimal, detalle: [...], pagos: [...], cliente: {...}} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| GET | /api/sales | Headers: Authorization: Bearer <token>, Query: client_id?: int, start_date?: datetime, end_date?: datetime, status?: string, page?: int, limit?: int | 200 OK, Body: {ventas: [...], total: int} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/payment-methods | Headers: Authorization: Bearer <token> | 200 OK, Body: {formas_pago: [{id_forma_pago: int, nombre: string, activo: boolean}]} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| POST | /api/customers | Headers: Authorization: Bearer <token>, Body: {tipo_cliente: string, nombre_razon_social: string, identificacion: string, direccion?: string, telefono?: string, email?: string, credito_disponible: decimal} | 201 Created, Body: {id_cliente: int, ...resto del cliente} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 409 Conflict (identificación ya existe), 500 Internal Server Error |
| GET | /api/customers/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 200 OK, Body: {id_cliente: int, nombre_razon_social: string, ...} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| PUT | /api/customers/{id} | Headers: Authorization: Bearer <token>, Path: id: int, Body: {tipo_cliente?: string, nombre_razon_social?: string, identificacion?: string, direccion?: string, telefono?: string, email?: string, credito_disponible?: decimal} | 200 OK, Body: {id_cliente: int, ...resto del cliente actualizado} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error |
| GET | /api/customers/{id}/credit-history | Headers: Authorization: Bearer <token>, Path: id: int, Query: page?: int, limit?: int | 200 OK, Body: {historial_credito: [...], total: int} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| GET | /api/accounts-receivable | Headers: Authorization: Bearer <token>, Query: client_id?: int, status?: 'pendiente' / 'vencida' / 'pagada', start_date?: datetime, end_date?: datetime, page?: int, limit?: int | 200 OK, Body: {cuentas_por_cobrar: [...], total: int} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/accounts-receivable/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 200 OK, Body: {id_cuenta_por_cobrar: int, monto_total: decimal, monto_pendiente: decimal, ...} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| POST | /api/accounts-receivable/{id}/payments | Headers: Authorization: Bearer <token>, Path: id: int, Body: {monto_abonado: decimal, id_forma_pago: int, id_usuario_cajero: int} | 200 OK, Body: {id_abono: int, ...resto del abono, nueva_cuenta_por_cobrar: {...}} | 400 Bad Request (monto inválido, cuenta ya pagada), 401 Unauthorized, 403 Forbidden, 404 Not Found (cuenta), 500 Internal Server Error |
| GET | /api/accounts-receivable/overdue-alerts | Headers: Authorization: Bearer <token> | 200 OK, Body: {alertas_mora: [{id_cuenta_por_cobrar: int, id_cliente: int, nombre_cliente: string, monto_pendiente: decimal, dias_vencidos: int}]} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| POST | /api/returns | Headers: Authorization: Bearer <token>, Body: {id_venta_original?: int, id_cliente?: int, motivo: string, tipo_reembolso: string, id_usuario_cajero: int, productos: [{id_producto: int, cantidad: decimal}]} | 201 Created, Body: {id_devolucion: int, monto_total_devuelto: decimal, ...} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found (venta/producto), 500 Internal Server Error |
| GET | /api/returns/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 200 OK, Body: {id_devolucion: int, fecha_devolucion: datetime, ...} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| POST | /api/warranties | Headers: Authorization: Bearer <token>, Body: {id_producto: int, id_venta_original?: int, id_cliente?: int, fecha_solicitud: datetime, descripcion_falla: string, id_usuario_responsable: int, estado: string} | 201 Created, Body: {id_garantia: int, ...} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found (producto), 500 Internal Server Error |
| GET | /api/warranties/{id} | Headers: Authorization: Bearer <token>, Path: id: int | 200 OK, Body: {id_garantia: int, descripcion_falla: string, estado: string, ...} | 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| PUT | /api/warranties/{id} | Headers: Authorization: Bearer <token>, Path: id: int, Body: {estado?: string, accion_tomada?: string, fecha_cierre?: datetime} | 200 OK, Body: {id_garantia: int, ...resto de garantía actualizado} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error |
| GET | /api/dashboard/summary | Headers: Authorization: Bearer <token>, Query: start_date?: datetime, end_date?: datetime | 200 OK, Body: {total_ventas_dia: decimal, total_cxc_pendientes: decimal, productos_bajo_stock_count: int, ...} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/reports/sales | Headers: Authorization: Bearer <token>, Query: start_date: datetime, end_date: datetime, product_id?: int, client_id?: int, user_id?: int, format?: 'json' / 'pdf' / 'csv' | 200 OK, Body: {...reporte de ventas o archivo binario} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/reports/inventory | Headers: Authorization: Bearer <token>, Query: category_id?: int, brand_id?: int, format?: 'json' / 'pdf' / 'csv' | 200 OK, Body: {...reporte de inventario o archivo binario} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/reports/accounts-receivable | Headers: Authorization: Bearer <token>, Query: status?: 'pendiente' / 'vencida', client_id?: int, start_date?: datetime, end_date?: datetime, format?: 'json' / 'pdf' / 'csv' | 200 OK, Body: {...reporte de cartera o archivo binario} | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |
| GET | /api/audit-logs | Headers: Authorization: Bearer <token>, Query: user_id?: int, table?: string, operation_type?: string, start_date?: datetime, end_date?: datetime, page?: int, limit?: int | 200 OK, Body: {logs: [...], total: int} | 401 Unauthorized, 403 Forbidden, 500 Internal Server Error |

## Fase 5. Planeación del proyecto

### Cronograma / Plan de trabajo

**Tareas**

| Tarea | Responsable | Estimación (días o horas) | Estado |
| --- | --- | --- | --- |
| Validación final de requerimientos con stakeholders clave | Product Owner | 3 días | Pendiente |
| Diseño de wireframes y mockups de la interfaz de Punto de Venta (POS) | Diseñador UI/UX | 1 semana | Pendiente |
| Diseño de wireframes y mockups para la gestión de catálogo y productos | Diseñador UI/UX | 4 días | Pendiente |
| Diseño de wireframes y mockups para la gestión de inventario y movimientos | Diseñador UI/UX | 4 días | Pendiente |
| Diseño de wireframes y mockups para la gestión de clientes y cuentas por cobrar | Diseñador UI/UX | 5 días | Pendiente |
| Diseño de wireframes y mockups para el Dashboard y reportes principales | Diseñador UI/UX | 3 días | Pendiente |
| Definición y refinamiento del Modelo de Datos (DER) para todas las tablas | Arquitecto de Software | 1 semana | Pendiente |
| Selección y configuración inicial de la arquitectura y stack tecnológico (Frontend, Backend, DB) | Arquitecto de Software | 3 días | Pendiente |
| Diseño detallado de la API REST para autenticación y gestión de usuarios/roles | Arquitecto de Software / Desarrollador Backend | 3 días | Pendiente |
| Diseño detallado de la API REST para gestión de productos, categorías y marcas | Arquitecto de Software / Desarrollador Backend | 4 días | Pendiente |
| Diseño detallado de la API REST para el módulo de ventas y pagos | Arquitecto de Software / Desarrollador Backend | 5 días | Pendiente |
| Diseño detallado de la API REST para el módulo de inventario (entradas, salidas, ajustes) | Arquitecto de Software / Desarrollador Backend | 4 días | Pendiente |
| Diseño detallado de la API REST para la gestión de clientes y cuentas por cobrar | Arquitecto de Software / Desarrollador Backend | 5 días | Pendiente |
| Configuración del repositorio de código (Git) con estrategia de ramas y convenciones | DevOps / Desarrollador Lead | 2 días | Pendiente |
| Establecimiento de estándares y guías de estilo de código para Frontend y Backend | Desarrollador Lead | 3 días | Pendiente |
| Definición del plan de pruebas (unitarias, integración, end-to-end, rendimiento) | Analista QA / Desarrollador Lead | 5 días | Pendiente |
| Configuración de entornos de desarrollo, staging y producción en AWS (EC2, RDS) | DevOps | 1 semana | Pendiente |
| Implementación de CI/CD para automatización de builds y despliegues | DevOps | 1 semana | Pendiente |
| Desarrollo del módulo de autenticación (login, logout) y autorización (roles y permisos) | Desarrollador Backend | 2 semanas | Pendiente |
| Desarrollo de la interfaz de usuario para gestión de usuarios y roles (FR020 - CRUD básico) | Desarrollador Frontend | 1 semana | Pendiente |
| Desarrollo del backend para gestión completa de catálogo de productos (FR001) | Desarrollador Backend | 2 semanas | Pendiente |
| Desarrollo del frontend para la gestión del catálogo de productos (FR001) | Desarrollador Frontend | 2 semanas | Pendiente |
| Implementación de lógica para códigos internos de productos (FR002) | Desarrollador Backend | 3 días | Pendiente |
| Desarrollo del motor de búsqueda rápida de productos (FR003) | Desarrollador Backend | 1 semana | Pendiente |
| Integración del motor de búsqueda en la interfaz de usuario (FR003) | Desarrollador Frontend | 4 días | Pendiente |
| Desarrollo del backend para múltiples unidades de medida y presentaciones (FR004) | Desarrollador Backend | 1.5 semanas | Pendiente |
| Desarrollo del frontend para selección de UoM en venta y gestión de producto (FR004) | Desarrollador Frontend | 1 semana | Pendiente |
| Desarrollo del backend para el registro de ventas y facturación (FR005) | Desarrollador Backend | 2 semanas | Pendiente |
| Desarrollo del frontend para el Punto de Venta (POS) y generación de comprobantes (FR005) | Desarrollador Frontend | 2 semanas | Pendiente |
| Implementación de soporte para diversas formas de pago y pagos mixtos (FR006) | Desarrollador Backend | 1.5 semanas | Pendiente |
| Integración del flujo de pagos múltiples en la interfaz de POS (FR006) | Desarrollador Frontend | 1 semana | Pendiente |
| Desarrollo del backend para aplicación automática de precios diferenciados por cliente (FR007) | Desarrollador Backend | 1 semana | Pendiente |
| Integración de precios diferenciados en el POS y módulo de productos (FR007) | Desarrollador Frontend | 4 días | Pendiente |
| Desarrollo del backend para registro de entradas de mercancía (FR010) | Desarrollador Backend | 1 semana | Pendiente |
| Desarrollo del frontend para el módulo de entradas de inventario (FR010) | Desarrollador Frontend | 4 días | Pendiente |
| Desarrollo del backend para registro de salidas de mercancía (ajustes, mermas) (FR011) | Desarrollador Backend | 1 semana | Pendiente |
| Desarrollo del frontend para el módulo de salidas de inventario (FR011) | Desarrollador Frontend | 4 días | Pendiente |
| Implementación de actualización de stock en tiempo real y alertas de bajo inventario (FR012) | Desarrollador Backend | 1.5 semanas | Pendiente |
| Integración de alertas de bajo inventario en Dashboard y módulos relevantes (FR012) | Desarrollador Frontend | 3 días | Pendiente |
| Desarrollo del backend para seguimiento de cuentas por cobrar (FR015) | Desarrollador Backend | 1.5 semanas | Pendiente |
| Desarrollo del frontend para el módulo de Cuentas por Cobrar (FR015) | Desarrollador Frontend | 1 semana | Pendiente |
| Desarrollo del backend para registro y aplicación de abonos parciales (FR016) | Desarrollador Backend | 1 semana | Pendiente |
| Integración de registro de abonos en la interfaz de Cuentas por Cobrar (FR016) | Desarrollador Frontend | 4 días | Pendiente |
| Desarrollo del backend para gestión de devoluciones y garantías (FR008) | Desarrollador Backend | 2 semanas | Pendiente |
| Desarrollo del frontend para los módulos de Devoluciones y Garantías (FR008) | Desarrollador Frontend | 1.5 semanas | Pendiente |
| Desarrollo del backend para conteos físicos y ajustes de inventario (FR013) | Desarrollador Backend | 1.5 semanas | Pendiente |
| Desarrollo del frontend para el módulo de conteos físicos y ajustes de inventario (FR013) | Desarrollador Frontend | 1 semana | Pendiente |
| Implementación de alertas automáticas de mora y reportes de cartera vencida (FR017) | Desarrollador Backend | 1 semana | Pendiente |
| Visualización de alertas de mora y reportes en la interfaz (FR017) | Desarrollador Frontend | 3 días | Pendiente |
| Desarrollo del backend para el Panel de Control (Dashboard) con KPIs (FR018) | Desarrollador Backend | 1 semana | Pendiente |
| Desarrollo del frontend para el Panel de Control (Dashboard) (FR018) | Desarrollador Frontend | 1 semana | Pendiente |
| Desarrollo del backend para la generación de reportes detallados (FR019) | Desarrollador Backend | 2 semanas | Pendiente |
| Desarrollo del frontend para el módulo de generación y visualización de reportes (FR019) | Desarrollador Frontend | 1 semana | Pendiente |
| Desarrollo del backend para gestión de registro de clientes e historial crediticio (FR014) | Desarrollador Backend | 1.5 semanas | Pendiente |
| Desarrollo del frontend para el módulo de gestión de clientes (FR014) | Desarrollador Frontend | 1 semana | Pendiente |
| Implementación de logs de auditoría para operaciones críticas (NFR011, NFR018) | Desarrollador Backend | 1 semana | Pendiente |
| Implementación de mecanismos de respaldo y recuperación de datos (NFR013) | DevOps | 4 días | Pendiente |
| Diseño y desarrollo de pruebas unitarias para módulos críticos | Desarrollador Backend / Desarrollador Frontend | 1 D | Pendiente |
| Diseño y desarrollo de pruebas de integración para las APIs | Analista QA / Desarrollador Backend | 1 D | Pendiente |
| Pruebas de rendimiento para búsquedas y registro de ventas (NFR001, NFR002) | Analista QA | 1 semana | Pendiente |
| Pruebas de usabilidad de la interfaz para cajeros/vendedores (NFR007) | Analista QA / Diseñador UI/UX | 1 semana | Pendiente |
| Pruebas de seguridad (autenticación, autorización, protección de datos) (NFR009, NFR010) | Analista QA | 1.5 semanas | Pendiente |
| Configuración de monitoreo y alertas para el sistema (Prometheus, Grafana) (NFR004) | DevOps | 1 semana | Pendiente |
| Revisión y ajustes finales para cumplimiento de formato de moneda, fecha y hora de Colombia (NFR019) | Desarrollador Backend / Frontend | 3 días | Pendiente |
| Gestión general del proyecto y comunicación con stakeholders | Product Owner / Project Manager | 3 H | En progreso |

### Plan de gestión de riesgos

**Riesgos**

| Riesgo | Probabilidad | Impacto | Plan de mitigación |
| --- | --- | --- | --- |
| Subestimación de la complejidad de la lógica de negocio (múltiples unidades de medida, precios diferenciados, gestión de inventario sin código de barras completo). | Alta | Alto | Realizar sesiones de modelado de dominio profundas con expertos de ferretería; aplicar desarrollo iterativo con pruebas tempranas de funcionalidades clave; someter la lógica de negocio a revisión exhaustiva por QA y usuarios clave. Desglosar estas funcionalidades en tareas muy pequeñas. |
| El sistema no cumple con los requisitos de rendimiento especificados, especialmente en la búsqueda de productos y el registro de ventas en el mostrador (NFR001, NFR002). | Media | Alto | Optimizar consultas de base de datos; implementar índices eficientes y caché (Redis); realizar pruebas de carga y rendimiento de forma continua; configurar monitoreo proactivo de los indicadores clave de rendimiento (KPIs). |
| Inconsistencias entre el inventario físico y el registrado en el sistema debido a errores en la actualización en tiempo real o en los procesos de conteo y ajuste (FR012, FR013). | Alta | Alto | Diseñar un modelo de datos robusto para inventario; garantizar transacciones ACID para todas las operaciones de stock; implementar validaciones estrictas en cada movimiento; establecer procesos claros y auditables para conteos y ajustes. |
| Errores en el cálculo o seguimiento de las cuentas por cobrar, abonos parciales y alertas de mora (FR015, FR016, FR017). | Media | Alto | Diseñar y probar rigurosamente la lógica financiera; implementar validaciones de datos fuertes; realizar pruebas de integración y aceptación con el personal contable; garantizar logs de auditoría para todas las transacciones de cartera. |
| Resistencia al cambio por parte de los usuarios finales (cajeros, vendedores, encargados de bodega) resultando en baja adopción del sistema. | Media | Alto | Involucrar a usuarios clave en el diseño de la interfaz (UI/UX) para asegurar usabilidad (NFR007); proporcionar capacitación intensiva y sesiones de prueba guiadas antes del lanzamiento; ofrecer soporte post-lanzamiento dedicado y recolectar feedback constantemente. |
| Retrasos significativos en el cronograma de desarrollo debido a estimaciones inexactas, problemas técnicos imprevistos o cambios frecuentes en los requerimientos. | Media | Alto | Realizar un desglose granular de tareas; establecer estimaciones realistas con márgenes de contingencia; adoptar una metodología de gestión ágil (sprints); monitorear el progreso continuamente; gestionar proactivamente los cambios de requerimientos con los stakeholders. |
| Vulnerabilidades de seguridad que resulten en acceso no autorizado o pérdida de datos sensibles (NFR009, NFR010, NFR012). | Baja | Alto | Implementar robustos mecanismos de autenticación y autorización basados en roles; realizar revisiones de código enfocadas en seguridad; ejecutar pruebas de penetración periódicas; educar al equipo en las mejores prácticas de seguridad; asegurar el cifrado de datos sensibles. |
| Problemas de escalabilidad del sistema a medida que aumenta el número de productos, transacciones o usuarios concurrentes (NFR005, NFR006). | Media | Alto | Diseñar una arquitectura escalable desde el inicio; realizar pruebas de carga y estrés antes del lanzamiento y periódicamente; utilizar tecnologías de base de datos y caché optimizadas para el rendimiento (PostgreSQL, Redis); monitorear constantemente el uso de recursos y planificar la expansión de infraestructura. |
| Falta de experiencia del equipo de desarrollo con el stack tecnológico seleccionado (React, NestJS, PostgreSQL, AWS, Docker). | Baja | Medio | Proveer capacitación y recursos de aprendizaje para el equipo; asignar mentores experimentados; comenzar con módulos menos críticos para familiarización; priorizar la calidad del código y las revisiones entre pares. |
| Problemas de integración con pasarelas de pago externas o billeteras digitales (NFR016). | Media | Medio | Seleccionar pasarelas de pago con APIs bien documentadas y soporte técnico fiable; desarrollar módulos de integración desacoplados para facilitar el cambio si es necesario; realizar pruebas de integración exhaustivas; planificar mecanismos de contingencia en caso de fallos. |

### Definición de "Hecho"

**Criterios para considerar una funcionalidad terminada**

- [ ] El código de la funcionalidad ha sido desarrollado y revisado por pares (code review).
- [ ] Las pruebas unitarias para la funcionalidad han sido creadas y pasan exitosamente.
- [ ] Las pruebas de integración para la API han sido implementadas y pasan.
- [ ] La funcionalidad ha sido probada por QA y cumple con los requerimientos funcionales (FRs) y las historias de usuario (USs).
- [ ] Se han validado los requerimientos no funcionales (NFRs) aplicables (ej. rendimiento, seguridad, usabilidad).
- [ ] La funcionalidad se ha desplegado y probado satisfactoriamente en el entorno de staging.
- [ ] La documentación técnica (código comentado, Swagger/OpenAPI) ha sido actualizada.
- [ ] Si aplica, la documentación para el usuario final ha sido creada o actualizada.
- [ ] La funcionalidad ha sido aceptada por el Product Owner o los stakeholders clave.
- [ ] Los logs de auditoría para operaciones críticas asociadas están implementados y funcionando.
- [ ] Los mensajes de error y confirmación son claros y útiles para el usuario.
- [ ] La integridad de los datos es garantizada por la funcionalidad.
- [ ] Los formatos de moneda, fecha y hora de Colombia son manejados correctamente.

## Fase 6. Preparación técnica del entorno

### Configuración de repositorio

**Estrategia de ramas, convenciones de commits, etc.**

### Estrategia de ramas, convenciones de commits, etc.

**Estrategia de Ramas (Git Flow Simplificado)**

*   `main` (o `master`): Contiene el código en estado de producción. Se protege rigurosamente; solo se aceptan merges de `release` o `hotfix`.
*   `develop`: Rama principal para la integración de nuevas funcionalidades. Todas las `feature` branches se fusionan aquí una vez completadas y aprobadas.
*   `feature/nombre-de-la-funcionalidad`: Creadas a partir de `develop` para el desarrollo de nuevas funcionalidades, requerimientos específicos o mejoras. Se fusionan de nuevo a `develop` una vez terminadas.
*   `hotfix/nombre-del-arreglo`: Creadas a partir de `main` para corregir bugs críticos en producción. Se fusionan a `main` y a `develop` (para propagar el arreglo).
*   `release/vX.Y.Z`: Ramas temporales creadas a partir de `develop` para preparar una nueva versión de producción. Aquí se realizan los últimos ajustes, pruebas de regresión y se preparan las notas de la versión. Una vez estable, se fusiona a `main` (taggeando la versión) y de vuelta a `develop`.

**Convenciones de Commits (Conventional Commits)**

*   **Formato:** `<tipo>(<ámbito opcional>): <descripción>`
    *   `tipo`: Indica el tipo de cambio. Valores permitidos:
        *   `feat`: Una nueva funcionalidad.
        *   `fix`: Una corrección de un bug.
        *   `docs`: Cambios solo de documentación.
        *   `style`: Cambios que no afectan el significado del código (espacios en blanco, formato, puntos y comas).
        *   `refactor`: Un cambio de código que no agrega funcionalidad ni arregla un bug.
        *   `test`: Añadiendo o corrigiendo tests.
        *   `chore`: Cambios en el proceso de construcción, herramientas auxiliares o librerías externas.
        *   `perf`: Un cambio de código que mejora el rendimiento.
        *   `ci`: Cambios en la configuración y scripts de CI.
        *   `build`: Cambios que afectan el sistema de compilación o dependencias externas.
    *   `ámbito` (opcional): Especifica la parte del sistema o módulo afectado (ej. `pos`, `inventario`, `auth`, `api`, `clientes`).
    *   `descripción`: Breve resumen del cambio. Debe ser imperativa (ej. "añadir", "corregir"), en presente y sin punto final.

*   **Ejemplos:**
    *   `feat(pos): Implementar búsqueda rápida de productos`
    *   `fix(inventario): Corregir cálculo de stock en salidas`
    *   `docs(api): Actualizar documentación de endpoints de ventas`
    *   `chore(deps): Actualizar dependencia de React a v18`

**Proceso de Pull Request (PR) / Merge Request (MR)**

*   Todos los cambios significativos (`feature`, `fix`, `refactor`) deben ser enviados a través de un Pull Request (PR) o Merge Request (MR).
*   **Revisión de Código:** Cada PR/MR requiere al menos una aprobación de otro desarrollador del equipo (y del arquitecto para cambios críticos) antes de poder ser fusionado.
*   **Pruebas Automatizadas:** El pipeline de CI/CD debe pasar todas las pruebas (unitarias, integración, linting) antes de la revisión y fusión.
*   **Conflictos:** El desarrollador que crea el PR/MR es responsable de resolver cualquier conflicto de fusión con la rama destino (generalmente `develop`).
*   **Descripción del PR/MR:** Debe incluir una descripción clara de los cambios, referencias a los requerimientos funcionales (FRs), historias de usuario (USs) o incidencias de seguimiento (`#ID-JIRA`).

### Estándares de código

**Guía de estilo, convenciones de nombres**

### Guía de estilo, convenciones de nombres

#### Convenciones de Nombres

*   **Variables:** `camelCase` (ej. `nombreProducto`, `cantidadTotal`). Preferir nombres descriptivos, evitar abreviaturas ambiguas.
*   **Funciones y Métodos:** `camelCase` (ej. `calcularTotalVenta()`, `obtenerProductosPorCategoria()`). Deben comenzar con un verbo que describa su acción.
*   **Clases, Interfaces y Tipos (TypeScript):** `PascalCase` (ej. `Producto`, `Cliente`, `IVenta`, `TipoCliente`).
*   **Constantes:** `UPPER_SNAKE_CASE` para constantes globales o valores inmutables a nivel de módulo (ej. `MAX_PRODUCT_NAME_LENGTH`, `IVA_PERCENTAGE`). Constantes locales en un ámbito reducido pueden ser `camelCase`.
*   **Archivos de Código (Frontend/Backend):** `kebab-case` (ej. `product-list.component.tsx`, `sales-service.ts`, `auth-controller.ts`). Para clases o entidades principales, se puede usar `PascalCase` si el framework lo recomienda (ej. `Product.entity.ts`).
*   **Base de Datos (Tablas y Columnas):** `snake_case` (ej. `productos`, `id_producto`, `fecha_creacion`).
*   **Endpoints de API:** `kebab-case` para recursos (ej. `/api/accounts-receivable`).

#### Estilo de Código General

*   **Indentación:** Usar 2 espacios para la indentación en todo el proyecto.
*   **Longitud de Línea:** Mantener líneas de código por debajo de los 120 caracteres.
*   **Comentarios:**
    *   Usar JSDoc (o TSDoc) para documentar funciones, métodos, clases e interfaces públicas.
    *   Comentarios internos (`//` o `/* */`) para explicar lógica compleja, decisiones de diseño no obvias o workarounds.
*   **Espaciado:**
    *   Añadir un espacio antes y después de operadores (ej. `a + b`).
    *   Añadir un espacio después de comas (ej. `func(a, b)`).
    *   No añadir espacio entre el nombre de una función y sus paréntesis (ej. `funcion()`).
*   **Manejo de Errores:** Implementar manejo de errores consistente con mensajes claros y descriptivos, siguiendo los NFR008.
*   **Importaciones:** Agrupar y ordenar alfabéticamente las importaciones: primero librerías externas, luego módulos internos, luego archivos locales.
*   **Declaración de Variables:** Usar `const` por defecto, `let` si la variable necesita ser reasignada y evitar `var`.
*   **Tipado (TypeScript):** Utilizar tipos explícitos para variables, parámetros de funciones y retornos cuando sea posible y claro, evitando `any`.
*   **Modularidad:** Desacoplar la lógica en módulos pequeños y reutilizables.

### Plan de pruebas

**Plan de pruebas**

| Tipo de prueba | Qué se prueba | Criterio de aceptación |
| --- | --- | --- |
| Pruebas Unitarias | Función de búsqueda de productos (FR003) | Debe retornar productos correctos por nombre, sinónimo, descripción parcial y código interno, ignorando mayúsculas/minúsculas y acentos. El tiempo de respuesta debe cumplir NFR001. |
| Pruebas Unitarias | Lógica de actualización de stock post-venta (FR012) | Debe decrementar correctamente el stock del producto en la unidad base, considerando factores de conversión de las unidades de medida seleccionadas (FR004). |
| Pruebas Unitarias | Lógica de aplicación de precios diferenciados (FR007) | Debe aplicar el precio correcto (general, contratista, mayorista) según el tipo de cliente seleccionado en la venta. |
| Pruebas de Integración | API de registro de venta (FR005, FR006, FR007, FR012, FR015) | La API `/api/sales` debe procesar una venta con múltiples productos y UoM, aplicar precios diferenciados, registrar pagos mixtos (ej. efectivo y crédito), y actualizar atómicamente el inventario y las cuentas por cobrar. |
| Pruebas de Integración | API de movimientos de inventario (FR010, FR011, FR012) | Las APIs de entrada, salida y ajuste de inventario deben modificar correctamente el stock actual de los productos y registrar el movimiento en el historial, manteniendo la integridad de datos (NFR012). |
| Pruebas de Integración | API de gestión de cuentas por cobrar y abonos (FR015, FR016) | La API debe permitir crear, consultar y registrar abonos parciales a las cuentas por cobrar, asegurando que el monto pendiente se actualice correctamente y el estado cambie a 'pagada' cuando corresponda. |
| Pruebas End-to-End | Flujo completo de venta en el POS para un cajero (FR003, FR004, FR005, FR006, FR007) | Un cajero debe poder iniciar sesión, buscar un producto (por código interno/nombre), seleccionar una unidad de medida y cantidad, identificar un cliente (con crédito y precio especial), realizar un pago mixto y cerrar la venta. El inventario, la cartera y los reportes deben reflejar los cambios. El tiempo de registro de venta debe cumplir NFR002. |
| Pruebas End-to-End | Flujo de devolución de producto (FR008) | Un cajero debe poder registrar una devolución de un producto vendido, ajustar el inventario y procesar el reembolso (ej. en efectivo o como crédito al cliente), asegurando que el historial de ventas y los reportes se actualicen correctamente. |
| Pruebas de Rendimiento | Velocidad del motor de búsqueda de productos (NFR001) | El 90% de las búsquedas de productos deben completarse en menos de 2 segundos, bajo una carga simulada de 50 usuarios concurrentes y con un catálogo de 50,000 productos. |
| Pruebas de Rendimiento | Tiempo de registro de venta y generación de factura (NFR002) | El proceso de registro de una venta y generación de factura/tiquete debe completarse en menos de 5 segundos, bajo una carga simulada de 50 usuarios concurrentes. |
| Pruebas de Seguridad | Autenticación y Autorización (NFR009, NFR010, FR020) | Un usuario sin privilegios administrativos no debe poder acceder a funcionalidades sensibles (ej. modificar precios, ajustar inventario, gestionar usuarios). Los intentos fallidos de autenticación deben ser controlados y registrados. |
| Pruebas de Seguridad | Integridad y confidencialidad de datos (NFR010, NFR012) | Los datos sensibles (ej. saldos de cartera, costos de producto) deben estar protegidos contra acceso no autorizado. No debe ser posible manipular la información de inventario o ventas directamente desde la interfaz o por inyección. |
| Pruebas de Usabilidad | Interfaz de usuario del Punto de Venta (POS) (NFR007) | Un cajero debe poder completar una venta compleja de manera intuitiva y rápida, requiriendo mínima capacitación y utilizando atajos de teclado para operaciones frecuentes, sin fricciones innecesarias. |
| Pruebas de Usabilidad | Mensajes de error y confirmación (NFR008) | Todos los mensajes de error y confirmación deben ser claros, descriptivos y ofrecer acciones sugeridas al usuario, tanto en el POS como en los módulos administrativos. |
| Pruebas de Auditoría | Registro de auditoría para operaciones críticas (NFR011) | Todas las operaciones críticas (ej. ajustes de inventario, anulaciones de venta, modificaciones de precios, abonos de cartera, cambios de roles) deben generar un registro inmutable en la tabla de auditoría con la información completa del evento. |
| Pruebas de Localización | Formatos de moneda, fecha y hora de Colombia (NFR019) | Todos los montos monetarios deben mostrarse en formato de pesos colombianos ($ COP), las fechas en formato DD/MM/YYYY y las horas en formato 24h, en todas las pantallas, reportes y comprobantes generados. |
| Pruebas de Reportes | Generación de reportes detallados (FR019) | Los reportes de ventas, inventario y cartera deben generar la información correcta y consistente con los datos transaccionales, filtrando por los criterios especificados (fechas, productos, clientes, etc.). |
| Pruebas de Monitoreo | Alertas de bajo inventario (FR012) | El sistema debe generar alertas automáticas cuando el stock de un producto cae por debajo de un umbral predefinido y mostrarlas en el dashboard y/o mediante notificaciones. |
| Pruebas de Monitoreo | Alertas de mora de cartera (FR017) | El sistema debe identificar y notificar proactivamente las cuentas por cobrar vencidas al administrador o personal contable, detallando el cliente, monto y días de mora. |
| Pruebas de Consistencia | Consistencia entre inventario físico y sistema (FR013) | Después de realizar un conteo físico y aplicar los ajustes, las existencias del sistema para los productos contados deben coincidir con las cantidades físicas registradas, y la diferencia debe ser cero. |

### Configuración de entornos

**Entornos**

| Entorno | URL / configuración | Notas |
| --- | --- | --- |
| Desarrollo | Instancias locales de Docker para Frontend (React/Next.js) y Backend (NestJS). Base de datos PostgreSQL local o contenedores para desarrollo. Herramientas de desarrollo integradas (IDE, linters, etc.). Datos de prueba y mockups. | Utilizado por desarrolladores individuales para codificación y pruebas unitarias/locales. Orientado a la velocidad de iteración y flexibilidad. Puede haber un entorno compartido en AWS para integración temprana. |
| Pruebas/QA | Despliegue de la aplicación completa en AWS (EC2, RDS para PostgreSQL, Redis para caché) utilizando Docker. Configuración similar a producción, pero con recursos escalados según las necesidades de prueba. Uso de datos de prueba representativos y/o anonimizados. Integración con herramientas de automatización de pruebas (unitarias, integración, E2E). | Ambiente dedicado para pruebas intensivas por parte del equipo de QA. Aquí se validan FRs y NFRs como rendimiento (NFR001, NFR002, NFR003), seguridad (NFR009, NFR010), usabilidad (NFR007) y regresión. Se automatiza con CI/CD. |
| Pre-producción (Staging) | Despliegue en AWS con una configuración idéntica a producción (EC2, RDS PostgreSQL de alta disponibilidad, Redis, S3, CloudFront). Base de datos con una copia reciente y anonimizada de datos de producción o datos de prueba de gran volumen. Monitoreo básico configurado (Prometheus, Grafana). | Entorno final de validación antes del lanzamiento a producción. Utilizado para Pruebas de Aceptación del Usuario (UAT) con stakeholders clave (dueños, administradores, contadores) y para pruebas de carga/estrés. El objetivo es simular el comportamiento real del sistema en producción. |
| Producción | Infraestructura robusta en AWS (EC2 con autoescalado, RDS PostgreSQL con replicación y alta disponibilidad, Redis clúster, S3 para almacenamiento de documentos, CloudFront para CDN). Implementación de Docker y orquestación con Kubernetes (opcional). Monitoreo completo con Prometheus y Grafana, alertas configuradas. Mecanismos de respaldo y recuperación de datos (NFR013). | El ambiente en vivo utilizado por las ferreterías. Requiere máxima disponibilidad (NFR004), escalabilidad (NFR005, NFR006) y seguridad (NFR009, NFR010, NFR011, NFR012). Los despliegues se realizan con CI/CD y estrategias de despliegue gradual. |

## Fase 7. Validación final

### Checklist final antes de programar

**Checklist final**

- [x] Documento de requerimientos funcionales y no funcionales aprobado
- [x] Historias de usuario o casos de uso priorizados
- [x] Wireframes de pantallas principales
- [x] Modelo de datos (DER) definido
- [x] Arquitectura y stack tecnológico decididos y justificados
- [x] Backlog o cronograma con tareas desglosadas
- [x] Repositorio configurado con convenciones claras
- [x] Definición de "Hecho" acordada
- [x] Entornos de desarrollo listos

