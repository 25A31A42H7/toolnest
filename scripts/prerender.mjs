import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const rootDir = path.resolve(import.meta.dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');
const templatePath = path.join(distDir, 'index.html');

const PLACEHOLDER_OR_DEV_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'example.com',
  'www.example.com',
  'example.org',
  'www.example.org',
  'example.net',
  'www.example.net',
]);

function isPlaceholderOrDevHost(hostname) {
  const host = String(hostname || '').trim().toLowerCase();
  if (!host) return true;
  if (PLACEHOLDER_OR_DEV_HOSTS.has(host)) return true;
  return (
    host.endsWith('.local') ||
    host.endsWith('.example.com') ||
    host.endsWith('.example.org') ||
    host.endsWith('.run.app')
  );
}

function resolveProductionOrigin() {
  const raw = (process.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return '';
    if (isPlaceholderOrDevHost(parsed.hostname)) return '';
    return raw;
  } catch {
    return '';
  }
}

function resolveBasePath() {
  const explicit = (process.env.VITE_BASE_PATH || '').trim();
  if (explicit) {
    const trimmed = explicit.replace(/^\/+|\/+$/g, '');
    return trimmed ? `/${trimmed}/` : '/';
  }
  const siteUrl = (process.env.VITE_SITE_URL || '').trim();
  if (siteUrl) {
    try {
      const pathname = new URL(siteUrl).pathname.replace(/^\/+|\/+$/g, '');
      return pathname ? `/${pathname}/` : '/';
    } catch {
      // Ignore invalid URL
    }
  }
  return '/';
}

function escapeAttr(val) {
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeXml(val) {
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function upsertHeadMeta(html, route, siteOrigin) {
  const safeTitle = escapeAttr(route.title);
  const safeDesc = escapeAttr(route.description);
  const cleanPath = route.path === '/' ? '/' : route.path;
  const robotsValue = siteOrigin ? 'index, follow' : 'noindex, nofollow';

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="${robotsValue}" />`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );

  const extraHeadTags = [];
  if (siteOrigin) {
    const canonicalUrl = `${siteOrigin}${cleanPath}`;
    extraHeadTags.push(`<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`);
    extraHeadTags.push(`<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`);
  }

  if (typeof route.getStructuredData === 'function') {
    const schema = route.getStructuredData(siteOrigin);
    const json = JSON.stringify(schema).replace(/</g, '\\u003c');
    extraHeadTags.push(
      `<script id="toolnest-structured-data" type="application/ld+json">${json}</script>`
    );
  }

  if (extraHeadTags.length > 0) {
    out = out.replace('</head>', `    ${extraHeadTags.join('\n    ')}\n  </head>`);
  }

  return out;
}

async function run() {
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run Vite client build before prerendering.');
  }

  const entryPath = path.join(ssrDir, 'entry-server.js');
  if (!fs.existsSync(entryPath)) {
    throw new Error('dist-ssr/entry-server.js not found. Run Vite SSR build before prerendering.');
  }

  const {PRERENDER_ROUTES, render} = await import(pathToFileURL(entryPath).href);
  const template = fs.readFileSync(templatePath, 'utf-8');
  const siteOrigin = resolveProductionOrigin();
  const basePath = resolveBasePath();
  const segmentCount =
    basePath === '/' ? 0 : basePath.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).length;

  for (const route of PRERENDER_ROUTES) {
    const appHtml = render(route.path);
    let pageHtml = upsertHeadMeta(template, route, siteOrigin);
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Emit clean extensionless-compatible HTML files (GitHub Pages serves /word-counter -> word-counter.html with HTTP 200 and no 301 trailing-slash redirect)
    const targetFile =
      route.path === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, `${route.path.replace(/^\/+/, '')}.html`);

    fs.mkdirSync(path.dirname(targetFile), {recursive: true});
    fs.writeFileSync(targetFile, pageHtml, 'utf-8');
  }

  // Update segmentCount in dist/404.html for subpath or root GitHub Pages redirects
  const notFoundHtmlPath = path.join(distDir, '404.html');
  if (fs.existsSync(notFoundHtmlPath)) {
    const raw404 = fs.readFileSync(notFoundHtmlPath, 'utf-8');
    const updated404 = raw404.replace(
      /var segmentCount\s*=\s*\d+;/,
      `var segmentCount = ${segmentCount};`
    );
    fs.writeFileSync(notFoundHtmlPath, updated404, 'utf-8');
  }

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  if (siteOrigin) {
    const today = new Date().toISOString().slice(0, 10);
    const urlsXml = PRERENDER_ROUTES.map((route) => {
      const loc = `${siteOrigin}${route.path === '/' ? '/' : route.path}`;
      return `  <url><loc>${escapeXml(loc)}</loc><lastmod>${today}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`;
    }).join('\n');

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');

    const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  } else {
    if (fs.existsSync(sitemapPath)) fs.unlinkSync(sitemapPath);
    const robotsTxt = `User-agent: *\nDisallow: /\n\n# Set VITE_SITE_URL=https://yourdomain.com before running npm run build to allow indexing and generate sitemap.xml.\n`;
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  }

  fs.rmSync(ssrDir, {recursive: true, force: true});
  console.log(
    `[prerender] Generated ${PRERENDER_ROUTES.length} static HTML routes (base=${basePath})${
      siteOrigin
        ? ` + sitemap.xml for ${siteOrigin}`
        : ' (noindex/Disallow until VITE_SITE_URL is configured)'
    }.`
  );
}

run().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
