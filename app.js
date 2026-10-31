/**
 * ==========================================================================
 * MASTERPLAN RESIDENCIAL INTERACTIVO - JAVASCRIPT VANILLA
 * Fase 4: Transición Cinemática hacia theoutcome.mp4 al Clic en Piso 2
 * ==========================================================================
 */

// 1. Matriz de Datos Mock de los Pisos (Edificio Residencial de 6 Pisos + Planta Baja)
const floorsData = [
  {
    id: "6",
    number: 6,
    name: "Piso 6",
    rooms: "3 Recámaras",
    area: "180 m²",
    price: "$420,000 USD",
    status: "Disponible",
    pixelCenterY: 358,
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
    pixelCenterY: 473,
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
    pixelCenterY: 588,
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
    pixelCenterY: 703,
    hasVideo: false
  },
  {
    id: "2",
    number: 2,
    name: "Piso 2",
    rooms: "2 Recámaras",
    area: "140 m²",
    price: "$315,000 USD",
    status: "Disponible",
    pixelCenterY: 818,
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
    pixelCenterY: 933,
    hasVideo: false
  },
  {
    id: "PB",
    number: 0,
    name: "Planta Baja • Áreas Sociales",
    rooms: "Lobby & Spa",
    area: "Piscinas y Deck Exterior",
    price: "Acceso Libre Residentes",
    status: "Piscina & Amenities",
    pixelCenterY: 1100,
    hasVideo: false,
    isPool: true
  }
];

const floorsMap = floorsData.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

// 1.1. Matriz Modular de Departamentos (Pisos 1 al 6: 4 columnas por torre = 8 por piso - Hueco central vacío)
const columnSpecs = [
  { col: 1, suffix: "01", tower: "Torre A • Ext.", label: "Terraza Panorámica", rooms: "3 Recámaras", area: "165 m²", targetX: 471,  priceDelta: 20000 },
  { col: 2, suffix: "02", tower: "Torre A • Centro", label: "Vista a Piscinas",   rooms: "2 Recámaras", area: "140 m²", targetX: 712, priceDelta: 0 },
  { col: 3, suffix: "03", tower: "Torre A • Centro", label: "Vista a Piscinas",   rooms: "2 Recámaras", area: "140 m²", targetX: 955, priceDelta: 0 },
  { col: 4, suffix: "04", tower: "Torre A • Int.",  label: "Frente Central",      rooms: "3 Recámaras", area: "155 m²", targetX: 1155, priceDelta: 15000 },
  { col: 5, suffix: "05", tower: "Torre B • Int.",  label: "Frente Central",      rooms: "3 Recámaras", area: "155 m²", targetX: 1385, priceDelta: 15000 },
  { col: 6, suffix: "06", tower: "Torre B • Centro", label: "Vista a Piscinas",   rooms: "2 Recámaras", area: "140 m²", targetX: 1590, priceDelta: 0 },
  { col: 7, suffix: "07", tower: "Torre B • Centro", label: "Vista a Piscinas",   rooms: "2 Recámaras", area: "140 m²", targetX: 1832, priceDelta: 0 },
  { col: 8, suffix: "08", tower: "Torre B • Ext.", label: "Terraza Panorámica", rooms: "3 Recámaras", area: "165 m²", targetX: 2075, priceDelta: 20000 },
];

const floorBasePrices = {
  6: 390000,
  5: 365000,
  4: 345000,
  3: 330000,
  2: 305000,
  1: 280000
};

const floorYCoords = {
  6: 358,
  5: 473,
  4: 588,
  3: 703,
  2: 818,
  1: 933
};

