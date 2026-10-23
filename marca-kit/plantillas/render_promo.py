#!/usr/bin/env python3
"""Plantilla "Estilo Promo" de SentirseBien.

Uso:
    python3 marca-kit/plantillas/render_promo.py pieza.json salida.jpg

pieza.json (todos los textos en español; MAYÚSCULAS solo en titular, franja y botón):
{
  "formato": "4x5" | "9x16" | "1x1",
  "tema": "aqua" | "menta" | "ciruela" | "dorado"   (o "colores": {"fondo1","fondo2","acento","oscuro"}),
  "titular1": "¡PRUEBA EL",            # línea corta, color oscuro, a la izquierda
  "titular2": "KFIR!",                 # palabra clave, blanca, grande, a la derecha
  "franja": "SUPERALIMENTO EN POLVO DE ZOI · 450 G",
  "cuerpo": "Con probióticos y prebióticos (FOS y GOS), a base de quinua y amaranto",
  "heroe": "ruta/a/cebollin-con-producto.png",   # PNG transparente (Cebollín + producto)
  "nota": "Sin azúcar añadida.",       # opcional (se omite en 4x5 si no cabe)
  "boton": "PIDE EL TUYO",
  "precio": "$74.000"                  # opcional: círculo junto al producto
}
Requiere: pip install playwright (Chromium ya instalado en el entorno de Claude).
"""
import json, sys, pathlib, html

KIT = pathlib.Path(__file__).resolve().parent.parent
TEMAS = {
    # fondo1 (arriba), fondo2 (abajo), acento (manchas), oscuro (textos, franja, botón)
    "menta":   {"fondo1": "#6bbf98", "fondo2": "#9ad8bb", "acento": "#3d8c64", "oscuro": "#1b4a33"},
    "aqua":    {"fondo1": "#5fc3cf", "fondo2": "#b4e6ea", "acento": "#2bb1c2", "oscuro": "#1f3a52"},
    "ciruela": {"fondo1": "#c25a8f", "fondo2": "#f3c6db", "acento": "#a62b66", "oscuro": "#5a1638"},
    "dorado":  {"fondo1": "#e9b44c", "fondo2": "#f8e2ae", "acento": "#c98a1b", "oscuro": "#4a3410"},
}
FORMATOS = {"9x16": (1080, 1920), "4x5": (1080, 1350), "1x1": (1080, 1080)}


def build(p):
    W, H = FORMATOS[p.get("formato", "4x5")]
    c = dict(TEMAS[p.get("tema", "menta")])
    c.update(p.get("colores") or {})
    s = H / 1920 if H != 1920 else 1.0
    s = max(s, 0.62)
    tall = H == 1920
    e = lambda t: html.escape(t or "")
    f = KIT / "fuentes"
    logo = KIT / "logos" / "logo-vertical-color.png"
    heroe = pathlib.Path(p["heroe"]).resolve()
    # alturas de cada bloque (px)
    if tall:
        y = dict(t1=150, t2=268, banda=470, cuerpo=610, heroe=770, heroeH=700, nota=1500, cta=1620, pie=1764)
    elif H == 1350:
        y = dict(t1=96, t2=176, banda=322, cuerpo=420, heroe=532, heroeH=560, nota=None, cta=1110, pie=1218)
    else:
        y = dict(t1=80, t2=150, banda=272, cuerpo=356, heroe=452, heroeH=420, nota=None, cta=884, pie=980)
    k = 1.0 if tall else (0.78 if H == 1350 else 0.68)
    nota = p.get("nota") if (y["nota"] and p.get("nota")) else ""
    precio = p.get("precio")
    t2size = 176 if len(p.get("titular2", "")) <= 6 else 150
    t1size = 132 if len(p.get("titular1", "")) <= 9 else 108
    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face{{font-family:M;src:url({(f/'Montserrat-SemiBold.ttf').as_uri()});font-weight:600}}
