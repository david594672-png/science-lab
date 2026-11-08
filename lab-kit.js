/* =========================================================
   實驗頁共用工具：畫布版面、繪圖小工具、面板控制項
   用法：
     const lab = Lab.init({ draw(ctx, W, H, dt), click(x, y) });
     Lab.bindSlider('id', v => …)、Lab.bindModes('.mode', key => …)
   ========================================================= */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);

  const Lab = {
    $,
    W: 0, H: 0, dpr: 1, ctx: null,
    FONT: '"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif',

    /** 啟動：畫布只佔面板以外的區域；opts.draw 每一幀呼叫，opts.down/move/up 處理觸控 */
    init(opts) {
      const cv = $('cv');
      this.cv = cv; this.ctx = cv.getContext('2d'); this.opts = opts;
      const layout = () => {
        const pr = $('panel').getBoundingClientRect();
        const portrait = pr.left < 40;
        this.W = portrait ? innerWidth : Math.max(200, pr.left - 8);
        this.H = portrait ? Math.max(200, pr.top - 4) : innerHeight;
        this.dpr = Math.min(devicePixelRatio || 1, 2);
        cv.style.width = this.W + 'px'; cv.style.height = this.H + 'px';
        cv.width = Math.round(this.W * this.dpr); cv.height = Math.round(this.H * this.dpr);
        opts.resize && opts.resize(this.W, this.H);
      };
      this.layout = layout;
      addEventListener('resize', layout);
      addEventListener('orientationchange', () => setTimeout(layout, 200));
      const col = $('collapse');
      if (col) col.addEventListener('click', () => {
        const c = $('panel').classList.toggle('collapsed');
        col.textContent = c ? '展開' : '收合';
        requestAnimationFrame(layout);
      });
      // 觸控／滑鼠
      const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
      cv.addEventListener('pointerdown', e => { if (opts.down && opts.down(...pos(e)) !== false) cv.setPointerCapture(e.pointerId); });
      cv.addEventListener('pointermove', e => opts.move && opts.move(...pos(e)));
      cv.addEventListener('pointerup', e => opts.up && opts.up(...pos(e)));
      cv.addEventListener('pointercancel', () => opts.up && opts.up());
      layout();
      let last = performance.now(), lastUI = 0;
      const loop = now => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this.ctx.clearRect(0, 0, this.W, this.H);
        opts.draw(this.ctx, this.W, this.H, dt, now / 1000);
        if (opts.ui && now - lastUI > 100) { opts.ui(); lastUI = now; }   // 面板數值 10 次/秒
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      return this;
    },

    /* ---------- 繪圖 ---------- */
    line(x0, y0, x1, y1, color, w = 1.5, dash) {
      const c = this.ctx;
      c.strokeStyle = color; c.lineWidth = w; c.setLineDash(dash || []);
      c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); c.setLineDash([]);
    },
    arrow(x0, y0, x1, y1, color, w = 3, head = 12) {
      const c = this.ctx, dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
      if (L < 3) return;
      const ux = dx / L, uy = dy / L, h = Math.min(head, L * 0.5);
      this.line(x0, y0, x1 - ux * h * 0.7, y1 - uy * h * 0.7, color, w);
      c.fillStyle = color; c.beginPath(); c.moveTo(x1, y1);
      c.lineTo(x1 - ux * h - uy * h * 0.55, y1 - uy * h + ux * h * 0.55);
      c.lineTo(x1 - ux * h + uy * h * 0.55, y1 - uy * h - ux * h * 0.55);
      c.closePath(); c.fill();
    },
    text(str, x, y, color = '#eef1fa', size = 14, align = 'center', weight = '') {
      const c = this.ctx;
      c.font = `${weight} ${size}px ${this.FONT}`; c.fillStyle = color; c.textAlign = align; c.textBaseline = 'middle';
      c.fillText(str, x, y);
    },
    rr(x, y, w, h, r) {
      const c = this.ctx; r = Math.min(r, w / 2, h / 2);
      c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    },
    /** 圓角卡片（填色 + 外框） */
    card(x, y, w, h, fill = 'rgba(255,255,255,.05)', stroke = 'rgba(255,255,255,.14)', r = 14) {
      const c = this.ctx; this.rr(x, y, w, h, r);
      c.fillStyle = fill; c.fill(); if (stroke) { c.strokeStyle = stroke; c.lineWidth = 1.5; c.stroke(); }
    },
    circle(x, y, r, fill, stroke, w = 2) {
      const c = this.ctx; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
      if (fill) { c.fillStyle = fill; c.fill(); }
      if (stroke) { c.strokeStyle = stroke; c.lineWidth = w; c.stroke(); }
    },
    /** 標籤小藥丸 */
    pill(str, x, y, color, size = 14) {
      const c = this.ctx; c.font = `bold ${size}px ${this.FONT}`;
      const w = c.measureText(str).width + 20, h = size + 14;
      this.card(x - w / 2, y - h / 2, w, h, 'rgba(11,16,32,.85)', color, h / 2);
      this.text(str, x, y + 1, color, size, 'center', 'bold');
      return w;
    },
    /** 簡易折線圖：series = [{data:[..], color, label}], 值域 [min,max] */
    chart(x, y, w, h, series, { min = 0, max = 1, xLabel = '', yLabel = '', ref } = {}) {
      this.glass(x, y, w, h, 12);
      const px = x + 40, py = y + 30, pw = w - 54, ph = h - 56;
      const Y = v => py + ph - (v - min) / (max - min) * ph;
      for (let i = 1; i < 4; i++) this.line(px, py + ph * i / 4, px + pw, py + ph * i / 4, 'rgba(238,241,250,.07)', 1);
      for (let i = 1; i < 6; i++) this.line(px + pw * i / 6, py, px + pw * i / 6, py + ph, 'rgba(238,241,250,.05)', 1);
      this.line(px, py + ph, px + pw, py + ph, 'rgba(238,241,250,.35)', 1.2);
      this.line(px, py, px, py + ph, 'rgba(238,241,250,.35)', 1.2);
      this.text(String(+max.toFixed(2)), px - 6, py, 'rgba(238,241,250,.45)', 10, 'right');
      this.text(String(+min.toFixed(2)), px - 6, py + ph, 'rgba(238,241,250,.45)', 10, 'right');
      if (yLabel) this.text(yLabel, x + 10, y + 10, 'rgba(238,241,250,.6)', 11, 'left', 'bold');
      if (xLabel) this.text(xLabel, px + pw, y + h - 10, 'rgba(238,241,250,.5)', 11, 'right');
      if (ref) { this.line(px, Y(ref.v), px + pw, Y(ref.v), ref.color || 'rgba(255,255,255,.35)', 1.2, [5, 5]); this.text(ref.label || '', px + 4, Y(ref.v) - 9, ref.color || 'rgba(255,255,255,.5)', 11, 'left'); }
      const c = this.ctx;
      series.forEach(s => {
        if (!s.data.length) return;
        const n = s.n || s.data.length, pts = s.data.map((v, i) => [px + i / Math.max(1, n - 1) * pw, Math.max(py, Math.min(py + ph, Y(v)))]);
        const last = pts[pts.length - 1];
        // 曲線下淡淡的漸層
        if (s.fill !== false) {
          c.beginPath(); c.moveTo(pts[0][0], py + ph); pts.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(last[0], py + ph); c.closePath();
          c.fillStyle = this.lg(0, py, 0, py + ph, [this.alpha(s.color, .22), this.alpha(s.color, 0)]); c.fill();
        }
        c.save(); c.shadowColor = s.color; c.shadowBlur = 8;
        c.strokeStyle = s.color; c.lineWidth = 2.5; c.lineJoin = 'round'; c.lineCap = 'round'; c.beginPath();
        pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
        c.stroke(); c.restore();
        this.circle(last[0], last[1], 4, '#fff', s.color, 2);
      });
      return { px, py, pw, ph, Y };
    },

    /* ---------- 美術：漸層、陰影、常用物件 ---------- */
    /** 顏色工具：'#rrggbb' → 調亮（k>0）或調暗（k<0） */
    rgb(hex) { const n = parseInt(hex.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; },
    shade(hex, k) {
      if (hex[0] !== '#') return hex;
      const t = k > 0 ? 255 : 0, a = Math.abs(k);
      const [r, g, b] = this.rgb(hex).map(v => Math.round(v + (t - v) * a));
      return `rgb(${r},${g},${b})`;
    },
    alpha(col, a) {
      if (col[0] === '#') { const [r, g, b] = this.rgb(col); return `rgba(${r},${g},${b},${a})`; }
      const m = col.match(/[\d.]+/g); return m ? `rgba(${m[0]},${m[1]},${m[2]},${a})` : col;
    },
    lg(x0, y0, x1, y1, stops) {
      const g = this.ctx.createLinearGradient(x0, y0, x1, y1);
      stops.forEach((s, i) => (Array.isArray(s) ? g.addColorStop(s[0], s[1]) : g.addColorStop(i / Math.max(1, stops.length - 1), s)));
      return g;
    },
    rg(x, y, r0, r1, stops, fx = x, fy = y) {
      const g = this.ctx.createRadialGradient(fx, fy, r0, x, y, r1);
      stops.forEach((s, i) => (Array.isArray(s) ? g.addColorStop(s[0], s[1]) : g.addColorStop(i / Math.max(1, stops.length - 1), s)));
      return g;
    },
    /** 毛玻璃資訊框 */
    glass(x, y, w, h, r = 12) {
      const c = this.ctx; this.rr(x, y, w, h, r);
      c.fillStyle = this.lg(0, y, 0, y + h, ['rgba(255,255,255,.07)', 'rgba(255,255,255,.025)']); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.13)'; c.lineWidth = 1; c.stroke();
    },
    /** 地上的柔和橢圓陰影 */
    shadow(x, y, rx, ry = rx * 0.22, a = 0.4) {
      const c = this.ctx; c.save(); c.translate(x, y); c.scale(1, ry / rx);
      c.fillStyle = this.rg(0, 0, 0, rx, [`rgba(0,0,0,${a})`, 'rgba(0,0,0,0)']);
      c.beginPath(); c.arc(0, 0, rx, 0, Math.PI * 2); c.fill(); c.restore();
    },
    /** 立體球 */
    ball(x, y, r, color = '#ff6b5e') {
      const c = this.ctx;
      c.fillStyle = this.rg(x, y, r * 0.1, r, [this.shade(color, 0.55), color, this.shade(color, -0.45)], x - r * 0.35, y - r * 0.4);
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
      c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(x - r * 0.35, y - r * 0.42, r * 0.28, r * 0.17, -0.6, 0, Math.PI * 2); c.fill();
    },
    /** 木箱：x,y 為底邊中心 */
    crate(x, y, w, h, label, color = '#c98a4a') {
      const c = this.ctx, x0 = x - w / 2, y0 = y - h;
      this.shadow(x, y + 2, w * 0.62, 7);
      this.rr(x0, y0, w, h, 4);
      c.fillStyle = this.lg(x0, y0, x0, y, [this.shade(color, 0.2), color, this.shade(color, -0.25)]); c.fill();
      c.save(); c.clip();
      c.strokeStyle = this.shade(color, -0.35); c.lineWidth = 1;
      for (let i = 1; i < 4; i++) { c.beginPath(); c.moveTo(x0, y0 + h * i / 4); c.lineTo(x0 + w, y0 + h * i / 4); c.stroke(); }
      c.lineWidth = Math.max(5, w * 0.1); c.strokeStyle = this.shade(color, -0.15);
      c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + w, y); c.stroke();
      c.restore();
      c.strokeStyle = this.shade(color, -0.5); c.lineWidth = 3; this.rr(x0 + 1.5, y0 + 1.5, w - 3, h - 3, 3); c.stroke();
      if (label) { this.card(x - 26, y0 + h / 2 - 11, 52, 22, 'rgba(255,248,230,.92)', null, 5); this.text(label, x, y0 + h / 2 + 1, '#5a3a17', 13, 'center', 'bold'); }
    },
    /** 小車：x 為車身中心，y 為地面；spin 為輪子轉角 */
    car(x, y, s = 1, color = '#4f8cff', spin = 0, label) {
      const c = this.ctx, W = 120 * s, H = 34 * s, wr = 13 * s, by = y - wr - 4 * s;
      this.shadow(x, y + 1, W * 0.55, 6 * s);
      // 車身
      c.beginPath();
      c.moveTo(x - W / 2, by); c.lineTo(x - W / 2, by - H * 0.75);
      c.quadraticCurveTo(x - W / 2, by - H, x - W / 2 + 10 * s, by - H);
      c.lineTo(x - W * 0.22, by - H); c.lineTo(x - W * 0.08, by - H - 22 * s); c.lineTo(x + W * 0.2, by - H - 22 * s);
      c.lineTo(x + W * 0.34, by - H); c.lineTo(x + W / 2 - 8 * s, by - H + 2 * s);
      c.quadraticCurveTo(x + W / 2, by - H + 4 * s, x + W / 2, by - H * 0.5); c.lineTo(x + W / 2, by); c.closePath();
      c.fillStyle = this.lg(0, by - H - 22 * s, 0, by, [this.shade(color, 0.35), color, this.shade(color, -0.35)]); c.fill();
      c.strokeStyle = this.shade(color, -0.55); c.lineWidth = 1.5; c.stroke();
      // 車窗
      c.beginPath(); c.moveTo(x - W * 0.17, by - H - 1); c.lineTo(x - W * 0.06, by - H - 18 * s); c.lineTo(x + W * 0.18, by - H - 18 * s); c.lineTo(x + W * 0.28, by - H - 1); c.closePath();
      c.fillStyle = this.lg(0, by - H - 18 * s, 0, by - H, ['#cfe6ff', '#6d93c4']); c.fill();
      this.line(x + W * 0.06, by - H - 18 * s, x + W * 0.06, by - H - 1, this.shade(color, -0.3), 3 * s);
      // 車燈、腰線
      this.circle(x + W / 2 - 5 * s, by - H * 0.62, 4 * s, '#fff3b0');
      this.circle(x - W / 2 + 4 * s, by - H * 0.62, 3 * s, '#ff5a4d');
      this.line(x - W / 2 + 4, by - H * 0.35, x + W / 2 - 4, by - H * 0.35, 'rgba(255,255,255,.25)', 1.5);
      if (label) this.text(label, x - W * 0.08, by - H * 0.55, '#fff', 12 * Math.max(1, s), 'center', 'bold');
      // 輪子
      [x - W * 0.3, x + W * 0.3].forEach(wx => this.wheel(wx, y - wr, wr, spin));
    },
    wheel(x, y, r, spin = 0) {
      const c = this.ctx;
      this.circle(x, y, r, '#1b1f2a', '#0b0d12', 2);
      this.circle(x, y, r * 0.58, this.rg(x, y, 0, r * 0.6, ['#e8edf5', '#8d97a8']));
      c.strokeStyle = '#59627a'; c.lineWidth = Math.max(1.5, r * 0.12);
      for (let i = 0; i < 5; i++) { const a = spin + i * 1.2566; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55); c.stroke(); }
      this.circle(x, y, r * 0.14, '#39404f');
    },
    /** 人：x,y 為腳底；hand = [dx,dy] 手相對肩膀的位置；lean 身體前傾弧度 */
    person(x, y, s = 1, { hand = [18, 30], hand2, lean = 0, shirt = '#3fb68b', pants = '#2f3d63', skin = '#f2c6a0', hair = '#2b2118', walk = 0, face = 1 } = {}) {
      const c = this.ctx;
      const hipX = x, hipY = y - 52 * s;
      const shX = hipX + Math.sin(lean) * 44 * s, shY = hipY - Math.cos(lean) * 44 * s;
      this.shadow(x, y + 1, 22 * s, 5 * s);
      c.lineCap = 'round'; c.lineJoin = 'round';
      const limb = (x0, y0, x1, y1, x2, y2, col, wd) => { c.strokeStyle = col; c.lineWidth = wd; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.lineTo(x2, y2); c.stroke(); };
      // 腿（walk 讓腳前後擺）
      const sw = Math.sin(walk) * 12 * s;
      limb(hipX, hipY, hipX - 4 * s - sw * 0.5, y - 26 * s, hipX - 8 * s - sw, y - 2 * s, this.shade(pants, -0.2), 10 * s);
      limb(hipX, hipY, hipX + 6 * s + sw * 0.5, y - 26 * s, hipX + 10 * s + sw, y - 2 * s, pants, 10 * s);
      this.card(hipX - 14 * s - sw, y - 5 * s, 16 * s, 6 * s, '#222', null, 3 * s);
      this.card(hipX + 4 * s + sw, y - 5 * s, 16 * s, 6 * s, '#333', null, 3 * s);
      // 後手
      const arm = (h, col) => {
        const hx = shX + h[0] * s, hy = shY + h[1] * s, mx = (shX + hx) / 2, my = (shY + hy) / 2;
        const L = Math.hypot(hx - shX, hy - shY), bend = Math.max(0, 40 * s - L) * 0.6;
        const ex = mx - bend * 0.3, ey = my + bend;
        limb(shX, shY, ex, ey, hx, hy, col, 8 * s);
        this.circle(hx, hy, 5 * s, skin);
      };
      if (hand2) arm(hand2, this.shade(shirt, -0.25));
      // 身體
      c.strokeStyle = this.lg(shX, shY, hipX, hipY, [this.shade(shirt, 0.15), this.shade(shirt, -0.15)]); c.lineWidth = 20 * s;
      c.beginPath(); c.moveTo(shX, shY + 4 * s); c.lineTo(hipX, hipY); c.stroke();
      // 頭
      const hx = shX + Math.sin(lean) * 16 * s, hy = shY - Math.cos(lean) * 16 * s;
      this.circle(hx, hy, 12 * s, this.rg(hx, hy, 2, 13 * s, [this.shade(skin, 0.2), skin, this.shade(skin, -0.2)], hx - 4 * s, hy - 4 * s));
      c.fillStyle = hair; c.beginPath(); c.arc(hx, hy - 1 * s, 12.5 * s, Math.PI * 1.05, Math.PI * 1.98); c.closePath(); c.fill();
      this.circle(hx + 5 * s * face, hy + 1 * s, 1.6 * s, '#2a2a2a');
      // 前手
      arm(hand, shirt);
      c.lineCap = 'butt';
      return { shX, shY };
    },
    /** 雲：x,y 為底部中心 */
    cloud(x, y, s = 1, a = 0.9, tint = '#ffffff') {
      const c = this.ctx;
      const puffs = [[-34, -10, 20], [-12, -22, 26], [16, -18, 22], [36, -8, 16], [0, -6, 22]];
      puffs.forEach(([dx, dy, r]) => {
        c.fillStyle = this.rg(x + dx * s, y + dy * s, 0, r * s, [this.alpha(tint, a), this.alpha(tint, a * 0.85), this.alpha(tint, 0)], x + dx * s - r * s * 0.3, y + dy * s - r * s * 0.4);
        c.beginPath(); c.arc(x + dx * s, y + dy * s, r * s * 1.15, 0, Math.PI * 2); c.fill();
      });
    },
    /** 粗箭頭（暗色描邊＋標籤）：讓箭頭在任何背景都清楚 */
    force(x0, y0, x1, y1, color, label, w = 5) {
      if (Math.hypot(x1 - x0, y1 - y0) < 3) return;
      this.arrow(x0, y0, x1, y1, 'rgba(0,0,0,.45)', w + 4, 18);
      this.arrow(x0, y0, x1, y1, color, w, 15);
      if (!label) return;
      const horiz = Math.abs(x1 - x0) > Math.abs(y1 - y0);
      this.ctx.font = `bold 12px ${this.FONT}`;
      const pw = this.ctx.measureText(label).width / 2 + 16;
      this.pill(label, horiz ? (x0 + x1) / 2 : x1 + pw, horiz ? y1 - 22 : (y0 + y1) / 2, color, 12);
    },

    /* ---------- 面板 ---------- */
    paint(el) { el.style.setProperty('--fill', ((el.value - el.min) / (el.max - el.min) * 100) + '%'); },
    bindSlider(id, fn, fmt) {
      const el = $(id), out = $(id + 'Val');
      const up = () => { this.paint(el); const v = Number(el.value); if (out) out.textContent = fmt ? fmt(v) : v; fn && fn(v); };
      el.addEventListener('input', up); up();
      return el;
    },
    /** 一組互斥按鈕（aria-pressed），回呼 data-k */
    bindGroup(selector, fn) {
      const btns = [...document.querySelectorAll(selector)];
      btns.forEach(b => b.addEventListener('click', () => {
        btns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        fn(b.dataset.k, b);
      }));
      const on = btns.find(b => b.getAttribute('aria-pressed') === 'true') || btns[0];
      if (on) { on.setAttribute('aria-pressed', 'true'); fn(on.dataset.k, on); }
    },
    /** 依模式顯示面板區塊：<div data-mode="a">…</div> */
    showMode(k) { document.querySelectorAll('[data-mode]').forEach(el => { el.hidden = el.dataset.mode !== k; }); }
  };
  window.Lab = Lab;
})();
