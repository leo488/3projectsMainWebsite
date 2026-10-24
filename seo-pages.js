import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { allPaths, getSeo, seoHeadHtml, SITE_URL } from './src/data/seo.js'

/* After the build, write one HTML file per route with its own title,
   description and share tags, plus the sitemap and robots.txt. Vercel's
   cleanUrls serves /about from about.html, so crawlers get real tags
   without running the app. */
export default function seoPages() {
  let outDir = 'dist'
  return {
    name: 'seo-pages',
    apply: () => process.env.SKIP_SEO_PAGES !== '1',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')
      const block = /<!-- seo -->[\s\S]*?<!-- \/seo -->/
      if (!block.test(template)) throw new Error('seo-pages: index.html is missing the <!-- seo --> block')

      const paths = allPaths()
      for (const path of paths) {
        const html = template.replace(block, () => seoHeadHtml(getSeo(path)))
        const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
        mkdirSync(dirname(join(outDir, file)), { recursive: true })
        writeFileSync(join(outDir, file), html)
      }

      const today = new Date().toISOString().slice(0, 10)
      const urls = paths
        .map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n')
      writeFileSync(
        join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
    },
  }
}
