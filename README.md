# Internship Task 2 — Strict Tech Stack Implementation

Recreates the **Internship Task Document (Task 1)** as a styled HTML page using a mandatory templating engine + bundler combination.

## Tech Stack

| Category | Choice |
|----------|--------|
| **Templating Engine** | Nunjucks |
| **Bundler / Task Runner** | Vite |

## Project Structure

```
usha-task2/
├── src/
│   ├── templates/          # Nunjucks template files
│   │   ├── layouts/
│   │   │   └── base.njk    # Base HTML layout
│   │   ├── partials/
│   │   │   └── section.njk # Reusable section macro
│   │   ├── data/
│   │   │   └── document.json  # Document content data
│   │   └── pages/
│   │       └── index.njk   # Main page template
│   └── assets/             # Static assets
│       ├── css/
│       │   └── document.css
│       └── js/
│           └── main.js
├── dist/                   # Compiled output (generated)
├── vite.config.js          # Vite + Nunjucks plugin config
├── package.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

## Installation

```bash
cd usha-task2
npm install
```

## Development

Start the Vite dev server with live Nunjucks rendering:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

Compile templates and assets to the `dist/` folder:

```bash
npm run build
```

Output:
- `dist/index.html` — compiled HTML from Nunjucks templates
- `dist/assets/` — bundled CSS and JS

## Preview Production Build

```bash
npm run preview
```

## How It Works

1. **Nunjucks** reads `src/templates/pages/index.njk`, which extends `layouts/base.njk` and imports the `section.njk` partial macro.
2. Document content is stored in `src/templates/data/document.json` and injected into templates at build/render time.
3. **Vite** bundles JS/CSS assets and a custom Nunjucks plugin renders HTML into `dist/index.html` on build.
4. During development, the Vite dev server middleware serves the rendered Nunjucks page at `/`.

## Deliverables

- Final compiled HTML output (recreated Internship Task Document)
- Source code with Nunjucks templates and Vite setup
- README.md with instructions
- Separate project from Task 1 (no shared git or hosting)

