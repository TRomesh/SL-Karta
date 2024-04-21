# SL Karta

This React application, built with Vite and integrating D3.js, visualizes the Stockholm metro map. It's hosted on Cloudflare Pages, ensuring fast, scalable, and robust performance.

Link: [DEMO](https://sl-karta.pages.dev/)

![SLKarta](https://github.com/TRomesh/SL-Karta/assets/9572090/ae5e6153-4bf2-40fd-92a1-780de40f73bf)

## Features

- React: Utilizes the latest React features for building user interfaces.
- Vite: A modern, fast build tool that significantly improves the development experience.
- D3.js: Provides powerful visualization tools to represent complex data.
- Cloudflare Pages: Ensures optimal delivery speed and performance worldwide.

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (version 14 or later)
- npm (comes with Node.js)
- Git

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/TRomesh/SL-Karta
cd SL-Karta
npm install
```

## Running the Application Locally

To run the application in the development mode, use:

```
npm run dev
```

This command will start a local server. Open http://localhost:5173 to view it in your browser. The page will reload if you make edits.

## Building and Running in Production

To build the application for production, run:

```bash
Copy code
npm run build
```

This will generate a dist folder that contains the production build of your app. You can serve it with any static asset server:

```bash
Copy code
npm run preview
```

## Deployment on Cloudflare Pages

The application is configured to automatically deploy via Cloudflare Pages upon pushing changes to the main branch. To set this up:

1. Create a new project on Cloudflare Pages: Link your GitHub repository.
2. Configure build settings: Set the build command to npm run build and the publish directory to dist/.
3. Environment variables: Set any necessary environment variables through the Cloudflare dashboard.
   Once configured, every push to your repository's main branch will trigger a new deployment automatically.

## Contributing

Contributions are welcome! Feel free to open an issue or pull request.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more information.
