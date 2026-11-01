import { build } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { indexablePagePaths, pageHtmlFile, publicOrigin } from '../shared/page-metadata';

const output = path.resolve('.prerender');
try {
  await build({ build: { ssr: path.resolve('client/src/entry-server.tsx'), outDir: output, copyPublicDir: false } });
  const { render } = await import(pathToFileURL(path.join(output, 'entry-server.js')).href);
  for (const pathname of [...indexablePagePaths, '/not-found']) {
    const file = path.join('dist', pathname === '/not-found' ? '404.html' : pageHtmlFile(pathname));
    const html = await fs.readFile(file, 'utf8');
    const body = render(pathname);
    if (!body.includes('<h1')) throw new Error(`Missing rendered heading: ${pathname}`);
    // The existing client mounts over this snapshot, retaining its animation and interaction behavior.
    await fs.writeFile(file, html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
      .replace('</head>', '<noscript><style>#root [style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript></head>'));
    console.log('Rendered', pathname);
  }
  await fs.writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    indexablePagePaths.map(route => `  <url><loc>${publicOrigin}${route}</loc></url>`).join('\n') + '\n</urlset>\n');
  // Search crawling remains open. Private URLs rely on noindex and access controls,
  // rather than disallow rules that would stop crawlers from seeing the noindex.
  await fs.writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${publicOrigin}/sitemap.xml\n`);
} finally {
  await fs.rm(output, { recursive: true, force: true });
}
