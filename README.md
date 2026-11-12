# Cotiflow

Cotiflow es una aplicación para gestionar clientes, productos y cotizaciones. El MVP busca validar el flujo de cotización con una interfaz modular y mobile-first, dejando una base que pueda evolucionar hacia un producto comercial.

El desarrollador mantiene el control de las decisiones, la implementación y la revisión. Codex participa únicamente en las tareas que se le deleguen. Las instrucciones operativas están en [AGENTS.md](AGENTS.md).

## Estado actual

La aplicación cuenta con una base React + Vite, React Router y MUI Community, una pantalla de inicio y listados de clientes y productos con fixtures. `App.jsx` renderiza `Sidebar` directamente, fuera de `Routes`, con enlaces de texto e iconos en este orden: Dashboard, Clientes y Productos. La navegación es una barra superior en móvil y tablet, con salto de línea cuando falta espacio, y lateral desde 1200 px. El enlace activo se resalta y los enlaces tienen un indicador visible de foco de teclado. `src/assets/icons/index.ts` centraliza los iconos Material Design utilizados: `MdDashboard` para Dashboard, `MdOutlinePeople` para Clientes y `MdOutlineInventory2` para Productos, todos a 24 px.

La ruta `/dashboard` muestra tres tarjetas de MUI con los contadores de Clientes, Productos y Cotizaciones. Lee las listas compartidas de `CustomersContext` y `ProductContext` mediante `useContext` y deriva sus cantidades directamente de `customers.length` y `products.length`. Los contadores reflejan inmediatamente las altas y eliminaciones en memoria; editar un registro conserva la cantidad. Cotizaciones permanece en 0 por ahora. No duplica los contadores en estado local ni requiere efectos. Las tarjetas se apilan en móvil y se distribuyen en tres columnas desde 600 px. Otros indicadores y contenido siguen pendientes de definición.

Los componentes de funcionalidades y navegación usan TSX, pero los puntos de entrada aún son JSX; la configuración de TypeScript `strict` y Vitest sigue pendiente. El alcance funcional y las etapas siguientes describen planes, no autorización para implementarlos.

Los listados de clientes y productos incluyen una columna «Acciones» con botones de solo iconos: `MdEdit` para editar y `MdDeleteOutline` para eliminar, centralizados en `src/assets/icons/index.ts`. Se muestran en gris suave y toman color azul o rojo, respectivamente, al pasar el mouse, enfocarlos con el teclado o pulsarlos. Conservan etiquetas accesibles y áreas táctiles de 44 × 44 px. Ambos aparecen en la misma fila de cada registro. En clientes, editar abre el formulario con los datos del registro; eliminar retira directamente de la lista al cliente correspondiente por ID. En productos, editar abre el formulario con sus datos y eliminar retira directamente el producto por ID. Las tablas se adaptan al ancho disponible, ajustando los textos y el espacio de las acciones según el tamaño de pantalla.

La pantalla de clientes muestra además un botón verde «Crear cliente», fuera de la tabla y fijo en la esquina inferior derecha para permanecer visible al desplazarse. El componente reutilizable `CreateModalButton` recibe `label` y `onClick`, sin estado propio. Sus márgenes se adaptan a móvil y escritorio y respetan las áreas seguras del dispositivo. Se reserva espacio inferior para poder desplazar el final de la tabla por encima del botón.

`CustomersContext` mantiene la lista de clientes y las operaciones `createCustomer`, `updateCustomer` y `deleteCustomer` en memoria. Su proveedor envuelve la aplicación, por lo que las modificaciones se conservan al navegar entre vistas y se pierden al recargar, restaurando los fixtures iniciales. Crear genera un identificador mediante `crypto.randomUUID()`; editar actualiza por ID sin cambiarlo ni alterar los demás registros. Eliminar filtra por ID mediante una actualización funcional, sin mutar el arreglo ni modificar los clientes restantes.

