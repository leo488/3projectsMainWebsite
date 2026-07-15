import { useEffect, useState } from 'react'
import './CookieConsent.css'

const STORAGE_KEY = '3projects-cookie-consent'

function CookieIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cookie-grad" x1="4" y1="52" x2="52" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00E1FF" />
          <stop offset="0.5" stopColor="#B429F9" />
          <stop offset="1" stopColor="#FF0069" />
        </linearGradient>
      </defs>
      <path
        d="M28 4c13.25 0 24 10.75 24 24S41.25 52 28 52 4 41.25 4 28c0-1.98.24-3.9.7-5.74a3.98 3.98 0 0 1 4.9-2.9 6 6 0 0 0 7.53-7.25 3.98 3.98 0 0 1 2.63-4.9A23.9 23.9 0 0 1 28 4Z"
        fill="url(#cookie-grad)"
      />
      <circle cx="19.5" cy="25" r="2.4" fill="#0D1B4B" opacity="0.45" />
      <circle cx="32.5" cy="19" r="2" fill="#0D1B4B" opacity="0.45" />
      <circle cx="37" cy="32.5" r="2.6" fill="#0D1B4B" opacity="0.45" />
      <circle cx="24" cy="37" r="1.8" fill="#0D1B4B" opacity="0.45" />
      <circle cx="29.5" cy="29" r="1.6" fill="#0D1B4B" opacity="0.45" />
    </svg>
  )
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const id = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(id)
  }, [])

  const respond = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice)
    setClosing(true)
    setTimeout(() => setVisible(false), 450)
  }

  if (!visible) return null

  return (
    <div
      className={`cookie-banner${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
    >
      <div className="cookie-illustration">
        <CookieIllustration />
      </div>

      <div className="cookie-copy">
        <h3>A quick word about cookies</h3>
        <p>
          We use cookies to improve your experience, understand how people use the
          site, and personalize content. Choose what works for you.
        </p>
      </div>

      <div className="cookie-actions">
        <button className="cookie-btn cookie-btn--ghost" onClick={() => respond('rejected')}>
          Reject
        </button>
        <button className="cookie-btn cookie-btn--accept" onClick={() => respond('accepted')}>
          Accept All
        </button>
      </div>
    </div>
  )
}
