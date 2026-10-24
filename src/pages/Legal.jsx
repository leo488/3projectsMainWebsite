import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { LEGAL_PAGES, LEGAL_UPDATED } from '../data/legal'
import { formatDate } from '../data/posts'
import './Legal.css'

export default function Legal({ page }) {
  const doc = LEGAL_PAGES[page]

  return (
    <>
      <Navbar />

      <header className="legal-intro">
        <p className="tiny legal-eyebrow">Last updated {formatDate(LEGAL_UPDATED)}</p>
        <h1 className="legal-title">{doc.title}</h1>
        <p className="legal-lede">{doc.intro}</p>
      </header>

      <article className="legal-body">
        {doc.sections.map((s) => (
          <section key={s.heading} className="legal-section">
            <h2>{s.heading}</h2>
            {s.body.map((para, i) => <p key={i}>{para}</p>)}
          </section>
        ))}
      </article>

      <SiteFooter />
    </>
  )
}
