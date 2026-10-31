# 8. Pendientes y riesgos

[← Índice](README.md)

Lo que salió al reunir la información, ordenado por prioridad. Ninguno de estos puntos se corrigió en este cambio: aquí solo quedan anotados para decidir.

## Alta: la tienda web contradice las reglas INVIMA

Las redes ya siguen las reglas (ver [Legal](05-legal-cumplimiento.md)), pero la web todavía no:

1. **Testimonios que parecen inventados** en `index.html` ("Historias de Bienestar"), con nombres y ciudades y con promesas ("ha mejorado increíblemente la caída de mi cabello", "mi calidad de sueño ha cambiado totalmente"). El kit prohíbe inventar testimonios.
2. **Beneficios con promesas de salud** en `public/Catalogo.json`, por ejemplo:
   - "Previene la osteoporosis, fracturas o fisuras" (colágeno).
   - "Fortalece el sistema inmunológico y previene infecciones" (factor de transferencia).
   - "Ayuda a equilibrar la flora intestinal y mejorar la digestión" (Kfir).
   - "Tradicionalmente utilizado para el cuidado de la próstata" (Café de Brusca).
   - "Apto para personas con diabetes" (stevia).
   - "Aumenta la fuerza y potencia muscular" (creatina).

   Lo mismo sale en las páginas `public/p/*.html`, que es lo que se ve al compartir un enlace de producto.
3. **"Poder curativo"** en el subtítulo de `nosotros.html`.

**Propuesta:** reemplazar los beneficios de la tienda por los textos de `data/catalogo-publico.json`, quitar o cambiar la sección de testimonios, y ajustar la frase de "Nuestra Historia".

## Alta: decidir qué pasa con los precios en la web

En redes la regla es no publicar precios, pero la tienda web los muestra. Hay que decidir si la web sigue con precios o pasa a "Escríbenos para saber más".

Además, hay precios que no cuadran:

- Colmaré 1000 g aparece a $70.000 en los análisis y el colágeno marino 1000 g a $76.000 en la tienda. Puede que sean productos distintos (el "evolucionado" frente al anterior); hay que confirmarlo.
- "Creatina GMN (33 Servicios)" aparece como 100 g a $180.000, que parece un error de presentación o de precio.

## Media: dos catálogos sin sincronizar

- `public/Catalogo.json` (11 productos, con precios) y `data/catalogo-publico.json` (72 referencias, sin precios) se mantienen por separado.
- La línea deportiva no coincide: el catálogo público tiene Creatine 100 de Iron Nutrition, y la tienda, Creatina GMN.
- Conviene que uno solo sea la fuente y que el otro se genere a partir de él.

## Media: identidad de marca en la web

- La web usa otra paleta (verde #103F29 y terracota) y otras fuentes (Outfit e Inter) que el kit de marca (crema, salvia y ciruela; Fraunces y Nunito Sans; Montserrat en Promo).
- El logo es texto y el ícono de la pestaña es un marcador temporal.
- Los botones de Facebook, Instagram y TikTok del pie no llevan a las cuentas reales.
- Los enlaces de Términos, Privacidad y Envíos no llevan a ninguna página.

## Media: operación sin documentar

Faltan en el repositorio:

- Costos y tiempos de envío fuera de Bogotá.
- Política de cambios y devoluciones.
- Condiciones con ZOI y los otros proveedores (precios de compra, márgenes, pedidos mínimos).
- Inventario.
- Datos legales de la empresa (razón social o NIT, si existen).
- Horario de atención.
- Contexto de My Kids: el siguiente contenido sale de un kit de marca local de Jhoan que todavía no está en el repositorio (carpeta "KIT DE MARCA" en su PC).

## Baja: orden del repositorio

- El repositorio pesa cerca de 1,2 GB por las imágenes y los videos de campaña en `public/`, y todo eso se publica con la web. Convendría moverlos a Drive o a una carpeta fuera de `public/`.
- `mercado/2026-10-22-analisis.md` reemplazó una prueba guardada con la fecha UTC; el informe del 21-oct lo explica.
- La carpeta `.obsidian/` (configuración del editor) está en el repositorio.
- Hay fotos duplicadas con nombres largos generados por lectura automática en `public/imagenes/`.

## Licorera Tour

Ver [Licorera Tour](07-licorera-tour.md#estado). Faltan:

- Redes.
- Marca en Metricool.
- Logo definitivo.
- Horario.
- Precios confirmados.
