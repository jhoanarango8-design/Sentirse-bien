// Visor 3D del tarro de Colmaré: la etiqueta plana de ZOI envuelve un cilindro
// y el tarro gira con el mouse (o el dedo) y solo cuando nadie lo toca.
import {
  WebGLRenderer, Scene, PerspectiveCamera, HemisphereLight, DirectionalLight, Group,
  TextureLoader, SRGBColorSpace, ACESFilmicToneMapping, Mesh, CylinderGeometry, CircleGeometry,
  MeshStandardMaterial, MeshBasicMaterial, LatheGeometry, Vector2, DoubleSide, PlaneGeometry,
  CanvasTexture, Clock
} from 'three';

export function mountJar3D(container, { label, onReady, fit = 0.86, interactive = true, autoSpin = true } = {}) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.className = 'jar3d-canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Tarro de Colmaré en 3D. Muévelo para ver la etiqueta completa.');
  container.appendChild(canvas);

  const scene = new Scene();
  const FOV = 24, cam = new PerspectiveCamera(FOV, 1, 0.1, 100);
  scene.add(new HemisphereLight(0xffffff, 0xd9b48a, 1.6));
  const key = new DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 5); scene.add(key);
  const rim = new DirectionalLight(0xfff1d6, 1.2); rim.position.set(-4, 2, -2); scene.add(rim);

  const r = 0.62, h = 2 * Math.PI * r * 1087 / 1778;
  const grp = new Group(); scene.add(grp);
  const totalH = h + 0.36, BASE_Y = 0.18; // tarro centrado en el origen
  const tex = new TextureLoader().load(label, () => { container.classList.add('is-ready'); onReady && onReady(); });
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const body = new Mesh(new CylinderGeometry(r, r, h, 180, 1, true), new MeshStandardMaterial({ map: tex, roughness: 0.42 }));
  body.rotation.y = Math.PI; grp.add(body);
  const topD = new Mesh(new CircleGeometry(r, 128), new MeshStandardMaterial({ color: 0xf3f0f2, roughness: 0.5 }));
  topD.rotation.x = -Math.PI / 2; topD.position.y = h / 2; grp.add(topD);
  // base blanca: tramo liso, ranura y borde redondeado
  const baseH = 0.36, y0 = -h / 2, P = [new Vector2(0, y0 - baseH)];
  for (let i = 0; i <= 8; i++) { const a = Math.PI / 2 * i / 8; P.push(new Vector2(r - 0.07 + 0.07 * Math.sin(a), y0 - baseH + 0.07 - 0.07 * Math.cos(a))); }
  P.push(new Vector2(r, y0 - 0.16), new Vector2(r - 0.012, y0 - 0.145), new Vector2(r - 0.012, y0 - 0.125), new Vector2(r, y0 - 0.11), new Vector2(r, y0 + 0.001));
  grp.add(new Mesh(new LatheGeometry(P, 180), new MeshStandardMaterial({ color: 0xf2f1f0, roughness: 0.45, side: DoubleSide })));

  const sc = document.createElement('canvas'); sc.width = sc.height = 128;
  const g = sc.getContext('2d'); const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, 'rgba(60,35,15,.55)'); rg.addColorStop(1, 'rgba(60,35,15,0)'); g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
  const shadow = new Mesh(new PlaneGeometry(2.2, 0.55), new MeshBasicMaterial({ map: new CanvasTexture(sc), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = BASE_Y - h / 2 - 0.38; scene.add(shadow);

  // interacción: arrastrar o mover el puntero gira el tarro; sin interacción gira despacio
  let target = 0, rot = 0, tilt = 0, tiltT = 0, dragging = false, lastX = 0, idle = 0, hover = false;
  const onMove = (e) => {
    const b = container.getBoundingClientRect();
    if (dragging) { target += (e.clientX - lastX) / b.width * Math.PI * 2; lastX = e.clientX; }
    else if (e.pointerType === 'mouse') { target = rot + ((e.clientX - b.left) / b.width - 0.5) * 0.9; }
    tiltT = ((e.clientY - b.top) / b.height - 0.5) * 0.2; idle = 0; hover = true;
  };
  const onDown = (e) => { dragging = true; lastX = e.clientX; idle = 0; canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId); };
  const onUp = () => { dragging = false; };
  const onLeave = () => { hover = false; tiltT = 0; };
  if (interactive) {
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('pointerleave', onLeave);
  } else { canvas.style.pointerEvents = 'none'; }
  let external = null; // control desde fuera (tarjetas): ángulo y tilt objetivo

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resize = () => {
    const w = container.clientWidth || 1, hh = container.clientHeight || 1;
    renderer.setSize(w, hh, false); cam.aspect = w / hh;
    const t = Math.tan(FOV * Math.PI / 360);
    const dH = (totalH / fit) / 2 / t;                 // que el alto del tarro llene "fit" del visor
    const dW = (2 * r / (fit * 0.9)) / 2 / (t * cam.aspect); // y que quepa a lo ancho
    const d = Math.max(dH, dW);
    cam.position.set(0, d * 0.07, d); cam.lookAt(0, 0, 0); cam.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize); ro.observe(container); resize();

  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }); io.observe(container);
  const clock = new Clock();
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    idle += dt;
    if (external) { target = external.angle; tiltT = external.tilt; }
    else if (autoSpin && !reduce && !dragging && !hover && idle > 1.2) target += dt * 0.45;
    rot += (target - rot) * 0.08; tilt += (tiltT - tilt) * 0.08;
    grp.rotation.y = rot + (reduce ? 0 : Math.sin(t * 0.6) * 0.04); grp.rotation.x = tilt;
    const f = reduce ? 0 : Math.sin(t * 1.4) * 0.05;
    grp.position.y = BASE_Y + f; shadow.scale.setScalar(1 - f * 0.8); shadow.material.opacity = 0.9 - f * 2;
    renderer.render(scene, cam);
  });

  return {
    point(angle, tiltV = 0) { external = { angle, tilt: tiltV }; },
    release() { external = null; target = Math.round(rot / (Math.PI * 2)) * Math.PI * 2; tiltT = 0; },
    dispose() {
      renderer.setAnimationLoop(null); ro.disconnect(); io.disconnect();
      scene.traverse(o => { o.geometry && o.geometry.dispose(); if (o.material) { o.material.map && o.material.map.dispose(); o.material.dispose(); } });
      renderer.dispose(); canvas.remove(); container.classList.remove('is-ready');
    }
  };
}
