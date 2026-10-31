# 4. Administración y operación

[← Índice](README.md)

## Cómo se vende

1. El cliente llega por redes (que no muestran precio) o por la web.
2. Escribe por WhatsApp al **322 455 9027**. Ahí se le asesora y se le da el precio.
3. En la web, el carrito arma un mensaje con productos, datos de envío, medio de pago y total, y lo abre en WhatsApp (ver [Desarrollo](06-desarrollo.md)).
4. El pedido queda confirmado cuando SentirseBien responde con la disponibilidad, el valor del envío y el total. El precio que vale es el que se confirma por WhatsApp.

## Pagos y envíos

| Tema | Lo que hay hoy |
|---|---|
| Medios de pago (formulario de la web) | Nequi, Daviplata (Llave), transferencia Bancolombia y pago contra entrega en efectivo |
| Envíos | A toda Colombia. La entrega, el costo según la ciudad y el medio de pago se coordinan por WhatsApp. En Bogotá el cliente puede marcar su ubicación en un mapa |
| Problemas con un pedido | Se resuelven por el mismo chat de WhatsApp |
| Aviso legal, envíos y privacidad | Página `legal.html` de la web vigente (actualizada el 29-oct-2026) |
| Costos y tiempos de envío exactos | No están documentados |

## Precios

- **Redes:** por ahora ninguna pieza lleva precio, ni público ni mayorista. Todas cierran con "Escríbenos para saber más" y el WhatsApp, para generar curiosidad mientras la marca gana confianza.
- **Web:** muestra precios al público en pesos colombianos, que pueden cambiar sin previo aviso.
- Referencias de precio en [Productos](03-productos.md#precios).

## Proveedores y marcas

| Marca | Qué aporta |
|---|---|
| **ZOI Productos Naturales** | La mayor parte del catálogo (pulverizados, homeopáticos, jarabes, aceites, vinagres, semillas, cuidado personal) |
| **GMN** | Gainers (Super Mega Gainer, Mega Gainer) y creatina |
| **Iron Nutrition** | Creatine 100 |
| Otras (catálogo parte 2, pendiente) | Nutramerican, Optimum, Natural Freshly, Mineralin, Naturfar, Smart Muscle, Bioessens, Botanitas |

No hay datos documentados de condiciones de compra, márgenes, inventario ni contactos de proveedores.

## Herramientas

| Herramienta | Uso |
|---|---|
| **Panel SentirseBien** | El escritorio diario: todo lo que preparan los agentes llega ahí y solo sale con la aprobación de Jhoan |
| **Mapa del proyecto SentirseBien** | La referencia general del proyecto |
| **Metricool** (blogId 7553124, hora de Bogotá) | Programar publicaciones y ver métricas |
| **TikTok Promocionar** | Anuncios con presupuesto pequeño |
| **Google Flow** (Nano Banana Pro, sin costo de créditos; Veo) | Imágenes de Cebollín con producto y tomas de video |
| **Pomelli** | Fotos del tarro en escena |
| **Drive "PROYECTO SENTIRSE BIEN"** | Redes, fotos, videos, MASCOTA CEBOLLIN, IMAGENES BASE PRODUCTOS ZOI (PNG) |
| **GitHub y Vercel** | Este repositorio y la publicación de la web |

## Panel SentirseBien

| Sección | Qué se ve | Qué hace Jhoan |
|---|---|---|
| Indicaciones para el equipo | Reglas que los agentes leen antes de cada rutina; mandan sobre todo lo demás | Nueva indicación, Editar, Archivar |
| Publicaciones para mañana | 3 opciones con imágenes, texto, redes y hora | Aprobar y programar (en Metricool), Pedir cambio, Descartar |
| Videos | 2 propuestas con video, guion toma por toma y canción sugerida | Lo mismo que en publicaciones |
| Anuncios en TikTok | Plan (presupuesto, días, gastado) y recomendación del día | Activar en TikTok y tocar "Ya lo activé", o "Pedir cambio" / "Hoy no" |
| Cuentas sugeridas | Hasta 3 cuentas de referencia con el motivo | Aprobar (el agente la sigue) o Rechazar |
| Informe del mercado | Novedades de ZOI, tendencias, qué evitar, oportunidades, fuentes | Leer |

- Los cambios de estilo permanentes van en Indicaciones; los cambios de una sola pieza, en "Pedir cambio".
- Botones para pedir trabajo extra (tardan de 15 a 20 minutos y avisan al celular):
  - "Pedir 3 publicaciones nuevas".
  - "Pedir 2 videos nuevos".
  - "Pedir 3 cuentas nuevas".

## Agentes y tareas programadas

Las tareas corren solas en hora de Bogotá, en el computador de Jhoan con la app de Claude abierta, y avisan al celular al terminar. Nada se publica ni se paga sin su aprobación.

| Tarea programada | Cuándo | Qué entrega en el Panel | Skill |
|---|---|---|---|
| Publicaciones estáticas SentirseBien | Todos los días, 5:35 p. m. | Análisis del mercado, hasta 3 cuentas sugeridas y 3 publicaciones para mañana (al menos 1 carrusel y 1 estática) | `disenador-campanas-sentirsebien` |
| Videos SentirseBien | Lunes y jueves, 6:05 p. m. | 2 videos 9:16 de 30 a 45 s con canción sugerida, voz de Cebollín y texto | `disenador-campanas-sentirsebien` |
| Anuncios TikTok SentirseBien | Todos los días, 7:20 p. m. | Resultados del día y qué video promocionar mañana, con público y pasos | `estratega-tiktok-ads-sentirsebien` |
| Recordatorio historia del día | Todos los días, 7:52 a. m. | Aviso para subir a mano la historia a TikTok y al estado de WhatsApp | — |

Además está la skill `desarrollador-web-sentirsebien`, que se usa por pedido. Trabaja la tienda web siempre en una rama con vista previa de Vercel y pull request, nunca directo en `main`.

**Historia del día** (desde el 25-oct-2026): la rutina de las 5:35 p. m. marca cuál de las 3 publicaciones va como historia 9:16. Al aprobarla, sale a las 8:00 a. m. en Instagram y Facebook por Metricool. En TikTok y en el estado de WhatsApp se sube a mano.

## Reglas de operación

1. Nada se programa en Metricool sin aprobación en el Panel.
2. Las cuentas solo se siguen si Jhoan las aprueba: máximo 3 al día, y nunca se da me gusta, se comenta ni se escriben mensajes.
3. Ningún agente ingresa contraseñas, tarjetas ni datos de pago, ni pulsa "Pagar" o "Recargar". Jhoan activa y paga los anuncios.
4. Las fechas van siempre en hora de Bogotá, nunca en UTC.
5. En TikTok solo se usa sonido original o de la biblioteca comercial, para poder promocionar los videos.
