import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function prerender() {
  const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
  const ssrEntryPath = path.join(rootDir, 'dist-ssr', 'entry-server.js');

  if (!fs.existsSync(distHtmlPath)) {
    throw new Error(`Missing built HTML at ${distHtmlPath}`);
  }
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`Missing SSR bundle at ${ssrEntryPath}`);
  }

  const template = fs.readFileSync(distHtmlPath, 'utf-8');
  const { render } = await import(pathToFileURL(ssrEntryPath).href);
  const appHtml = render();

  const finalHtml = template.replace('<!--ssr-outlet-->', appHtml);
  fs.writeFileSync(distHtmlPath, finalHtml, 'utf-8');
  console.log(`✅ Pre-renderizado estático completado en dist/index.html (${(finalHtml.length / 1024).toFixed(1)} KB)`);
}

prerender().catch((err) => {
  console.error('❌ Error durante el pre-renderizado:', err);
  process.exit(1);
});
