import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './MorphWord.css'

/* Cycles the closing word of the hero line. Each word is drawn letter by
   letter — the outline of each character sweeps in with the brand hues
   running through its edge, then the letter settles into cobalt. The
   gradient only exists while the word is being drawn; the word at rest
   is the brand blue. */
export default function MorphWord({ words, interval = 5200 }) {
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

      {/* In flow, invisible: this is what gives .morph its line box, so
          the animated copies land on the text baseline. */}
      <span className="morph-sizer" aria-hidden="true">{words[index]}</span>

      {words.map((w, i) => (
        <span
          key={w}
          className={`morph-word${i === index ? ' is-active' : ''}`}
          aria-hidden="true"
        >
          {Array.from(w).map((ch, ci) => (
            <span key={ci} className="morph-letter" style={{ '--li': ci }}>
              <span className="morph-stroke">{ch}</span>
              <span className="morph-fill">{ch}</span>
            </span>
          ))}
        </span>
      ))}

      {/* One stable label for assistive tech and for the page's meaning. */}
      <span className="morph-sr">{words[index]}</span>
    </span>
  )
}
