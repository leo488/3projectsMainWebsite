import useReveal from './useReveal'
import './FinalCta.css'

export default function FinalCta() {
  const ref = useReveal('is-visible')

  return (
    <section className="final-cta" ref={ref}>
      <h2 className="final-cta-headline">
        Let&rsquo;s redesign how your<br />
        enterprise <span className="final-cta-accent">grows</span>
      </h2>
      <a href="#" className="final-cta-btn">Start a Conversation</a>
    </section>
  )
}
