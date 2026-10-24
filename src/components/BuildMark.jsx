import './BuildMark.css'

/* The 3Projects mark redrawn on the brand grid, three slabs of cells
   that lay themselves down from the bottom slab up, hold, then clear —
   the site under construction, told in the identity's own pixels. */
const ROWS = [
  '...........TT.',
  '.........TTTT.',
  '......TTTTT...',
  '....TTTTT..MMM',
  '..TTTT...MMMMM',
  'TTTT...MMMMMMM',
  'T...MMMMMMMMM.',
  '..MMMMMMMM....',
  'MMMMMM........',
  'MM............',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
]

const TONE = { B: 'var(--px-body)', M: 'var(--px-mid)', T: 'var(--px-light)' }
const ORDER = { B: 0, M: 1, T: 2 }
const PITCH = 4
const CELL = 3.4

const CELLS = ROWS.flatMap((row, r) =>
  [...row].flatMap((ch, c) => {
    if (ch === '.') return []
    // Bottom slab first, each slab laid left to right.
    const d = ORDER[ch] * 420 + c * 26
    return [{ r, c, fill: TONE[ch], d }]
  }),
)

export default function BuildMark({ className = '' }) {
  const w = ROWS[0].length * PITCH
  const h = ROWS.length * PITCH
  return (
    <svg className={`build-mark ${className}`} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {CELLS.map(({ r, c, fill, d }) => (
        <rect
          key={`${r}-${c}`}
          x={c * PITCH}
          y={r * PITCH}
          width={CELL}
          height={CELL}
          fill={fill}
          style={{ '--d': `${d}ms` }}
        />
      ))}
    </svg>
  )
}
