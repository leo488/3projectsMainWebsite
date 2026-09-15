import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './MorphWord.css'

/* Cycles the closing word of the hero line. Each change draws the new
   word's outline first, then floods it with a gradient that keeps
   travelling through the letterforms — the stroke-and-fill read, rather
   than a straight text swap. */
export default function MorphWord({ words, interval = 2900 }) {
  const [index, setIndex] = useState(0)
  const [widths, setWidths] = useState(() => words.map(() => null))
  const measureRef = useRef(null)

  // Width is animated between measured word widths so the sentence
  // reflows smoothly instead of snapping.
  useLayoutEffect(() => {
    const measure = () => {
      const spans = measureRef.current?.children
      if (!spans) return
      setWidths(Array.from(spans, (el) => el.getBoundingClientRect().width))
    }
    measure()

    const fonts = document.fonts
    if (fonts?.ready) fonts.ready.then(measure).catch(() => {})
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [words])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval])

  const width = widths[index]

  return (
    <span
      className="morph"
      style={width ? { width: `${Math.ceil(width)}px` } : undefined}
    >
      {/* Out of flow: measured but contributes nothing to layout. */}
      <span className="morph-measure" ref={measureRef} aria-hidden="true">
        {words.map((w) => <span key={w}>{w}</span>)}
      </span>

      {/* In flow, invisible: gives the span a real line box so the
          animated copies have a baseline to sit on. Without it the
          container collapses and the word renders below the line. */}
      <span className="morph-sizer" aria-hidden="true">{words[index]}</span>

      {words.map((w, i) => (
        <span
          key={w}
          className={`morph-word${i === index ? ' is-active' : ''}`}
          aria-hidden="true"
        >
          <span className="morph-stroke">{w}</span>
          <span className="morph-fill">{w}</span>
        </span>
      ))}

      {/* One stable label for assistive tech and for the page's meaning. */}
      <span className="morph-sr">{words[index]}</span>
    </span>
  )
}
