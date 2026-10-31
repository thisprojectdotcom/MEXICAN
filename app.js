/**
 * ==========================================================================
 * MASTERPLAN RESIDENCIAL INTERACTIVO - JAVASCRIPT VANILLA
 * Fase 4: Transición Cinemática hacia theoutcome.mp4 al Clic en Piso 2
 * ==========================================================================
 */

// 1. Matriz de Datos Mock de los Pisos
const floorsData = [
  {
    id: "7",
    number: 7,
    name: "Piso 7 • Penthouse",
    rooms: "4 Recámaras",
    area: "240 m²",
    price: "$580,000 USD",
    status: "Exclusivo",
    pixelCenterY: 405,
    hasVideo: false
  },
  {
    id: "6",
    number: 6,
    name: "Piso 6",
    rooms: "3 Recámaras",
    area: "180 m²",
    price: "$420,000 USD",
    status: "Disponible",
    pixelCenterY: 720,
    hasVideo: false
  },
  {
    id: "5",
    number: 5,
    name: "Piso 5",
    rooms: "3 Recámaras",
    area: "165 m²",
    price: "$385,000 USD",
    status: "Disponible",
    pixelCenterY: 942,
    hasVideo: false
  },
  {
    id: "4",
    number: 4,
    name: "Piso 4",
    rooms: "3 Recámaras",
    area: "155 m²",
    price: "$360,000 USD",
    status: "Disponible",
    pixelCenterY: 1168,
    hasVideo: false
  },
  {
    id: "3",
    number: 3,
    name: "Piso 3",
    rooms: "3 Recámaras",
    area: "155 m²",
    price: "$345,000 USD",
    status: "Disponible",
    pixelCenterY: 1398,
    hasVideo: false
  },
  {
    id: "2",
    number: 2,
    name: "Piso 2",
    rooms: "2 Recámaras",
    area: "140 m²",
    price: "$315,000 USD",
    status: "Tour en Video",
    pixelCenterY: 1628,
    hasVideo: true, // Conectado a theoutcome.mp4
    videoSrc: "./theoutcome.mp4"
  },
  {
    id: "1",
    number: 1,
    name: "Piso 1",
    rooms: "2 Recámaras",
    area: "130 m²",
    price: "$290,000 USD",
    status: "Disponible",
    pixelCenterY: 1856,
    hasVideo: false
  },
  {
    id: "PB",
    number: 0,
    name: "Planta Baja",
    rooms: "Lobby & Spa",
    area: "Áreas Comunes",
    price: "Acceso Libre",
    status: "Amenities",
    pixelCenterY: 2165,
    hasVideo: false
  }
];

const floorsMap = floorsData.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

// 2. Elementos del DOM
const sceneWrapper         = document.getElementById('sceneWrapper');
const stageFullscreen      = document.getElementById('stageFullscreen');
const floorGroups          = document.querySelectorAll('.floor-group');
const displayTitle         = document.getElementById('displayFloorTitle');
const displayStatus        = document.getElementById('displayFloorStatus');
const displayRooms         = document.getElementById('displayRooms');
const displayArea          = document.getElementById('displayArea');
const displayPrice         = document.getElementById('displayPrice');
const floatingSidebar      = document.getElementById('floatingSidebar');
const btnResetZoom         = document.getElementById('btnResetZoom');
const btnEnterApartment    = document.getElementById('btnEnterApartment');

// Capa de Video y HUD
const videoTransitionLayer = document.getElementById('videoTransitionLayer');
const apartmentVideo       = document.getElementById('apartmentVideo');
const interiorHudTitle     = document.getElementById('interiorHudTitle');
const btnExitApartment     = document.getElementById('btnExitApartment');
const btnReplayVideo       = document.getElementById('btnReplayVideo');
const btnQuickExit         = document.getElementById('btnQuickExit');

// Estado interno
let currentActiveFloor = '2';
let isZoomedIn = false;
let isVideoPlaying = false;

