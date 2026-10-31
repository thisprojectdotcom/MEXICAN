# 🏢 Masterplan Interactivo - Residencial Exclusivo

Interfaz web interactiva y responsiva de visualización arquitectónica inmobiliaria en alta resolución para selección de pisos y apartamentos de un edificio residencial (6 Pisos + Planta Baja, 48 departamentos).

---

## ✨ Características Principales

- **Fondo Completo y Escenario SVG:** Render arquitectónico de alta resolución (`2396 × 1792 px`, `NewCatarata.jpg`) acoplado matemáticamente a zonas vectoriales interactivas mediante SVG con `viewBox` y `preserveAspectRatio="xMidYMin slice"`, garantizando alineación sin desfasajes.
- **Grids Calibrados e Independientes:**
  - 48 apartamentos individuales (6 pisos × 8 unidades por nivel: 4 en Torre A y 4 en Torre B).
  - Espacio central (vacío / pasillo arquitectónico) completamente omitido y respetado sin solapamientos.
  - Separación física (*gutters* de 20-25 px) entre contenedores que respeta las columnas y pilares estructurales.
  - Cuadrículas 100% transparentadas (`fill: transparent; stroke: transparent`) con iluminación neutra al pasar el cursor o seleccionar.
- **Detección y Selección de Pisos:** 
  - Planta Baja (Lobby / Amenities / Piscinas).
  - Pisos 1 al 6 (Residencias de 2 y 3 recámaras), con etiquetas uniformes `PISO 1` a `PISO 6`.
- **Efectos Cinemáticos & Zoom Dinámico:** 
  - Zoom dinámico calculado por coordenada `pixelCenterY` con transformación suave.
  - Panel lateral flotante con estética *glassmorphism* (`backdrop-filter: blur(24px)`).
- **Integración Multimedia:**
  - Video inmersivo (`theoutcome.mp4`) en Piso 2 (Depto 204) con transición cinemática convergente y controles HUD.
- **Zero Dependencies:** Desarrollado 100% en Vanilla HTML5, CSS3 moderno y JavaScript nativo.

---

## 🚀 Estructura del Proyecto

```text
├── IMAGENPRINCIPAL/
│   ├── NewCatarata.jpg            # Render principal calibrado
│   └── tungtungsahur.jpg          # Render alternativo en alta resolución
├── app.js                         # Lógica interactiva, zoom dinámico y catálogo de unidades
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
