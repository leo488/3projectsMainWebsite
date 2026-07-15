import { useEffect, useRef, useState } from 'react'
import PixelIcon from './PixelIcon'
import './CaseAccordion.css'

/* 7x7 bitmaps — building, growth, shield — drawn onto the dotted grid */
const PIXEL_ICONS = [
  ['...X...', '..XXX..', '.XXXXX.', 'XXXXXXX', 'X.X.X.X', 'X.X.X.X', 'XXXXXXX'],
  ['....XX.', '...XXXX', '..XXXXX', '.XXXXX.', 'XXXXX..', 'XXXX...', '.XX....'],
  ['..XXX..', '.XXXXX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'],
]

const ITEMS = [
  {
    text: 'We helped a leading financial institution simplify digital banking for millions of customers.',
    detail: 'Consolidated 14 legacy banking systems into a single unified platform, cutting customer onboarding time from 12 days to 48 hours.',
  },
  {
    text: 'A leading bank modernizes its digital customer experience with Brand.',
    detail: 'Redesigned the core banking app around real customer journeys, lifting mobile engagement by 34% within two quarters.',
  },
  {
    text: 'We design products that power the next generation of finance, commerce, healthcare, and enterprise.',
    detail: 'From embedded payments to clinical workflows, we partner end-to-end — research, design, and engineering under one roof.',
  },
]

export default function CaseAccordion() {
  const [open, setOpen] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      list.classList.add('accordion--visible')
      io.disconnect()
    }, { threshold: 0.15 })

    io.observe(list)
    return () => io.disconnect()
  }, [])

  return (
    <ul className="accordion" ref={listRef}>
      {ITEMS.map((item, i) => (
        <li key={i} className="accordion-item" style={{ '--i': i }}>
          <div className="accordion-row">
            <span className="accordion-icon">
              <PixelIcon pattern={PIXEL_ICONS[i]} className="accordion-pixel-icon" />
            </span>
            <span className="accordion-text">{item.text}</span>
            <button
              className={`accordion-toggle${open === i ? ' is-open' : ''}`}
              aria-label={open === i ? 'Collapse' : 'Expand'}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className={`accordion-panel${open === i ? ' is-open' : ''}`}>
            <div className="accordion-panel-inner">
              <p className="accordion-detail">{item.detail}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
