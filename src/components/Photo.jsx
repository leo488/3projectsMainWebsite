import { PHOTOS, srcset } from '../data/images'

/* One photograph as a <picture>: AVIF, then WebP, then JPEG,
   each at two widths. `sizes` says how wide it is drawn so the browser
   fetches the right width; className and the rest land on the <img>. */
export default function Photo({ name, sizes = '100vw', alt = '', ...rest }) {
  const files = PHOTOS[name]
  if (!files) return null
  const full = files[files.length - 1]
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(files, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(files, 'webp')} sizes={sizes} />
      <img
        src={full.jpg}
        srcSet={srcset(files, 'jpg')}
        sizes={sizes}
        alt={alt}
        decoding="async"
        {...rest}
      />
    </picture>
  )
}