/**
 * 3. Actualización Instantánea del Panel Lateral
 */
function updateSidebarInfo(floorId) {
  const floor = floorsMap[floorId];
  if (!floor) return;

  currentActiveFloor = floorId;

  if (displayTitle)  displayTitle.textContent  = floor.name;
  if (displayStatus) displayStatus.textContent = floor.status;
  if (displayRooms)  displayRooms.textContent  = floor.rooms;
  if (displayArea)   displayArea.textContent   = floor.area;
  if (displayPrice)  displayPrice.textContent  = floor.price;

  // Adaptar el botón del panel lateral
  if (btnEnterApartment) {
    if (floor.hasVideo) {
      btnEnterApartment.innerHTML = '<span>🎬 Ver Tour Interior (Video)</span>';
      btnEnterApartment.style.display = 'flex';
    } else {
      btnEnterApartment.innerHTML = '<span>🔍 Acercar al Piso</span>';
      btnEnterApartment.style.display = 'flex';
    }
  }

  // Sincronizar estilos visuales del piso en la imagen
  floorGroups.forEach(group => {
    if (group.getAttribute('data-floor') === floorId) {
      group.classList.add('is-active');
    } else {
      group.classList.remove('is-active');
    }
  });
}

/**
 * 4. Transición Óptica Hacia el Video del Departamento (Piso 2)
 * Resuelve la discrepancia visual entre la fachada diurna y el atardecer del video
 * mediante zoom convergente y crossfade de luz cálida (Golden Hour Glow).
 */
function enterVideoTransition(floorId) {
  const floor = floorsMap[floorId];
  if (!floor || !apartmentVideo) return;

  isVideoPlaying = true;
  document.body.classList.add('in-apartment-view');

  // 1. Zoom dinámico de la fachada hacia el balcón exacto del piso
  sceneWrapper.style.transformOrigin = `2394px ${floor.pixelCenterY}px`;
  sceneWrapper.style.transform = 'scale(2.4)';

  // 2. Destello cálido y crossfade con el video
  videoTransitionLayer.classList.remove('is-arrived');
  videoTransitionLayer.classList.add('is-active', 'is-flashing');

  // Iniciar video desde el comienzo del vuelo
  apartmentVideo.currentTime = 0;
  const playPromise = apartmentVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(err => {
      console.warn("Autoplay silenciado activado:", err);
      apartmentVideo.muted = true;
      apartmentVideo.play();
    });
  }

  // Desvanecer el destello una vez comenzada la reproducción
  setTimeout(() => {
    videoTransitionLayer.classList.remove('is-flashing');
  }, 650);
}

/**
 * 5. Llegada al Interior del Departamento
 * Cuando el video se aproxima a la sala (minuto 8.5 o fin), se estabiliza la escena y emerge el HUD.
 */
function handleVideoArrival() {
  videoTransitionLayer.classList.add('is-arrived');
  if (interiorHudTitle) {
    interiorHudTitle.textContent = "Departamento Piso 2";
  }
}

// Monitoreo de progreso del video
if (apartmentVideo) {
  apartmentVideo.addEventListener('timeupdate', () => {
    // Si sobrepasa los 8.5 segundos, ya está dentro de la sala
    if (apartmentVideo.currentTime >= 8.5) {
      handleVideoArrival();
    }
  });

  apartmentVideo.addEventListener('ended', () => {
    handleVideoArrival();
    // Pausar en el último cuadro para contemplar la sala
    apartmentVideo.pause();
  });
}

/**
 * 6. Salir del Departamento y Volver a la Fachada Completa
 */
function exitApartmentVideo() {
  isVideoPlaying = false;
  isZoomedIn = false;

  // Desvanecer capa de video
  videoTransitionLayer.classList.remove('is-active', 'is-arrived');
  if (apartmentVideo) {
    apartmentVideo.pause();
  }

  document.body.classList.remove('in-apartment-view');

  // Regresar el zoom a la vista general de la fachada
  sceneWrapper.style.transform = 'scale(1)';
  stageFullscreen.classList.remove('is-zoomed');
  if (btnResetZoom) {
    btnResetZoom.classList.remove('is-visible');
  }
}

