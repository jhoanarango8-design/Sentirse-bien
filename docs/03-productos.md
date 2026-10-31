# 3. Productos y catálogo

[← Índice](README.md)

## Dos catálogos con usos distintos

| Archivo | Para qué | Precios | Productos |
|---|---|---|---|
| `data/catalogo-publico.json` | Textos públicos para redes y fichas: qué es, presentaciones, usos y frases de beneficio aceptadas por el INVIMA (marcadas con *) | No | 72 referencias |
| `public/Catalogo.json` | Catálogo que carga la tienda web y del que salen las páginas `public/p/*.html` | Sí | 11 productos |

`public/Catalogo_backup.json` es una copia anterior y más grande del catálogo de la tienda.

> Los dos catálogos no están sincronizados: la tienda muestra beneficios con promesas de salud que el catálogo público ya corrigió. Ver [Pendientes y riesgos](08-pendientes-y-riesgos.md).

## Líneas de producto (catálogo público)

| Línea | Referencias | Ejemplos |
|---|---|---|
| Pulverizados | 23 | Colágeno marino hidrolizado (natural, mix de frutas, crema de coco), Calcio Coral Marino, Factor de Transferencia, Macca negra + roja, Multivitamínico Vit C-Bina, My Kids Malteada Junior, Proteína Dorada, citratos de magnesio y potasio, ZOI Cleanser, ZOI Detox, Café de Brusca, **Kfir**, superalimentos, vinagres en polvo, Recover, sales hidratantes |
| Homeopática | 12 | Plata y oro coloidal, extractos (Passiflora, Echinacea, Fémina, Árnica-Comp, En-Sueño), Luffa Operculata, Silimarina, Sales de Schüssler |
| Cuidado personal | 11 | Shampoo y acondicionador vegetal, jabones vegetales, geles reductores e hidratantes, aceites corporales |
| Jarabes | 10 | Jarabes ZOI, Gusafin adulto y junior, Refdex, Ocho Extractos, Sangre de Drago, Drops Stevia |
| Aceites vegetales | 5 | Coco virgen, aguacate, sacha inchi, oliva, linaza |
| Vinagres | 5 | Manzana con la madre, con alcachofa, Fusión y Puros Gallo |
| Alimentación saludable | 4 | Semillas ZOI, aceite de coco orgánico Bioessens, turrones de semillas |
| Nutrición deportiva | 2 | Super Mega Gainer (GMN, 2 lb) y Creatine Ultra Pure 100 (Iron Nutrition, 500 g, 100 porciones de 5 g) |

Las fotos están en `public/imagenes/` (nombradas con el número del catálogo ZOI) y las de producto en fondo blanco para el kit en `marca-kit/productos/`.

## Productos foco del contenido

| Producto | Qué es (según etiqueta) | Presentación | Tema de color |
|---|---|---|---|
| **Colmaré** (colágeno hidrolizado ZOI) | Proteína de suero, colágeno hidrolizado, bisglicinato de magnesio y probióticos | Tarro 1000 g, unas 33 porciones | `ciruela` |
| **Kfir** (superalimento en polvo) | A base de quinua y amaranto, con probióticos y prebióticos FOS y GOS, sin azúcar añadida | Bolsa 450 g, unas 15 porciones | `aqua` |
| **Super Mega Gainer GMN** | Hipercalórico de vainilla: 50 g de proteína, 967 calorías y 178 g de carbohidratos por porción preparada | Bolsa 2 lb (908 g), unas 3,5 porciones | `dorado` |
| **Creatine 100** (Iron Nutrition) | Creatina en polvo | Tarro 500 g, 100 porciones de 5 g | rojo y negro del empaque |
| **My Kids** (Malteada Junior) | Malteada para niños sabor cookies and cream | Tarro 1000 g y bolsas | Pendiente |

## Precios

Los precios no se publican en redes por ahora (ver [Administración](04-administracion.md#precios)). Precios de referencia que aparecen en el repositorio:

| Producto | Precio | Fuente |
|---|---|---|
| Colmaré 1000 g | $70.000 | Análisis de mercado del 21 al 24-oct |
| Kfir 450 g | $74.000 | Análisis del 25-oct y `public/Catalogo.json` |
| Colágeno marino 1000 g / 500 g / 250 g | $76.000 / $39.600 / $22.000 | `public/Catalogo.json` |
| Café de Brusca 500 g / 250 g | $44.000 / $24.000 | `public/Catalogo.json` |
| Super Mega Gainer 2 lb | $100.000 | `public/Catalogo.json` |
| Mega Gainer 2 lb | $110.000 | `public/Catalogo.json` |
| Stevia en jarabe | $17.800 | `public/Catalogo.json` |

Confirmar con Jhoan antes de usar cualquier precio.
