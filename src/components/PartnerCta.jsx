import useReveal from './useReveal'
import Arrow from './Arrow'
import { CONTACT_EMAIL } from '../data/site'
import { photo } from '../data/images'
import './PartnerCta.css'

export default function PartnerCta() {
  const ref = useReveal('is-visible')

  return (
    <section className="partner" ref={ref}>
      <div className="partner-left">
        <h2 className="partner-headline">
          Turn relationships into lasting
          business opportunities.
        </h2>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=CPA%20Partner%20enquiry`}
          className="btn btn--white partner-btn"
        >
          Become a CPA Partner <Arrow size={18} />
        </a>
      </div>
      <div className="partner-right">
        <img
          className="partner-img"
          {...photo('cpa-partners')}
          sizes="(max-width: 900px) 100vw, 70vw"
          alt="Two partners in a studio, one seated and one standing beside him"
          loading="lazy"
        />
      </div>
    </section>
  )
}
