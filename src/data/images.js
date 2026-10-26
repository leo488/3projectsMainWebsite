/* Leo's photographs, each at its full resolution plus a 1080px copy for
   small screens, in three formats: AVIF and WebP (the same picture in
   about half the bytes) and baseline JPEG for any browser without them.
   All are encoded from the originals, never from another copy, by
   scripts/build-photos.py. `w` is each file's real pixel width, so
   srcset can pick the sharp one for the screen. Paths are written out
   in full so the preview build (preview-build.js) can see them. */
export const PHOTOS = {
  'hero-pos': [
    { w: 1080, jpg: '/images/hero-pos-sm.jpg', webp: '/images/hero-pos-sm.webp', avif: '/images/hero-pos-sm.avif' },
    { w: 1536, jpg: '/images/hero-pos-full.jpg', webp: '/images/hero-pos-full.webp', avif: '/images/hero-pos-full.avif' },
  ],
  'hero-apps': [
    { w: 1080, jpg: '/images/hero-apps-sm.jpg', webp: '/images/hero-apps-sm.webp', avif: '/images/hero-apps-sm.avif' },
    { w: 1536, jpg: '/images/hero-apps-full.jpg', webp: '/images/hero-apps-full.webp', avif: '/images/hero-apps-full.avif' },
  ],
  'cpa-partners': [
    { w: 1080, jpg: '/images/cpa-partners-sm.jpg', webp: '/images/cpa-partners-sm.webp', avif: '/images/cpa-partners-sm.avif' },
    { w: 1448, jpg: '/images/cpa-partners-full.jpg', webp: '/images/cpa-partners-full.webp', avif: '/images/cpa-partners-full.avif' },
  ],
  'blog-laptop': [
    { w: 1080, jpg: '/images/blog-laptop-sm.jpg', webp: '/images/blog-laptop-sm.webp', avif: '/images/blog-laptop-sm.avif' },
    { w: 3200, jpg: '/images/blog-laptop-full.jpg', webp: '/images/blog-laptop-full.webp', avif: '/images/blog-laptop-full.avif' },
  ],
  'blog-conversation': [
    { w: 1080, jpg: '/images/blog-conversation-sm.jpg', webp: '/images/blog-conversation-sm.webp', avif: '/images/blog-conversation-sm.avif' },
    { w: 3200, jpg: '/images/blog-conversation-full.jpg', webp: '/images/blog-conversation-full.webp', avif: '/images/blog-conversation-full.avif' },
  ],
  'blog-pos': [
    { w: 1080, jpg: '/images/blog-pos-sm.jpg', webp: '/images/blog-pos-sm.webp', avif: '/images/blog-pos-sm.avif' },
    { w: 1448, jpg: '/images/blog-pos-full.jpg', webp: '/images/blog-pos-full.webp', avif: '/images/blog-pos-full.avif' },
  ],
  'blog-platform': [
    { w: 1080, jpg: '/images/blog-platform-sm.jpg', webp: '/images/blog-platform-sm.webp', avif: '/images/blog-platform-sm.avif' },
    { w: 1672, jpg: '/images/blog-platform-full.jpg', webp: '/images/blog-platform-full.webp', avif: '/images/blog-platform-full.avif' },
  ],
  'blog-tap': [
    { w: 1080, jpg: '/images/blog-tap-sm.jpg', webp: '/images/blog-tap-sm.webp', avif: '/images/blog-tap-sm.avif' },
    { w: 1536, jpg: '/images/blog-tap-full.jpg', webp: '/images/blog-tap-full.webp', avif: '/images/blog-tap-full.avif' },
  ],
  'blog-arrival': [
    { w: 1080, jpg: '/images/blog-arrival-sm.jpg', webp: '/images/blog-arrival-sm.webp', avif: '/images/blog-arrival-sm.avif' },
    { w: 1536, jpg: '/images/blog-arrival-full.jpg', webp: '/images/blog-arrival-full.webp', avif: '/images/blog-arrival-full.avif' },
  ],
  'blog-taxi': [
    { w: 1080, jpg: '/images/blog-taxi-sm.jpg', webp: '/images/blog-taxi-sm.webp', avif: '/images/blog-taxi-sm.avif' },
    { w: 1536, jpg: '/images/blog-taxi-full.jpg', webp: '/images/blog-taxi-full.webp', avif: '/images/blog-taxi-full.avif' },
  ],
  'blog-team': [
    { w: 1024, jpg: '/images/blog-team-full.jpg', webp: '/images/blog-team-full.webp', avif: '/images/blog-team-full.avif' },
  ],
  'talent-glasses': [
    { w: 1080, jpg: '/images/talent-glasses-sm.jpg', webp: '/images/talent-glasses-sm.webp', avif: '/images/talent-glasses-sm.avif' },
    { w: 1672, jpg: '/images/talent-glasses-full.jpg', webp: '/images/talent-glasses-full.webp', avif: '/images/talent-glasses-full.avif' },
  ],
  'talent-commute': [
    { w: 1080, jpg: '/images/talent-commute-sm.jpg', webp: '/images/talent-commute-sm.webp', avif: '/images/talent-commute-sm.avif' },
    { w: 1672, jpg: '/images/talent-commute-full.jpg', webp: '/images/talent-commute-full.webp', avif: '/images/talent-commute-full.avif' },
  ],
  'talent-listening': [
    { w: 1080, jpg: '/images/talent-listening-sm.jpg', webp: '/images/talent-listening-sm.webp', avif: '/images/talent-listening-sm.avif' },
    { w: 1254, jpg: '/images/talent-listening-full.jpg', webp: '/images/talent-listening-full.webp', avif: '/images/talent-listening-full.avif' },
  ],
  'talent-stretch': [
    { w: 1080, jpg: '/images/talent-stretch-sm.jpg', webp: '/images/talent-stretch-sm.webp', avif: '/images/talent-stretch-sm.avif' },
    { w: 1254, jpg: '/images/talent-stretch-full.jpg', webp: '/images/talent-stretch-full.webp', avif: '/images/talent-stretch-full.avif' },
  ],
  'talent-billboard': [
    { w: 1080, jpg: '/images/talent-billboard-sm.jpg', webp: '/images/talent-billboard-sm.webp', avif: '/images/talent-billboard-sm.avif' },
    { w: 1484, jpg: '/images/talent-billboard-full.jpg', webp: '/images/talent-billboard-full.webp', avif: '/images/talent-billboard-full.avif' },
  ],
  'talent-feed': [
    { w: 1080, jpg: '/images/talent-feed-sm.jpg', webp: '/images/talent-feed-sm.webp', avif: '/images/talent-feed-sm.avif' },
    { w: 1672, jpg: '/images/talent-feed-full.jpg', webp: '/images/talent-feed-full.webp', avif: '/images/talent-feed-full.avif' },
  ],
}

export const srcset = (files, fmt) => files.map((f) => `${f[fmt]} ${f.w}w`).join(', ')
