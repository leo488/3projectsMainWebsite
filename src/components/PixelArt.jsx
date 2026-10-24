import { useMemo } from 'react'
import { PIXEL_ART } from '../data/pixel-art'
import useReveal from './useReveal'
import './PixelArt.css'

const PITCH = 16
const CELL = 13
const TONES = { S: 'var(--px-shadow)', B: 'var(--px-body)', M: 'var(--px-mid)', L: 'var(--px-light)' }

/* Version B of the illustration system: the subject cut out of a solid
   body-blue field. Light and shadow cells open up, mid cells become a
   50% checker, and body cells keep a one-cell empty contour. */
function negative(cols, rows, cells) {
  const at = new Map(cells.map(([r, c, t]) => [`${r},${c}`, t]))
  const near = (r, c, test) => {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue
      const t = at.get(`${r + dr},${c + dc}`)
      if (t && test(t)) return true
    }
    return false
  }
  const out = []
  for (let r = 1; r <= rows; r++) for (let c = 1; c <= cols; c++) {
    const t = at.get(`${r},${c}`)
    if (!t) {
      if (near(r, c, (x) => x === 'B') && !near(r, c, (x) => x !== 'B')) continue
      out.push([r, c, 'B'])
    } else if (t === 'B' || (t === 'M' && (r + c) % 2 === 0)) out.push([r, c, 'B'])
  }
  return out
}

function rowsOf(cells) {
  const byRow = new Map()
  for (const cell of cells) {
    if (!byRow.has(cell[0])) byRow.set(cell[0], [])
    byRow.get(cell[0]).push(cell)
  }
  return [...byRow.entries()]
}

/* One illustration from the pixel-grid system, drawn as SVG cells.
   When it scrolls into view the cells switch on in row order, which is
   the only motion the system allows: whole cells, on the grid.

   With `loop`, it builds the way the announcement banner's mark does:
   the cells lay themselves down from the bottom up, hold, then clear
   in the same order, and start again. */
export default function PixelArt({ name, variant = 'A', title, className = '', sweep = 900, loop = false }) {
  const ref = useReveal('is-drawn', 0.2)
  const art = PIXEL_ART[name]

  const { cols, rows, cells } = useMemo(() => {
    const parsed = art.cells.split(' ').map((p) => {
      const [r, c, t] = p.split(',')
      return [Number(r), Number(c), t]
    })
    return {
      cols: art.cols,
      rows: art.rows,
      cells: variant === 'B' ? negative(art.cols, art.rows, parsed) : parsed,
    }
  }, [art, variant])

  const w = cols * PITCH - (PITCH - CELL)
  const h = rows * PITCH - (PITCH - CELL)

  return (
    <svg
      ref={ref}
      className={`pixel-art${loop ? ' pixel-art--loop' : ''} ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {loop
        ? rowsOf(cells).map(([r, row]) => (
            // Looping art animates one row at a time rather than every
            // cell, and draws each row as one path per tone, so the
            // browser handles a few hundred shapes, not thousands.
            <g key={r} style={{ '--d': `${Math.round(((rows - r) / rows) * sweep)}ms` }}>
              {Object.entries(TONES).map(([t, fill]) => {
                const d = row
                  .filter(([, , tt]) => tt === t)
                  .map(([, c]) => `M${(c - 1) * PITCH} ${(r - 1) * PITCH}h${CELL}v${CELL}h-${CELL}z`)
                  .join('')
                return d ? <path key={t} d={d} fill={fill} /> : null
              })}
            </g>
          ))
        : cells.map(([r, c, t]) => (
            <rect
              key={`${r}-${c}`}
              x={(c - 1) * PITCH}
              y={(r - 1) * PITCH}
              width={CELL}
              height={CELL}
              fill={TONES[t]}
              style={{ '--d': `${Math.round((r / rows) * sweep + ((c * 7) % 5) * 18)}ms` }}
            />
          ))}
    </svg>
  )
}
