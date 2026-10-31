# 🏢 Masterplan Interactivo - Residencial Exclusivo

Interfaz web interactiva y responsiva de visualización arquitectónica inmobiliaria en alta resolución para selección de pisos de un edificio residencial (7 Pisos + Planta Baja).

---

## ✨ Características Principales

- **Fondo Completo y Escenario SVG:** Render arquitectónico de alta resolución (`4788 × 3584 px`) acoplado matemáticamente a zonas vectoriales interactivas mediante SVG con `viewBox` y `preserveAspectRatio="xMidYMid slice"`, garantizando alineación sin desfasajes.
- **Detección y Selección de Pisos:** 
  - Planta Baja (Lobby / Amenities).
  - Pisos 1 al 6 (Residencias de 2 y 3 recámaras).
  - Piso 7 (Penthouse de 4 recámaras).
- **Efectos Cinemáticos & Zoom Dinámico:** 
  - Zoom dinámico calculado por coordenada `pixelCenterY` con transformación suave.
  - Iluminación orgánica y resaltado de losas (`mix-blend-mode: screen`).
  - Panel lateral flotante con estética *glassmorphism* (`backdrop-filter: blur(24px)`).
- **Integración Multimedia:**
  - Video inmersivo (`theoutcome.mp4`) en Piso 2 con transición y crossfade.
- **Zero Dependencies:** Desarrollado 100% en Vanilla HTML5, CSS3 moderno y JavaScript Vanilla nativo.

---

## 🚀 Estructura del Proyecto

```text
├── IMAGENPRINCIPAL/
│   └── tungtungsahur.jpg         # Render arquitectónico de ultra alta resolución
├── app.js                         # Lógica interactiva, zoom dinámico y gestión de estados
├── index.html                     # Maquetación semántica y capas SVG interactivas
├── styles.css                     # Estilos, glassmorphism, transiciones y HUD
├── theoutcome.mp4                 # Video inmersivo de recorrido interior
├── MEXICANOPASONUMEROUNO.md        # Documentación técnica y desglose geométrico
└── README.md                      # Este archivo
```

---

## 💻 Visualización Local

Para visualizar el proyecto localmente:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Oscardht/MEXICAN.git
   cd MEXICAN
   ```

2. Abrir con cualquier servidor local (por ejemplo con la extensión *Live Server* de VS Code, o con Python):
   ```bash
   python -m http.server 8000
   ```
   Luego ingresar a `http://localhost:8000` en tu navegador.
