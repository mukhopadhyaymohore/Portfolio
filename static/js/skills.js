/* =============================================
   SKILLS PAGE
   Icon animations · Radar chart · Counters
   · Scroll reveal
   ============================================= */
(function () {

  /* ── Scroll reveal ──────────────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(
    '.skill-icon-card, .cert-card, .fade-up'
  ).forEach((el) => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  /* ── Stagger float animation delays ── */
document.querySelectorAll('.skill-app-card').forEach((card, i) => {
  card.style.setProperty('--float-delay', `${(i % 6) * 0.3}s`);
});

  /* ── Skill icon float animation ─────────── */
  document.querySelectorAll('.skill-icon-card').forEach((card, i) => {
    const delay = (i % 6) * 0.3;
    card.querySelector('.skill-svg').style.animation =
      `skillFloat 3s ease-in-out ${delay}s infinite`;
  });

  // Inject keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes skillFloat {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-5px); }
    }
  `;
  document.head.appendChild(style);

  /* ── Skill icon tooltip ─────────────────── */
  document.querySelectorAll('.skill-icon-card').forEach((card) => {
    const name = card.querySelector('.skill-name');
    if (!name) return;

    card.addEventListener('mouseenter', () => {
      name.style.color      = '';   // handled by CSS variant
      name.style.fontWeight = '600';
    });

    card.addEventListener('mouseleave', () => {
      name.style.fontWeight = '';
    });
  });

  /* ── Radar / skill bar canvas ───────────── */
  const radarCanvas = document.getElementById('skillRadar');
  if (radarCanvas) {
    const ctx    = radarCanvas.getContext('2d');
    const W      = radarCanvas.width  = 300;
    const H      = radarCanvas.height = 300;
    const cx     = W / 2;
    const cy     = H / 2;
    const R      = 110;

    const skills = [
      { label: 'Python',   value: 0.92 },
      { label: 'ML/AI',    value: 0.88 },
      { label: 'Quantum',  value: 0.78 },
      { label: 'Web Dev',  value: 0.80 },
      { label: 'Java',     value: 0.70 },
      { label: 'Security', value: 0.75 },
    ];

    const N     = skills.length;
    const angle = (Math.PI * 2) / N;

    let progress = 0;

    function drawRadar(p) {
      ctx.clearRect(0, 0, W, H);

      // Grid rings
      for (let ring = 1; ring <= 5; ring++) {
        const r = (R / 5) * ring;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const a = angle * i - Math.PI / 2;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0, 255, 231, ${0.06 + ring * 0.02})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      }

      // Spokes
      for (let i = 0; i < N; i++) {
        const a = angle * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        ctx.strokeStyle = 'rgba(0, 255, 231, 0.12)';
        ctx.lineWidth   = 1;
        ctx.stroke();
      }

      // Data polygon
      ctx.beginPath();
      skills.forEach((skill, i) => {
        const a = angle * i - Math.PI / 2;
        const r = R * skill.value * p;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle   = 'rgba(0, 255, 231, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 255, 231, 0.7)';
      ctx.lineWidth   = 2;
      ctx.stroke();
      ctx.shadowColor = '#00ffe7';
      ctx.shadowBlur  = 8;
      ctx.stroke();
      ctx.shadowBlur  = 0;

      // Data points
      skills.forEach((skill, i) => {
        const a = angle * i - Math.PI / 2;
        const r = R * skill.value * p;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle   = '#00ffe7';
        ctx.shadowColor = '#00ffe7';
        ctx.shadowBlur  = 10;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      // Labels
      ctx.shadowBlur = 0;
      skills.forEach((skill, i) => {
        const a    = angle * i - Math.PI / 2;
        const lx   = cx + (R + 24) * Math.cos(a);
        const ly   = cy + (R + 24) * Math.sin(a);
        ctx.fillStyle  = 'rgba(232, 234, 246, 0.7)';
        ctx.font       = '10px "Share Tech Mono"';
        ctx.textAlign  = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.label, lx, ly);
      });
    }

    // Animate in
    const radarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animate = () => {
              progress += 0.025;
              drawRadar(Math.min(progress, 1));
              if (progress < 1) requestAnimationFrame(animate);
            };
            animate();
            radarObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    radarObserver.observe(radarCanvas);
  }

  /* ── Animated counters ──────────────────── */
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1400;
    const step     = target / (duration / 16);
    let   current  = 0;

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    };

    tick();
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-target]').forEach((el) => {
    counterObserver.observe(el);
  });

  /* ── Cert card click expand ─────────────── */
  document.querySelectorAll('.cert-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      // Collapse all
      document.querySelectorAll('.cert-card.expanded').forEach((c) => {
        c.classList.remove('expanded');
        c.style.gridColumn = '';
      });
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });

})();