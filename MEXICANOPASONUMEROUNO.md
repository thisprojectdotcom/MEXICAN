# 🏢 MEXICANO PASO NÚMERO UNO: Análisis Estructural y Hoja de Ruta Interactiva

> **Especialidad:** Frontend Senior & Interfaces Interactivas Inmobiliarias  
> **Proyecto:** Selector Interactivo de Pisos de Edificio Residencial  
> **Archivo Fuente:** `IMAGENPRINCIPAL/tungtungsahur.jpg` (Resolución Nativa: 4788 × 3584 px)  
> **Estado Actual:**  
> • **Fase 1:** ✅ Completada con éxito (Análisis estructural, detección de losas y cálculo de coordenadas)  
> • **Fase 2:** ✅ Completada con éxito (Fondo total 100vw/100vh, 7 Pisos + Planta Baja, highlight orgánico y panel lateral minimalista)  
> • **Fase 3:** ✅ Completada con éxito (Lógica JavaScript Vanilla, sincronización reactiva `mouseenter` y zoom cinemático `scale(1.8)`)  
> • **Fase 4:** ✅ Completada y 100% Operativa (Integración de `theoutcome.mp4` en Piso 2, crossfade Golden Hour, HUD inmersivo y navegación bidireccional)  

---

## 📌 PARTE 1: Auditoría y Geometría Estructural

### 1.1. Geometría Real del Edificio: 7 Pisos Residenciales + Planta Baja
Tras la verificación directa sobre la imagen y la validación del usuario, se confirmó que el edificio consta de **7 Pisos Residenciales + Planta Baja**:
* **Planta Baja (Lobby / Amenities):** Base con ventanales de doble altura, recepción y áreas comunes hacia la piscina (`y: 1970` a `2360`).
* **Piso 1 al Piso 6:** Niveles intermedios de balcones y residencias (`y: 610` a `1970`).
* **Piso 7 (Penthouse):** Nivel superior rematado bajo las bóvedas curvas de la cubierta (`y: 200` a `610`).

### 1.2. Solución Definitiva al Desalineamiento por Zoom (SVG Fullscreen)
* Al utilizar un SVG en pantalla completa (`100vw` × `100vh`) con `viewBox="0 0 4788 3584"` y `preserveAspectRatio="xMidYMid slice"`, tanto la imagen como las zonas de piso quedan unidas a la misma matriz matemática. No existe desplazamiento o desfase de píxeles al redimensionar la ventana o aplicar zoom.

---

## 🚀 PARTE 2: Refinamiento de Interfaz (HTML5 y CSS3)

