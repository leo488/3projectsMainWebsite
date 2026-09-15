import Logo from './Logo'
import useReveal from './useReveal'
import './Billboard.css'

export default function Billboard() {
  const ref = useReveal('is-visible')

  return (
    <section className="billboard" ref={ref}>
      <Logo
        className="billboard-logo"
        mark="var(--navy)"
        word="var(--bright)"
        tm="var(--navy)"
        title="3Projects"
      />
    </section>
  )
}
