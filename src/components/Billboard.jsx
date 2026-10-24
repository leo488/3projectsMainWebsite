import Logo from './Logo'
import useReveal from './useReveal'
import './Billboard.css'

/* The lockup in its own colours on every ground: the Deep Enterprise
   mark and the Electric Cobalt wordmark. The logo is never recoloured
   piece by piece. */
export default function Billboard() {
  const ref = useReveal('is-visible')

  return (
    <section className="billboard" ref={ref}>
      <Logo
        className="billboard-logo"
        mark="var(--section-blue)"
        word="var(--cta-blue)"
        tm="var(--section-blue)"
        title="3Projects"
      />
    </section>
  )
}
