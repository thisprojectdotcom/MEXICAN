# 🏢 Masterplan Residencial Interactivo - Documentación Técnica y Operativa

> **Archivo:** `youtube.md`  
> **Proyecto:** Selector Interactivo de Pisos de Edificio Residencial ("MEXICANO")  
> **Ubicación del Código:** `C:\Users\Admin\Desktop\MEXICAN`  
> **Render Base:** `IMAGENPRINCIPAL/tungtungsahur.jpg` (4788 × 3584 px nativos)  
> **Estado General:** ✅ **100% Operativo** (Pisos 1-7 + Planta Baja, Highlight Transparente y Video Tour Cinemático)

---

## 📌 1. Resumen de Estados por Fase

* **Fase 1 (Geometría y Auditoría):** ✅ Concluida. Detección matemática de las losas de concreto sobre el render fotográfico. Estructura real confirmada: **7 Pisos Residenciales + Planta Baja**.
* **Fase 2 (Interfaz Visual y Layout Fullscreen):** ✅ Concluida. Render a pantalla completa (`100vw × 100vh`) integrado en un SVG vectorial compartido (`viewBox="0 0 4788 3584"`). Panel flotante lateral con estilo *glassmorphism* de lujo.
* **Fase 3 (Lógica Reactiva Vanilla JS):** ✅ Concluida. Sincronización instantánea a 60 FPS mediante `mouseenter` que actualiza recámaras, m², precios y estados sin recargar la página. Zoom suave al clic (`scale(1.8)`).
* **Fase 4 (Video Tour Cinemático Inmersivo):** ✅ Concluida y Operativa. Conexión de `theoutcome.mp4` al Piso 2 con efecto de inmersión aérea, compensación lumínica y HUD interactivo.
* **Ajuste de Nitidez (Highlight 100% Transparente):** ✅ Concluido. Eliminación total del velo lechoso sobre la fachada y ocultación absoluta del highlight en Planta Baja para preservar la piscina y jardines.

---

## 🎨 2. Solución al Highlight Transparente (Especial Planta Baja)

### 2.1. El Problema Detectado
Al pasar el cursor sobre la fachada, el modo de resaltado previo generaba un velo blanquecino/lechoso (`fill: rgba(255, 255, 255, 0.08)` y sombras) que opacaba la calidad del render arquitectónico, siendo especialmente molesto en la **Planta Baja** al cubrir las palmeras, camastros y piscina.

### 2.2. Implementación Aplicada en `styles.css`
1. **Planta Baja (100% Limpia e Invisible):**
   * Se forzó `fill: transparent !important`, `stroke: transparent !important` y `filter: none !important`.
   * Se anularon las líneas de losa superior e inferior (`.floor-slab-top`, `.floor-slab-bot`).
   * Se ocultó la etiqueta flotante (`.svg-badge`).
   * **Resultado:** Al explorar la piscina y el lobby, la imagen fotográfica se conserva con nitidez pura al 100%, sin ningún artefacto visual, mientras el panel lateral derecho actualiza en tiempo real los datos de la Planta Baja.
2. **Pisos Residenciales (Pisos 1 al 7):**
   * Se removió el velo de fondo sobre los departamentos (`fill: transparent`).
   * Solo se iluminan con delicadeza las líneas de las losas de concreto superior e inferior, delimitando el piso sin oscurecer ni teñir los balcones.
3. **Persistencia de Eventos del Ratón (`pointer-events: all`):**
   * Gracias a esta regla CSS en `.floor-hotspot`, el área vectorial continúa interceptando el cursor y los clics de manera inmediata, a pesar de que el relleno sea completamente invisible.

---

## 🎬 3. Fase 4: Transición Cinemática y Video Tour (Piso 2)

### 3.1. Recurso Integrado
* **Video:** `theoutcome.mp4` (Duración: 10 segundos).
* **Contenido:** Recorrido con dron que se aproxima a la terraza al atardecer, cruza la barandilla de cristal y se posa en la sala de estar y cocina abierta.

### 3.2. Mecánica de Transición en Tres Tiempos
Para resolver la diferencia natural entre la fotografía base (diurna, vista general desde la piscina) y el video (atardecer, plano cerrado en terraza):

1. **Zoom Convergente (Zoom-Dive):**
   * Al hacer clic en el Piso 2 (o en el botón *"🎬 Ver Tour Interior"* del panel), la cámara SVG realiza una aproximación rápida (`scale(2.4)`) con origen focal exacto en las coordenadas del balcón (`x: 2394px, y: 1628px`).
2. **Destello Óptico Cálido (Golden Hour Bloom):**
   * Un gradiente radial con `mix-blend-mode: screen` produce un destello ámbar sutil que simula la entrada de luz solar vespertina, ocultando el salto brusco entre ambas tomas.
