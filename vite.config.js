import { defineConfig } from "vite";
import nunjucks from "nunjucks";
import { resolve, join } from "path";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  cpSync,
} from "fs";

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

function loadDocumentData() {
  const raw = readFileSync(resolve("src/templates/data/document.json"), "utf-8");
  return JSON.parse(raw);
}

function nunjucksPlugin() {
  const templatesDir = resolve("src/templates");
  const env = nunjucks.configure(templatesDir, {
    autoescape: true,
    noCache: true,
  });

  function renderPage() {
    return env.render("pages/index.njk", loadDocumentData());
  }

  return {
    name: "vite-plugin-nunjucks",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url === "/" || url === "/index.html") {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(renderPage());
          return;
        }
        next();
      });
    },
    closeBundle() {
      mkdirSync(resolve("dist"), { recursive: true });
      writeFileSync(resolve("dist/index.html"), renderPage());

      const assetsDir = resolve("src/assets");
      if (existsSync(assetsDir)) {
        copyDir(assetsDir, resolve("dist/assets"));
      }
    },
  };
}

export default defineConfig({
  root: ".",
  publicDir: false,
  plugins: [nunjucksPlugin()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve("src/assets/js/main.js"),
    },
    copyPublicDir: false,
  },
});
