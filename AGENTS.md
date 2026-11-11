# Instrucciones para Codex

Estas reglas se aplican a todo el proyecto. El usuario controla las decisiones y revisa el trabajo. Lee `README.md` y las instrucciones aplicables antes de editar.

## Alcance y autorización

- Ejecuta únicamente tareas delegadas por el usuario. Un plan, una sugerencia o una etapa del README no autorizan su implementación.
- Limita los cambios a lo necesario para la tarea. No amplíes el alcance, refactorices partes ajenas ni sobrescribas trabajo del usuario.
- No cambies la arquitectura ni las decisiones acordadas sin autorización explícita.
- No agregues, elimines, actualices ni instales dependencias sin autorización explícita, aunque estén previstas en el stack. No regeneres archivos de bloqueo fuera del alcance autorizado.
- No inicialices la aplicación o un repositorio, hagas commits, pushes, merges, despliegues ni otras acciones no delegadas. La autorización para editar código no autoriza esas acciones.
- Si una decisión pendiente bloquea la tarea, explica qué falta y solicita esa definición antes de implementar la parte afectada. Avanza en las partes independientes ya autorizadas.
- Respeta las autorizaciones explícitas ya dadas para la tarea; no solicites de nuevo la misma aprobación.

## Implementación

- Usa React + Vite + TypeScript para toda la interfaz y React Router para navegación. Mantén TypeScript `strict`; no relajes la configuración ni uses `any` o supresiones para ocultar errores.
- Usa nombres semánticos en inglés para archivos de código, variables, funciones y tipos. Al crear componentes React, prioriza `export default function ComponentName() { ... }`, como genera el snippet `rfc` (`tsrfc` en archivos `.tsx`). Usa funciones flecha preferentemente para funciones auxiliares. Respeta una forma distinta cuando el usuario la solicite o el código existente del módulo la requiera.
- Organiza por funcionalidades en `features/customers`, `products`, `quotations`, `dashboard` y `settings`, conservando las responsabilidades de `assets`, `context`, `services`, `shared` y `data` descritas en el README. Usa `customer`/`customers` en código para quienes solicitan cotizaciones.
- Mantén cálculos y validaciones de negocio en TypeScript independiente de React, MUI, fuentes de datos y bibliotecas Excel/PDF.
- Aplica SRP (principio de responsabilidad única): cada función debe tener una tarea clara. Sigue DRY (evitar la repetición de lógica): cuando la misma lógica se repita, extráela a una función reutilizable si mejora la claridad. No crees abstracciones solo porque dos fragmentos se parezcan.
- Aplica separación hexagonal de forma pragmática. No crees capas, interfaces, repositorios genéricos o abstracciones sin necesidad actual. Evita dependencias circulares.
- Mantén la lógica específica en su feature. Extrae a `shared` solo lo que tenga reutilización real. Crea únicamente las carpetas necesarias.
- Diseña mobile-first. Combina MUI Community y CSS puro según el criterio indicado por el desarrollador; no introduzcas opciones Pro/Premium ni otro sistema visual por iniciativa propia.
- Usa únicamente iconos Material Design de `react-icons/md` hasta que el usuario cambie esta elección. Impórtalos en `src/assets/icons/index.ts` y expórtalos por nombre; los componentes deben importar desde esa carpeta solo los iconos que usen. Añade iconos conforme se necesiten, verifica que sus nombres existan y mantén tamaño y estilo visual consistentes. No instales otras bibliotecas de iconos.
- Usa elementos semánticos de HTML5 cuando correspondan a la función del contenido (`header`, `nav`, `main`, `section`, `article`, `footer`, `button`, etc.). Respeta su jerarquía y significado; usa controles interactivos reales, etiquetas para los campos de formulario y `div` solo cuando no exista un elemento más apropiado. Al usar MUI, comprueba el elemento HTML que genera.
- Mantén el código bien indentado y con un formato consistente con los archivos existentes del proyecto. Indenta correctamente JSX/TSX, objetos, condiciones y bloques anidados; evita cambios de formato ajenos a la tarea.

## Estado y datos

- Comienza con `useState`; usa Context solo cuando el estado deba compartirse y la necesidad lo justifique. No añadas gestores globales de estado por anticipación.
- Usa fixtures JSON en `data/`, con un máximo de cinco registros por entidad. No impongas ese límite a los registros creados en memoria durante la sesión.
- Mantén los cambios únicamente en memoria. No modifiques los fixtures para guardar acciones del usuario. La recarga debe restablecer los datos iniciales.
- No introduzcas `localStorage`, `sessionStorage`, IndexedDB, cookies de persistencia, backend, base de datos ni otra forma de persistencia de la aplicación.
- La importación Excel modifica el estado en memoria; la exportación Excel/PDF produce archivos solicitados por el usuario. No añadas guardado automático ni restauración de sesiones.
- No instales ni uses TanStack Query hasta que exista una fuente asíncrona y una tarea que autorice su incorporación. Su futura función será consumir APIs y gestionar sus datos y caché.

## Reglas comerciales y archivos

- No inventes campos obligatorios, estados de cotización, descuentos, tasas de IVA, redondeos ni reglas de emisión.
- Antes de implementar cotizaciones, consulta las decisiones pendientes del README. Define con el usuario las reglas requeridas para la tarea.
- El snapshot de precios e impuestos está pendiente: no decidas qué se congela, cuándo o cómo se actualiza sin definición del usuario.
- Los formatos y bibliotecas de Excel/PDF deben definirse y autorizarse antes de implementarlos. La importación de PDF no tiene alcance aprobado.

## Verificación y entrega

- Usa Vitest para comprobar reglas y comportamientos relevantes, especialmente cálculos, validaciones y transformaciones de datos. Prueba casos límite según reglas aprobadas; evita pruebas que solo reproduzcan la implementación.
- Ejecuta las comprobaciones existentes pertinentes al cambio. Para interfaz, verifica el comportamiento móvil cuando haya un entorno disponible.
- No instales herramientas para verificar sin autorización. Si falta una configuración o no puedes ejecutar una comprobación, indícalo; no declares pruebas aprobadas que no ejecutaste.
- Mantén la documentación coherente con los cambios autorizados y distingue siempre implementación existente, planes y decisiones pendientes.
- Entrega un resumen breve de archivos modificados, comportamiento resultante, verificaciones realizadas y pendientes. Deja la revisión y las siguientes decisiones al usuario.