3. **Crossfade y Reproducción Fluida:**
   * La capa de video se desvanece suavemente sobre la fachada en movimiento (`currentTime = 0`), logrando la ilusión de volar directamente dentro del departamento.

### 3.3. HUD y Controles Dentro del Departamento
* Al llegar a la sala interior (`currentTime >= 8.5s` o al culminar el video):
  * Emerge el encabezado flotante con efecto *glassmorphism*:
    * **Título:** *"Departamento Piso 2"*
    * **Detalle:** *"Sala principal, terraza panorámica y cocina abierta"*
    * **Botón `Repetir Vuelo`:** Reinicia la toma aérea del departamento desde el segundo cero.
    * **Botón `← Salir a la Fachada`:** Pausa el video y regresa la cámara al plano panorámico (`scale(1)`).
* **Salida Rápida Disponible en Todo Momento:**
  * Botón flotante `✕ Salir a la fachada` en la esquina superior derecha, accesible durante todo el recorrido sin obligar al usuario a esperar que finalice el video.
  * **Atajo de Teclado:** Presionar la tecla <kbd>Escape</kbd> (`Esc`) cierra cualquier video o zoom y vuelve a la vista general al instante.

---

## 📊 4. Matriz de Datos Mock de los Pisos (`floorsData`)

| Nivel | Nombre | Recámaras | Superficie | Precio Base | Estatus | Centro Y (px) | Video Asociado |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **7** | Piso 7 • Penthouse | 4 Recámaras | 240 m² | $580,000 USD | Exclusivo | `405` | Zoom estándar |
| **6** | Piso 6 | 3 Recámaras | 180 m² | $420,000 USD | Disponible | `720` | Zoom estándar |
| **5** | Piso 5 | 3 Recámaras | 165 m² | $385,000 USD | Disponible | `942` | Zoom estándar |
| **4** | Piso 4 | 3 Recámaras | 155 m² | $360,000 USD | Disponible | `1168` | Zoom estándar |
| **3** | Piso 3 | 3 Recámaras | 155 m² | $345,000 USD | Disponible | `1398` | Zoom estándar |
| **2** | Piso 2 | 2 Recámaras | 140 m² | $315,000 USD | Tour en Video | `1628` | ✅ `theoutcome.mp4` |
| **1** | Piso 1 | 2 Recámaras | 130 m² | $290,000 USD | Disponible | `1856` | Zoom estándar |
| **PB** | Planta Baja | Lobby & Spa | Áreas Comunes | Acceso Libre | Amenities | `2165` | Sin highlight |

---

## 🚀 5. Cómo Incorporar Videos en los Pisos Restantes

El sistema es completamente modular y desacoplado. Para activar el video tour de cualquier otro nivel (ej. Piso 3, Penthouse o Lobby), solo es necesario:

1. Colocar el archivo de video en la carpeta del proyecto (ej. `piso3.mp4`).
2. Abrir `app.js` y actualizar el objeto correspondiente dentro de `floorsData`:

```javascript
{
  id: "3",
  number: 3,
  name: "Piso 3",
  rooms: "3 Recámaras",
  area: "155 m²",
  price: "$345,000 USD",
  status: "Tour en Video",
  pixelCenterY: 1398,
  hasVideo: true,              // <-- Cambiar a true
  videoSrc: "./piso3.mp4"      // <-- Ruta del nuevo archivo
}
```

El motor JavaScript cambiará automáticamente el botón del panel lateral a *"🎬 Ver Tour Interior (Video)"* y enrutará el clic hacia la secuencia inmersiva de ese piso.

---

## 📁 6. Archivos Centrales del Proyecto

* [`index.html`](file:///C:/Users/Admin/Desktop/MEXICAN/index.html): Estructura HTML5, SVG responsivo de 4788×3584, capa de video y HUD.
* [`styles.css`](file:///C:/Users/Admin/Desktop/MEXICAN/styles.css): Estilos *glassmorphism*, iluminación, highlights 100% transparentes y animaciones fluidas.
* [`app.js`](file:///C:/Users/Admin/Desktop/MEXICAN/app.js): Lógica Vanilla JS, listeners reactivos, zoom cinemático, control de video y teclado.
* [`theoutcome.mp4`](file:///C:/Users/Admin/Desktop/MEXICAN/theoutcome.mp4): Video cinematográfico de la residencia del Piso 2.
* [`MEXICANOPASONUMEROUNO.md`](file:///C:/Users/Admin/Desktop/MEXICAN/MEXICANOPASONUMEROUNO.md): Registro metodológico y especificaciones de ingeniería.
