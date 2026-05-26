/* =============================================
   GLITCH TEXT EFFECT
   Apply to any element with data-glitch attr
   ============================================= */

class GlitchText {
  constructor(el, options = {}) {
    this.el       = el;
    this.original = el.textContent;
    this.chars    = options.chars ||
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*[]<>{}';
    this.speed    = options.speed    || 40;
    this.delay    = options.delay    || 0;
    this.auto     = options.auto     || false;
    this.interval = options.interval || 5000;
    this.running  = false;
    this._timer   = null;

    this._bind();
    if (this.auto) this._startAuto();
  }

  _bind() {
    this.el.addEventListener('mouseenter', () => this.play());
  }

  _startAuto() {
    setTimeout(() => {
      this.play();
      this._timer = setInterval(() => this.play(), this.interval);
    }, this.delay);
  }

  play() {
    if (this.running) return;
    this.running = true;

    const original = this.original;
    const len      = original.length;
    let   frame    = 0;
    const total    = len * 2;

    const tick = () => {
      let result = '';
      for (let i = 0; i < len; i++) {
        if (original[i] === ' ') { result += ' '; continue; }
        if (frame > i * 2) {
          result += original[i];
        } else {
          result += this.chars[Math.floor(Math.random() * this.chars.length)];
        }
      }
      this.el.textContent = result;
      frame++;
      if (frame <= total) {
        setTimeout(tick, this.speed);
      } else {
        this.el.textContent = original;
        this.running = false;
      }
    };

    tick();
  }

  destroy() {
    if (this._timer) clearInterval(this._timer);
  }
}

/* ── Auto-init on data-glitch elements ─────── */
function initGlitch() {
  document.querySelectorAll('[data-glitch]').forEach((el) => {
    const auto     = el.hasAttribute('data-glitch-auto');
    const delay    = parseInt(el.getAttribute('data-glitch-delay') || '0', 10);
    const interval = parseInt(el.getAttribute('data-glitch-interval') || '6000', 10);
    const speed    = parseInt(el.getAttribute('data-glitch-speed') || '40', 10);

    new GlitchText(el, { auto, delay, interval, speed });
  });
}

/* ── Scan-line flicker ──────────────────────── */
function initFlicker() {
  const flicker = () => {
    const scanlines = document.querySelector('.scanlines');
    if (!scanlines) return;
    if (Math.random() < 0.02) {
      scanlines.style.opacity = (0.3 + Math.random() * 0.7).toString();
      setTimeout(() => { scanlines.style.opacity = '1'; }, 60 + Math.random() * 80);
    }
  };
  setInterval(flicker, 200);
}

/* ── Screen glitch flash ────────────────────── */
function initScreenGlitch() {
  const flash = () => {
    if (Math.random() < 0.008) {
      document.body.style.transform = `translateX(${(Math.random() - 0.5) * 4}px)`;
      setTimeout(() => {
        document.body.style.transform = 'translateX(0)';
      }, 50 + Math.random() * 100);
    }
  };
  setInterval(flash, 3000);
}

/* ── Random data stream in console ─────────── */
function initConsoleStream() {
  const msgs = [
    '%c[COSMOS-LINK] Quantum channel established.',
    '%c[CYPHER] Encryption layer active.',
    '%c[TRACE] Neural pathway mapped.',
    '%c[SYS] Memory allocation: optimal.',
    '%c[SCAN] Threat level: nominal.',
  ];
  let idx = 0;
  setInterval(() => {
    console.log(msgs[idx % msgs.length], 'color:#00ffe7;font-family:monospace;');
    idx++;
  }, 8000);
}

document.addEventListener('DOMContentLoaded', () => {
  initGlitch();
  initFlicker();
  initScreenGlitch();
  initConsoleStream();
});