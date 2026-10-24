/* Leo's photographs, each at its full resolution plus a 1080px copy for
   small screens (regenerate both from the originals, never re-compress
   a copy). The numbers are the files' real pixel widths, for srcset, so
   the browser picks the sharp one for the screen it is on. Paths are written out in full, not built from the name, so the
   preview build (preview-build.js) can see which files the site uses. */
const PHOTOS = {
  'hero-pos': { full: ['/images/hero-pos-full.jpg', 1536], sm: ['/images/hero-pos-sm.jpg', 1080] },
  'hero-apps': { full: ['/images/hero-apps-full.jpg', 1536], sm: ['/images/hero-apps-sm.jpg', 1080] },
  'cpa-partners': { full: ['/images/cpa-partners-full.jpg', 1448], sm: ['/images/cpa-partners-sm.jpg', 1080] },
  'blog-laptop': { full: ['/images/blog-laptop-full.jpg', 3200], sm: ['/images/blog-laptop-sm.jpg', 1080] },
  'blog-conversation': { full: ['/images/blog-conversation-full.jpg', 3200], sm: ['/images/blog-conversation-sm.jpg', 1080] },
  'blog-pos': { full: ['/images/blog-pos-full.jpg', 1448], sm: ['/images/blog-pos-sm.jpg', 1080] },
  'blog-platform': { full: ['/images/blog-platform-full.jpg', 1672], sm: ['/images/blog-platform-sm.jpg', 1080] },
  'blog-team': { full: ['/images/blog-team-full.jpg', 1024] },
}

// Props for an <img>: the full file as src, and a srcset when there is
// a smaller copy.
export function photo(name) {
  const p = PHOTOS[name]
  if (!p) return {}
  const [full, fullW] = p.full
  if (!p.sm) return { src: full }
  const [sm, smW] = p.sm
  return { src: full, srcSet: `${sm} ${smW}w, ${full} ${fullW}w` }
}