`Customers` coordina la apertura y el cliente seleccionado para un único `CustomerFormModal`. Sin selección, muestra «Crear cliente» y campos vacíos; al editar, muestra «Editar cliente», los datos del registro y el botón «Guardar cambios». Los campos Nombre (`name`) y Correo electrónico (`email`) se inicializan al abrir el modal o cambiar de cliente, sin reiniciarse por renderizados posteriores. Guardar crea o actualiza mediante el Context, cierra el modal y limpia la selección. «Cancelar», Escape y pulsar el fondo cierran sin modificar la lista; al volver a abrir se cargan los valores correspondientes. El identificador interno no se solicita en el formulario. Se conserva la validación nativa del campo de correo, sin añadir obligatoriedad ni otras reglas.

`ProductContext` mantiene la lista de productos y las operaciones `createProduct`, `updateProduct` y `deleteProduct`, siguiendo la estructura de clientes. Crear genera un ID con `crypto.randomUUID()`, editar usa `map` conservando el ID y eliminar usa `filter`; las actualizaciones son funcionales y no mutan el arreglo. `ProductsProvider` envuelve la aplicación para conservar los cambios al navegar. Al recargar se restauran los fixtures.

`Products` reutiliza `CreateModalButton` y coordina la selección y apertura de un único `ProductFormModal`. El modal conserva los campos Nombre (`name`) y Descripción (`description`), con espacio para varias líneas. Al crear muestra campos vacíos y «Crear producto»; al editar muestra los datos actuales, «Editar producto» y «Guardar cambios». Guardar llama al Context, cierra el modal y limpia la selección. «Cancelar», Escape y pulsar el fondo cierran sin guardar; cada apertura o cambio de producto inicializa los campos correspondientes. Se conservan los estilos y el espacio inferior para el botón fijo, sin añadir reglas de obligatoriedad ni otras validaciones.

## Decisiones definitivas para el MVP

- Toda la interfaz interna se construirá con **React + Vite + TypeScript** y navegación mediante **React Router**.
- La organización será por funcionalidades (*feature-based / Screaming Architecture*), con principios hexagonales pragmáticos: interfaz, reglas de negocio y acceso a datos tendrán responsabilidades separadas.
- Se conservará una estructura familiar con `assets`, `context`, `features`, `services`, `shared` y `data`.
- El estado inicial usará `useState`. Se incorporará Context únicamente cuando exista una necesidad concreta de compartir estado.
- Los datos iniciales serán fixtures JSON con **un máximo de cinco registros por entidad**. Ese límite corresponde a los fixtures, no al número de registros que el usuario pueda crear durante una sesión.
- Los cambios vivirán en memoria. Al recargar la aplicación se perderán y se volverá al estado inicial de los fixtures.
- No habrá backend, base de datos, `localStorage` ni otra persistencia de la aplicación en esta etapa.
- Se podrán combinar **MUI Community y CSS puro**. El desarrollador decidirá dónde utilizar cada uno; no se incorporarán componentes Pro/Premium.
- Los estilos base se gestionan en `src/assets/styles/global.css`, importado desde `src/main.jsx`. No usar `CssBaseline`; mantener el reset en el CSS del proyecto.
- Usar exclusivamente `react-icons/md` para iconos hasta que el usuario decida cambiarlo. Centralizar sus importaciones y exportaciones por nombre en `src/assets/icons/index.ts`; cada componente importa desde esa carpeta solo lo que necesita. Añadir únicamente iconos en uso, sin preparar catálogos anticipados ni instalar otras bibliotecas de iconos.
- **TanStack Query** queda reservado para futuras fuentes de datos asíncronas mediante API. No se instalará mientras no exista un uso aprobado; no será necesario para leer fixtures ni para gestionar estado local.
- Se usará **TypeScript en modo `strict`** y nombres semánticos en inglés. Para las personas o empresas que solicitan cotizaciones se usará `customer`/`customers` en código. Para componentes React se prefiere `export default function ComponentName() { ... }` (estilo del snippet `rfc`; en `.tsx`, `tsrfc`). Para funciones auxiliares se prefieren funciones flecha.
- El desarrollo será mobile-first, modular y con pruebas de comportamiento mediante **Vitest**.

