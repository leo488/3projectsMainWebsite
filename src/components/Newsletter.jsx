import { useState } from 'react'
import { CONTACT_EMAIL } from '../data/site'
import './Newsletter.css'

const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')   // idle | error | sent

  const submit = (e) => {
    e.preventDefault()
    const value = email.trim()

    if (!VALID.test(value)) {
      setState('error')
      return
    }

    // No subscription backend exists yet, so this hands off to the mail
    // client the same way the contact CTAs do — a real action rather
    // than a form that quietly goes nowhere.
    const subject = encodeURIComponent('Newsletter subscription')
    const body = encodeURIComponent(`Please add ${value} to the 3Projects briefing list.`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setState('sent')
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-heading">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <p className="tiny newsletter-eyebrow">The briefing</p>
          <h2 className="newsletter-headline" id="newsletter-heading">
            What we are learning about operating models, once a month.
          </h2>
          <p className="newsletter-body">
            Field notes from live engagements — where constraints hide, what
            actually moves a number, and which transformations hold up a year
            later. No launch announcements.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={submit} noValidate>
          <label className="tiny newsletter-label" htmlFor="newsletter-email">
            Work email
          </label>

          <div className="newsletter-field">
            <input
              id="newsletter-email"
              className="newsletter-input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              aria-invalid={state === 'error'}
              aria-describedby="newsletter-note"
              onChange={(e) => {
                setEmail(e.target.value)
                if (state !== 'idle') setState('idle')
              }}
            />
            <button type="submit" className="newsletter-submit">
              Subscribe
            </button>
          </div>

          <p className="newsletter-note" id="newsletter-note" role="status">
            {state === 'error'
              ? 'That address does not look right — check it and try again.'
              : state === 'sent'
                ? 'Your mail client should be opening. Send the message and you are on the list.'
                : 'One email a month. Unsubscribe in a click.'}
          </p>
        </form>
      </div>
    </section>
  )
}
