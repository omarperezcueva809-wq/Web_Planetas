document.addEventListener('DOMContentLoaded', () => {
  // 🚀 Pantalla de Carga ultra rápida (0.5s) para que nunca se quede trabada
  const loaderScreen = document.getElementById('loaderScreen') || document.querySelector('.loader-screen');
  const loaderBar = document.getElementById('loaderBar') || document.querySelector('.loader-fill');
  const loaderText = document.getElementById('loaderText') || document.querySelector('.loader-footer-status');

  const totalDuration = 500; // Reducido a medio segundo para que cargue al toque
  const intervalTime = 50;
  let elapsed = 0;

  const loadInterval = setInterval(() => {
    elapsed += intervalTime;
    let percentage = Math.min(Math.floor((elapsed / totalDuration) * 100), 100);
    
    if (loaderBar) loaderBar.style.width = `${percentage}%`;
    if (loaderText) loaderText.textContent = `Enlace orbital establecido...`;

    if (elapsed >= totalDuration) {
      clearInterval(loadInterval);
      if (loaderScreen) {
        loaderScreen.style.opacity = '0';
        loaderScreen.style.visibility = 'hidden';
        loaderScreen.style.display = 'none'; // Se elimina visualmente al instante
      }
    }
  }, intervalTime);

  // Fallback de seguridad por si acaso: se oculta a la fuerza a los 1 segundo pase lo que pase
  setTimeout(() => {
    if (loaderScreen && loaderScreen.style.display !== 'none') {
      loaderScreen.style.display = 'none';
    }
  }, 1000);

  // 🌌 Renderizado con Datos Enriquecidos
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', () => {
    setTimeout(resizeCanvas, 300);
  });
  resizeCanvas();

  const celestialObjects = [
    { 
      id: 'sun', 
      name: 'El Sol', 
      baseColor: '#ffaa00', 
      radius: 60, 
      distance: 0, 
      speed: 0, 
      angle: 0, 
      au: 0, 
      desc: 'Estrella de tipo espectral G2 ubicada en el centro del sistema solar. Contiene más del 99.8% de la masa total del sistema y genera energía mediante la fusión nuclear de hidrógeno en helio en su núcleo.', 
      dia: '1,392,700 km', 
      dist: '0 AU', 
      orb: 'N/A', 
      temp: '5,500 °C',
      comp: '73% Hidrógeno, 25% Helio, 2% Metales pesados',
      grav: '274.0 m/s²',
      moons: '0 (Estrella central)'
    },
    { 
      id: 'mercury', 
      name: 'Mercurio', 
      baseColor: '#9ca3af', 
      radius: 12, 
      distance: 120, 
      speed: 0.03, 
      angle: Math.random() * Math.PI * 2, 
      au: 0.39, 
      desc: 'El planeta más cercano al Sol y el más pequeño del sistema solar. Carece de una atmósfera sustancial que retenga el calor, lo que provoca variaciones térmicas extremas entre el día y la noche.', 
      dia: '4,879 km', 
      dist: '0.39 AU', 
      orb: '88 días', 
      temp: '167 °C',
      comp: 'Hierro (núcleo masivo), silicatos (manto y corteza)',
      grav: '3.7 m/s²',
      moons: '0 satélites naturales'
    },
    { 
      id: 'venus', 
      name: 'Venus', 
      baseColor: '#facc15', 
      radius: 18, 
      distance: 185, 
      speed: 0.02, 
      angle: Math.random() * Math.PI * 2, 
      au: 0.72, 
      desc: 'Mundo rocoso cubierto por una densa atmósfera de dióxido de carbono y nubes corrosivas de ácido sulfúrico. Su potente efecto invernadero lo convierte en el planeta más cálido del sistema.', 
      dia: '12,104 km', 
      dist: '0.72 AU', 
      orb: '225 días', 
      temp: '464 °C',
      comp: '96.5% Dióxido de carbono, 3.5% Nitrógeno',
      grav: '8.87 m/s²',
      moons: '0 satélites naturales'
    },
    { 
      id: 'earth', 
      name: 'Tierra', 
      baseColor: '#38bdf8', 
      radius: 21, 
      distance: 260, 
      speed: 0.015, 
      angle: Math.random() * Math.PI * 2, 
      au: 1.00, 
      hasMoon: true, 
      isEarth: true, 
      desc: 'Nuestro hogar y el único cuerpo celeste conocido que alberga vida. Destaca por su abundante agua líquida en superficie, una atmósfera rica en oxígeno y un campo magnético protector.', 
      dia: '12,742 km', 
      dist: '1.00 AU', 
      orb: '365 días', 
      temp: '15 °C',
      comp: 'Nitrógeno (78%), Oxígeno (21%), Argón y vapor de agua',
      grav: '9.81 m/s²',
      moons: '1 Luna (La Luna)'
    },
    { 
      id: 'mars', 
      name: 'Marte', 
      baseColor: '#f87171', 
      radius: 15, 
      distance: 345, 
      speed: 0.011, 
      angle: Math.random() * Math.PI * 2, 
      au: 1.52, 
      desc: 'Conocido como el "Planeta Rojo" debido al óxido de hierro en su superficie. Presenta indicios geológicos de antiguos cauces de ríos, volcanes gigantes como el Olympus Mons y casquetes polares.', 
      dia: '6,779 km', 
      dist: '1.52 AU', 
      orb: '687 días', 
      temp: '-65 °C',
      comp: 'Dióxido de carbono (95%), Nitrógeno, Argón',
      grav: '3.72 m/s²',
      moons: '2 Lunas (Fobos y Deimos)'
    },
    { 
      id: 'jupiter', 
      name: 'Júpiter', 
      baseColor: '#fb923c', 
      radius: 36, 
      distance: 460, 
      speed: 0.007, 
      angle: Math.random() * Math.PI * 2, 
      au: 5.20, 
      isJupiter: true, 
      desc: 'El gigante gaseoso más grande del sistema solar. Destaca por sus llamativas bandas atmosféricas, un poderoso campo magnético y la Gran Mancha Roja, una gigantesca tormenta anticiclónica milenaria.', 
      dia: '139,820 km', 
      dist: '5.20 AU', 
      orb: '11.8 años', 
      temp: '-110 °C',
      comp: 'Hidrógeno (90%), Helio (10%), metano y amoníaco',
      grav: '24.79 m/s²',
      moons: '95 Lunas confirmadas (Í, Europa, Ganimedes...)'
    },
    { 
      id: 'saturn', 
      name: 'Saturno', 
      baseColor: '#fde047', 
      radius: 30, 
      distance: 580, 
      speed: 0.0048, 
      angle: Math.random() * Math.PI * 2, 
      au: 9.58, 
      hasRings: true, 
      desc: 'Majestuoso gigante gaseoso célebre por su deslumbrante y complejo sistema de anillos planetarios compuestos primordialmente de partículas de hielo de agua y rocas.', 
      dia: '116,460 km', 
      dist: '9.58 AU', 
      orb: '29.5 años', 
      temp: '-140 °C',
      comp: 'Hidrógeno, Helio, trazas de hielo y roca en anillos',
      grav: '10.44 m/s²',
      moons: '146 Lunas confirmadas (Titán, Encélado...)'
    },
    { 
      id: 'uranus', 
      name: 'Urano', 
      baseColor: '#2dd4bf', 
      radius: 24, 
      distance: 700, 
      speed: 0.003, 
      angle: Math.random() * Math.PI * 2, 
      au: 19.2, 
      desc: 'Gigante helado caracterizado por poseer un eje de rotación extremadamente inclinado (casi 98 grados), lo que provoca estaciones únicas donde cada polo apunta directamente hacia el Sol.', 
      dia: '50,724 km', 
      dist: '19.22 AU', 
      orb: '84 años', 
      temp: '-195 °C',
      comp: 'Hidrógeno, Helio y Hielo de agua, amoníaco y metano',
      grav: '8.69 m/s²',
      moons: '28 Lunas conocidas'
    },
    { 
      id: 'neptune', 
      name: 'Neptuno', 
      baseColor: '#60a5fa', 
      radius: 23, 
      distance: 820, 
      speed: 0.002, 
      angle: Math.random() * Math.PI * 2, 
      au: 30.1, 
      desc: 'El planeta más distante del sistema solar en esta simulación. Un mundo azul tempestuoso e hiper-frío con los vientos más veloces registrados en todo el sistema planetario.', 
      dia: '49,244 km', 
      dist: '30.05 AU', 
      orb: '165 años', 
      temp: '-200 °C',
      comp: 'Hidrógeno, Helio, Metano (responsable de su color azul)',
      grav: '11.15 m/s²',
      moons: '16 Lunas conocidas (Tritón)'
    }
  ];

  let isRunning = true;
  let showOrbits = true;
  let speedMultiplier = 1.0;
  let tiltFactor = 0.50;
  let selectedPlanetId = 'all';
  let sunPulse = 0;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // ☀️ Sol Ampliado
    sunPulse += 0.025;
    const currentSunRadius = celestialObjects[0].radius + Math.sin(sunPulse) * 2.5;

    const sunCorona = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, currentSunRadius * 3);
    sunCorona.addColorStop(0, '#ffffff');
    sunCorona.addColorStop(0.3, '#ffcc00');
    sunCorona.addColorStop(0.7, '#ff5500');
    sunCorona.addColorStop(1, 'rgba(255, 68, 0, 0)');

    ctx.beginPath();
    ctx.arc(centerX, centerY, currentSunRadius * 3, 0, Math.PI * 2);
    ctx.fillStyle = sunCorona;
    ctx.fill();

    const sunCoreGrad = ctx.createRadialGradient(centerX - 10, centerY - 10, 2, centerX, centerY, currentSunRadius);
    sunCoreGrad.addColorStop(0, '#fffbcc');
    sunCoreGrad.addColorStop(0.5, '#ffaa00');
    sunCoreGrad.addColorStop(1, '#cc3300');

    ctx.beginPath();
    ctx.arc(centerX, centerY, currentSunRadius, 0, Math.PI * 2);
    ctx.fillStyle = sunCoreGrad;
    ctx.shadowBlur = 70;
    ctx.shadowColor = '#ff4400';
    ctx.fill();
    ctx.shadowBlur = 0;

    // 🪐 Órbitas y Planetas
    for (let i = 1; i < celestialObjects.length; i++) {
      const p = celestialObjects[i];

      if (showOrbits) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, p.distance, p.distance * tiltFactor, 0, 0, Math.PI * 2);
        ctx.strokeStyle = selectedPlanetId === p.id ? 'rgba(0, 242, 254, 0.75)' : 'rgba(125, 125, 125, 0.12)';
        ctx.lineWidth = selectedPlanetId === p.id ? 2.2 : 1.2;
        ctx.stroke();
      }

      const x = centerX + Math.cos(p.angle) * p.distance;
      const y = centerY + Math.sin(p.angle) * (p.distance * tiltFactor);

      p.currentX = x;
      p.currentY = y;

      if (p.hasRings) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(0.3);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 2.6, p.radius * 0.9, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.8)';
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(0, 0, p.radius * 2.1, p.radius * 0.7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(202, 138, 4, 0.55)';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }

      const lightAngle = Math.atan2(centerY - y, centerX - x);
      const planetGrad = ctx.createRadialGradient(
        x + Math.cos(lightAngle) * (p.radius * 0.3),
        y + Math.sin(lightAngle) * (p.radius * 0.3),
        p.radius * 0.1,
        x, y, p.radius
      );
      
      planetGrad.addColorStop(0, '#ffffff');
      planetGrad.addColorStop(0.3, p.baseColor);
      planetGrad.addColorStop(0.9, '#020408');
      planetGrad.addColorStop(1, '#000000');

      ctx.beginPath();
      ctx.arc(x, y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = planetGrad;
      ctx.shadowBlur = selectedPlanetId === p.id ? 35 : 12;
      ctx.shadowColor = p.baseColor;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (p.isEarth) {
        ctx.beginPath();
        ctx.arc(x - 4, y - 3, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fill();
      }
      if (p.isJupiter) {
        ctx.beginPath();
        ctx.ellipse(x, y - 3, p.radius * 0.8, p.radius * 0.25, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 140, 0, 0.4)';
        ctx.fill();
      }
      if (p.hasMoon) {
        const moonDist = 32;
        const moonX = x + Math.cos(p.angle * 6) * moonDist;
        const moonY = y + Math.sin(p.angle * 6) * (moonDist * tiltFactor);
        ctx.beginPath();
        ctx.arc(moonX, moonY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#cbd5e1';
        ctx.fill();
      }

      ctx.fillStyle = selectedPlanetId === p.id ? 'var(--primary-cyan)' : 'var(--text-main)';
      ctx.font = selectedPlanetId === p.id ? 'bold 14px Space Grotesk, sans-serif' : '13px Space Grotesk, sans-serif';
      ctx.fillText(p.name, x + p.radius + 10, y + 4);

      if (isRunning) {
        p.angle += p.speed * speedMultiplier;
      }
    }

    requestAnimationFrame(render);
  }

  // 🎛️ Controles
  const planetSelect = document.getElementById('planetSelect');
  const speedRange = document.getElementById('speedRange');
  const speedVal = document.getElementById('speedVal');
  const tiltRange = document.getElementById('tiltRange');
  const tiltVal = document.getElementById('tiltVal');
  const pausePlayBtn = document.getElementById('pausePlayBtn');
  const toggleOrbitsBtn = document.getElementById('toggleOrbitsBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  if (planetSelect) {
    planetSelect.addEventListener('change', (e) => {
      selectedPlanetId = e.target.value;
      if (selectedPlanetId !== 'all') {
        const p = celestialObjects.find(item => item.id === selectedPlanetId);
        if (p) openTelemetryModal(p);
      } else {
        const infoModal = document.getElementById('infoModal');
        if (infoModal) infoModal.classList.add('hidden');
      }
    });
  }

  if (speedRange) {
    speedRange.addEventListener('input', (e) => {
      speedMultiplier = parseFloat(e.target.value);
      if (speedVal) speedVal.textContent = `${speedMultiplier.toFixed(1)}x`;
    });
  }

  if (tiltRange) {
    tiltRange.addEventListener('input', (e) => {
      const val = e.target.value;
      if (tiltVal) tiltVal.textContent = `${val}°`;
      tiltFactor = val / 100;
    });
  }

  if (pausePlayBtn) {
    pausePlayBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      pausePlayBtn.textContent = isRunning ? '⏸️ Pausa' : '▶ Reanudar';
      pausePlayBtn.classList.toggle('active', isRunning);
    });
  }

  if (toggleOrbitsBtn) {
    toggleOrbitsBtn.addEventListener('click', () => {
      showOrbits = !showOrbits;
      toggleOrbitsBtn.textContent = showOrbits ? '🌐 Órbitas' : '🌐 Ocultas';
      toggleOrbitsBtn.classList.toggle('active', showOrbits);
    });
  }

  let isDarkMode = true;
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle('light-mode', !isDarkMode);
      themeToggleBtn.textContent = isDarkMode ? '🌙 Tema' : '☀️ Tema';
    });
  }

  canvas.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let clickedPlanet = null;
    celestialObjects.forEach(p => {
      if (p.id === 'sun') {
        const dist = Math.hypot(clickX - canvas.width/2, clickY - canvas.height/2);
        if (dist < p.radius * 1.6) clickedPlanet = p;
        return;
      }
      const dist = Math.hypot(clickX - p.currentX, clickY - p.currentY);
      if (dist < p.radius + 20) {
        clickedPlanet = p;
      }
    });

    if (