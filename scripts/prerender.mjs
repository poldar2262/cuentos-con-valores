import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeText(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectRouteSeo(template, seo) {
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeText(seo.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/i,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="robots"[\s\S]*?\/>/i,
    `<meta name="robots" content="${escapeAttr(seo.robots)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"[\s\S]*?\/>/i,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`
  );

  html = html.replace(
    /<meta\s+property="og:type"[\s\S]*?\/>/i,
    `<meta property="og:type" content="${escapeAttr(seo.ogType)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/i,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/i,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"[\s\S]*?\/>/i,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"[\s\S]*?\/>/i,
    `<meta property="og:image" content="${escapeAttr(seo.ogImage)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"[\s\S]*?\/>/i,
    `<meta property="og:image:alt" content="${escapeAttr(seo.ogImageAlt)}" />`
  );

  html = html.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/>/i,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/i,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"[\s\S]*?\/>/i,
    `<meta name="twitter:image" content="${escapeAttr(seo.ogImage)}" />`
  );

  html = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`
  );

  return html;
}

async function prerender() {
  const distDir = path.join(rootDir, 'dist');
  const distHtmlPath = path.join(distDir, 'index.html');
  const ssrEntryPath = path.join(rootDir, 'dist-ssr', 'entry-server.js');

  if (!fs.existsSync(distHtmlPath)) {
    throw new Error(`Missing built HTML at ${distHtmlPath}`);
  }
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`Missing SSR bundle at ${ssrEntryPath}`);
  }

  const template = fs.readFileSync(distHtmlPath, 'utf-8');
  const { render, getAllStaticRoutes, getRouteSeoMeta, SITE_URL } = await import(
    pathToFileURL(ssrEntryPath).href
  );

  const routes = getAllStaticRoutes();
  const today = new Date().toISOString().split('T')[0];

  for (const route of routes) {
    const appHtml = render(route.path);
    const seo = getRouteSeoMeta(route.path);
    const pageHtml = injectRouteSeo(template, seo).replace('<!--ssr-outlet-->', appHtml);

    const outFile =
      route.path === '/'
        ? distHtmlPath
        : path.join(distDir, route.path.replace(/^\/|\/$/g, ''), 'index.html');

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, pageHtml, 'utf-8');
    console.log(`✅ Pre-renderizado: ${route.path} -> ${path.relative(rootDir, outFile)} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
  }

  const sitemapEntries = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`🗺️ Sitemap generado con ${routes.length} URLs en dist/sitemap.xml y public/sitemap.xml`);
}

prerender().catch((err) => {
  console.error('❌ Error durante el pre-renderizado:', err);
  process.exit(1);
});
