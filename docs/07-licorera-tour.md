# 7. Licorera Tour

[← Índice](README.md)

Es el segundo emprendimiento de Jhoan: una licorera de **domicilios por WhatsApp en Bogotá**. Comparte el repositorio, pero tiene marca, reglas y Panel propios. La fuente oficial es `licorera-tour/README.md`.

## Datos del negocio (confirmados por Jhoan el 28-oct-2026)

| Tema | Dato |
|---|---|
| WhatsApp de pedidos | 311 327 8815 · https://wa.me/573113278815 |
| Cobertura | Todo Bogotá, venta sobre pedido |
| Domicilio | $9.000; gratis en compras de más de $300.000 |
| Pagos | Transferencia, Nequi, Llave (Bre-B) y efectivo |

Texto base de cierre: "Pide por WhatsApp 311 327 8815 · Domicilio a todo Bogotá $9.000, gratis desde $300.000 · Paga con transferencia, Nequi, Llave o efectivo."

## Estado

- **Pausado:** no se publica nada hasta tener la marca en Metricool y precios confirmados.
- **Tareas programadas (pausadas):** "Publicaciones Licorera Tour" (diaria, 4:38 p. m.) y "Videos Licorera Tour" (martes y jueves, 4:12 p. m.).
- **Pendientes:**
  - Usuarios de Instagram, Facebook y TikTok.
  - Marca en Metricool.
  - Logo definitivo (hay propuestas en `licorera-tour/logo/logos.html`).
  - Horario.
  - Precios confirmados.
- **Panel:** https://claude.ai/artifact/NDopN9ueGpbAXjYBzixnM1

## Marca

- **Personalidad: "El parcero del plan".** Cercana, rápida y confiable, en tono bogotano, con humor y sin vulgaridad. Así sí: "¿Llegó el viernes y no hay con qué? Te lo llevamos." Así no: "¡Toma hasta caer!"
- **Sin mascota:** el protagonista es el producto.
- **Colores:**
  - Fondo noche #0e0d11 a carbón #1c1a20.
  - Color principal ámbar #d89b2b.
  - Texto blanco y crema.
  - Un acento por categoría (whisky, aguardiente, ron, tequila, cerveza, vino, ginebra, vodka, combo).
- **Tipografía:** Montserrat (las mismas fuentes de `marca-kit/fuentes/`).
- **Logo provisional:** wordmark "LICORERA TOUR" con "DOMICILIOS · BOGOTÁ".
- **Plantilla:** `python3 licorera-tour/plantillas/render_licor.py pieza.json salida.jpg`. Hay ejemplos de Buchanan's, whisky, cerveza y ron en `licorera-tour/ejemplos/`.

## Catálogo

`licorera-tour/data/catalogo.json` (actualizado el 28-oct). Solo se publican productos con `"confirmado": true` y un precio que haya puesto Jhoan. `precio_referencia_mercado` sirve solo para comparar.

## Mercado de licor en Bogotá (análisis del 28-oct-2026)

Resumen de `licorera-tour/mercado/2026-10-28-analisis-licor-bogota.md`:

- **Impuestos 2026:** el Decreto 1474 de 2025 subió el IVA de aguardiente y ron del 5 % al 19 %, además del componente específico y del ad valorem. Los precios subieron entre 20 % y 55 %, y crece el miedo al licor adulterado. Por eso "original y sellado" es un argumento fuerte, si es verdad.
- **Categorías:** 2026 es el año del aguardiente en Bogotá (Antioqueño 24° Verde). La ciudad es muy whiskera y cervecera, y crece la ginebra para coctelería.
- **Competencia:**
  - Búhos Nocturnos: combos del mes con precio tachado y domicilio de $5.000.
  - Domicilios 24/7.
  - El Correo de la Noche: 6 sedes y 385 productos.
- **Picos:**
  - Viernes y sábados.
  - Quincenas (días 15 y 30).
  - Halloween.
  - Partidos de la Selección.
  - Novenas, el 24 y el 31 de diciembre.

## Reglas legales

Ver [Legal y cumplimiento](05-legal-cumplimiento.md#licorera-tour-publicidad-de-bebidas-alcohólicas). Lo más importante:

- Leyendas obligatorias y sello +18 en cada pieza.
- En TikTok, solo contenido de estilo de vida, sin precio y sin pauta.
- Nunca personas que parezcan menores de 25 años.
