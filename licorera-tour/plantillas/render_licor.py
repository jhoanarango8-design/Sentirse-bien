#!/usr/bin/env python3
"""Plantilla de piezas de Licorera Tour (sin mascota: el producto es el protagonista).

Uso:
    python3 licorera-tour/plantillas/render_licor.py pieza.json salida.jpg

pieza.json:
{
  "formato": "4x5" | "9x16" | "1x1",
  "categoria": "whisky" | "aguardiente" | "ron" | "tequila" | "cerveza" | "vino" | "ginebra" | "vodka" | "combo",
  "colores": {"acento": "#d89b2b"}            # opcional: sobrescribe el acento de la categoría
  "gancho": "¿PLAN DE VIERNES?",              # 2 a 4 palabras, MAYÚSCULAS
  "subgancho": "Te lo llevamos a la puerta",  # opcional, tipo oración
  "producto": "Buchanan's Deluxe 12 años",    # nombre exacto de la etiqueta
  "presentacion": "750 ml",
  "precio": "$170.000",                       # precio público con IVA (obligatorio en Licorera Tour)
  "antes": "$185.000",                        # opcional: precio tachado (solo si es real)
  "etiqueta": "PRECIO DE LA SEMANA",          # opcional: cinta sobre el precio
  "producto_img": "ruta/a/botella.png",       # PNG sin fondo (o varias: "producto_imgs": [..] para combos)
  "cta": "PIDE POR WHATSAPP",
  "whatsapp": "3XX XXX XXXX",
  "extra": "Domicilio en Bogotá · Pagas con Nequi, Daviplata o tarjeta"
}
Las leyendas legales (Ley 30 de 1986 / Decreto 780 de 2016) se agregan siempre.
"""
import json, sys, pathlib, html

ROOT = pathlib.Path(__file__).resolve().parent.parent      # licorera-tour/
FUENTES = ROOT.parent / "marca-kit" / "fuentes"
CAT = {
    "whisky": "#d89b2b", "aguardiente": "#2f7de1", "ron": "#c2662d", "tequila": "#3fb68b",
    "cerveza": "#f2c230", "vino": "#b0284f", "ginebra": "#5fc3cf", "vodka": "#cfd8e3", "combo": "#e0a43a",
}
FORMATOS = {"9x16": (1080, 1920), "4x5": (1080, 1350), "1x1": (1080, 1080)}
LEGAL = "EL EXCESO DE ALCOHOL ES PERJUDICIAL PARA LA SALUD. PROHÍBESE EL EXPENDIO DE BEBIDAS EMBRIAGANTES A MENORES DE EDAD."


def build(p):
    W, H = FORMATOS[p.get("formato", "4x5")]
    ac = (p.get("colores") or {}).get("acento") or CAT.get(p.get("categoria", "whisky"), "#d89b2b")
    e = lambda t: html.escape(t or "")
    tall = H == 1920
    k = 1.0 if tall else (0.86 if H == 1350 else 0.74)
    imgs = p.get("producto_imgs") or ([p["producto_img"]] if p.get("producto_img") else [])
    imgs = [pathlib.Path(i).resolve().as_uri() for i in imgs]
    # zonas por formato (9x16 respeta 250 px arriba y abajo para historias)
    Z = {1920: dict(top=230, hero=(690, 650), nombre=1360, cta=1432, extra=None, legal_b=236),
         1350: dict(top=44, hero=(380, 610), nombre=1000, cta=1072, extra=None, legal_b=24),
         1080: dict(top=36, hero=(300, 470), nombre=780, cta=845, extra=None, legal_b=20)}[H]
    hero_top, hero_h = Z["hero"]
    antes = f'<div class="antes">{e(p.get("antes"))}</div>' if p.get("antes") else ""
    cinta = f'<div class="cinta">{e(p.get("etiqueta"))}</div>' if p.get("etiqueta") else ""
    n = max(1, len(imgs))
    prod = "".join(
        f'<img src="{u}" style="height:{hero_h*(0.96 if n==1 else 0.86)}px;margin:0 {-30*k if n>1 else 0}px;z-index:{10-abs(i-(n-1)/2)*2:.0f}">'
        for i, u in enumerate(imgs))
    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face{{font-family:M;src:url({(FUENTES/'Montserrat-SemiBold.ttf').as_uri()});font-weight:600}}
