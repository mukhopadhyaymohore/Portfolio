/* =============================================
   EXPERIENCE PAGE
   Scroll reveal · Timeline animation · Card tilt
   ============================================= */
(function () {

  /* ── Scroll reveal ──────────────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger each item
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up, .timeline-item').forEach((el) => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  /* ── Timeline dot pulse on scroll ──────── */
  const dotObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const dot = entry.target.querySelector('.timeline-dot');
        if (!dot) return;
        if (entry.isIntersecting) {
          dot.style.animation = 'dotPulse 0.6s ease forwards';
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.timeline-item').forEach((item) => {
    dotObserver.observe(item);
  });

  // Inject dotPulse keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dotPulse {
      0%   { transform: scale(0.6); opacity: 0.4; }
      60%  { transform: scale(1.4); opacity: 1; }
      100% { transform: scale(1);   opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  /* ── Card subtle tilt on hover ──────────── */
  document.querySelectorAll('.exp-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      card.style.transform =
        `translateX(4px) perspective(600px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateX(4px)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s';
    });
  });

  /* ── GitHub link click ripple ───────────── */
  document.querySelectorAll('.cyber-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple   = document.createElement('span');
      const rect     = this.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--cyber-cyan);
        left: ${e.clientX - rect.left - 3}px;
        top:  ${e.clientY - rect.top  - 3}px;
        transform: scale(0);
        animation: btnRipple 0.5s ease forwards;
        pointer-events: none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframe
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes btnRipple {
      to { transform: scale(30); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  /* ── Counter: total experience items ────── */
  const items = document.querySelectorAll('.timeline-item');
  const counter = document.getElementById('expCounter');
  if (counter) {
    counter.textContent = items.length;
  }

})();