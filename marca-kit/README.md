# Kit de marca SentirseBien – Siempre Contigo

Guía obligatoria para los agentes de diseño y de video. La versión completa y visual está en el sistema de diseño: https://claude.ai/artifact/CkKwcXqpjSUEFnaogPus6n. Las indicaciones nuevas de Jhoan llegan por el Panel, en la colección `indicaciones`. Si una indicación activa contradice este archivo, gana la indicación.

## Personalidad: "La amiga que sabe"

SentirseBien es cercana, cálida y confiable. Habla como una amiga que sabe de bienestar natural: tutea, explica fácil, no regaña y no exagera.

- **Así sí:** "Te cuento cómo lo tomo yo: una porción en el café de las 7."
- **Así no:** "¡¡Transforma tu cuerpo YA!!"
- **INVIMA:** sin promesas de salud. Las únicas frases de beneficio permitidas son las de `data/catalogo-publico.json` marcadas con *, con la nota "*Declaración aceptada por el INVIMA para el nutriente". Está prohibido decir "cura", "previene", "trata", "elimina toxinas", "baja de peso", "rejuvenece" o "aliado digestivo", usar antes y después, o crear urgencia falsa.
- **Testimonios y precios:** no se inventan testimonios. **Por ahora no se publica ningún precio** (ni público ni mayorista): cada pieza cierra con "Escríbenos para saber más" y el WhatsApp, para generar curiosidad y conversación.

## Dos estilos de pieza

| Estilo | Cuándo | Colores | Tipografía |
|---|---|---|---|
| **Comunidad** | Recetas, datos curiosos, rutinas, carruseles educativos, videos de comunidad | Fondo `crema` #faf6ee y secciones `salvia` #e6f1e0 o `rosa-suave` #f8e1eb. Texto `carbon` #2f3a37. Acción en `hoja` #17795a. Acento `ciruela` #a62b66 (máximo uno por pieza). | Títulos en **Fraunces SemiBold Soft**, en tipo oración. Textos en **Nunito Sans**. |
| **Promo** | Promociones, lanzamientos, combos, "pruébalo", piezas estáticas de venta | Tema según el empaque del producto (ver abajo). | **Montserrat** ExtraBold 800 para el titular y SemiBold/Bold para el resto. MAYÚSCULAS solo en titular, franja, botón y redes. |

### Estilo Promo, orden fijo de arriba abajo

1. Sello del logo: círculo blanco arriba a la derecha.
2. Titular cruzado en dos líneas: la línea 1 corta, oscura y a la izquierda; la línea 2 es la palabra clave, blanca, más grande y a la derecha. Ninguna línea toca el sello.
3. Franja oscura de lado a lado con el gancho.
4. Frase descriptiva centrada de máximo 2 líneas. No repite la franja.
5. Héroe: Cebollín sosteniendo o abrazando el producto, con sombra en el piso, un corazón de línea y brillos.
6. Nota (solo en 9:16).
7. Botón píldora oscuro: "ESCRÍBENOS PARA SABER MÁS" (sin precio en ninguna parte de la pieza).
8. Pie de redes en 2 columnas: Facebook Sentirse Bien, TikTok @SENTIRSEBIEN26, WhatsApp +57 322 455 9027 e Instagram @SENTIRSEBIENCOL.

**Tema de color = color del empaque del producto.** El fondo y los acentos salen del empaque:

| Tema | Productos |
|---|---|
| `aqua` | Kfir: turquesa y azul oscuro |
| `menta` | Verdes y productos sin color dominante |
| `ciruela` | Colmaré y colágenos con tarro rosado o morado |
| `dorado` | Productos con empaque amarillo o naranja |

Para otro empaque, define `colores` con 4 tonos sacados del empaque.

No uses "Nuevo lanzamiento" ni "Llegó" salvo que ZOI lo esté lanzando de verdad. Para productos que ya llevan tiempo en el mercado usa "¡PRUEBA EL…!", "¡CONOCE…!" o "¡TU…!".

