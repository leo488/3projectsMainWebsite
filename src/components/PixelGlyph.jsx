import { GLYPHS, GLYPH_TONES } from '../data/glyphs'

/* Renders one bitmap as SVG rects. crispEdges keeps the cells square at
   any size rather than letting them soften. */
export default function PixelGlyph({ name, className }) {
  const rows = GLYPHS[name]
  if (!rows) return null

  const cells = []
  rows.forEach((row, y) => {
    Array.from(row).forEach((tone, x) => {
      const fill = GLYPH_TONES[tone]
      if (!fill) return
      cells.push(
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />,
      )
    })
  })

  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {cells}
    </svg>
  )
}