// Generar catálogo de 48 departamentos individuales
const unitsMap = {};
for (let f = 1; f <= 6; f++) {
  const basePrice = floorBasePrices[f];
  const targetY = floorYCoords[f];

  columnSpecs.forEach(col => {
    const unitId = `${f}${col.suffix}`;
    const priceNumber = basePrice + col.priceDelta;
    const isVideoUnit = (unitId === "204");

    unitsMap[unitId] = {
      id: unitId,
      floor: f,
      number: parseInt(unitId, 10),
      name: `Departamento ${unitId}`,
      tower: col.tower,
      label: col.label,
      rooms: col.rooms,
      area: col.area,
      price: `$${priceNumber.toLocaleString()} USD`,
      status: "Disponible",
      targetX: col.targetX,
      targetY: targetY,
      hasVideo: isVideoUnit,
      videoSrc: isVideoUnit ? "./theoutcome.mp4" : null
    };
  });
}

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
let currentActiveFloor = '7';
let currentActiveUnit = null;
let isZoomedIn = false;
let isPoolViewActive = false;
let isVideoPlaying = false;

/**
 * 3. Actualización Instantánea del Panel Lateral para Piso Completo
 */
function updateSidebarInfo(floorId) {
  const floor = floorsMap[floorId];
  if (!floor) return;

  currentActiveFloor = floorId;
  currentActiveUnit = null;

  // Deseleccionar cualquier balcón individual
  document.querySelectorAll('.unit-hotspot').forEach(el => el.classList.remove('is-selected'));

  if (displayTitle)  displayTitle.textContent  = floor.name;
  if (displayStatus) displayStatus.textContent = floor.status;
  if (displayRooms)  displayRooms.textContent  = floor.rooms;
  if (displayArea)   displayArea.textContent   = floor.area;
  if (displayPrice)  displayPrice.textContent  = floor.price;

  const sidebarBadge = document.querySelector('.sidebar-badge span:first-child');
  if (sidebarBadge) {
    sidebarBadge.textContent = 'Residencial';
  }

  // Adaptar el botón del panel lateral
  if (btnEnterApartment) {
    if (floor.hasVideo) {
      btnEnterApartment.innerHTML = '<span>🎬 Ver Tour Interior</span>';
      btnEnterApartment.style.display = 'flex';
    } else if (floor.isPool || floor.id === 'PB') {
      if (isPoolViewActive) {
        btnEnterApartment.innerHTML = '<span>← Volver a la Fachada Principal</span>';
      } else {
        btnEnterApartment.innerHTML = '<span>🏊 Ver Zona de Piscinas y Jardines</span>';
      }
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

  // Animación sutil de actualización de datos en la tarjeta
  const cardElement = document.getElementById('floorDynamicCard');
  if (cardElement) {
    cardElement.classList.remove('is-updating');
    void cardElement.offsetWidth;
    cardElement.classList.add('is-updating');
  }
}

/**
 * 3.1. Actualización Instantánea para Departamentos / Balcones Individuales
 */
function updateSidebarUnitInfo(unitId) {
  const unit = unitsMap[unitId];
  if (!unit) return;

  currentActiveUnit = unitId;
  currentActiveFloor = String(unit.floor);

  if (displayTitle)  displayTitle.textContent  = unit.name;
  if (displayStatus) displayStatus.textContent = unit.status;
  if (displayRooms)  displayRooms.textContent  = unit.rooms;
  if (displayArea)   displayArea.textContent   = unit.area;
  if (displayPrice)  displayPrice.textContent  = unit.price;

  const sidebarBadge = document.querySelector('.sidebar-badge span:first-child');
  if (sidebarBadge) {
    sidebarBadge.textContent = `Piso ${unit.floor} • ${unit.tower}`;
  }

  if (btnEnterApartment) {
    if (unit.hasVideo) {
      btnEnterApartment.innerHTML = '<span>🎬 Ver Tour Interior (Depto 204)</span>';
    } else {
      btnEnterApartment.innerHTML = `<span>🔍 Acercar al ${unit.name}</span>`;
    }
    btnEnterApartment.style.display = 'flex';
  }

  // Animación sutil de datos en la tarjeta
  const cardElement = document.getElementById('floorDynamicCard');
  if (cardElement) {
    cardElement.classList.remove('is-updating');
    void cardElement.offsetWidth;
    cardElement.classList.add('is-updating');
  }

  // Sincronizar grupo de piso activo
  floorGroups.forEach(group => {
    group.classList.toggle('is-active', group.getAttribute('data-floor') === String(unit.floor));
  });

  // Resaltar balcón activo
  document.querySelectorAll('.unit-hotspot').forEach(el => {
    el.classList.toggle('is-selected', el.getAttribute('data-unit') === unitId);
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

  // 1. Zoom convergente suave manteniendo transformOrigin fijo (0, 0)
  const zoomScale = 2.4;
  const tx = 1155 * (1 - zoomScale);
  const ty = floor.pixelCenterY * (1 - zoomScale);
  sceneWrapper.style.transform = `translate(${tx}px, ${ty}px) scale(${zoomScale})`;

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
  isPoolViewActive = false;
  currentActiveUnit = null;
  document.querySelectorAll('.unit-hotspot').forEach(el => el.classList.remove('is-selected'));

  // Desvanecer capa de video
  videoTransitionLayer.classList.remove('is-active', 'is-arrived');
  if (apartmentVideo) {
    apartmentVideo.pause();
  }

  document.body.classList.remove('in-apartment-view');

  // Regresar suavemente a la fachada completa (transformOrigin fijo 0 0)
  sceneWrapper.style.transform = 'translate(0px, 0px) scale(1)';
  stageFullscreen.classList.remove('is-zoomed', 'in-pool-view');
  if (btnResetZoom) {
    btnResetZoom.classList.remove('is-visible');
  }
}

/**
 * Calcula el desplazamiento vertical óptimo para revelar la piscina
 * manteniendo la imagen siempre en cobertura total (100% fullscreen sin bordes negros).
 */
function getPoolOverflowY() {
  const renderedHeight = window.innerWidth * (1792 / 2396);
  return Math.max(0, renderedHeight - window.innerHeight);
}

/**
 * 7. Vista Deslizante Cinemática hacia la Piscina y Planta Baja
 * Desplaza suavemente la cámara hacia abajo sin hacer zoom out,
 * conservando la pantalla completa de borde a borde sin bandas negras.
 */
function enterPoolView() {
  if (!sceneWrapper) return;

  isPoolViewActive = true;
  isZoomedIn = false;
  currentActiveUnit = null;
  document.querySelectorAll('.unit-hotspot').forEach(el => el.classList.remove('is-selected'));

  const overflowY = getPoolOverflowY();

  // Desplazamiento continuo hacia abajo con transformOrigin fijo en (0, 0)
  sceneWrapper.style.transform = `translate(0px, -${overflowY}px) scale(1)`;

  stageFullscreen.classList.remove('is-zoomed');
  stageFullscreen.classList.add('is-zoomed', 'in-pool-view');
  if (btnResetZoom) {
    btnResetZoom.classList.add('is-visible');
    btnResetZoom.innerHTML = '<span>← Volver a la fachada</span> <small>(Planta Baja y Piscinas)</small>';
  }

  if (btnEnterApartment && currentActiveFloor === 'PB') {
    btnEnterApartment.innerHTML = '<span>← Volver a la Fachada Principal</span>';
  }
}

/**
 * 8. Zoom Estándar para Pisos Completos
 * Utiliza transformOrigin fijo (0, 0) y traslación matemática compensada.
 */
function enterStandardZoom(floorId) {
  const floor = floorsMap[floorId];
  if (!floor || !sceneWrapper) return;

  isZoomedIn = true;
  isPoolViewActive = false;
  currentActiveUnit = null;
  document.querySelectorAll('.unit-hotspot').forEach(el => el.classList.remove('is-selected'));

  const zoomScale = 1.75;
  const tx = 1198 * (1 - zoomScale);
  const ty = floor.pixelCenterY * (1 - zoomScale);
  sceneWrapper.style.transform = `translate(${tx}px, ${ty}px) scale(${zoomScale})`;

  stageFullscreen.classList.remove('in-pool-view');
  stageFullscreen.classList.add('is-zoomed');
  if (btnResetZoom) {
    btnResetZoom.classList.add('is-visible');
    btnResetZoom.innerHTML = `<span>← Volver a la fachada</span> <small>(${floor.name})</small>`;
  }
}

/**
 * 8.1. Zoom Focalizado al Balcón / Grid de un Departamento Individual (Pisos 1 al 6)
 * Aplica una aproximación cinemática (scale 2.15) centrada ópticamente en el balcón del apartamento.
 */
function enterUnitZoom(unitId) {
  const unit = unitsMap[unitId];
  if (!unit || !sceneWrapper) return;

  if (unit.hasVideo) {
    enterVideoTransition('2');
    return;
  }

  isZoomedIn = true;
  isPoolViewActive = false;
  currentActiveUnit = unitId;
  currentActiveFloor = String(unit.floor);

  updateSidebarUnitInfo(unitId);

  const zoomScale = 2.15;
  const aspect = window.innerWidth / window.innerHeight;
  // Centro óptico compensando el panel lateral derecho flotante
  const viewCenterX = window.innerWidth > 900 ? 1075 : 1198;
  const viewCenterY = (2396 / aspect) / 2;

  const tx = viewCenterX - unit.targetX * zoomScale;
  const ty = viewCenterY - unit.targetY * zoomScale;
  sceneWrapper.style.transform = `translate(${tx}px, ${ty}px) scale(${zoomScale})`;

  stageFullscreen.classList.remove('in-pool-view');
  stageFullscreen.classList.add('is-zoomed');

  if (btnResetZoom) {
    btnResetZoom.classList.add('is-visible');
    btnResetZoom.innerHTML = `<span>← Volver a la fachada</span> <small>(${unit.name} • Piso ${unit.floor})</small>`;
  }
}

function resetStandardZoom() {
  isZoomedIn = false;
  isPoolViewActive = false;
  currentActiveUnit = null;
  document.querySelectorAll('.unit-hotspot').forEach(el => el.classList.remove('is-selected'));

  sceneWrapper.style.transform = 'translate(0px, 0px) scale(1)';

  stageFullscreen.classList.remove('is-zoomed', 'in-pool-view');
  if (btnResetZoom) {
    btnResetZoom.classList.remove('is-visible');
  }
  if (floatingSidebar) {
    floatingSidebar.classList.remove('is-immersive');
  }

  if (btnEnterApartment && currentActiveFloor === 'PB') {
    btnEnterApartment.innerHTML = '<span>🏊 Ver Zona de Piscinas y Jardines</span>';
  }
}

/**
 * 9. Manejador Central de Clic en Piso
 */
function handleFloorClick(floorId) {
  const floor = floorsMap[floorId];
  if (!floor) return;

  currentActiveUnit = null;
  document.querySelectorAll('.unit-hotspot').forEach(el => el.classList.remove('is-selected'));

  // Actualizar datos del panel de inmediato con animación fluida
  updateSidebarInfo(floorId);

  if (floorId === 'PB') {
    // Si ya está en la vista de piscina, regresar a la fachada
    if (isPoolViewActive) {
      resetStandardZoom();
    } else {
      enterPoolView();
    }
  } else if (floor.hasVideo) {
    // Si tiene video (Piso 2), ejecutar la transición inmersiva
    isPoolViewActive = false;
    enterVideoTransition(floorId);
  } else {
    // Si es otro piso (1, 3, 4, 5, 6, 7 Dúplex), aplicar el zoom cinemático
    isPoolViewActive = false;
    enterStandardZoom(floorId);
  }
}

// 9.1. Listeners para los Grids Individuales de Balcones (Pisos 1 al 6)
const unitHotspots = document.querySelectorAll('.unit-hotspot');
unitHotspots.forEach(unitEl => {
  const unitId = unitEl.getAttribute('data-unit');

  unitEl.addEventListener('mouseenter', () => {
    updateSidebarUnitInfo(unitId);
  });

  unitEl.addEventListener('click', (e) => {
    e.stopPropagation();
    enterUnitZoom(unitId);
  });

  unitEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      enterUnitZoom(unitId);
    }
  });
});

// 9.2. Listeners para Grupos de Piso y Badges
floorGroups.forEach(group => {
  const floorId = group.getAttribute('data-floor');

  // mouseenter sobre el grupo de piso (solo si no hay balcón activo específico)
  group.addEventListener('mouseenter', (e) => {
    if (!e.target.closest('.unit-hotspot')) {
      updateSidebarInfo(floorId);
    }
  });

  // click en el grupo de piso (ej. Piso 7 Dúplex o Planta Baja)
  group.addEventListener('click', (e) => {
    if (!e.target.closest('.unit-hotspot')) {
      e.stopPropagation();
      handleFloorClick(floorId);
    }
  });

  // Teclado (Enter / Espacio)
  group.addEventListener('keydown', (e) => {
    if (!e.target.closest('.unit-hotspot') && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleFloorClick(floorId);
    }
  });
});

// Badges de Piso (hacen zoom al piso completo)
document.querySelectorAll('.svg-badge').forEach(badge => {
  badge.style.cursor = 'pointer';
  badge.addEventListener('click', (e) => {
    e.stopPropagation();
    const floorGroup = badge.closest('.floor-group');
    if (floorGroup) {
      const floorId = floorGroup.getAttribute('data-floor');
      handleFloorClick(floorId);
    }
  });
});

// Botón "Ver Tour Interior / Acercar" del panel lateral
if (btnEnterApartment) {
  btnEnterApartment.addEventListener('click', () => {
    if (currentActiveUnit && unitsMap[currentActiveUnit]) {
      enterUnitZoom(currentActiveUnit);
    } else {
      handleFloorClick(currentActiveFloor);
    }
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

// Clic en fondo libre de la fachada aleja el zoom o vuelve de la piscina si está activo
stageFullscreen.addEventListener('click', (e) => {
  if ((isZoomedIn || isPoolViewActive) && !isVideoPlaying && !e.target.closest('.floor-group') && !e.target.closest('.floating-sidebar') && !e.target.closest('.btn-reset-zoom')) {
    resetStandardZoom();
  }
});

// Navegación de teclado: Escape y Flechas Arriba / Abajo entre pisos
const floorOrder = ['PB', '1', '2', '3', '4', '5', '6'];

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isVideoPlaying) {
      exitApartmentVideo();
    } else if (isZoomedIn || isPoolViewActive) {
      resetStandardZoom();
    }
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    // Si se está en modo zoom o en la piscina, las flechas permiten volar suavemente de piso en piso
    if (!isVideoPlaying && (isZoomedIn || isPoolViewActive)) {
      e.preventDefault();
      const currentIndex = floorOrder.indexOf(currentActiveFloor);
      if (currentIndex !== -1) {
        if (e.key === 'ArrowUp' && currentIndex < floorOrder.length - 1) {
          handleFloorClick(floorOrder[currentIndex + 1]);
        } else if (e.key === 'ArrowDown' && currentIndex > 0) {
          handleFloorClick(floorOrder[currentIndex - 1]);
        }
      }
    }
  }
});

// Ajuste dinámico en caso de redimensionar la ventana mientras se está en la vista de piscina
window.addEventListener('resize', () => {
  if (isPoolViewActive) {
    const overflowY = getPoolOverflowY();
    sceneWrapper.style.transform = `translate(0px, -${overflowY}px) scale(1)`;
  }
});

// Inicializar por defecto en Piso 2
updateSidebarInfo('2');














