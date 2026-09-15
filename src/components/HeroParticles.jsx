import { useEffect, useRef, useState } from 'react'

const SRC = '/images/hero-1600.jpg'

/* Brand hues the grid borrows from. Flat areas of the artwork get
   nudged toward these so the field reads as data rather than as a
   photograph cut into squares; the face keeps its own colour. */
const BRAND = [
  [0, 75, 255],    // cobalt
  [0, 194, 232],   // cyan
  [110, 76, 232],  // violet
  [47, 211, 154],  // mint
  [0, 49, 184],    // enterprise
]

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export default function HeroParticles({ className }) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let particles = []
    let start = 0
    let disposed = false
    let scrollShift = 0
    let settleTimer = 0
    let painted = false
    let done = false
    const DURATION = 1800

    const image = new Image()
    image.decoding = 'async'

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return false

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Cell size scales with the canvas so the grid stays legible on a
      // phone and dense on a 16" display.
      const cell = rect.width > 1200 ? 9 : rect.width > 700 ? 7 : 5
      const cols = Math.ceil(rect.width / cell)
      const rows = Math.ceil(rect.height / cell)

      const sampler = document.createElement('canvas')
      sampler.width = cols
      sampler.height = rows
      const sctx = sampler.getContext('2d', { willReadFrequently: true })
      if (!sctx) return false

      // Match the CSS framing of the still image it replaces.
      const scale = Math.max(cols / image.width, rows / image.height)
      const dw = image.width * scale
      const dh = image.height * scale
      sctx.drawImage(image, (cols - dw) / 2, (rows - dh) * 0.41, dw, dh)

      const { data } = sctx.getImageData(0, 0, cols, rows)
      const cx = rect.width / 2
      const cy = rect.height * 0.52
      const maxDist = Math.hypot(cx, cy)

      particles = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          let r = data[i]
          let g = data[i + 1]
          let b = data[i + 2]

          // The artwork's white ground carries no information — dropping
          // it keeps the count down and lets the silhouette read.
          if (r > 238 && g > 238 && b > 242) continue

          const targetX = x * cell
          const targetY = y * cell
          const dist = Math.hypot(targetX - cx, targetY - cy)

          // Flat, saturated areas take a brand hue; skin and hair keep
          // their sampled colour so she stays recognisable.
          const flat = Math.max(r, g, b) - Math.min(r, g, b) > 70 && b > r
          if (flat) {
            const hue = BRAND[(x * 7 + y * 13) % BRAND.length]
            const mix = 0.55
            r = Math.round(r * (1 - mix) + hue[0] * mix)
            g = Math.round(g * (1 - mix) + hue[1] * mix)
            b = Math.round(b * (1 - mix) + hue[2] * mix)
          }

          particles.push({
            x: targetX,
            y: targetY,
            // Scattered along the grid axes, not randomly — it should
            // look like data settling into place, not smoke.
            ox: targetX + (((x % 7) - 3) * cell * 7),
            oy: targetY + (((y % 5) - 2) * cell * 9),
            color: `rgb(${r},${g},${b})`,
            delay: (dist / maxDist) * 0.55,
            cell,
          })
        }
      }
      return true
    }

    const draw = (now) => {
      if (disposed) return
      if (!start) start = now

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const elapsed = (now - start) / DURATION

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const local = Math.min(Math.max((elapsed - p.delay) / (1 - p.delay), 0), 1)
        const e = easeOutCubic(local)
        if (e <= 0) continue

        // A little vertical drift tied to scroll keeps the grid alive
        // once it has settled.
        const drift = (1 - e) * 0 + scrollShift * ((i % 5) - 2) * 0.35

        const x = p.ox + (p.x - p.ox) * e
        const y = p.oy + (p.y - p.oy) * e + drift
        const size = p.cell * (0.35 + 0.65 * e)

        ctx.globalAlpha = e
        ctx.fillStyle = p.color
        ctx.fillRect(x, y, size, size)
      }
      ctx.globalAlpha = 1

      // Readiness is what hides the fallback still, so only claim it
      // once there is genuinely something painted to replace it.
      if (!painted && particles.length) {
        painted = true
        setReady(true)
      }

      if (elapsed < 1.25) {
        raf = requestAnimationFrame(draw)
        return
      }

      raf = 0
      // Assembly is done: hand the frame back to the original still so
      // the hero resolves sharp rather than resting on the grid.
      if (!done) {
        done = true
        setSettled(true)
        window.removeEventListener('scroll', onScroll)
      }
    }

    const settle = () => {
      // Safety net: if frames are throttled — background tab, low power,
      // a reduced frame budget — the grid must still end up assembled
      // rather than frozen part-way in. Drawn synchronously so it does
      // not depend on a frame ever arriving.
      if (disposed) return
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      start = performance.now() - DURATION * 1.4
      draw(performance.now())
    }

    const restart = () => {
      if (raf) cancelAnimationFrame(raf)
      if (settleTimer) clearTimeout(settleTimer)
      start = 0
      raf = requestAnimationFrame(draw)
      settleTimer = setTimeout(settle, DURATION * 1.6)
    }

    function onScroll() {
      if (done) return
      const rect = canvas.getBoundingClientRect()
      scrollShift = Math.max(-1, Math.min(1, -rect.top / window.innerHeight)) * 6
      if (!raf) raf = requestAnimationFrame(draw)
    }

    image.onload = () => {
      if (disposed) return
      if (!build()) return
      if (!particles.length) return

      if (reduced) {
        // One settled frame, no assembly.
        settle()
        return
      }

      restart()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    image.onerror = () => setReady(false)
    image.src = SRC

    const onResize = () => {
      if (!image.complete || disposed) return
      if (build()) restart()
    }
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      if (settleTimer) clearTimeout(settleTimer)
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      data-ready={ready ? 'true' : 'false'}
      data-settled={settled ? 'true' : 'false'}
      aria-hidden="true"
    />
  )
}
