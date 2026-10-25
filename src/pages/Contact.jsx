import { useMemo, useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import Arrow from '../components/Arrow'
import { BOOKING_URL, CONTACT_EMAIL, FORM_ENDPOINT, OFFICES } from '../data/site'
import './Contact.css'

const TOPICS = [
  { id: 'project', label: 'A new project' },
  { id: 'cpa', label: 'Becoming a CPA Partner' },
  { id: 'careers', label: 'Careers' },
  { id: 'other', label: 'Something else' },
]

const SLOTS = ['Morning, 9am to 12pm', 'Afternoon, 12pm to 3pm', 'Late afternoon, 3pm to 6pm']

// The next ten working days, for the call request.
function workingDays(count = 10) {
  const days = []
  const d = new Date()
  while (days.length < count) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d))
  }
  return days
}

const dayLabel = (d) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
const dayLong = (d) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

// ?topic=cpa preselects the topic, from the path or the hash route.
function topicFromUrl() {
  const match = window.location.href.match(/[?&]topic=([a-z]+)/)
  return TOPICS.some((t) => t.id === match?.[1]) ? match[1] : 'project'
}

function mailto(subject, lines) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

async function send(payload) {
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Form service answered ${res.status}`)
}

function MessageForm() {
  const [topic, setTopic] = useState(topicFromUrl)
  const [state, setState] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const label = TOPICS.find((t) => t.id === topic).label
    const lines = [f.message, '', `${f.name}${f.company ? `, ${f.company}` : ''}`, f.email]
    if (!FORM_ENDPOINT) {
      window.location.href = mailto(`${label} — ${f.name}`, lines)
      setState('mailed')
      return
    }
    setState('sending')
    try {
      await send({ type: 'message', topic: label, ...f })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="contact-done" role="status">
        <h3>Thank you. Your message is with us.</h3>
        <p>We reply to every message within two working days.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <fieldset className="contact-topics">
        <legend className="tiny contact-label">What is it about?</legend>
        {TOPICS.map((t) => (
          <label key={t.id} className={`contact-chip${topic === t.id ? ' is-on' : ''}`}>
            <input type="radio" name="topic" value={t.id} checked={topic === t.id} onChange={() => setTopic(t.id)} />
            {t.label}
          </label>
        ))}
      </fieldset>

      <div className="contact-row">
        <label className="contact-field">
          <span className="tiny contact-label">Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className="contact-field">
          <span className="tiny contact-label">Work email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="contact-field">
        <span className="tiny contact-label">Company</span>
        <input name="company" autoComplete="organization" />
      </label>
      <label className="contact-field">
        <span className="tiny contact-label">How can we help?</span>
        <textarea name="message" rows={6} required />
      </label>

      <div className="contact-actions">
        <button type="submit" className="btn btn--blue" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'} <Arrow size={18} />
        </button>
        {state === 'mailed' && (
          <p className="contact-note" role="status">Your email app should have opened with the message ready to send.</p>
        )}
        {state === 'error' && (
          <p className="contact-note contact-note--error" role="alert">
            That didn&rsquo;t go through. Please email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        )}
      </div>
    </form>
  )
}

function CallRequest() {
  const days = useMemo(() => workingDays(), [])
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState(0)
  const [state, setState] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget))
    const when = `${dayLong(days[day])}, ${SLOTS[slot]} (Lagos time)`
    if (!FORM_ENDPOINT) {
      window.location.href = mailto(`Call request — ${f.name}`, [
        `I'd like to book a 30-minute call.`, '', `When: ${when}`, '', f.name, f.email, f.phone || '',
      ])
      setState('mailed')
      return
    }
    setState('sending')
    try {
      await send({ type: 'call', when, ...f })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="contact-done" role="status">
        <h3>Your call is requested.</h3>
        <p>We will confirm {dayLong(days[day])}, {SLOTS[slot].toLowerCase()}, by email.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <fieldset className="contact-days">
        <legend className="tiny contact-label">Pick a day</legend>
        {days.map((d, i) => (
          <label key={d.toISOString()} className={`contact-chip${day === i ? ' is-on' : ''}`}>
            <input type="radio" name="day" checked={day === i} onChange={() => setDay(i)} />
            {dayLabel(d)}
          </label>
        ))}
      </fieldset>
      <fieldset className="contact-slots">
        <legend className="tiny contact-label">Pick a time (Lagos time)</legend>
        {SLOTS.map((s, i) => (
          <label key={s} className={`contact-chip${slot === i ? ' is-on' : ''}`}>
            <input type="radio" name="slot" checked={slot === i} onChange={() => setSlot(i)} />
            {s}
          </label>
        ))}
      </fieldset>
      <div className="contact-row">
        <label className="contact-field">
          <span className="tiny contact-label">Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className="contact-field">
          <span className="tiny contact-label">Work email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="contact-field">
        <span className="tiny contact-label">Phone (optional)</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <div className="contact-actions">
        <button type="submit" className="btn btn--blue" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Request this call'} <Arrow size={18} />
        </button>
        {state === 'mailed' && (
          <p className="contact-note" role="status">Your email app should have opened with the request ready to send.</p>
        )}
        {state === 'error' && (
          <p className="contact-note contact-note--error" role="alert">
            That didn&rsquo;t go through. Please email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        )}
      </div>
    </form>
  )
}

export default function Contact() {
  const [mode, setMode] = useState(() => (/[?&]call\b/.test(window.location.href) ? 'call' : 'message'))

  return (
    <div>
      <Navbar />

      <header className="page-intro">
        <p className="tiny page-intro-eyebrow">Contact</p>
        <h1 className="page-intro-headline">
          Start a conversation
        </h1>
        <p className="page-intro-body">
          Tell us what you are working on, or book a call with the team. Every
          message is read by the people who would do the work.
        </p>
      </header>

      <section className="contact">
        <aside className="contact-aside">
          <div className="contact-switch" role="tablist" aria-label="How would you like to reach us?">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'message'}
              className={`contact-switch-btn${mode === 'message' ? ' is-on' : ''}`}
              onClick={() => setMode('message')}
            >
              <span className="contact-switch-title">Send a message</span>
              <span className="contact-switch-note">We reply within two working days.</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'call'}
              className={`contact-switch-btn${mode === 'call' ? ' is-on' : ''}`}
              onClick={() => setMode('call')}
            >
              <span className="contact-switch-title">Schedule a call</span>
              <span className="contact-switch-note">30 minutes with the team.</span>
            </button>
          </div>

          <dl className="contact-details">
            <div>
              <dt className="tiny">Email</dt>
              <dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd>
            </div>
            <div>
              <dt className="tiny">Office</dt>
              <dd>{OFFICES.join(' · ')}</dd>
            </div>
          </dl>
        </aside>

        <div className="contact-panel" role="tabpanel">
          <h2 className="contact-panel-title">
            {mode === 'message' ? 'Send us a message' : 'Schedule a call'}
          </h2>
          {mode === 'message' && <MessageForm />}
          {mode === 'call' && (BOOKING_URL ? (
            <iframe className="contact-booking" src={BOOKING_URL} title="Book a call with 3Projects" loading="lazy" />
          ) : (
            <CallRequest />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
