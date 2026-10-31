# 4. Administración y operación

[← Índice](README.md)

## Cómo se vende

1. El cliente llega por redes (que no muestran precio) o por la tienda web.
2. Escribe por WhatsApp al **+57 322 455 9027**. Ahí se le asesora, se le da el precio y se cierra el pedido.
3. Desde la tienda web, el carrito arma un mensaje con productos, datos de envío y medio de pago, y lo abre en WhatsApp (ver [Desarrollo](06-desarrollo.md)).
4. Despacho y pago se acuerdan de forma personalizada por WhatsApp.

## Pagos y envíos

| Tema | Lo que hay hoy |
|---|---|
| Medios de pago (formulario de la tienda) | Nequi, Daviplata (Llave), transferencia Bancolombia y pago contra entrega en efectivo |
| Envíos | A toda Colombia; en Bogotá el formulario permite marcar la ubicación en un mapa |
| Costos y tiempos de envío | No están documentados en el repositorio |
| Políticas (envíos, privacidad, términos) | Los enlaces del pie de página existen pero todavía no llevan a ninguna página |

## Precios

- **Regla vigente:** por ahora **no se publica ningún precio**, ni público ni mayorista. Las piezas cierran con "Escríbenos para saber más".
- La tienda web sí muestra precios, que salen de `public/Catalogo.json`.
- Referencias de precio en [Productos](03-productos.md#precios).

## Proveedores y marcas

| Marca | Qué aporta |
|---|---|
| **ZOI Productos Naturales** | La mayor parte del catálogo (pulverizados, homeopáticos, jarabes, aceites, vinagres, semillas, cuidado personal). Su Facebook aparecía "no disponible en Colombia" el 21-oct-2026 |
| **GMN** | Gainers (Super Mega Gainer, Mega Gainer) y creatina |
| **Iron Nutrition** | Creatine 100 |
| Otras en las fotos | Natural Freshly, Mineralin, Naturfar, Smart Muscle, Nutramerican, Bioessens, Botanitas |

No hay en el repositorio datos de condiciones de compra, márgenes, inventario ni contactos de proveedores.

## Herramientas

| Herramienta | Uso |
|---|---|
| **Panel SentirseBien** | Donde Jhoan aprueba opciones, cuentas sugeridas e indicaciones (colección `indicaciones`) |
| **Metricool** | Programar publicaciones y ver métricas y mejores horas |
| **Google Flow** (Nano Banana Pro, Veo) | Imágenes de Cebollín con producto y tomas de video |
| **Pomelli** | Fotos del tarro en escena |
| **Google Drive** | Carpeta "IMAGENES BASE PRODUCTOS ZOI" con fotos de producto en fondo blanco |
| **TikTok Ads** | Pauta con el presupuesto diario que defina Jhoan |
| **Vercel** | Publicación de la tienda web y analítica |
| **GitHub** | Este repositorio |

## Agentes y tareas programadas

SentirseBien trabaja con agentes de Claude que tienen un rol cada uno:

| Rol | Qué hace | Frecuencia |
|---|---|---|
| Diseñador de campañas | Analiza el mercado y a ZOI, sugiere cuentas para seguir y propone 3 publicaciones para el día siguiente en el Panel | Diario, en la tarde |
| Videos SentirseBien | Dos videos 9:16 con la guía de videos | Lunes y jueves |
| Estratega de TikTok Ads | Maneja el presupuesto diario, elige video, público y objetivo, y propone ajustes | Diario |
| Desarrollador web | Rediseña y amplía la tienda en ramas con vista previa de Vercel | Por pedido |

Para Licorera Tour hay dos tareas más, hoy pausadas (ver [Licorera Tour](07-licorera-tour.md)).

### Qué aprueba Jhoan

- Las opciones de publicación del día (en el Panel).
- Las cuentas sugeridas para seguir (solo se siguen las "aprobadas").
- Los precios.
- Las indicaciones nuevas, que mandan sobre el kit y las guías.
- Los ajustes de pauta, que activa él.
