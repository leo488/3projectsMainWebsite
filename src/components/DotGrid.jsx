import './DotGrid.css'

/* The original uniform dotted texture, rebuilt as discrete elements so
   each dot can pop in on scroll reveal — same staggered scale/opacity
   technique as PixelIcon, just applied to a plain grid instead of a
   glyph. Reveals as a diagonal sweep across the panel. */
export default function DotGrid({ cols = 40, rows = 30, className = '' }) {
  const dots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ r, c })
    }
  }

  return (
    <div
      className={`dot-grid${className ? ` ${className}` : ''}`}
      style={{ '--cols': cols, '--rows': rows }}
      aria-hidden="true"
    >
      {dots.map(({ r, c }) => (
        <span
          key={`${r}-${c}`}
          className="dot-grid-dot"
          style={{ gridColumn: c + 1, gridRow: r + 1, '--delay': `${(r + c) * 6}ms` }}
        />
      ))}
    </div>
  )
}
