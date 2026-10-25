import { useEffect, useRef } from 'react'
import Photo from './Photo'
import './PixelReveal.css'

/* A photograph that arrives as data: it first shows as large square
   blocks, each the average colour of the picture beneath it, and the
   blocks halve until the photograph itself is there. Drawn on one
   canvas from the image the page already downloaded, so it costs no
   extra bytes; it runs once, when the picture scrolls into view, and
   not at all for anyone who asks for reduced motion. */

const BLOCKS = [64, 48, 32, 24, 16, 12, 8, 6, 4, 2]
const STEP_MS = 110

// The part of the image object-fit: cover shows, as a source rectangle.
function coverRect(iw, ih, w, h, position = '50% 50%') {
  const scale = Math.max(w / iw, h / ih)
  const sw = w / scale
  const sh = h / scale
  const [px, py] = position.split(' ').map((v) => parseFloat(v) / 100)
  return [(iw - sw) * px, (ih - sh) * py, sw, sh]
}

export default function PixelReveal({ name, alt, sizes, position }) {
  const wrap = useRef(null)
  const canvas = useRef(null)

  useEffect(() => {
    const el = wrap.current
    const cv = canvas.current
    const img = el?.querySelector('img')
    if (!el || !cv || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-done')
      return
    }

    let timer = 0
    let cancelled = false

    const run = async () => {
      try { await img.decode() } catch { /* drawn below if it loaded */ }
      if (cancelled || !img.naturalWidth) { el.classList.add('is-done'); return }

      const { width: w, height: h } = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      const ctx = cv.getContext('2d')
      const small = document.createElement('canvas')
      const sctx = small.getContext('2d')
      const src = coverRect(img.naturalWidth, img.naturalHeight, w, h, position)

      let i = 0
      const draw = () => {
        if (cancelled) return
        if (i === BLOCKS.length) {
          el.classList.add('is-done')
          return
        }
        const b = BLOCKS[i++]
        small.width = Math.max(1, Math.round(w / b))
        small.height = Math.max(1, Math.round(h / b))
        // Smoothing on to average each block, off to keep the blocks square.
        sctx.imageSmoothingEnabled = true
        sctx.imageSmoothingQuality = 'medium'
        sctx.drawImage(img, ...src, 0, 0, small.width, small.height)
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(small, 0, 0, cv.width, cv.height)
        el.classList.add('is-drawing')
        timer = setTimeout(draw, STEP_MS)
      }
      draw()
    }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      run()
    }, { threshold: 0.35 })
    io.observe(el)

    return () => {
      cancelled = true
      clearTimeout(timer)
      io.disconnect()
    }
  }, [position])

  return (
    <div ref={wrap} className="pixel-reveal">
      {/* Eager, so the picture is ready by the time it is reached. */}
      <Photo name={name} alt={alt} sizes={sizes} style={position ? { objectPosition: position } : undefined} />
      <canvas ref={canvas} className="pixel-reveal-canvas" aria-hidden="true" />
    </div>
  )
}
