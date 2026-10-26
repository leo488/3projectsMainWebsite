import { useEffect, useRef, useState } from 'react'

/* Shared timing for the scenes rebuilt in code: whether one is on
   screen, and a clock that runs only while it is. */

export const prefersStill = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useInView(ref, threshold = 0.3) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return on
}

// Milliseconds into the current pass of a loop `loop` long. With reduced
// motion it holds at `rest`, the finished frame.
export function useClock(on, loop, { step = 60, rest = loop - 1 } = {}) {
  const [t, setT] = useState(0)
  const still = prefersStill()
  const tRef = useRef(0)

  useEffect(() => {
    if (still) { setT(rest); return }
    if (!on) return
    let start = performance.now() - tRef.current
    const id = setInterval(() => {
      let now = performance.now() - start
      if (now > loop) { start = performance.now(); now = 0 }
      tRef.current = now
      setT(now)
    }, step)
    return () => clearInterval(id)
  }, [on, still, loop, step, rest])

  return t
}

// The scale that fits a fixed design inside a box: `fit(width, height)`
// returns the factor, recomputed whenever the box changes size.
export function useFit(ref, fit) {
  const [k, setK] = useState(1)
  const fitRef = useRef(fit)
  fitRef.current = fit
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      setK(fitRef.current(width, height))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return k
}

// A number that counts up from zero over `ms` once `t` passes `from`.
export function countUp(t, from, ms, value) {
  const p = Math.min(1, Math.max(0, (t - from) / ms))
  return value * (1 - Math.pow(1 - p, 3))
}

// The CSS transform that lays a w × h box onto a four-cornered shape in
// a picture (top left, top right, bottom right, bottom left), so a
// screen built in code sits in a phone that was painted at an angle.
export function quadMatrix(w, h, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const sx = x0 - x1 + x2 - x3
  const sy = y0 - y1 + y2 - y3
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2
  const den = dx1 * dy2 - dx2 * dy1
  const g = (sx * dy2 - dx2 * sy) / den
  const k = (dx1 * sy - sx * dy1) / den
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3
  return `matrix3d(${[a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, x0, y0, 0, 1].join(',')})`
}
