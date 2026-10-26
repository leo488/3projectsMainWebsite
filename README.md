# 3Projects website

React 19 and Vite, plain CSS, deployed on Vercel from `main`.

```sh
npm ci
npm run dev       # local server
npm run build     # production build in dist/, one HTML file per route
npm run lint
```

## Layout

- `src/pages/` – one file per route; routes are listed in `src/App.jsx`.
- `src/components/` – shared pieces, each with its own CSS file.
- `src/data/` – site content: case studies, blog posts, navigation, SEO, photographs.
- `public/` – fonts, brand marks, patterns and the encoded photographs.
- `scripts/` – asset builders:
  - `build-photos.py` encodes photographs to AVIF, WebP and JPEG at two widths;
  - `build-pixel-art.py` turns the brand illustration package into `src/data/pixel-art.js`;
  - `raster-patterns.py` rasterises the pattern SVGs to WebP.

New routes also go in `PAGES` in `src/data/seo.js`, which `seo-pages.js` uses to write per-route HTML, the sitemap and robots.txt.
