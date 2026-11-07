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
      this.card(x, y, w, h, 'rgba(255,255,255,.03)', 'rgba(255,255,255,.1)', 12);
      const px = x + 40, py = y + 14, pw = w - 54, ph = h - 40;
      this.line(px, py + ph, px + pw, py + ph, 'rgba(238,241,250,.3)', 1);
      this.line(px, py, px, py + ph, 'rgba(238,241,250,.3)', 1);
      if (yLabel) this.text(yLabel, x + 8, y + 12, 'rgba(238,241,250,.5)', 11, 'left');
      if (xLabel) this.text(xLabel, px + pw, y + h - 10, 'rgba(238,241,250,.5)', 11, 'right');
      const Y = v => py + ph - (v - min) / (max - min) * ph;
      if (ref) { this.line(px, Y(ref.v), px + pw, Y(ref.v), ref.color || 'rgba(255,255,255,.35)', 1.2, [5, 5]); this.text(ref.label || '', px + 4, Y(ref.v) - 9, ref.color || 'rgba(255,255,255,.5)', 11, 'left'); }
      const c = this.ctx;
      series.forEach(s => {
        if (!s.data.length) return;
        c.strokeStyle = s.color; c.lineWidth = 2.5; c.lineJoin = 'round'; c.beginPath();
        const n = s.n || s.data.length;
        s.data.forEach((v, i) => { const xx = px + i / Math.max(1, n - 1) * pw, yy = Math.max(py, Math.min(py + ph, Y(v))); i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); });
        c.stroke();
      });
      return { px, py, pw, ph, Y };
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
