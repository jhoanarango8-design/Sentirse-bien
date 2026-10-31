# 9. Artefactos, agentes y skills

[← Índice](README.md)

## Artefactos y documentos

| Nombre | Qué es | Enlace |
|---|---|---|
| Mapa del proyecto SentirseBien | Referencia general: enlaces, agentes, Panel, identidad, reglas, pauta, pendientes e instrucciones para un proyecto nuevo | https://claude.ai/artifact/SsAjomdaCb7xPL5UNg5SvT |
| Panel SentirseBien | El escritorio diario de aprobaciones | https://claude.ai/artifact/GcaRxwTb8vXbCZdt3eYe4X |
| SentirseBien – Siempre Contigo | Sistema de diseño completo | https://claude.ai/artifact/CkKwcXqpjSUEFnaogPus6n |
| SentirseBien: modelo digital y línea de tiempo | Por qué 232 clics dieron 0 chats, modelos de negocio y hoja de ruta de 90 días | https://claude.ai/artifact/3YaUkXbLwqdwBYeE1sjpPf |
| Análisis: SentirseBien premium | Plan para que la web se vea premium (referencias, estructura, ficha, SEO, fases y fotos) | https://claude.ai/artifact/C4rieY2uiFBbRQvxjJYKtD |
| Vista previa de la web en Claude | Copia de la construcción de la rama vigente | https://claude.ai/artifact/5ojkmCQH2ubQBdyRRNRfnf |
| Nueva web SentirseBien – borrador | Primer diseño de la tienda (inicio, tienda, producto, receta, móvil), del 23-oct | https://claude.ai/artifact/Udff48uz6WETNericnjDYf |
| Campaña Colágeno 1 kg | Campaña anterior de Colmaré | https://claude.ai/artifact/Qbkf2ix9oWDQJbMoz2XyqJ |
| Web vigente (prueba) | Rama `web/correcciones-fase1` | https://sentirse-bien-opal.vercel.app |
| PR #1 | "Web fase 1: producto flotante y correcciones" | https://github.com/jhoanarango8-design/Sentirse-bien/pull/1 |

## Colecciones del Panel

| Colección | Qué guarda |
|---|---|
| `indicaciones` | 10 reglas activas: identidad, tipografías de piezas y videos, Cebollín oficial, estáticas, voz, videos promocionables, deportivos, producto de la semana (Kfir) y sin precios |
| `opciones` | Las 3 publicaciones propuestas para cada día, con imágenes, texto, hora, estado y el objeto de Metricool |
| `historias` | La historia del día (9:16), con su estado y si ya se subió a TikTok o WhatsApp |
| `videos` | Las 2 propuestas de video de lunes y jueves |
| `sugerencias` | Las cuentas sugeridas para seguir (pendiente, aprobada, seguida o rechazada) |
| `reportes` | El informe de mercado de cada día |
| `anunciosPlan/actual` | El plan de pauta vigente (presupuesto, días, fechas, objetivo) |
| `anuncios` | La recomendación diaria de pauta, sus resultados y el informe final |

## Tareas programadas (hora de Bogotá)

| Tarea | Cuándo | Estado |
|---|---|---|
| Publicaciones estáticas SentirseBien | Todos los días, 5:35 p. m. | Activa |
| Videos SentirseBien | Lunes y jueves, 6:05 p. m. | Activa |
| Anuncios TikTok SentirseBien | Todos los días, 7:20 p. m. | Activa. El plan terminó: hasta que haya un presupuesto nuevo, solo recuerda escribirlo |
| Recordatorio historia del día | Todos los días, 7:52 a. m. | Activa |

## Skills de los agentes

| Skill | Rol | Lo principal |
|---|---|---|
| `disenador-campanas-sentirsebien` | Diseñador y estratega de contenido | Rutina diaria: indicaciones, seguir solo lo aprobado, análisis, 3 cuentas, 3 opciones (al menos 1 carrusel y 1 estática) y subida al Panel. Incluye los prompts base de Pomelli y Flow y la tabla de formatos por red. Las reglas del Panel mandan sobre la skill (por ejemplo, el botón "PIDE EL TUYO" fue reemplazado por "ESCRÍBENOS PARA SABER MÁS") |
| `desarrollador-web-sentirsebien` | Desarrollador y diseñador web | Rediseño con catálogo completo, recetas, combos y Cebollín. Siempre en una rama `web/<tema>` con PR y vista previa, verificando con Playwright a 390 y 1440 px. Textos de `data/catalogo-publico.json` y página legal. **Pendiente:** actualizarla con la identidad nueva; todavía cita la paleta y las fuentes viejas |
| `estratega-tiktok-ads-sentirsebien` | Pauta en TikTok | Jhoan aprueba y paga, nunca se pasa el presupuesto. Pauta lo que ya funciona orgánicamente, con reglas de decisión (cambiar el video si con 1.000 impresiones no hay clics), y escribe a diario en el Panel |

Las skills también se pueden llamar en cualquier chat con `/nombre`.

## Herramientas conectadas

- **Metricool** (blogId 7553124).
- **TikTok for Business** (para cuando se pase a Ads Manager).
- **Google Drive** ("PROYECTO SENTIRSE BIEN").
- **Claude Docs**.
- **GitHub**.
- **Navegador integrado:** sesiones de @sentirsebiencol, @sentirsebien26, Flow y Pomelli.
