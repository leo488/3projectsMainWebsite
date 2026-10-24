import Logo from './Logo'
import useReveal from './useReveal'
import './Billboard.css'

/* The lockup on the Deep Carbon footer, all in white: the logo is
   either in its own colours (Deep Enterprise mark, Electric Cobalt
   wordmark) or one colour throughout, never recoloured piece by
   piece. */
export default function Billboard() {
  const ref = useReveal('is-visible')

  return (
    <section className="billboard" ref={ref}>
      <Logo
        className="billboard-logo"
        mark="var(--white)"
        word="var(--white)"
        tm="var(--white)"
        title="3Projects"
      />
    </section>
  )
}
