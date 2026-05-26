/* =============================================
   THREE.JS COSMOS BACKGROUND
   Stars · Nebula · Rings · Mouse parallax
   ============================================= */
(function () {
  const canvas = document.getElementById('cosmos-bg');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  /* ── Colour palette ─────────────────────── */
  const palette = [
    [0.00, 1.00, 0.93],  // cyber-cyan
    [1.00, 0.00, 0.67],  // cyber-magenta
    [0.48, 0.00, 1.00],  // cyber-violet
    [1.00, 0.84, 0.00],  // star-gold
    [0.00, 0.47, 1.00],  // plasma-blue
    [1.00, 1.00, 1.00],  // white
  ];

  /* ── Star field ─────────────────────────── */
  const STAR_COUNT = 3500;
  const starGeo    = new THREE.BufferGeometry();
  const starPos    = new Float32Array(STAR_COUNT * 3);
  const starCol    = new Float32Array(STAR_COUNT * 3);
  const starSizes  = new Float32Array(STAR_COUNT);

  for (let i = 0; i < STAR_COUNT; i++) {
    starPos[i * 3]     = (Math.random() - 0.5) * 220;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 220;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 220;

    const c          = palette[Math.floor(Math.random() * palette.length)];
    const brightness = 0.35 + Math.random() * 0.65;
    starCol[i * 3]     = c[0] * brightness;
    starCol[i * 3 + 1] = c[1] * brightness;
    starCol[i * 3 + 2] = c[2] * brightness;

    starSizes[i] = Math.random() < 0.05 ? 0.35 : 0.12 + Math.random() * 0.1;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3));
  starGeo.setAttribute('size',     new THREE.BufferAttribute(starSizes, 1));

  const starMat = new THREE.PointsMaterial({
    size:           0.15,
    vertexColors:   true,
    transparent:    true,
    opacity:        0.88,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ── Nebula cloud ───────────────────────── */
  const NEBULA_COUNT = 500;
  const nebGeo       = new THREE.BufferGeometry();
  const nebPos       = new Float32Array(NEBULA_COUNT * 3);
  const nebCol       = new Float32Array(NEBULA_COUNT * 3);

  for (let i = 0; i < NEBULA_COUNT; i++) {
    const r     = 14 + Math.random() * 50;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.random() * Math.PI;

    nebPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    nebPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    nebPos[i * 3 + 2] = r * Math.cos(phi);

    const t = Math.random();
    if (t < 0.33) {
      // cyan nebula
      nebCol[i * 3] = 0; nebCol[i * 3 + 1] = 0.6; nebCol[i * 3 + 2] = 0.8;
    } else if (t < 0.66) {
      // violet nebula
      nebCol[i * 3] = 0.3; nebCol[i * 3 + 1] = 0; nebCol[i * 3 + 2] = 0.7;
    } else {
      // magenta nebula
      nebCol[i * 3] = 0.7; nebCol[i * 3 + 1] = 0; nebCol[i * 3 + 2] = 0.4;
    }
  }

  nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3));
  nebGeo.setAttribute('color',    new THREE.BufferAttribute(nebCol, 3));

  const nebMat = new THREE.PointsMaterial({
    size:           1.6,
    vertexColors:   true,
    transparent:    true,
    opacity:        0.10,
    sizeAttenuation: true,
  });

  const nebula = new THREE.Points(nebGeo, nebMat);
  scene.add(nebula);

  /* ── Floating rings ─────────────────────── */
  function makeRing(radius, tube, color, opacity, rx, ry) {
    const geo  = new THREE.TorusGeometry(radius, tube, 8, 140);
    const mat  = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = rx;
    mesh.rotation.y = ry;
    return mesh;
  }

  const ring1 = makeRing(9,  0.04, 0x00ffe7, 0.10, Math.PI / 4,  0);
  const ring2 = makeRing(14, 0.025, 0x7c00ff, 0.07, -Math.PI / 5, Math.PI / 6);
  const ring3 = makeRing(6,  0.02, 0xff00aa, 0.08, Math.PI / 3, Math.PI / 4);

  scene.add(ring1, ring2, ring3);

  /* ── Distant galaxy plane ───────────────── */
  const galaxyGeo = new THREE.PlaneGeometry(80, 80);
  const galaxyMat = new THREE.MeshBasicMaterial({
    color: 0x0a002a,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  });
  const galaxy = new THREE.Mesh(galaxyGeo, galaxyMat);
  galaxy.position.z = -60;
  galaxy.rotation.x = 0.3;
  scene.add(galaxy);

  /* ── Ambient point lights ───────────────── */
  const lightCyan = new THREE.PointLight(0x00ffe7, 0.4, 80);
  lightCyan.position.set(10, 10, 5);
  scene.add(lightCyan);

  const lightMagenta = new THREE.PointLight(0xff00aa, 0.3, 80);
  lightMagenta.position.set(-10, -8, 3);
  scene.add(lightMagenta);

  /* ── Mouse parallax ─────────────────────── */
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth  - 0.5) * 0.8;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.8;
  });

  /* ── Resize ─────────────────────────────── */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ── Animate ────────────────────────────── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Slow star rotation
    stars.rotation.y = t * 0.008;
    stars.rotation.x = t * 0.003;

    // Nebula drift
    nebula.rotation.y = t * 0.004;
    nebula.rotation.x = Math.sin(t * 0.25) * 0.04;

    // Ring rotations — each independent
    ring1.rotation.z =  t * 0.035;
    ring2.rotation.z = -t * 0.022;
    ring3.rotation.z =  t * 0.05;
    ring3.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.05;

    // Pulsing light
    lightCyan.intensity    = 0.4 + Math.sin(t * 1.2) * 0.15;
    lightMagenta.intensity = 0.3 + Math.sin(t * 0.9 + 1) * 0.12;

    // Smooth mouse parallax
    currentX += (targetX - currentX) * 0.035;
    currentY += (targetY - currentY) * 0.035;
    camera.position.x = currentX;
    camera.position.y = -currentY;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
})();