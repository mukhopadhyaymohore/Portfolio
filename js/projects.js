/* =============================================
   PROJECTS
   Hub · Cards · Live window · Image slots
   · Scroll reveal · Filter
   ============================================= */
(function () {

  /* ── Scroll reveal ──────────────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll(
    '.proj-card, .hub-card, .fade-up'
  ).forEach((el) => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  /* ── Hub card magnetic hover ────────────── */
  document.querySelectorAll('.hub-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) / rect.width  * 20;
      const dy   = (e.clientY - rect.top  - rect.height / 2) / rect.height * 20;
      card.style.transform =
        `translateY(-4px) perspective(500px) rotateX(${-dy * 0.3}deg) rotateY(${dx * 0.3}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s';
    });
  });

  /* ── Project card tilt ──────────────────── */
  document.querySelectorAll('.proj-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      card.style.transform =
        `translateY(-3px) perspective(700px) rotateX(${-dy * 2}deg) rotateY(${dx * 2}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s';
    });
  });

  /* ── Live window iframe fallback ────────── */
  document.querySelectorAll('.live-window iframe').forEach((iframe) => {
    const fallback = iframe.nextElementSibling;

    iframe.addEventListener('load', () => {
      try {
        // If we can access contentDocument, it loaded successfully
        const doc = iframe.contentDocument;
        if (doc && doc.body) {
          if (fallback) fallback.style.display = 'none';
        }
      } catch (_) {
        // Cross-origin: assume it loaded
        if (fallback) fallback.style.display = 'none';
      }
    });

    iframe.addEventListener('error', () => {
      iframe.style.display       = 'none';
      if (fallback) fallback.style.display = 'flex';
    });

    // Timeout fallback: if iframe takes > 8s, show fallback option
    setTimeout(() => {
      if (fallback && fallback.style.display !== 'none') {
        // Already showing fallback or still loading — keep as is
      }
    }, 8000);
  });

  /* ── Hardware image slot reveal ─────────── */
  document.querySelectorAll('.hw-image-slot img').forEach((img) => {
    if (img.src && img.src !== window.location.href) {
      img.addEventListener('load', () => {
        img.closest('.hw-image-slot').classList.add('has-image');
      });
      img.addEventListener('error', () => {
        // Keep the placeholder visible
      });
    }
  });

  /* ── Tag copy-to-clipboard ──────────────── */
  document.querySelectorAll('.tag').forEach((tag) => {
    tag.title = 'Click to copy';
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', () => {
      navigator.clipboard.writeText(tag.textContent.trim()).then(() => {
        const original     = tag.textContent;
        tag.textContent    = '✓ Copied';
        tag.style.color    = 'var(--neon-green)';
        setTimeout(() => {
          tag.textContent  = original;
          tag.style.color  = '';
        }, 1200);
      }).catch(() => {});
    });
  });

  /* ── Back link arrow animation ──────────── */
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.addEventListener('mouseenter', () => {
      const arrow = backLink.querySelector('.back-arrow');
      if (arrow) {
        arrow.style.transform  = 'translateX(-4px)';
        arrow.style.transition = 'transform 0.2s';
      }
    });
    backLink.addEventListener('mouseleave', () => {
      const arrow = backLink.querySelector('.back-arrow');
      if (arrow) arrow.style.transform = 'translateX(0)';
    });
  }

  /* ── Quantum page: QUBO matrix animation ── */
  const quboCanvas = document.getElementById('quboCanvas');
  if (quboCanvas) {
    const ctx  = quboCanvas.getContext('2d');
    const SIZE = 6;
    const CELL = 36;
    quboCanvas.width  = SIZE * CELL;
    quboCanvas.height = SIZE * CELL;

    // Random Q matrix values
    const Q = Array.from({ length: SIZE }, () =>
      Array.from({ length: SIZE }, () => (Math.random() - 0.5) * 2)
    );

    let tick = 0;

    function drawQUBO() {
      ctx.clearRect(0, 0, quboCanvas.width, quboCanvas.height);
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          const val    = Q[r][c];
          const alpha  = Math.abs(val);
          const pulse  = 0.6 + Math.sin(tick * 0.04 + r + c) * 0.4;

          if (val > 0) {
            ctx.fillStyle = `rgba(0, 255, 231, ${alpha * pulse * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(255, 0, 170, ${alpha * pulse * 0.8})`;
          }

          ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);

          ctx.fillStyle = 'rgba(232, 234, 246, 0.6)';
          ctx.font      = '8px Share Tech Mono';
          ctx.textAlign = 'center';
          ctx.fillText(
            val.toFixed(2),
            c * CELL + CELL / 2,
            r * CELL + CELL / 2 + 3
          );
        }
      }
      tick++;
      requestAnimationFrame(drawQUBO);
    }

    drawQUBO();
  }

  /* ── Highlight tech tag on card hover ────── */
  document.querySelectorAll('.proj-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.querySelectorAll('.tag').forEach((tag, i) => {
        setTimeout(() => {
          tag.style.borderColor = 'rgba(0,255,231,0.5)';
          tag.style.color       = 'var(--cyber-cyan)';
        }, i * 40);
      });
    });

    card.addEventListener('mouseleave', () => {
      card.querySelectorAll('.tag').forEach((tag) => {
        tag.style.borderColor = '';
        tag.style.color       = '';
      });
    });
  });

})();