@font-face{{font-family:M;src:url({(FUENTES/'Montserrat-Bold.ttf').as_uri()});font-weight:700}}
@font-face{{font-family:M;src:url({(FUENTES/'Montserrat-ExtraBold.ttf').as_uri()});font-weight:800}}
html,body{{margin:0}}
body{{width:{W}px;height:{H}px;position:relative;overflow:hidden;font-family:M,sans-serif;color:#fff;
background:radial-gradient(60% 40% at 38% {(hero_top+hero_h*0.5)/H*100:.0f}%,{ac}55 0%,{ac}18 40%,transparent 70%),linear-gradient(180deg,#121016 0%,#0b0a0d 55%,#15100c 100%)}}
.grain{{position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(255,255,255,.018) 0 2px,transparent 2px 9px)}}
.top{{position:absolute;left:{60*k}px;right:{60*k}px;top:{Z['top']}px;display:flex;flex-direction:column;align-items:center;text-align:center}}\n.logo{{line-height:1}}
.logo b{{display:block;font-weight:800;font-size:{46*k}px;letter-spacing:{9*k}px}}
.logo span{{display:block;margin-top:{8*k}px;font-weight:600;font-size:{17*k}px;letter-spacing:{6*k}px;color:{ac}}}
.logo i{{display:block;margin:{12*k}px auto 0;width:{80*k}px;height:3px;background:{ac}}}
.gancho{{margin-top:{30*k}px;font-weight:800;font-size:{(110 if tall else 84)*k}px;line-height:.98;letter-spacing:-2px;text-wrap:balance;text-shadow:0 6px 30px rgba(0,0,0,.6)}}
.sub{{margin-top:{14*k}px;font-weight:600;font-size:{38*k}px;color:{ac}}}
.hero{{position:absolute;left:{40*k}px;width:{W*0.58}px;top:{hero_top}px;height:{hero_h}px;display:flex;justify-content:center;align-items:flex-end}}
.hero img{{position:relative;filter:drop-shadow(0 30px 40px rgba(0,0,0,.65))}}
.piso{{position:absolute;left:{40*k+W*0.29-260*k}px;top:{hero_top+hero_h-20*k}px;width:{520*k}px;height:{46*k}px;border-radius:50%;background:radial-gradient(closest-side,{ac}66,transparent)}}
.precio{{position:absolute;right:{54*k}px;left:{W*0.56}px;top:{hero_top+hero_h*0.28}px;text-align:right}}
.cinta{{display:inline-block;background:{ac};color:#111;font-weight:800;font-size:{22*k}px;letter-spacing:1px;padding:{8*k}px {14*k}px;border-radius:6px;margin-bottom:{10*k}px}}
.antes{{font-weight:600;font-size:{34*k}px;color:#bdb6ad;text-decoration:line-through}}
.valor{{font-weight:800;font-size:{(84 if tall else 80)*k}px;letter-spacing:-2px;line-height:1;text-shadow:0 4px 20px rgba(0,0,0,.6)}}
.pres{{font-weight:600;font-size:{30*k}px;color:#e9e3da;margin-top:{6*k}px}}
.nombre{{position:absolute;left:{60*k}px;right:{60*k}px;top:{Z['nombre']}px;text-align:center;font-weight:700;font-size:{40*k}px;line-height:1.15}}
.cta{{position:absolute;left:50%;transform:translateX(-50%);top:{Z['cta']}px;background:{ac};color:#111;border-radius:999px;padding:{22*k}px {48*k}px;white-space:nowrap;text-align:center;line-height:1.05}}
.cta b{{display:block;font-weight:800;font-size:{38*k}px;letter-spacing:1px}}
.cta span{{display:block;font-weight:800;font-size:{46*k}px;margin-top:{4*k}px}}
.extra{{position:absolute;left:{60*k}px;right:{60*k}px;top:{Z['extra'] or 0}px;text-align:center;font-weight:600;font-size:{26*k}px;color:#d8d2c8}}
.legal{{position:absolute;left:{40*k}px;right:{40*k}px;bottom:{Z['legal_b']}px;display:flex;align-items:center;gap:{16*k}px;border-top:1px solid rgba(255,255,255,.25);padding-top:{14*k}px}}
.legal .edad{{flex:0 0 auto;width:{64*k}px;height:{64*k}px;border-radius:50%;border:3px solid #fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:{24*k}px}}
.legal p{{margin:0;font-weight:600;font-size:{18*k}px;line-height:1.3;letter-spacing:.3px;color:#e8e3dc}}
</style></head><body><div class="grain"></div>
<div class="top"><div class="logo"><b>LICORERA TOUR</b><span>DOMICILIOS · BOGOTÁ</span><i></i></div>
<div class="gancho">{e(p.get('gancho'))}</div>
{f'<div class="sub">{e(p.get("subgancho"))}</div>' if p.get('subgancho') else ''}</div>
<div class="piso"></div>
<div class="hero">{prod}</div>
<div class="precio">{cinta}{antes}<div class="valor">{e(p.get('precio'))}</div><div class="pres">{e(p.get('presentacion'))}</div></div>
<div class="nombre">{e(p.get('producto'))}</div>
<div class="cta"><b>{e(p.get('cta','PIDE POR WHATSAPP'))}</b><span>{e(p.get('whatsapp',''))}</span></div>
{f'<div class="extra">{e(p.get("extra"))}</div>' if (p.get('extra') and Z['extra']) else ''}
<div class="legal"><div class="edad">+18</div><p>{LEGAL}</p></div>
</body></html>""", (W, H)


def main():
    p = json.load(open(sys.argv[1], encoding="utf-8"))
    out = pathlib.Path(sys.argv[2]).resolve()
    doc, (W, H) = build(p)
    tmp = out.with_suffix(".html"); tmp.write_text(doc, encoding="utf-8")
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page(viewport={"width": W, "height": H})
        pg.goto(tmp.as_uri()); pg.wait_for_timeout(700)
        png = out.with_suffix(".png"); pg.screenshot(path=str(png)); b.close()
    if out.suffix.lower() in (".jpg", ".jpeg"):
        from PIL import Image
        Image.open(png).convert("RGB").save(out, quality=92); png.unlink()
    tmp.unlink(); print(out)


if __name__ == "__main__":
    main()
