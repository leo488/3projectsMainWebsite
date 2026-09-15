import useReveal from './useReveal'
import './Featured.css'

export default function Featured() {
  const ref = useReveal('is-visible')

  return (
    <section className="featured" ref={ref}>
      <div className="featured-card">
        <div className="featured-copy">
          <p className="featured-eyebrow">Featured Transformation</p>
          <h2 className="featured-headline">
            Turning Operational<br />
            Complexity into Competitive<br />
            Advantage.
          </h2>
          <p className="featured-body">
            3Projects partners with enterprise leaders to uncover these hidden
            constraints, redesign how critical operations work, and implement
            technology strategies that create measurable business value.
          </p>
        </div>
        <div className="featured-pattern" role="presentation" />
      </div>
    </section>
  )
}
