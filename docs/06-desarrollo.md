# 6. Desarrollo (tienda web)

[← Índice](README.md)

## Cuál es la web correcta

La web vigente está en la rama **`web/correcciones-fase1`** de este repositorio y se publica en Vercel en el proyecto **`sentirse-bien-opal`**. La dirección configurada en el código (enlaces canónicos, sitemap y páginas de producto) es **https://sentirsebien-v2.vercel.app**.

- La rama `main` todavía tiene la **versión anterior**, con testimonios inventados, promesas de salud y enlaces vacíos. No se debe usar como referencia.
- La rama se trabajó entre el 29 y el 30 de octubre de 2026 y **aún no se ha fusionado a `main`**.

Es una tienda estática con carrito y **pedido por WhatsApp**: no hay pasarela de pago ni base de datos.

## Qué cambió en la fase 1 (frente a `main`)

- Se quitaron los testimonios inventados y las promesas de salud. Los beneficios de `public/Catalogo.json` ahora usan las frases con * del INVIMA o datos de etiqueta.
- "Nuestra Historia" se reescribió como distribuidora digital, sin promesas, con los pilares "Productos originales", "Sin promesas mágicas" y "Trato humano y cercano".
- Nueva página `legal.html`: productos, pedidos, envíos y pagos, y privacidad.
- Se agregó **Colmaré** al catálogo (12 productos), con una sección destacada y un visor 3D del tarro que gira con el mouse (`colmare3d.js`, con three.js).
- Nuevas secciones del inicio:
  - "¿Qué estás buscando hoy?" (comprar por necesidad, con filtro en la tienda).
  - "Lo que más ha gustado en TikTok" (las 4 publicaciones más vistas, más un carrusel y una receta).
  - "Cómo hacer tu pedido" (3 pasos).
  - "Conoce a Cebollín", que parpadea y saluda con el bracito, sin saltar.
- Fotos premium: escenas generadas en Google Flow usando los empaques reales como referencia. Hay escenas para el inicio, deporte, desayunos y despensa; "Para la familia" y "Colágenos" quedaron pendientes.
- Productos flotantes con efecto 3D, cambio de empaque al elegir la presentación (con bolsas reales de 500 g y 250 g) y una escena de cocina y campo de fondo.
- SEO con la URL real, botón flotante de WhatsApp, mejoras de accesibilidad e íconos propios (Font Awesome instalado, no por CDN).
- Las fichas de ZOI y el respaldo del catálogo se movieron fuera de la web (`recursos/`).
- `vercel.json` permite CORS en `/productos/` y `/necesidades/`, para usar esas imágenes como referencia en herramientas de diseño.

## Tecnología

| Pieza | Detalle |
|---|---|
| Construcción | Vite 5 con cuatro páginas: `index.html`, `tienda.html`, `nosotros.html` y `legal.html`; `base: './'` (rutas relativas) |
| Lógica | `main.js` (JavaScript sin framework) y `colmare3d.js` (visor 3D con three.js) |
| Estilos | `style.css`: verde #103F29, terracota #A8502F y arena #D4A373; tipografías Outfit e Inter |
| Mapa | Leaflet y OpenStreetMap, que solo se cargan si el cliente abre el mapa en el pedido |
| Analítica | `@vercel/analytics` |
| Hosting | Vercel (`sentirse-bien-opal`), con vista previa por rama |

## Archivos (rama `web/correcciones-fase1`)

| Archivo o carpeta | Para qué |
|---|---|
| `index.html` | Inicio |
| `tienda.html` | Catálogo con filtros (también por necesidad) y ficha de producto |
| `nosotros.html` | Nuestra Historia |
| `legal.html` | Aviso legal, envíos y privacidad |
| `main.js` | Carga `Catalogo.json`, pinta los productos, maneja el carrito (en `localStorage`), el formulario, el mapa y el mensaje de WhatsApp al 573224559027 |
| `public/Catalogo.json` | 12 productos con presentaciones, precios, descripción, beneficios e imagen |
| `generate-product-pages.js` | Crea `public/p/<id>.html` para cada producto, con metadatos para compartir y redirección a la tienda. `BASE_URL` por defecto: `https://sentirsebien-v2.vercel.app` |
| `public/productos/`, `public/necesidades/`, `public/cebollin/`, `public/redes/`, `public/marca/` | Fotos de producto, escenas por necesidad, Cebollín, publicaciones de redes y logos |
| `recursos/` | Fichas de ZOI y `Catalogo_backup.json` (no se publican) |
| `vercel.json` | Encabezados CORS |

## Cómo se trabaja

```bash
git checkout web/correcciones-fase1
npm install
npm run dev       # servidor local
npm run build     # genera public/p/*.html y construye en dist/
npm run preview   # vista previa de la construcción
```

- La regla es trabajar siempre en una rama con vista previa de Vercel y pull request, nunca directo en `main` (skill `desarrollador-web-sentirsebien`).
- La construcción borra y regenera `public/p/` cada vez.

## Herramientas de contenido en el repositorio

No son parte de la web:

- `marca-kit/plantillas/render_promo.py`: crea piezas Promo a partir de un JSON (4x5, 9x16, 1x1).
- `marca-kit/fuentes/`: las fuentes TTF que usan las plantillas y los videos.

Pendientes técnicos en [Pendientes y riesgos](07-pendientes-y-riesgos.md).
