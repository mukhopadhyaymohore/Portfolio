/* =============================================
   BACKGROUND MUSIC
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    const music = document.getElementById('bgMusic');
    const toggle = document.getElementById('musicToggle');

    const iconOn = document.getElementById('iconOn');
    const iconOff = document.getElementById('iconOff');
    const label = document.getElementById('musicLabel');

    if (!music || !toggle) return;

    let playing = false;

    music.volume = 0.3;

    function setPlayingUI() {
        playing = true;

        toggle.classList.remove('muted');

        if (iconOn) iconOn.style.display = 'block';
        if (iconOff) iconOff.style.display = 'none';
        if (label) label.textContent = 'MUSIC';
    }

    function setMutedUI() {
        playing = false;

        toggle.classList.add('muted');

        if (iconOn) iconOn.style.display = 'none';
        if (iconOff) iconOff.style.display = 'block';
        if (label) label.textContent = 'MUTED';
    }

    // Start music ONLY once
    async function startMusicOnce() {

        try {

            await music.play();
            setPlayingUI();

        } catch (err) {

            console.warn('Autoplay blocked:', err);

        }

        document.removeEventListener('click', startMusicOnce);
    }

    // First interaction starts music
    document.addEventListener('click', startMusicOnce, { once: true });

    // Toggle button
    toggle.addEventListener('click', async (e) => {

        e.stopPropagation();

        try {

            if (playing) {

                music.pause();
                setMutedUI();

            } else {

                await music.play();
                setPlayingUI();

            }

        } catch (err) {

            console.warn('Toggle failed:', err);

        }

    });

});