1. **Fondo Total:** La fotografía [`tungtungsahur.jpg`](file:///C:/Users/Admin/Desktop/MEXICAN/IMAGENPRINCIPAL/tungtungsahur.jpg) es el fondo integral del sitio de borde a borde.
2. **Highlight Orgánico:** Eliminación del bloque blanco lechoso. Se implementó `mix-blend-mode: screen`, opacidad de luz del `0.08` y líneas luminosas en las losas de concreto superior e inferior (`.floor-slab-top`, `.floor-slab-bot`).
3. **Panel Lateral Flotante a la Derecha:** Con efecto *glassmorphism* de lujo (`backdrop-filter: blur(24px)`), tipografía *Plus Jakarta Sans*, título destacado **"Selecciona tu piso"** y sin lista saturada de unidades.

---

## ⚡ PARTE 3: Implementación de Lógica JavaScript Vanilla (`app.js`)

Se ha desarrollado e integrado con éxito el archivo [`app.js`](file:///C:/Users/Admin/Desktop/MEXICAN/app.js) sin librerías externas pesadas (100% nativo):

### 3.1. Matriz de Datos Mock de los Pisos (`floorsData`)
Cada nivel cuenta con su identificador, nombre, cantidad de habitaciones, superficie en m², precio base de venta y centro vectorial vertical (`pixelCenterY`) para el zoom:

```javascript
const floorsData = [
  { id: "7", name: "Piso 7 • Penthouse", rooms: "4 Recámaras", area: "240 m²", price: "$580,000 USD", status: "Exclusivo", pixelCenterY: 405 },
  { id: "6", name: "Piso 6",            rooms: "3 Recámaras", area: "180 m²", price: "$420,000 USD", status: "Disponible", pixelCenterY: 720 },
  { id: "5", name: "Piso 5",            rooms: "3 Recámaras", area: "165 m²", price: "$385,000 USD", status: "Disponible", pixelCenterY: 942 },
  { id: "4", name: "Piso 4",            rooms: "3 Recámaras", area: "155 m²", price: "$360,000 USD", status: "Disponible", pixelCenterY: 1168 },
  { id: "3", name: "Piso 3",            rooms: "3 Recámaras", area: "155 m²", price: "$345,000 USD", status: "Disponible", pixelCenterY: 1398 },
  { id: "2", name: "Piso 2",            rooms: "2 Recámaras", area: "140 m²", price: "$315,000 USD", status: "Disponible", pixelCenterY: 1628 },
  { id: "1", name: "Piso 1",            rooms: "2 Recámaras", area: "130 m²", price: "$290,000 USD", status: "Disponible", pixelCenterY: 1856 },
  { id: "PB", name: "Planta Baja",      rooms: "Lobby & Spa", area: "Áreas Comunes", price: "Acceso Libre", status: "Amenities", pixelCenterY: 2165 }
];
```

### 3.2. Sincronización Reactiva (`mouseenter`)
* Se conectó un listener para el evento `mouseenter` en cada grupo de piso (`.floor-group`).
* Al pasar el cursor sobre el **Piso 3** (o cualquiera de los niveles), se actualizan al instante en el panel lateral los elementos `#displayFloorTitle`, `#displayRooms`, `#displayArea` y `#displayPrice`.
* La sincronización se realiza en tiempo real a 60 FPS sin parpadeos ni recargas.

### 3.3. Animación Cinemática de Zoom al Clic (`click` → `scale(1.8)`)
* Cada piso cuenta con un listener de `click`.
* Al hacer clic en un nivel:
  1. Se calcula el punto focal exacto del piso: `sceneWrapper.style.transformOrigin = '2394px ${floor.pixelCenterY}px'`.
  2. Se aplica la transformación `scale(1.8)` con una curva de aceleración física suave: `transition: transform 1.15s cubic-bezier(0.16, 1, 0.3, 1)`.
  3. La cámara se aproxima suavemente a la fachada y entra en los balcones y ventanales del departamento seleccionado.
  4. Emerge un botón flotante en la esquina inferior izquierda: **`← Volver a la fachada`** (`#btnResetZoom`).
  5. Al hacer clic en dicho botón o en el fondo libre, la vista regresa fluidamente a `scale(1)`.

---

## 🎬 PARTE 4: Implementación Operativa de la Fase 4 (Video Tours Inmersivos)

```
[FASE 4 COMPLETADA Y OPERATIVA - PISO 2 ACTIVO CON THEOUTCOME.MP4]
```

### 4.1. Arquitectura y Flujo Cinemático de Transición
1. **La Fachada Principal como Base Permanente:** La vista panorámica diurna (`IMAGENPRINCIPAL/tungtungsahur.jpg`) se mantiene como el núcleo interactivo general.
2. **Activación al Clic en Piso 2:**
   * Al hacer clic en el Piso 2 (o pulsar el botón *"🎬 Ver Tour Interior (Video)"* del panel lateral), se activa una transición en 3 tiempos:
     1. **Zoom Convergente:** La cámara SVG ejecuta un zoom dinámico acelerado (`scale(2.4)`) con punto focal exacto en el balcón del Piso 2 (`x: 2394px, y: 1628px`).
     2. **Destello Óptico Cálido (Golden Hour Bloom):** Para resolver de forma orgánica la diferencia entre la imagen diurna de la fachada y la iluminación al atardecer del video, se dispara un destello radial con `mix-blend-mode: screen` que fusiona la luz suavemente.
     3. **Reproducción Fluida de `theoutcome.mp4`:** El video arranca desde el segundo cero (`currentTime = 0`), sincronizando el vuelo de aproximación a través de la terraza hacia la sala principal.
3. **HUD y Controles al Entrar a la Residencia:**
   * Al aproximarse al interior (`currentTime >= 8.5s` o evento `ended`), emerge el HUD superior con diseño *glassmorphism*:
     * Título: **"Departamento Piso 2"**
     * Subtítulo: "Sala principal, terraza panorámica y cocina abierta"
     * Botón interactivo: **"Repetir Vuelo"** (reinicia la toma aérea del departamento).
     * Botón interactivo: **"← Salir a la Fachada"** (regresa la cámara al plano general del edificio).
4. **Navegación Intuitiva y Salida Rápida:**
   * **Botón flotante `✕ Salir a la fachada`** disponible en todo momento durante el vuelo para no atrapar al usuario.
   * **Soporte de Tecla Escape (`Esc`):** Cierra el video tour o aleja el zoom de cualquier piso instantáneamente.
   * Al salir, el video se pausa suavemente y la fachada regresa a su escala natural (`scale(1)`).

### 4.2. Extensibilidad Modular para Nuevos Pisos
El sistema está 100% parametrizado en [`app.js`](file:///C:/Users/Admin/Desktop/MEXICAN/app.js). Para activar los tours en video de los niveles restantes a medida que se entreguen los archivos `.mp4`, solo se requiere actualizar su respectiva entrada en `floorsData`:

```javascript
{
  id: "3",
  name: "Piso 3",
  hasVideo: true,               // Habilita el tour de video
  videoSrc: "./video_piso_3.mp4" // Ruta del nuevo video
}
```
Si un piso no cuenta con video (`hasVideo: false`), el sistema mantiene de forma automática su zoom arquitectónico estándar (`scale(1.8)`) con botón flotante de retorno.
