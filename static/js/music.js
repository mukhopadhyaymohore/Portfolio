/* =============================================
   BACKGROUND MUSIC
   Starts on first user interaction · Toggle on/off
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  const music  = document.getElementById('bgMusic');
  const toggle = document.getElementById('musicToggle');

  if (!music || !toggle) return;

  let playing = false;

  function setPlayingUI() {
    playing = true;
    toggle.classList.remove('muted');
    document.getElementById('iconOn').style.display   = 'block';
    document.getElementById('iconOff').style.display  = 'none';
    document.getElementById('musicLabel').textContent = 'MUSIC';
  }

  function setMutedUI() {
    playing = false;
    toggle.classList.add('muted');
    document.getElementById('iconOn').style.display   = 'none';
    document.getElementById('iconOff').style.display  = 'block';
    document.getElementById('musicLabel').textContent = 'MUTED';
  }

  function boot(e) {
    if (playing) return;
    music.volume = 0.3;
    music.play().then(() => {
      setPlayingUI();
    }).catch(err => {
      console.warn('Music blocked:', err);
    });
  }

  // Start on first interaction
  document.body.addEventListener('click',      boot);
  document.body.addEventListener('mousemove',  boot);
  document.body.addEventListener('keydown',    boot);
  document.body.addEventListener('touchstart', boot, { passive: true });
  document.body.addEventListener('scroll',     boot, { passive: true });

  // Toggle button
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (playing) {
      music.pause();
      setMutedUI();
    } else {
      music.volume = 0.3;
      music.play().then(() => {
        setPlayingUI();
      }).catch(err => console.warn('Play failed:', err));
    }
  });
});