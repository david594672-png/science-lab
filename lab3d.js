/* =========================================================
   3D 實驗頁共用工具（搭配 lab-kit.css、lab-kit.js）
   用法：
     import { start3D, THREE } from './lab3d.js';
     const L = start3D({ camera: [x,y,z], target: [x,y,z], frame(dt, t) {…}, ui() {…} });
     L.scene.add(…)；L.label('文字', () => vec3)；L.pick(x, y, objects)
   ========================================================= */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export { THREE };

export function start3D(opts = {}) {
  const $ = id => document.getElementById(id);
  const cv = $('cv');
  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  if (opts.background !== null) scene.background = new THREE.Color(opts.background ?? 0x0b1020);

  const camera = new THREE.PerspectiveCamera(opts.fov ?? 45, 1, 0.05, opts.far ?? 500);
  camera.position.set(...(opts.camera ?? [0, 4, 10]));

  const controls = new OrbitControls(camera, cv);
  controls.target.set(...(opts.target ?? [0, 0, 0]));
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = !!opts.pan;
  controls.minDistance = opts.minDist ?? 2;
  controls.maxDistance = opts.maxDist ?? 60;
  if (opts.maxPolar != null) controls.maxPolarAngle = opts.maxPolar;
  controls.update();

  // 燈光：柔和環境光 + 主光
  scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x1a1a24, opts.ambient ?? 0.9));
  const sun = new THREE.DirectionalLight(0xffffff, opts.key ?? 1.6);
  sun.position.set(6, 10, 7);
  scene.add(sun);

  // 標籤層
  const layer = document.createElement('div');
  layer.id = 'labels';
  document.body.appendChild(layer);
  const labels = [];
  const tmp = new THREE.Vector3();

  const L = {
    THREE, scene, camera, renderer, controls, sun, W: 0, H: 0,

    /** 文字標籤：where 可以是 Vector3、Object3D 或回傳 Vector3 的函式 */
    label(text, where, cls = '') {
      const el = document.createElement('div');
      el.className = 'lbl ' + cls;
      el.innerHTML = text;
      layer.appendChild(el);
      const item = { el, where, show: true, set(t) { if (t !== this._t) { el.innerHTML = t; this._t = t; } } };
      labels.push(item);
      return item;
    },

    /** 點擊選取：回傳最近的交點（含 object） */
    pick(x, y, objects) {
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(x / L.W * 2 - 1, -(y / L.H) * 2 + 1), camera);
      return ray.intersectObjects(objects, true)[0] || null;
    },

    /** 平滑移動鏡頭 */
    fly(pos, target, sec = 0.8) {
      L._fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: new THREE.Vector3(...pos), t1: new THREE.Vector3(...target), k: 0, sec };
    },

    /** 常用材質 */
    mat(color, o = {}) { return new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05, ...o }); },
    glow(color, o = {}) { return new THREE.MeshBasicMaterial({ color, ...o }); },

    /** 箭頭（可每幀更新） */
    arrow(color, headLen = 0.35, headW = 0.22) {
      const a = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, color, headLen, headW);
      a.line.material.linewidth = 2;
      scene.add(a);
      a.point = (from, to) => {
        const d = tmp.copy(to).sub(from);
        const len = d.length();
        a.visible = len > 0.02;
        if (!a.visible) return;
        a.position.copy(from);
        a.setDirection(d.normalize());
        a.setLength(len, Math.min(headLen, len * 0.5), Math.min(headW, len * 0.35));
      };
      return a;
    }
  };

  // 版面：畫布只佔面板以外的區域
  const layout = () => {
    const pr = $('panel').getBoundingClientRect();
    const portrait = pr.left < 40;
    L.W = portrait ? innerWidth : Math.max(200, pr.left - 8);
    L.H = portrait ? Math.max(200, pr.top - 4) : innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(L.W, L.H);
    layer.style.width = L.W + 'px';
    layer.style.height = L.H + 'px';
    camera.aspect = L.W / L.H;
    camera.updateProjectionMatrix();
    opts.resize && opts.resize(L.W, L.H);
  };
  L.layout = layout;
  addEventListener('resize', layout);
  addEventListener('orientationchange', () => setTimeout(layout, 200));
  const col = $('collapse');
  if (col) col.addEventListener('click', () => {
    const c = $('panel').classList.toggle('collapsed');
    col.textContent = c ? '展開' : '收合';
    requestAnimationFrame(layout);
  });

  // 點擊（區分「點」和「轉動視角」）
  if (opts.tap) {
    let down = null;
    cv.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
    cv.addEventListener('pointerup', e => {
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) return;
      const r = cv.getBoundingClientRect();
      opts.tap(e.clientX - r.left, e.clientY - r.top);
    });
  }

  layout();
  let last = performance.now(), lastUI = 0;
  const loop = now => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (L._fly) {
      const f = L._fly;
      f.k = Math.min(1, f.k + dt / f.sec);
      const e = f.k < 0.5 ? 2 * f.k * f.k : 1 - Math.pow(-2 * f.k + 2, 2) / 2;
      camera.position.lerpVectors(f.p0, f.p1, e);
      controls.target.lerpVectors(f.t0, f.t1, e);
      if (f.k >= 1) L._fly = null;
    }
    opts.frame && opts.frame(dt, now / 1000);
    controls.update();
    renderer.render(scene, camera);
    // 標籤位置
    for (const lb of labels) {
      let p = typeof lb.where === 'function' ? lb.where() : lb.where;
      if (p && p.isObject3D) p = p.getWorldPosition(tmp);
      if (!lb.show || !p) { lb.el.style.display = 'none'; continue; }
      tmp.copy(p).project(camera);
      const vis = tmp.z < 1 && Math.abs(tmp.x) < 1.1 && Math.abs(tmp.y) < 1.1;
      lb.el.style.display = vis ? '' : 'none';
      if (vis) lb.el.style.transform = `translate(${(tmp.x + 1) / 2 * L.W}px, ${(1 - tmp.y) / 2 * L.H}px) translate(-50%, -50%)`;
    }
    if (opts.ui && now - lastUI > 100) { opts.ui(); lastUI = now; }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  window.lab3d = L;
  return L;
}
