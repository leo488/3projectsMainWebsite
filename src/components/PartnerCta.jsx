import useReveal from './useReveal'
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
      <div className="partner-right">
        <img
          className="partner-img"
          src="/images/partner-cpa-1024.jpg"
          srcSet="/images/partner-cpa-700.jpg 700w, /images/partner-cpa-1024.jpg 1024w"
          sizes="(max-width: 900px) 100vw, 48vw"
          alt="A partner team talking around a table"
          loading="lazy"
        />
      </div>
    </section>
  )
}
