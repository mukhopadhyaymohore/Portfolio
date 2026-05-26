/* =============================================
   HOME PAGE
   Typewriter · Clock · Scroll reveal · Particles
   ============================================= */
(function () {

  /* ── Typewriter ─────────────────────────── */
  const roles = [
    'Between semicolons and syntax, lies creativity.',
    'AI-ML Enthusiast',
    'Quantum Computing Researcher',
    'Full-Stack Web Developer',
    'Technical Writer · Hashnode',
  ];

  const typedEl = document.getElementById('typedRole');
  let roleIdx   = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  function typeWriter() {
    if (!typedEl || paused) return;

    const current = roles[roleIdx];

    if (!deleting) {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeWriter, 2000);
        return;
      }
    } else {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(typeWriter, deleting ? 35 : 75);
  }

  if (typedEl) typeWriter();

  // Pause typewriter when tab is hidden
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused && typedEl) typeWriter();
  });

  /* ── HUD clock ──────────────────────────── */
  const clockEl = document.getElementById('hudClock');

  function updateClock() {
    if (!clockEl) return;
    const now  = new Date();
    const pad  = n => String(n).padStart(2, '0');
    clockEl.textContent =
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} IST`;
  }

  if (clockEl) {
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ── HUD date ───────────────────────────── */
  const dateEl = document.getElementById('hudDate');
  if (dateEl) {
    const now     = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    dateEl.textContent = now.toLocaleDateString('en-IN', options).toUpperCase();
  }

  /* ── Scroll reveal ──────────────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

  /* ── Photo tilt effect ──────────────────── */
  const photoWrap = document.querySelector('.hero-photo-wrap');
  if (photoWrap) {
    photoWrap.addEventListener('mousemove', (e) => {
      const rect   = photoWrap.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = -dy * 10;
      const rotY   =  dx * 10;
      photoWrap.style.transform =
        `perspective(400px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    photoWrap.addEventListener('mouseleave', () => {
      photoWrap.style.transform =
        'perspective(400px) rotateX(0deg) rotateY(0deg)';
      photoWrap.style.transition = 'transform 0.6s ease';
    });
  }

  /* ── Nav card hover sound ───────────────── */
  document.querySelectorAll('.hnc').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      try {
        const ctx  = new (window.AudioContext || window.webkitAudioContext)();
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type            = 'sine';
        osc.frequency.value = 440 + Math.random() * 200;
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch (_) {}
    });
  });

  /* ── Shooting star spawner ──────────────── */
  function spawnShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    star.style.top  = `${Math.random() * 40}%`;
    star.style.left = `${60 + Math.random() * 30}%`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 8000);
  }

  spawnShootingStar();
  setInterval(spawnShootingStar, 7000 + Math.random() * 5000);

  /* ── Flash message auto-dismiss ─────────── */
  const flashMessages = document.querySelectorAll('.flash-message');
  flashMessages.forEach((msg) => {
    setTimeout(() => {
      msg.style.opacity   = '0';
      msg.style.transform = 'translateY(-10px)';
      msg.style.transition = 'opacity 0.4s, transform 0.4s';
      setTimeout(() => msg.remove(), 400);
    }, 4000);
  });

})();