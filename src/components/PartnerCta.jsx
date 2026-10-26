import useReveal from './useReveal'
import Arrow from './Arrow'
import Photo from './Photo'
import ContactLink from './ContactLink'
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
        <ContactLink topic="cpa" className="btn btn--white partner-btn">
          Become a CPA Partner <Arrow size={18} />
        </ContactLink>
      </div>
      <div className="partner-right">
        <Photo
          name="cpa-partners"
          className="partner-img"
          sizes="(max-width: 900px) 100vw, 70vw"
          alt="Two partners in a studio, one seated and one standing beside him"
          loading="lazy"
        />
      </div>
    </section>
  )
}
