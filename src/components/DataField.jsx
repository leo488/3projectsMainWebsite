import './DataField.css'

/* Deterministic PRNG so the scattered pattern is stable across reloads */
function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* A field of small squares, sparse near (focusX, focusY) and denser
   toward the edges — so the pattern reads as resolving into whatever
   sits at the focus point (a portrait, a headline) rather than
   covering it. Reveals staggered outward from the focus point. */
export default function DataField({
  cols = 26,
  rows = 32,
  focusX = 0.5,
  focusY = 0.6,
  focusRx = 0.32,
  focusRy = 0.46,
  seed = 7,
  className = '',
}) {
  const rand = mulberry32(seed)
  const cells = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) / cols
      const cy = (r + 0.5) / rows
      const dx = (cx - focusX) / focusRx
      const dy = (cy - focusY) / focusRy
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 1.6)
      const density = 0.05 + (dist / 1.6) * 0.5
      if (rand() < density) {
        cells.push({
          r,
          c,
          delay: Math.round(dist * 90 + rand() * 320),
          op: 0.35 + rand() * 0.55,
          scale: 0.55 + rand() * 0.45,
        })
      }
    }
  }

  return (
    <div
      className={`data-field${className ? ` ${className}` : ''}`}
      style={{ '--cols': cols, '--rows': rows }}
      aria-hidden="true"
    >
      {cells.map(({ r, c, delay, op, scale }) => (
        <span
          key={`${r}-${c}`}
          className="data-field-dot"
          style={{
            gridColumn: c + 1,
            gridRow: r + 1,
            '--delay': `${delay}ms`,
            '--op': op,
            '--scale': scale,
          }}
        />
      ))}
    </div>
  )
}
