/* =============================================
   NAVIGATION
   Scroll shrink · Mobile toggle · Active state
   · Dropdown touch support
   ============================================= */
(function () {
  const nav       = document.getElementById('mainNav');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  /* ── Scroll behaviour ───────────────────── */
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Shrink nav on scroll down
    if (currentScroll > 60) {
      nav.style.height          = '58px';
      nav.style.borderBottomColor = 'rgba(0,255,231,0.18)';
    } else {
      nav.style.height          = '70px';
      nav.style.borderBottomColor = 'rgba(0,255,231,0.08)';
    }

    // Hide on scroll down, reveal on scroll up
    if (currentScroll > lastScroll && currentScroll > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  nav.style.transition = 'height 0.3s, transform 0.35s, border-color 0.3s';

  /* ── Mobile hamburger ───────────────────── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        dropdowns.forEach(d => d.classList.remove('open'));
      }
    });
  }

  /* ── Dropdown touch support ─────────────── */
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-link');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      // On mobile, toggle dropdown on tap
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  });

  /* ── Active link highlight ──────────────── */
  const currentPath = window.location.pathname;

  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Exact match for home, prefix match for sub-pages
    if (
      (href === '/' && currentPath === '/') ||
      (href !== '/' && currentPath.startsWith(href))
    ) {
      link.classList.add('active');

      // Also mark parent dropdown as active
      const parent = link.closest('.nav-dropdown');
      if (parent) {
        const parentLink = parent.querySelector(':scope > .nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });

  /* ── Typing sound effect (subtle) ──────── */
  // Plays a faint click sound on nav link hover — optional
  // Remove if sound is unwanted
  const navLinkEls = document.querySelectorAll('.nav-link, .dropdown-menu a');
  navLinkEls.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      // AudioContext-based click (no file needed)
      try {
        const ctx  = new (window.AudioContext || window.webkitAudioContext)();
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type            = 'square';
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (_) {
        // AudioContext not available — silent fallback
      }
    });
  });

  /* ── Cursor trail ───────────────────────── */
  const trail = [];
  const TRAIL_LENGTH = 8;

  for (let i = 0; i < TRAIL_LENGTH; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${4 - i * 0.3}px;
      height: ${4 - i * 0.3}px;
      border-radius: 50%;
      background: rgba(0, 255, 231, ${0.5 - i * 0.06});
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: left ${i * 0.02}s, top ${i * 0.02}s;
      box-shadow: 0 0 ${3 + i}px rgba(0, 255, 231, 0.4);
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    trail.forEach((dot, i) => {
      setTimeout(() => {
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
      }, i * 18);
    });
    requestAnimationFrame(animateTrail);
  }

  animateTrail();

})();