Estas decisiones son la base acordada. El desarrollador puede revisarlas; Codex no debe modificarlas por iniciativa propia.

## Alcance funcional

| Módulo o capacidad | Alcance previsto |
| --- | --- |
| `customers` | Listar, crear, editar y eliminar clientes en memoria. |
| `products` | Listar, crear, editar y eliminar productos en memoria. |
| `quotations` | Crear y consultar cotizaciones, seleccionar cliente y productos, editar líneas y calcular importes según reglas que se definan. |
| `dashboard` | Contadores de clientes y productos sincronizados con sus contextos en memoria, y cotizaciones en 0. Otros indicadores, pendientes. |
| `settings` | Agrupar configuraciones acordadas; campos por definir y valores únicamente en memoria. |
| Excel | Importar y exportar datos; entidades, columnas, validaciones y bibliotecas por definir. |
| PDF | Generar y exportar cotizaciones; contenido, diseño y biblioteca por definir. La importación de PDF no está definida. |

La importación de archivos actualizará únicamente el estado en memoria. Las exportaciones generarán archivos a petición del usuario; no añadirán persistencia interna ni recuperación automática de la sesión.

## Límites de esta etapa

- Sin servicios remotos, autenticación, sincronización entre dispositivos ni almacenamiento persistente.
- Sin instalación anticipada de dependencias para necesidades futuras.
- Sin arquitectura hexagonal completa por obligación: no crear repositorios genéricos, contenedores de inyección ni capas vacías sin un caso concreto aprobado.
- La futura API, base de datos y eventual landing comercial quedan fuera del MVP actual.
- No asumir que ejemplos de cálculos, impuestos o estados de una cotización constituyen reglas comerciales aprobadas.

## Stack y responsabilidades

| Tecnología | Responsabilidad | Momento de incorporación |
| --- | --- | --- |
| React + Vite + TypeScript | Interfaz, desarrollo y compilación; lógica de negocio en TypeScript independiente de React. | Inicialización autorizada. |
| React Router | Navegación entre pantallas. | Al implementar navegación. |
| `useState` / Context | Estado local / estado compartido cuando haga falta. | Según cada flujo. |
| JSON | Datos ficticios iniciales. | Primeros módulos. |
| MUI Community + CSS puro | Componentes y estilos según criterio del desarrollador. | Según las pantallas y dependencias autorizadas. |
| Vitest | Pruebas de reglas y comportamientos relevantes. | Al implementar lógica verificable. |
| Bibliotecas Excel / PDF | Lectura, transformación y generación de archivos. | Tras elegirlas y autorizar su incorporación. |
| TanStack Query | Consultas, mutaciones y caché de datos asíncronos obtenidos mediante API. | Etapa futura, con uso concreto y autorización. |

TanStack Query no sustituye una API ni conecta directamente el navegador con una base de datos.

## Organización orientativa

Crear carpetas y archivos conforme sean necesarios. Este árbol describe responsabilidades; no exige generar toda la estructura al iniciar.

```text
Cotiflow/
├── README.md
├── AGENTS.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── assets/
    │   ├── images/
    │   └── styles/
    ├── context/                 # Estado compartido, solo si se necesita
    ├── data/                    # Fixtures JSON: máximo 5 por entidad
    ├── features/
    │   ├── customers/
    │   ├── products/
    │   ├── quotations/
    │   │   ├── components/      # Interfaz propia de cotizaciones
    │   │   ├── hooks/           # Coordinación con React, si hace falta
    │   │   ├── services/        # Cálculos y reglas puras del módulo
    │   │   ├── types/           # Modelos del módulo
    │   │   ├── Quotations.tsx
    │   │   └── quotations.css
    │   ├── dashboard/
    │   └── settings/
    ├── services/                # Acceso a datos e integración Excel/PDF
    └── shared/
        ├── components/         # Componentes realmente reutilizados
        ├── hooks/
        ├── types/
        └── utils/
```

