# 6. Desarrollo (tienda web)

[← Índice](README.md)

## Qué es

Una tienda en línea estática con carrito y **pedido por WhatsApp** (no hay pasarela de pago ni base de datos). Se publica en Vercel con el dominio configurado `https://sentirsebien.co`.

## Tecnología

| Pieza | Detalle |
|---|---|
| Construcción | [Vite 5](https://vitejs.dev) con tres páginas: `index.html`, `tienda.html` y `nosotros.html` (`vite.config.js`) |
| Lógica | `main.js` (JavaScript sin framework) |
| Estilos | `style.css` con tipografías Outfit e Inter y una paleta verde #103F29 / terracota #CA6843 |
| Íconos | Font Awesome 6 (CDN) |
| Mapa | Leaflet y OpenStreetMap, que se cargan solo cuando el cliente abre el mapa en el pedido |
| Analítica | `@vercel/analytics` |
| Hosting | Vercel (vistas previas por rama) |

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | Inicio: banner, productos destacados, compromiso, rituales, testimonios, redes y pie |
| `tienda.html` | Catálogo con filtros y ventana de producto |
| `nosotros.html` | "Nuestra Historia" y pilares |
| `main.js` | Carga `/Catalogo.json`, pinta productos, maneja el carrito (se guarda en `localStorage` como `sentirsebien_cart`), el formulario de pedido, el mapa y el mensaje de WhatsApp |
| `public/Catalogo.json` | Productos, presentaciones, precios, descripción, beneficios e imagen |
| `generate-product-pages.js` | Crea `public/p/<id>.html` por producto, con metadatos para compartir en WhatsApp y Facebook y redirección a `tienda.html#<id>` |
| `public/imagenes/` | Fotos de producto |
| `public/marca/` | Logo de SentirseBien (transparente e insignia) |
| `public/robots.txt`, `public/sitemap.xml` | SEO (el sitemap tiene 3 URL) |
| `assets/hero_wellness.jpg` | Imagen principal y de redes sociales |

## Cómo se trabaja

```bash
npm install
npm run dev       # servidor local
npm run build     # genera public/p/*.html y construye en dist/
npm run preview   # vista previa de la construcción
```

- `BASE_URL` (variable de entorno) cambia el dominio de las páginas de producto; por defecto es `https://sentirsebien.co`.
- El script de construcción borra y regenera `public/p/` cada vez.
- Se trabaja en ramas con vista previa de Vercel antes de fusionar a `main`.

## Flujo del pedido

1. El cliente agrega productos y elige la presentación; el carrito se guarda en el navegador.
2. Pulsa "Finalizar Pedido por WhatsApp" y llena nombre, celular (10 dígitos que empiecen por 3), medio de pago, dirección (opcional) y punto en el mapa (opcional).
3. `main.js` arma el mensaje con el detalle y el total, y abre `https://wa.me/573224559027`.

## Herramientas de contenido en el repositorio

Estas no son parte de la web, pero también son código:

- `marca-kit/plantillas/render_promo.py`: crea piezas Promo de SentirseBien a partir de un JSON (4x5, 9x16, 1x1).
- `licorera-tour/plantillas/render_licor.py`: lo mismo para Licorera Tour.
- `licorera-tour/logo/logos.html`: propuestas de logo.

## Deuda técnica conocida

- La web no usa la identidad nueva del kit de marca (colores crema, salvia y ciruela; Fraunces y Nunito Sans; logos de `marca-kit/logos/`). El logo es texto y el ícono de la pestaña es un marcador de `placehold.co`.
- Los botones de redes del pie y los enlaces de políticas apuntan a `#`.
- Faltan Instagram, TikTok y Facebook reales en el pie y en los datos estructurados.
- El catálogo de la tienda tiene 11 productos, frente a 72 en el catálogo público.
- El repositorio pesa cerca de 1,2 GB por las imágenes y los videos de campaña dentro de `public/`, que además se publican con el sitio.
- La carpeta `.obsidian/` (configuración del editor de notas) está en el repositorio.

Detalle y prioridades en [Pendientes y riesgos](08-pendientes-y-riesgos.md).
