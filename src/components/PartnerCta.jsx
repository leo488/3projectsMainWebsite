import useReveal from './useReveal'
import './PartnerCta.css'

export default function PartnerCta() {
  const ref = useReveal('is-visible')

  return (
    <section className="partner" ref={ref}>
      <div className="partner-left">
        <h2 className="partner-headline">
          Turn relationships into lasting<br />
          business opportunities.
        </h2>
        <a href="#" className="partner-btn">Become a CPA Partner</a>
      </div>
      <div className="partner-right" role="presentation" />
    </section>
  )
}