@font-face{{font-family:M;src:url({(f/'Montserrat-Bold.ttf').as_uri()});font-weight:700}}
@font-face{{font-family:M;src:url({(f/'Montserrat-ExtraBold.ttf').as_uri()});font-weight:800}}
html,body{{margin:0}}
body{{width:{W}px;height:{H}px;position:relative;overflow:hidden;font-family:M,sans-serif;color:{c['oscuro']};
background:linear-gradient(180deg,{c['fondo1']} 0%,{c['fondo2']} 70%,{c['fondo1']}33 100%)}}
svg.bg{{position:absolute;inset:0}}
.badge{{position:absolute;right:{46*k}px;top:{34*k}px;width:{178*k}px;height:{178*k}px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(0,0,0,.18)}}
.badge img{{width:{132*k}px}}
.t1{{position:absolute;left:{62*k}px;top:{y['t1']}px;font-weight:800;font-size:{t1size*k}px;line-height:1;letter-spacing:-2px;white-space:nowrap}}
.t2{{position:absolute;right:{70*k}px;top:{y['t2']}px;font-weight:800;font-size:{t2size*k}px;line-height:1;letter-spacing:-3px;color:#fff;text-shadow:0 {6*k}px 0 {c['oscuro']}55;white-space:nowrap}}
.banda{{position:absolute;left:0;right:0;top:{y['banda']}px;height:{96*k}px;background:{c['oscuro']};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:{44*k}px;letter-spacing:-.5px;padding:0 24px;text-align:center}}
.cuerpo{{position:absolute;left:{80*k}px;right:{80*k}px;top:{y['cuerpo']}px;text-align:center;font-weight:600;font-size:{42*k}px;line-height:1.3;text-wrap:balance}}
.heroe{{position:absolute;left:0;right:0;top:{y['heroe']}px;height:{y['heroeH']}px}}
.heroe img{{position:absolute;left:50%;bottom:{18*k}px;transform:translateX(-50%);max-height:{y['heroeH']-20}px;max-width:{720*k/ (1 if tall else 0.92)}px}}
.precio{{position:absolute;right:{110*k}px;top:{40*k}px;width:{190*k}px;height:{190*k}px;border-radius:50%;background:{c['oscuro']};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:{44*k}px;transform:rotate(-8deg);box-shadow:0 6px 0 #0002}}
.nota{{position:absolute;left:150px;right:150px;top:{y['nota'] or 0}px;text-align:center;font-weight:600;font-size:36px;line-height:1.3;text-wrap:balance}}
.cta{{position:absolute;left:50%;transform:translateX(-50%);top:{y['cta']}px;width:{510*k}px;height:{86*k}px;border-radius:{24*k}px;background:{c['oscuro']};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:{46*k}px;letter-spacing:.5px}}
.pie{{position:absolute;left:{100*k}px;right:{80*k}px;top:{y['pie']}px;display:grid;grid-template-columns:1fr 2px 1fr;column-gap:{36*k}px;font-weight:700;font-size:{31*k}px}}
.pie .col{{display:flex;flex-direction:column;gap:{22*k}px}}
.pie .sep{{background:{c['oscuro']};height:{100*k}px;margin-top:4px}}
.it{{display:flex;align-items:center;gap:12px;white-space:nowrap}}
.it svg{{width:{34*k}px;height:{34*k}px;flex:0 0 auto}}
</style></head><body>
<svg class="bg" viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">
<path d="M0 0H{W}V{120*s}C{900} {190*s} 760 {90*s} 560 {150*s}C380 {205*s} 250 {330*s} 0 {300*s}Z" fill="{c['acento']}" opacity=".55"/>
<path d="M{W} {800*s}C990 {830*s} 950 {920*s} 990 {1010*s}C1030 {1090*s} 1065 {1120*s} {W} {1130*s}Z" fill="{c['oscuro']}" opacity=".9"/>
<path d="M0 {760*s}C70 {780*s} 115 {860*s} 100 {940*s}C85 {1010*s} 35 {1045*s} 0 {1050*s}Z" fill="{c['acento']}"/>
<g fill="#fff" opacity=".45"><circle cx="90" cy="{1120*s}" r="{26*k}"/><circle cx="150" cy="{1190*s}" r="{12*k}"/><circle cx="990" cy="{1180*s}" r="{20*k}"/><circle cx="1030" cy="{1250*s}" r="{10*k}"/><circle cx="1000" cy="{440*s}" r="9"/><circle cx="40" cy="{430*s}" r="14"/></g>
<g fill="none" stroke="#fff" stroke-width="5" opacity=".5"><circle cx="900" cy="{1100*s}" r="{34*k}"/><circle cx="170" cy="{1080*s}" r="{18*k}"/></g>
<path d="M0 {H-230*k}C150 {H-290*k} 320 {H-200*k} 480 {H-240*k}C640 {H-280*k} 760 {H-320*k} 900 {H-280*k}C990 {H-255*k} 1040 {H-230*k} {W} {H-240*k}V{H}H0Z" fill="#fff" opacity=".55"/>
</svg>
<div class="badge"><img src="{logo.as_uri()}" alt=""></div>
<div class="t1">{e(p.get('titular1'))}</div>
<div class="t2">{e(p.get('titular2'))}</div>
<div class="banda">{e(p.get('franja'))}</div>
<div class="cuerpo">{e(p.get('cuerpo'))}</div>
<div class="heroe">
<svg viewBox="0 0 1080 {y['heroeH']}" style="position:absolute;inset:0" aria-hidden="true">
<ellipse cx="560" cy="{y['heroeH']-14}" rx="{250*k}" ry="{18*k}" fill="{c['oscuro']}" opacity=".18"/>
<path d="M{150} {150*k}c-14-24-50-18-48 10 2 22 34 42 48 58 14-16 46-36 48-58 2-28-34-34-48-10z" fill="none" stroke="{c['oscuro']}" stroke-width="7" stroke-linejoin="round"/>
<g stroke="{c['oscuro']}" stroke-width="8" stroke-linecap="round"><path d="M935 {260*k}l44-26"/><path d="M947 {320*k}l52 0"/><path d="M935 {380*k}l44 24"/><path d="M120 {470*k}l-44-14"/><path d="M124 {520*k}l-50 6"/></g>
</svg>
<img src="{heroe.as_uri()}" alt="">
{f'<div class="precio">{e(precio)}</div>' if precio else ''}
</div>
{f'<div class="nota">{e(nota)}</div>' if nota else ''}
<div class="cta">{e(p.get('boton','PIDE EL TUYO'))}</div>
<div class="pie">
<div class="col">
<div class="it"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="{c['oscuro']}"/><path d="M13.2 19v-6h2l.3-2.4h-2.3V9.2c0-.7.2-1.2 1.2-1.2h1.2V5.9c-.2 0-1-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.7H8.8V13h2V19z" fill="#fff"/></svg>Sentirse Bien</div>
<div class="it"><svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="5" fill="{c['oscuro']}"/><path d="M13.5 5.5v8.2a2.4 2.4 0 1 1-2-2.4V9a4.6 4.6 0 1 0 4.2 4.6V9.6a5 5 0 0 0 2.8.9V8.3a3 3 0 0 1-3-2.8z" fill="#fff"/></svg>@SENTIRSEBIEN26</div>
</div>
<div class="sep"></div>
<div class="col">
<div class="it"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="{c['oscuro']}"/><path d="M6.5 17.5l.8-2.6a5.6 5.6 0 1 1 2.1 2z" fill="none" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>+57 322 455 9027</div>
<div class="it"><svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="6" fill="{c['oscuro']}"/><rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="16" cy="8" r="1" fill="#fff"/></svg>@SENTIRSEBIENCOL</div>
</div>
</div>
</body></html>""", (W, H)


def main():
    p = json.load(open(sys.argv[1], encoding="utf-8"))
    out = pathlib.Path(sys.argv[2]).resolve()
    doc, (W, H) = build(p)
    tmp = out.with_suffix(".html")
    tmp.write_text(doc, encoding="utf-8")
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={"width": W, "height": H})
        pg.goto(tmp.as_uri())
        pg.wait_for_timeout(700)
        png = out.with_suffix(".png")
        pg.screenshot(path=str(png))
        b.close()
    if out.suffix.lower() in (".jpg", ".jpeg"):
        from PIL import Image
        Image.open(png).convert("RGB").save(out, quality=92)
        png.unlink()
    tmp.unlink()
    print(out)


if __name__ == "__main__":
    main()
