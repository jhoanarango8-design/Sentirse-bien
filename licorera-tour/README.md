# Licorera Tour: kit de marca y reglas para los agentes

Licorera Tour es una licorera de **domicilios por WhatsApp en Bogotá**. El protagonista de cada pieza es **el producto**: no hay mascota. Este archivo es la guía obligatoria de los agentes de diseño y de video. Las indicaciones activas del Panel Licorera Tour (colección `indicaciones`) mandan sobre este archivo.

- **Panel Licorera Tour:** https://claude.ai/artifact/NDopN9ueGpbAXjYBzixnM1 (colecciones `indicaciones`, `opciones`, `historias`, `videos`, `sugerencias`, `reportes`; configuración en `estado/config`, con `metricool.blogId` y `pendientes`).
- **Tareas programadas:** "Publicaciones Licorera Tour" (diaria, 4:38 p.m.) y "Videos Licorera Tour" (martes y jueves, 4:12 p.m.). Están **pausadas** hasta que exista la marca en Metricool y haya precios confirmados.

## Datos del negocio (confirmados por Jhoan el 28-oct-2026)

- **WhatsApp de pedidos:** 311 327 8815 (enlace: https://wa.me/573113278815).
- **Cobertura:** todo Bogotá. Venta sobre pedido.
- **Domicilio:** $9.000; **gratis en compras mayores a $300.000**.
- **Medios de pago:** transferencia, Nequi, Llave (Bre-B) y efectivo.
- **Pendientes:** usuarios de Instagram, Facebook y TikTok, marca en Metricool, logo definitivo (hay propuestas en `licorera-tour/logo/`), horario y precios confirmados. Mientras falten precios o la marca en Metricool, no se publica nada.

Texto base de cierre: "Pide por WhatsApp 311 327 8815 · Domicilio a todo Bogotá $9.000, gratis desde $300.000 · Paga con transferencia, Nequi, Llave o efectivo."


## Personalidad: "El parcero del plan"

La marca es cercana, rápida y confiable. Habla como el amigo que siempre sabe dónde conseguir lo del plan: tutea, habla en tono bogotano, es directa y tiene humor, pero sin vulgaridad.

- **Así sí:** "¿Llegó el viernes y no hay con qué? Te lo llevamos."
- **Así no:** "¡Toma hasta caer!" o "Emborráchate barato".
- **Promesas de confianza:** solo las que sean verdad y Jhoan confirme, por ejemplo "Producto original y sellado", "Llega frío" o "Pagas al recibir".

## Identidad visual

| Elemento | Valor |
|---|---|
| Fondo | Noche #0e0d11 → carbón #1c1a20, con un halo de luz detrás del producto |
| Color principal | Ámbar #d89b2b (whisky, botones, precio destacado) |
| Texto | Blanco #ffffff; secundario crema #e9e3da |
| Acento por categoría | Whisky #d89b2b · aguardiente #2f7de1 · ron #c2662d · tequila #3fb68b · cerveza #f2c230 · vino #b0284f · ginebra #5fc3cf · vodka #cfd8e3 · combo #e0a43a |
| Tipografía | Montserrat ExtraBold en MAYÚSCULAS para el gancho y la marca; Montserrat SemiBold/Bold para el resto (fuentes en `../marca-kit/fuentes/`) |
| Logo | Provisional: wordmark "LICORERA TOUR" con "DOMICILIOS · BOGOTÁ" en ámbar. Se reemplaza cuando Jhoan envíe el logo |

**Pieza tipo**, de arriba abajo:

1. Marca.
2. Gancho de 2 a 4 palabras y subgancho.
3. Botella grande con brillo y sombra a la izquierda, y el precio grande a la derecha. Puede llevar una cinta ("PRECIO DE LA SEMANA") o un precio anterior tachado, solo si es real.
4. Nombre exacto del producto.
5. Botón ámbar "PIDE POR WHATSAPP" con el número.
6. Leyendas legales con el sello +18.

**Plantilla:** `python3 licorera-tour/plantillas/render_licor.py pieza.json salida.jpg`, en formatos `4x5`, `9x16` y `1x1`. Hay ejemplos en `licorera-tour/ejemplos/`.

**Fotos del producto:**
- Usa la foto real de la botella sin fondo (PNG), con la etiqueta nítida y sin deformar.
- Si la generas en Google Flow o Pomelli, usa la foto real como referencia y revisa que el texto de la etiqueta salga idéntico; si no, rehazla.
- Nunca inventes etiquetas ni marcas.
- Para combos usa `producto_imgs` con 2 o 3 PNG.

## Reglas legales y de plataformas (obligatorias)

1. **Leyendas en cada pieza y en cada texto:**
   - "El exceso de alcohol es perjudicial para la salud."
   - "Prohíbese el expendio de bebidas embriagantes a menores de edad."

   Van además el sello +18 y, en el texto, "Venta solo a mayores de 18 años". La plantilla ya los incluye.
2. **Nunca:**
   - Personas que parezcan menores de 25 años.
   - Embarazadas.
   - Consumo excesivo o competencias de beber.
   - Alcohol junto a conducir, deportes, éxito sexual, social o profesional.
   - Consumo en vía pública.
   - El alcohol como premio en sorteos.
   - Propiedades medicinales.
   - Textos en otro idioma que engañen (Decreto 780 de 2016).
3. **Precios:** el precio público con IVA va en cada pieza de venta. Usa solo precios de `licorera-tour/data/catalogo.json` marcados `"confirmado": true` por Jhoan; nunca los inventes ni los copies de la competencia. Si falta, la pieza no se publica. Precio tachado solo si el precio anterior es real.
4. **Instagram y Facebook:** se permite publicar y vender. Para anuncios pagados en Meta, segmentar solo a mayores de 18 años en Colombia y seguir la política de alcohol de Meta.
5. **TikTok:**
   - La política de anuncios de TikTok prohíbe por regla general los anuncios de "venta y entrega de bebidas alcohólicas" (con excepciones por país).
   - Sus normas de comunidad restringen el comercio de productos regulados.
   - Por eso en TikTok solo se publica contenido de estilo de vida: cocteles, maridajes, "cómo servir", datos curiosos, el plan del fin de semana. Va sin precio ni "pide ya"; el WhatsApp queda solo en la biografía.
   - No se pautan anuncios en TikTok.
6. **Ley seca y horarios:**
   - Revisa si hay ley seca (elecciones o decretos de la Alcaldía) antes de programar, y no publiques promociones esos días.
   - Los domicilios a viviendas no tienen la restricción horaria de los establecimientos, pero hay que verificar la edad al entregar y no entregar para consumir en la calle.
7. **Precios de la competencia:** no copies textos ni fotos de otras cuentas. Adapta los patrones sin copiar.

## Tipos de publicación

- **Estática de precio** (4:5 + 9:16): una botella, gancho y precio. Es el formato principal.
- **Combo** (4:5 + 9:16): botella con gaseosa, hielo o snack, con precio del combo.
- **Carrusel** (3 a 5 láminas 4:5): "¿Qué llevo para…?" (el asado, la novena, Halloween, el partido), top 3 de la semana o "aguardiente con o sin azúcar".
- **Video** (9:16, 15 a 30 s): producto girando o "unboxing" del domicilio, el pedido llegando, coctel paso a paso o "3 planes para el viernes". Va con texto grande, sin personas que parezcan menores de 25 y con las leyendas en el cierre.
- **Historia del día** (9:16): la oferta del día.

**Calendario fuerte:**
- Viernes y sábados por la tarde y noche.
- Quincenas (días 15 y 30).
- Halloween (31 de octubre).
- Partidos de la Selección.
- Novenas, el 24 y el 31 de diciembre.

Horas sugeridas: entre semana 5:00 p.m. y 7:30 p.m.; viernes y sábados 12:00 m. y 6:00 p.m. Ajusta las horas con las métricas de Metricool.
