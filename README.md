# CrateDigger.js

3D vinyl records exploration & crate digging plugin, using WebGL with Three.js.

![cratedigger.js screenshot](https://github.com/risq/cratedigger/blob/master/src/images/screenshot1.png?raw=true)

## Features
- **3D Vinyl Exploration**: Flip through records in a realistic 3D crate.
- **Modern Stack**: Built with **Vite** and **Three.js** (ES Modules).
- **High Performance**: Optimized for fast loading and smooth framerates.
- **Visuals**: Realistic lighting, depth of field (optional), and high-DPI support.

## Architecture & Components

The project is structured around ES Modules for modularity and maintainability.

- **`cratedigger.js`**: The main entry point and controller. It initializes the Three.js `Scene`, `Renderer`, and `Lights`, manages the event loop (`requestAnimationFrame`), and handles user input (mouse/touch events).
- **`record.js`**: Encapsulates the logic for a single Vinyl Record. It constructs the 3D mesh (cover + sleeve) and manages individual animations (flipping, interacting) using **Tween.js**.
- **`cameraManager.js`**: Abstraction layer for the `PerspectiveCamera`. It handles complex camera transitions (zoom in/out, focus on record) to ensure smooth navigation.
- **`shaders/DoFShader.js`**: Custom GLSL shader for the Depth of Field post-processing effect, ported to ESM.
- **`constants.js`**: Centralized configuration file for tuning physics, speeds, colors, and dimensions without touching core logic.

## Key Technologies

- **[Three.js](https://threejs.org/)**: The core 3D engine. Currently using the latest stable release (ESM).
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling. Handles local development (HMR) and production builds (Rollup).
- **[Tween.js](https://github.com/tweenjs/tween.js)**: Handles smooth easing and animations for records and camera movements.

## Maintenance

To keep the project up to date:

1. **Update Dependencies**:
   ```bash
   npm update
   ```
2. **Three.js Upgrades**: Three.js releases frequently and breaks APIs. If you upgrade `three`, check their [Migration Guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide).
3. **Build**: Always verify the production build after updates:
   ```bash
   npm run build
   ```

## Installation

Clone the repository:

```bash
git clone git@github.com:risq/cratedigger.js.git cratedigger
cd cratedigger
```

Install dependencies:

```bash
npm install
```

## Running Development Server

Start the local development server with hot-reload:

```bash
npm run dev
```

Open your browser at the URL shown (usually `http://localhost:5173`).

## Building for Production

Build the assets for production deployment:

```bash
npm run build
```

The output will be in the `dist/` directory.

## Deployment

Since CrateDigger is a static site, you can host the contents of the `dist/` folder on any static hosting service:

- **Netlify / Vercel**: Connect your repository and set the build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages**: Deploy the `dist` folder.
- **Apache / Nginx**: Upload the contents of `dist` to your web server's public root.

To preview the production build locally before deploying:

```bash
npm run preview
```

## License

MIT
