import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './ContactModal.css'

/* Start a conversation, as a modal over whatever page the reader is on:
   the same message and call forms as the contact page. Esc, the close
   button or a click outside closes it; the page underneath stays put. */

const ContactPanel = lazy(() => import('./ContactPanel'))

export default function ContactModal() {
  const [open, setOpen] = useState(null)   // { topic, mode } while open
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    const onOpen = (e) => {
      lastFocus.current = document.activeElement
      setOpen({ ...e.detail, key: Date.now() })
    }
    window.addEventListener('contact:open', onOpen)
    return () => window.removeEventListener('contact:open', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="contact-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(null) }}>
      <div className="contact-modal-box" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <header className="contact-modal-head">
          <div>
            <p className="tiny contact-modal-eyebrow">Contact</p>
            <h2 id="contact-modal-title" className="contact-modal-title">Start a conversation</h2>
            <p className="contact-modal-body">
              Tell us what you are working on, or book a call with the team. Every
              message is read by the people who would do the work.
            </p>
          </div>
          <button ref={closeRef} type="button" className="contact-modal-close" onClick={() => setOpen(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </header>
        <Suspense fallback={<div className="contact-modal-wait" />}>
          <ContactPanel key={open.key} className="contact--modal" initialTopic={open.topic} initialMode={open.mode} />
        </Suspense>
      </div>
    </div>,
    document.body,
  )
}
