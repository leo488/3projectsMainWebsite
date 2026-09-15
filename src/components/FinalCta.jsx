import { useEffect, useRef } from 'react'
import './FinalCta.css'

export default function FinalCta() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle('is-visible', entry.isIntersecting || el.classList.contains('is-visible'))
      // While the closing CTA is on screen the header pill stands down,
      // so the page only ever shows one Start a Conversation.
      document.body.classList.toggle('cta-handoff', entry.isIntersecting)
    }, { threshold: 0.35 })

    io.observe(el)
    return () => {
      io.disconnect()
      document.body.classList.remove('cta-handoff')
    }
  }, [])

  return (
    <section className="final-cta" ref={ref}>
      <h2 className="final-cta-headline">
        Let&rsquo;s redesign how your<br />
        enterprise <span className="final-cta-accent">grows</span>
      </h2>
      <a href="#" className="final-cta-btn btn-gradient">Start a Conversation</a>
    </section>
  )
}
