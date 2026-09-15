import { useEffect, useRef, useState } from 'react'

const CELL = 18
const DOT = 8

/* A square dot-grid drawn as real rects rather than a tiled background,
   so the grid can be centred on whole cells — no half squares clipped
   against the edges, and the leftover space splits evenly into the
   margin on every side. */
export default function PartnerGrid({ className, fill }) {
  const ref = useRef(null)
  const [box, setBox] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      const cols = Math.floor(width / CELL)
      const rows = Math.floor(height / CELL)
      setBox({
        width,
        height,
        cols,
        rows,
        offsetX: (width - cols * CELL) / 2,
        offsetY: (height - rows * CELL) / 2,
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cells = []
  if (box) {
    for (let r = 0; r < box.rows; r++) {
      for (let c = 0; c < box.cols; c++) {
        cells.push(
          <rect
            key={`${c}-${r}`}
            x={box.offsetX + c * CELL + (CELL - DOT) / 2}
            y={box.offsetY + r * CELL + (CELL - DOT) / 2}
            width={DOT}
            height={DOT}
          />,
        )
      }
    }
  }

  return (
    <div className={className} ref={ref}>
      {box && (
        <svg
          width={box.width}
          height={box.height}
          viewBox={`0 0 ${box.width} ${box.height}`}
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <g fill={fill}>{cells}</g>
        </svg>
      )}
    </div>
  )
}