**Plantilla lista:** `python3 marca-kit/plantillas/render_promo.py pieza.json salida.jpg`. Acepta los formatos `4x5`, `9x16` y `1x1`. Hay ejemplos en `marca-kit/ejemplos/`. Usa un espacio sin corte ( ) para que "FOS y GOS" no se parta.

## Tipos de publicación (Panel)

- **Carrusel:** 3 a 5 láminas 4:5 (1080×1350) con estilo Comunidad. Sigue la historia gancho → desarrollo → producto en escena → cierre con logo y WhatsApp.
- **Estática:** una sola imagen 4:5 para el feed, más su versión 9:16 para historias. Usa el estilo Promo, o Comunidad si es un dato o una frase.
- **Video:** 9:16 de 30 a 45 s. Lo hace el agente de video.

Cada día van 3 opciones: **al menos 1 carrusel y al menos 1 estática**. La tercera es la que mejor encaje con el análisis del día.

## Cebollín (ficha oficial)

- **Cuerpo:** es el bulbo de una cebolla y no tiene torso. Es blanco cremoso, liso y satinado, ovalado-achatado, con **tres hojas verdes** arriba.
- **Cara:** ojos negros grandes con un destello de luz, sin nariz, boca pequeña y mejillas rosadas.
- **Bracitos y piecitos:** dos bracitos cortos con manitos de tres dedos y dos piecitos de peluche.
- **Movimiento:** puede mover los bracitos (saludar, señalar, sostener), inclinar el bulbo, parpadear, cambiar de expresión y mecer las hojas. Nunca camina, salta, corre, gira sobre su eje ni hace reverencias.
- **Estilo para piezas Promo y estáticas:** ilustración 2D plana, como `cebollin/cebollin-modelo-2d.jpg`. Ejemplo con producto: `cebollin/cebollin-kfir-fondo-blanco.jpg`.
- **Escenas 3D de cocina:** solo en videos y fotos de ambiente.
- **Voz (obligatoria en videos con voz):** femenina, de chica joven adulta (20 a 25 años), con acento bogotano "rolo" (ni paisa ni costeño). Cálida, cercana, con ritmo pausado y natural, dulce pero con energía. Habla en tuteo. Si se usa voz en off generada, describe esta voz en el prompt de Flow/Veo o del generador de voz. La misma voz se usa en todos los videos.

### Cómo generar Cebollín con un producto en Google Flow

- Modelo **Nano Banana Pro**: las imágenes no gastan créditos.
- Referencias: `cebollin/cebollin-modelo-2d.jpg` y la foto del producto en fondo blanco (`IMAGENES BASE PRODUCTOS ZOI` en Drive o `KEFIR X450 1.png`).
- Fondo blanco liso, sin texto. Recorta después con rembg y rellena el alfa para que no quede transparente (ver `cebollin-kfir-recorte.png`).

## Tipografías en videos

Las fuentes TTF están en `marca-kit/fuentes/`. Úsalas en ffmpeg con `drawtext=fontfile=...`:

- **Textos en pantalla de comunidad:** `NunitoSans-Bold.ttf`. Para un titular grande, `Fraunces-SemiBold-Soft.ttf`.
- **Videos de promo o producto:** `Montserrat-ExtraBold.ttf` para el gancho en MAYÚSCULAS y `Montserrat-SemiBold.ttf` para el resto.
- **Legibilidad:** máximo 7 palabras por pantalla, letra de 64 a 90 px en 1080×1920, buen contraste (caja `carbon` al 70 % o sombra) y al menos 2,5 s en pantalla.
- **Cierre:** `logos/logo-vertical-color.png` sobre `crema`, o el `-blanco` sobre fondo oscuro.

## Logos

En `marca-kit/logos/` están las versiones vertical, horizontal y símbolo, en color, blanco y carbón, además de la foto de perfil. No los estires, no los recolores y no les pongas sombras. Escribe la marca como **SentirseBien**.
