# 2. Marketing

[← Índice](README.md)

Resumen de la marca, el contenido y el mercado. Las reglas completas están en `marca-kit/README.md` (kit de marca) y `mercado/guia-videos.md` (videos). Las indicaciones nuevas de Jhoan llegan por el Panel (colección `indicaciones`) y mandan sobre estos archivos.

## 2.1 Marca

**Personalidad: "La amiga que sabe".** Cercana, cálida y confiable. Tutea, explica fácil, no regaña y no exagera.

- Así sí: "Te cuento cómo lo tomo yo: una porción en el café de las 7."
- Así no: "¡¡Transforma tu cuerpo YA!!"

**Regla de oro actual:** no se publica ningún precio. Toda pieza cierra con **"Escríbenos para saber más"** y el WhatsApp. No se inventan testimonios. No hay promesas de salud (ver [Legal](05-legal-cumplimiento.md)).

### Colores y tipografías

| Estilo | Cuándo | Colores | Tipografía |
|---|---|---|---|
| **Comunidad** | Recetas, datos curiosos, rutinas, carruseles educativos | Crema #faf6ee, salvia #e6f1e0, rosa suave #f8e1eb, texto carbón #2f3a37, acción hoja #17795a, acento ciruela #a62b66 (uno por pieza) | Títulos Fraunces SemiBold Soft; textos Nunito Sans |
| **Promo** | Promociones, "pruébalo", estáticas de venta | Tema según el empaque: `aqua` (Kfir), `menta` (verdes o sin color dominante), `ciruela` (Colmaré y colágenos rosados o morados), `dorado` (amarillos o naranjas) | Montserrat ExtraBold para el titular; SemiBold/Bold para el resto |

Las fuentes están en `marca-kit/fuentes/` y los logos (vertical, horizontal y símbolo, en color, blanco y carbón, más la foto de perfil) en `marca-kit/logos/`. Los logos no se estiran, recolorean ni llevan sombra.

### Pieza Promo (orden fijo)

Sello del logo arriba a la derecha → titular cruzado en dos líneas → franja oscura con el gancho → frase descriptiva → Cebollín con el producto → nota (solo 9:16) → botón "ESCRÍBENOS PARA SABER MÁS" → pie de redes. Se genera con `python3 marca-kit/plantillas/render_promo.py pieza.json salida.jpg` en 4x5, 9x16 y 1x1; ejemplos en `marca-kit/ejemplos/`.

No se usa "Nuevo lanzamiento" ni "Llegó" salvo que ZOI de verdad esté lanzando. Para productos conocidos: "¡PRUEBA EL…!", "¡CONOCE…!", "¡TU…!".

## 2.2 Cebollín

- **Cuerpo:** bulbo de cebolla blanco cremoso, sin torso, con tres hojas verdes. Ojos negros grandes con destello, sin nariz, boca pequeña y mejillas rosadas. Bracitos con manitos de tres dedos y piecitos de peluche.
- **Movimiento permitido:** mover los bracitos, inclinar el bulbo, parpadear, cambiar de expresión, mecer las hojas. **Nunca** camina, salta, corre ni gira.
- **Estilo:** 2D plano en piezas Promo y estáticas (`marca-kit/cebollin/cebollin-modelo-2d.jpg`); 3D de cocina solo en videos y fotos de ambiente.
- **Voz:** femenina, joven adulta (20 a 25 años), acento bogotano "rolo", cálida y pausada, en tuteo. La misma en todos los videos.
- **Cómo generarlo:** Google Flow con Nano Banana Pro, usando el modelo 2D y la foto del producto en fondo blanco; luego recorte con rembg. Recortes listos en `marca-kit/cebollin/` (Kfir, Kfir batido, gainer y creatina).

## 2.3 Redes y tipos de publicación

| Red | Cuenta |
|---|---|
| Instagram | @SENTIRSEBIENCOL |
| TikTok | @SENTIRSEBIEN26 |
| Facebook | Sentirse Bien |

| Tipo | Formato | Estilo |
|---|---|---|
| Carrusel | 3 a 5 láminas 4:5 (1080×1350): gancho → desarrollo → producto en escena → cierre con logo y WhatsApp | Comunidad |
| Estática | Una imagen 4:5 más su versión 9:16 para historias | Promo, o Comunidad si es un dato |
| Historia | 9:16, normalmente la versión vertical de la estática del día | Promo |
| Video | 9:16, 30 a 45 s, con voz en off | Ver 2.5 |

## 2.4 Rutina diaria de contenido

Cada tarde (hora de Bogotá) se hace un **análisis de mercado** y se proponen **3 opciones para el día siguiente**: al menos 1 carrusel y al menos 1 estática; la tercera es la que mejor encaje con el análisis (desde el 25-oct puede ser de nutrición deportiva). Jhoan aprueba en el Panel y se programan en Metricool.

