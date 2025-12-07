# 🎮 Quique Sanz - Portfolio Adventure

![Portfolio Preview](screenshot.png)

> Un portfolio interactivo estilo "consola retro" construido con React, Vite y Framer Motion.

Este proyecto no es solo una muestra de mis trabajos, sino una demostración técnica en sí misma. Simula una interfaz de videojuego portátil clásica, completa con efectos CRT, animaciones de escritura y un sistema de navegación inmersivo.

🔗 **[Ver Demo en Vivo](https://tu-usuario.github.io/portfolio-gameboy/)**

## ✨ Características Principales

* **Estética Retro:** Diseño Pixel Art con fuente `Jersey 10`, bordes de consola y efecto de líneas de escaneo (Scanlines CRT).
* **Narrativa Interactiva:** El contenido se presenta mediante un efecto de máquina de escribir (`Typewriter`) que simula el diálogo de un RPG.
* **Bilingüe (i18n manual):** Cambio instantáneo entre Español e Inglés con gestión de estado global.
* **Animaciones Suaves:** Transiciones de elementos y micro-interacciones utilizando `Framer Motion`.
* **Diseño Responsivo:** Se adapta a pantallas de escritorio y dispositivos móviles.
* **Gestión de Descargas:** Integración directa para descarga de CV en PDF.

## 🐍 Easter Egg (Secreto)

¿Te aburres de leer? ¡Juega!
El portfolio esconde un minijuego completo de **Snake**.

**Cómo desbloquearlo:**
1.  Ve al Menú Principal.
2.  Haz clic **5 veces rápidas** sobre el avatar del personaje.
3.  ¡Disfruta del juego dentro de la consola!

## 🛠️ Tech Stack

Este proyecto ha sido construido utilizando las siguientes tecnologías:

* **Core:** [React](https://reactjs.org/) (Hooks: `useState`, `useEffect`, `useRef`).
* **Build Tool:** [Vite](https://vitejs.dev/) para un desarrollo rápido y optimizado.
* **Animaciones:** [Framer Motion](https://www.framer.com/motion/) para efectos complejos y transiciones.
* **Iconos:** `react-icons` (FontAwesome & SimpleIcons) gestionados dinámicamente.
* **Estilos:** CSS3 Moderno (Flexbox, Grid, CSS Variables) y Media Queries.
* **Despliegue:** GitHub Pages (`gh-pages`).

## 🚀 Instalación y Uso Local

Si quieres clonar este repositorio y ejecutarlo en tu máquina:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU-USUARIO/portfolio-gameboy.git](https://github.com/TU-USUARIO/portfolio-gameboy.git)
    cd portfolio-gameboy
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  Abrir `http://localhost:5173` en tu navegador.

## 📦 Despliegue (GitHub Pages)

El proyecto está configurado para desplegarse automáticamente en GitHub Pages usando el paquete `gh-pages`.

Para desplegar una nueva versión tras hacer cambios:

```bash
npm run deploy
Este comando ejecuta el build de Vite (npm run build) y sube la carpeta dist a la rama gh-pages.

📂 Estructura del Proyecto
Plaintext

src/
├── assets/          # Imágenes (avatares) y documentos (CV)
├── components/      # (Opcional) Componentes reutilizables
├── App.jsx          # Lógica principal, routing manual y estado
├── index.css        # Estilos globales, CRT scanlines y carcasa consola
└── main.jsx         # Punto de entrada de React
👨‍💻 Autor
Enrique Sanz Ingeniero Electrónico & Desarrollador de Software Embebido

GitHub

LinkedIn

Hecho con ☕ y < /> en 2025.