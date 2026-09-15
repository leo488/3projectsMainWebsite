import { useEffect, useRef, useState } from 'react'
import './CookieBanner.css'

const STORAGE_KEY = '3projects.cookie-consent.v1'

const CATEGORIES = [
  {
    id: 'essential',
    name: 'Strictly necessary',
    desc: 'Routing, security and remembering this choice. The site cannot run without them.',
    locked: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    desc: 'Aggregated page and referrer counts, so we can see which work people actually read.',
  },
  {
    id: 'preferences',
    name: 'Preferences',
    desc: 'Remembers things you set yourself, like a filter on the work index.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    desc: 'Measures whether a campaign brought you here. Off unless you turn it on.',
  },
]

const ALL_OFF = { essential: true, analytics: false, preferences: false, marketing: false }
const ALL_ON = { essential: true, analytics: true, preferences: true, marketing: true }

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    // Private browsing, blocked storage — treat as undecided rather than
    // breaking the page.
    return null
  }
}

function write(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...value, at: Date.now() }))
  } catch {
    /* nothing useful to do; the banner simply asks again next visit */
  }
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false)
  const [managing, setManaging] = useState(false)
  const [choices, setChoices] = useState(ALL_OFF)
  const panelRef = useRef(null)

  useEffect(() => {
    const stored = read()
    if (stored) setChoices({ ...ALL_OFF, ...stored })
    else {
      const id = setTimeout(() => setOpen(true), 900)
      return () => clearTimeout(id)
    }
  }, [])

  // The footer's Cookies link reopens this rather than sending mail.
  useEffect(() => {
    const reopen = () => {
      setChoices({ ...ALL_OFF, ...(read() || {}) })
      setManaging(true)
      setOpen(true)
    }
    window.addEventListener('cookie:open', reopen)
    return () => window.removeEventListener('cookie:open', reopen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const decide = (value) => {
    write(value)
    setChoices(value)
    setOpen(false)
    setManaging(false)
  }

  if (!open) return null

  return (
    <div
      className={`cookie${managing ? ' cookie--managing' : ''}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      ref={panelRef}
    >
      <div className="cookie-inner">
        <div className="cookie-lede">
          <p className="tiny cookie-eyebrow">Cookies</p>
          <h2 className="cookie-title" id="cookie-title">
            We keep this light.
          </h2>
          <p className="cookie-copy">
            Strictly necessary cookies keep the site working. Everything else is
            off until you say otherwise — choose what you are comfortable with,
            and you can change it any time from the footer.
          </p>
        </div>

        {managing && (
          <ul className="cookie-options">
            {CATEGORIES.map((c) => (
              <li key={c.id} className="cookie-option">
                <label className="cookie-option-head">
                  <input
                    type="checkbox"
                    checked={c.locked ? true : choices[c.id]}
                    disabled={c.locked}
                    onChange={(e) =>
                      setChoices((prev) => ({ ...prev, [c.id]: e.target.checked }))
                    }
                  />
                  <span className="cookie-switch" aria-hidden="true" />
                  <span className="cookie-option-name">
                    {c.name}
                    {c.locked && <span className="tiny cookie-locked">Always on</span>}
                  </span>
                </label>
                <p className="cookie-option-desc">{c.desc}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="cookie-actions">
          {managing ? (
            <>
              <button
                type="button"
                className="cookie-btn cookie-btn--ghost"
                onClick={() => setManaging(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn--solid"
                onClick={() => decide(choices)}
              >
                Save preferences
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="cookie-btn cookie-btn--ghost"
                onClick={() => setManaging(true)}
              >
                Manage preferences
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn--ghost"
                onClick={() => decide(ALL_OFF)}
              >
                Reject non-essential
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn--solid"
                onClick={() => decide(ALL_ON)}
              >
                Accept all
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