- Informes en `mercado/AAAA-MM-DD-analisis.md` (del 21 al 30 de octubre de 2026).
- Piezas en `public/campana/propuestas/` (unas 130 imágenes).
- Horas usadas: 10:00, 12:00 y 18:00; se evita chocar con lo ya programado.
- **Cuentas a seguir:** solo las aprobadas en el Panel, máximo 3 por día desde @sentirsebiencol. Nunca se da me gusta, se comenta ni se escribe desde la cuenta.

### Temas trabajados hasta ahora

| Fechas | Producto foco | Ángulos |
|---|---|---|
| 22 al 25 oct | **Colmaré** (colágeno hidrolizado ZOI con proteína de suero, bisglicinato de magnesio y probióticos) | "Todo en un tarro", voltea la etiqueta, avena de noche, mañanas con afán con Cebollín, batido de sábado, detalle de regalo, palabra del día (bisglicinato), plan de domingo |
| 26 oct al 1 nov | **Semana del Kfir** (superalimento en polvo de quinua y amaranto con probióticos y prebióticos FOS y GOS) | "Viene en polvo", ¿qué trae tu Kfir?, Kfir para llevar, ¿cómo te gusta tu Kfir?, receta-antojo de Halloween, "¡Sin trucos!", 3 formas de tomarlo, quinua y amaranto explicados |
| Tercera opción | **Deportivos**: Super Mega Gainer GMN y Creatine 100 | Solo datos de etiqueta: "¿Qué es un gainer?", Promo Creatine 100 (5 g por porción, 100 porciones, 500 g) |

### Lo que funciona en el mercado (según los análisis)

- Carruseles de curiosidad ("dale zoom y juzga en los comentarios", de ZOI).
- "Formas de tomarlo" (café, batido, avena, postre) y recetas caseras.
- Explicar ingredientes en simple (qué es "hidrolizado", qué es el bisglicinato).
- Llamado por palabra clave por WhatsApp ("escríbenos KFIR"), como ZOI.
- Preguntas que invitan a comentar ("¿Cómo te tomas tu Colmaré?").
- Practicidad (en polvo, para llevar, listo en 2 minutos).
- Transparencia y etiqueta clara como diferencial frente a la pauta con promesas.

## 2.5 Videos

Guía aprobada por Jhoan el 21-oct-2026 (`mercado/guia-videos.md`). Resumen:

- **Objetivo:** llamar la atención y crear comunidad. No son anuncios: nunca hay precio. El cierre invita a guardar, comentar o seguir.
- **Formato:** 9:16, 1080×1920, de 30 a 45 s, con voz en off (máximo 75 palabras por cada 30 s).
- **Texto en pantalla:** máximo 7 palabras, letra de 64 a 90 px, al menos 2,5 s por texto, máximo 2 líneas.
- **Gancho en el primer segundo** y toma nueva cada 3 a 5 s.
- **El tarro siempre integrado en la escena**, nunca recortado sobre un fondo plano.
- **Prioridad de tomas:** clips reales de `public/campana/clips/` (los graba Jhoan en vertical, con luz natural, de 4 a 6 s) y después Flow con la foto real del tarro.
- **Cebollín** en al menos uno de cada dos videos.
- **Estructuras:** A) receta paso a paso, B) 3 formas de tomarlo, C) Cebollín presenta, D) ritual o POV.
- **Recetas:** 8 recetas para Colmaré (4 del recetario ZOI, que se presentan como "Receta ZOI" con mención a @zoi.naturales, y 4 propias). No se copian los "Plus ZOI" porque hacen promesas.
- Videos hechos: `public/campana/videos/` (22, 23, 27 y 30 de octubre, dos por día, con portada).

## 2.6 Competencia y referencias

Lista completa en `mercado/cuentas-referencia.md`.

**ZOI (marca que distribuimos):** Instagram @zoi.naturales y @zoicosmeticos, TikTok @zoinatural. En octubre de 2026 celebró 7 años y presentó su colágeno marino "evolucionado" (más proteína, probióticos y bisglicinato de magnesio). Su tono es de transparencia ("conoce lo que dice su etiqueta").

**Marcas y tiendas que se miran:** Healthy America Colombia, Funat Ser Saludable, Laboratorios Natural Freshly, ElevHer Wellness, NaturVital, Mis Vitaminas, Beauty Boost, Vitaliah, Naturalma, Tienda Naturista Muy Natural, Natural Be, Solverde y Huitaka (tienda pequeña de Bosa con un modelo muy parecido al nuestro).

**Herramienta:** Biblioteca de anuncios de Meta para Colombia.

## 2.7 Pauta

- **TikTok Ads:** se administra el presupuesto diario que indique Jhoan con "Promocionar" o Ads Manager; el agente elige video, público y objetivo, mide y propone ajustes diarios en el Panel para que Jhoan los active.
- **Metricool:** programación y métricas de las publicaciones; ajustar las horas con sus datos.