Cada feature agrupa su interfaz, modelos y reglas. Las pruebas pueden vivir junto al código como `*.test.ts` o `*.test.tsx`. Los demás módulos adoptarán solo las subdivisiones que necesiten.

Los componentes y hooks coordinan la interacción. Los cálculos y validaciones comerciales permanecen en funciones TypeScript que no importen React, MUI, fixtures ni bibliotecas de archivos. Los servicios técnicos se encargan del acceso a datos y los formatos externos; una futura API podrá reemplazar ese acceso sin trasladar las reglas de negocio a la interfaz.

Los contratos o adaptadores se introducirán cuando una frontera real los justifique. `shared` contendrá elementos reutilizados, no lógica específica de cotizaciones. Evitar dependencias circulares y el acceso de un módulo a detalles internos de otro.

## Decisiones pendientes

Antes de implementar una regla pendiente, el desarrollador debe definirla y aprobarla.

| Tema | Definición necesaria |
| --- | --- |
| Modelos | Campos obligatorios, identificadores y relaciones de clientes, productos y cotizaciones. |
| Flujo de cotización | Estados, transiciones, edición, emisión, vigencia, numeración y eliminación. |
| Cálculos | Cantidades válidas, precios permitidos, descuentos, moneda, precisión y redondeos. |
| Impuestos | Si los precios incluyen impuestos, tasas aplicables, exenciones, orden de cálculo y presentación. No asumir una tasa de IVA. |
| Snapshot de precios e impuestos | Qué valores se copian a cada línea, cuándo se fijan y cómo se comportan ante cambios del catálogo o edición de la cotización. |
| Excel | Entidades admitidas, plantilla, columnas, duplicados, errores, límites y biblioteca. |
| PDF | Datos comerciales, diseño, contenido, generación y biblioteca; cualquier flujo de importación requiere definición adicional. |
| Dashboard y settings | Indicadores adicionales a los tres contadores actuales y configuraciones concretas de settings. |
| Evolución | API, backend, base de datos, autenticación, persistencia y despliegue. |

## Plan por etapas

1. **Acordar el primer flujo:** definir modelos mínimos y las reglas necesarias para la tarea delegada.
2. **Inicializar la base:** crear React + Vite + TypeScript, activar `strict`, incorporar navegación y preparar estilos mobile-first con autorización.
3. **Clientes y productos:** implementar operaciones en memoria y fixtures pequeños; añadir Context solo si el flujo lo requiere.
4. **Cotizaciones:** definir primero cálculos, impuestos y snapshot; implementar el flujo y probar sus reglas con Vitest.
5. **Dashboard y settings:** desarrollar los indicadores y configuraciones acordados sobre los datos de la sesión.
6. **Excel y PDF:** acordar formatos y bibliotecas, implementar los flujos y comprobar archivos válidos y errores relevantes.
7. **Revisar el MVP:** verificar uso móvil, navegación, formularios, comportamiento en memoria y pruebas; el desarrollador revisa el resultado.
8. **Evaluar la siguiente etapa:** decidir si incorporar API y persistencia. Solo entonces evaluar la instalación de TanStack Query para un uso real.

Cada etapa requiere tareas delegadas concretas. Este plan no autoriza a Codex a avanzar automáticamente a la siguiente.

## Instalación y comandos

Scripts disponibles en `package.json`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

`build` compila con Vite y `lint` ejecuta Oxlint. La compilación actual no comprueba tipos. No existe todavía un script de pruebas ni una instalación de Vitest o TypeScript; su incorporación requiere autorización.

## Forma de trabajo

El desarrollador delega una tarea acotada, Codex revisa el contexto y realiza solo el trabajo autorizado. Toda dependencia nueva, cambio arquitectónico, commit o acción adicional necesita autorización explícita. Al finalizar, Codex informa qué cambió, qué comprobó y qué queda pendiente. El desarrollador revisa y decide los siguientes pasos.
