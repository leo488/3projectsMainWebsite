import useReveal from './useReveal'
import PartnerGrid from './PartnerGrid'
import { CONTACT_EMAIL } from '../data/site'
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
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=CPA%20Partner%20enquiry`}
          className="partner-btn"
        >
          Become a CPA Partner
        </a>
      </div>
      <div className="partner-right" role="presentation">
        <PartnerGrid className="partner-grid" fill="var(--navy)" />
      </div>
    </section>
  )
}
