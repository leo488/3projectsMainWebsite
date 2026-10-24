import './BuildMark.css'

/* A pixel grid that lays itself down cell by cell, holds, then clears:
   the site under construction, told in the identity's own pixels.

   MARK is the 3Projects mark redrawn on the brand grid (three slabs,
   bottom slab first). It is kept here, and exported as
   public/brand/3projects-pixel-mark.svg, for when the pixel version of
   the mark is wanted. */
export const MARK = {
  rows: [
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
  ],
  tones: { B: 'var(--px-body)', M: 'var(--px-mid)', T: 'var(--px-light)' },
  order: { B: 0, M: 1, T: 2 },
}

/* The brand kit's `automation` icon (16 × 16, two-tone): a gear, for a
   site that is still being built. Stroke cells first, then the tone. */
export const GEAR = {
  rows: [
    '......###.......',
    '......#+#.......',
    '..##.##+##.##...',
    '..#+##+++##+#...',
    '..##+++++++##...',
    '...#++###++#....',
    '###++#...#++###.',
    '#++++#...#++++#.',
    '###++#...#++###.',
    '...#++###++#....',
    '..##+++++++##...',
    '..#+##+++##+#...',
    '..##.##+##.##...',
    '......#+#.......',
    '......###.......',
  ],
  tones: { '#': 'var(--px-body)', '+': 'var(--px-light)' },
  order: { '#': 0, '+': 1 },
}

const PITCH = 4
const CELL = 3.4

export default function BuildMark({ grid = MARK, still = false, className = '' }) {
  const { rows, tones, order } = grid
  const cells = rows.flatMap((row, r) =>
    [...row].flatMap((ch, c) => {
      if (!tones[ch]) return []
      // One group at a time, each laid left to right.
      return [{ r, c, fill: tones[ch], d: order[ch] * 420 + c * 26 }]
    }),
  )
  const w = rows[0].length * PITCH
  const h = rows.length * PITCH
  return (
    <svg className={`build-mark${still ? ' build-mark--still' : ''} ${className}`} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {cells.map(({ r, c, fill, d }) => (
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
