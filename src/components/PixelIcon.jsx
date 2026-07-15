import { useEffect, useRef } from 'react'
import './PixelIcon.css'

/* Renders a 7x7 bitmap ('X' = filled) onto the site's dotted-grid
   texture, revealing pixel-by-pixel once scrolled into view. */
export default function PixelIcon({ pattern, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.classList.add('pixel-icon--visible')
      io.disconnect()
    }, { threshold: 0.4 })

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`pixel-icon${className ? ` ${className}` : ''}`} ref={ref} aria-hidden="true">
      {pattern.flatMap((row, r) =>
        row.split('').map((cell, c) => {
          const filled = cell === 'X'
          return (
            <span
              key={`${r}-${c}`}
              className={`pixel-dot${filled ? ' pixel-dot--filled' : ''}`}
              style={filled ? { '--d': r * 7 + c } : undefined}
            />
          )
        })
      )}
    </div>
  )
}
