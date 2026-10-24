import Logo from './Logo'
import useReveal from './useReveal'
import './Billboard.css'

export default function Billboard({ tone = 'light' }) {
  const dark = tone === 'dark'
  const ref = useReveal('is-visible')

  return (
    <section className="billboard" ref={ref}>
      <Logo
        className="billboard-logo"
        mark={dark ? 'var(--white)' : 'var(--billboard-mark)'}
        word="var(--bright)"
        tm={dark ? 'var(--white)' : 'var(--section-blue)'}
        title="3Projects"
      />
    </section>
  )
}
