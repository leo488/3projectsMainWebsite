import { useEffect, useRef, useState } from 'react'
import './CaseAccordion.css'

const ITEMS = [
  {
    text: 'We helped a leading financial institution simplify digital banking for millions of customers.',
    detail: 'Consolidated 14 legacy banking systems into a single unified platform, cutting customer onboarding time from 12 days to 48 hours.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="2" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M4 12v1.5M12 12v1.5M4.5 5.5h7M4.5 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    text: 'A leading bank modernizes its digital customer experience with Brand.',
    detail: 'Redesigned the core banking app around real customer journeys, lifting mobile engagement by 34% within two quarters.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 14V8M8 8C8 5 6 3 3 2.5 3 5.5 4.5 8 8 8ZM8 8c0-3.5 2-5.5 5-6 0 3.5-2 6-5 6Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    text: 'We design products that power the next generation of finance, commerce, healthcare, and enterprise.',
    detail: 'From embedded payments to clinical workflows, we partner end-to-end — research, design, and engineering under one roof.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2.5 14V4.5L8 2l5.5 2.5V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 14v-4h5v4M5.5 7h.01M10.5 7h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
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
            <span className="accordion-icon">{item.icon}</span>
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
