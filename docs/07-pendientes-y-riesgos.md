# 7. Pendientes y riesgos

[← Índice](README.md)

Lo que salió al reunir la información, ordenado por prioridad. Ninguno de estos puntos se corrigió en este cambio: aquí solo quedan anotados para decidir.

## Alta: fusionar la web vigente a `main`

La web corregida vive solo en la rama `web/correcciones-fase1`. En `main` sigue la versión anterior, que tiene problemas:

- Testimonios inventados.
- Promesas de salud ("previene la osteoporosis", "fortalece el sistema inmunológico").
- "Poder curativo" en "Nuestra Historia".
- Enlaces de redes y de políticas vacíos.

Mientras no se fusione, cualquier despliegue o agente que parta de `main` puede volver a publicar esa versión. La skill `desarrollador-web-sentirsebien` también está pendiente de actualizar con la identidad nueva.

## Alta: precios

- **Redes frente a web:** en redes no se publican precios, pero la web sí los muestra. Hay que confirmar que esa diferencia es intencional.
- **Creatina GMN:** aparece como "100 g" a $180.000 en el catálogo de la web, lo que parece un error de presentación o de precio.
- **Pendiente del Mapa del proyecto:** pasar los datos reales de la lista de precios públicos, las formas de pago, los envíos y tiempos de entrega, y los enlaces de redes.

## Media: dos catálogos sin sincronizar

- La web usa `public/Catalogo.json` (12 productos, con precios) y las redes usan `data/catalogo-publico.json` (72 referencias, sin precios). Se mantienen por separado.
- La línea deportiva no coincide: el catálogo público tiene la Creatine 100 de Iron Nutrition, y la web, la Creatina GMN.
- Falta el catálogo parte 2, con otras marcas (Nutramerican, GMN, Optimum, etc.); está a la espera de que Jhoan elija el formato.

## Media: identidad de marca en la web

La web todavía usa su paleta propia (verde #103F29, terracota y arena) y las fuentes Outfit e Inter. El kit de marca usa crema, salvia, rosa suave y ciruela, con Fraunces y Nunito Sans (y Montserrat en Promo). Según el Mapa del proyecto, el paso a la paleta y las fuentes nuevas viene después de aprobar la web.

## Media: material pendiente

- **Fotos de la web:** faltan las escenas "Para la familia" y "Colágenos". Ya se generaron en Flow, pero no se alcanzaron a traer del computador.
- **Imágenes de estudio, parte 2:**
  - Faltan 66 productos, porque los archivos de Drive pesan más de 6 MB.
  - Hay que revisar los PNG del Gel X500 (salen cortados).
  - Hay que revisar los de los champús (baja resolución).
- **Video 3D de Colmaré** (giro y acercamientos, 20 a 25 s): espera el arte original de la etiqueta que se va a pedir a ZOI.
- **TikTok:** revisar el informe del plan del 25 al 29 de octubre y decidir el siguiente presupuesto.
- **My Kids:** el contenido sale de un kit de marca local de Jhoan (carpeta "KIT DE MARCA" en su PC), que todavía no está en el repositorio.

## Media: operación sin documentar

- Costos y tiempos exactos de envío por ciudad.
- Política de cambios y devoluciones.
- Condiciones con ZOI y los otros proveedores (precios de compra, márgenes, pedidos mínimos).
- Inventario.
- Datos legales de la empresa (razón social o NIT, si existen).
- Horario de atención.

## Baja: orden del repositorio

- El repositorio pesa cerca de 1,2 GB por las imágenes y los videos de campaña en `public/`, y todo se publica con la web. Convendría mover lo que no use la web.
- La carpeta `.obsidian/` (configuración del editor) está en el repositorio.
- Hay fotos duplicadas con nombres largos generados por lectura automática en `public/imagenes/` (en `main`).
- La carpeta `licorera-tour/` pertenece a otro emprendimiento. Podría vivir en su propio repositorio.