/**
 * 7. Zoom Estándar para Pisos sin Video (ej. Pisos 1, 3, 4, 5, 6, 7)
 */
function enterStandardZoom(floorId) {
  const floor = floorsMap[floorId];
  if (!floor || !sceneWrapper) return;

  isZoomedIn = true;
  sceneWrapper.style.transformOrigin = `2394px ${floor.pixelCenterY}px`;
  sceneWrapper.style.transform = 'scale(1.8)';

  stageFullscreen.classList.add('is-zoomed');
  if (btnResetZoom) {
    btnResetZoom.classList.add('is-visible');
    btnResetZoom.innerHTML = `<span>← Volver a la fachada</span> <small>(${floor.name})</small>`;
  }
}

function resetStandardZoom() {
  isZoomedIn = false;
  sceneWrapper.style.transform = 'scale(1)';

  stageFullscreen.classList.remove('is-zoomed');
  if (btnResetZoom) {
    btnResetZoom.classList.remove('is-visible');
  }
  if (floatingSidebar) {
    floatingSidebar.classList.remove('is-immersive');
  }
}

/**
 * 8. Manejador Central de Clic en Piso
 */
function handleFloorClick(floorId) {
  const floor = floorsMap[floorId];
  if (!floor) return;

  if (floor.hasVideo) {
    // Si tiene video (Piso 2), ejecutar la transición inmersiva
    enterVideoTransition(floorId);
  } else {
    // Si aún no tiene video, aplicar el zoom suave de fachada
    enterStandardZoom(floorId);
  }
}

// 9. Registro de Listeners de Eventos
floorGroups.forEach(group => {
  const floorId = group.getAttribute('data-floor');

  // mouseenter -> actualiza al instante la información del piso en el panel
  group.addEventListener('mouseenter', () => {
    updateSidebarInfo(floorId);
  });

  // click -> ejecuta la transición
  group.addEventListener('click', (e) => {
    e.stopPropagation();
    handleFloorClick(floorId);
  });

  // Teclado (Enter / Espacio)
  group.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFloorClick(floorId);
    }
  });
});

// Botón "Ver Tour Interior" del panel lateral
if (btnEnterApartment) {
  btnEnterApartment.addEventListener('click', () => {
    handleFloorClick(currentActiveFloor);
  });
}

// Botones del reproductor de video
if (btnExitApartment) {
  btnExitApartment.addEventListener('click', exitApartmentVideo);
}

if (btnQuickExit) {
  btnQuickExit.addEventListener('click', exitApartmentVideo);
}

if (btnReplayVideo) {
  btnReplayVideo.addEventListener('click', () => {
    if (apartmentVideo) {
      videoTransitionLayer.classList.remove('is-arrived');
      apartmentVideo.currentTime = 0;
      apartmentVideo.play();
    }
  });
}

// Botón para salir del zoom de fachada estándar
if (btnResetZoom) {
  btnResetZoom.addEventListener('click', (e) => {
    e.stopPropagation();
    resetStandardZoom();
  });
}

// Clic en fondo libre de la fachada aleja el zoom si está activo
stageFullscreen.addEventListener('click', (e) => {
  if (isZoomedIn && !isVideoPlaying && !e.target.closest('.floor-group') && !e.target.closest('.floating-sidebar')) {
    resetStandardZoom();
  }
});

// Tecla Escape para salir de cualquier zoom o video tour instantáneamente
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isVideoPlaying) {
      exitApartmentVideo();
    } else if (isZoomedIn) {
      resetStandardZoom();
    }
  }
});

// Inicializar por defecto en Piso 2 para destacar la disponibilidad del Video Tour
updateSidebarInfo('2');
