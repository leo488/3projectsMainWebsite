import useReveal from './useReveal'
import { Link } from '../router'
import { POSTS } from '../data/posts'
import { getProject } from '../data/projects'
import './Insights.css'

/* The closing read before the call to action: a mosaic of the latest
   writing, led by one large story, with a case study set in among the
   articles the way a journal would run it. */
const CASE_CARD = {
  slug: 'myspotlyt',
  image: '/images/hero-myspotlyt-900.jpg',
}

export default function Insights() {
  const ref = useReveal('is-visible')
  const [lead, ...rest] = POSTS
  const study = getProject(CASE_CARD.slug)

  const cards = rest.slice(0, 3).map((p) => ({
    key: p.slug,
    href: `/blog/${p.slug}`,
    label: 'Article',
    title: p.title,
    meta: `${p.category} · ${p.read}`,
    image: p.image,
  }))
  if (study) {
    cards.splice(1, 0, {
      key: study.slug,
      href: `/work/${study.slug}`,
      label: 'Case study',
      title: study.summary,
      meta: study.client.split(' — ')[0],
      image: CASE_CARD.image,
    })
  }

  if (!lead) return null

  return (
    <section className="insights" ref={ref} aria-labelledby="insights-heading">
      <header className="insights-head">
        <h2 className="insights-headline" id="insights-heading">Featured insights</h2>
        <Link href="/blog" className="insights-all">
          See all insights <span aria-hidden="true">→</span>
        </Link>
      </header>

      <ul className="insights-grid">
        <li className="insights-item insights-item--lead" style={{ '--i': 0 }}>
          <Link href={`/blog/${lead.slug}`} className="insights-card">
            <div className="insights-visual">
              {lead.image && <img src={lead.image} alt="" loading="lazy" />}
            </div>
            <div className="insights-copy">
              <p className="tiny insights-label">Blog post</p>
              <h3 className="insights-title">{lead.title}</h3>
              <p className="insights-excerpt">{lead.excerpt}</p>
              <p className="insights-meta">{lead.category} · {lead.read}</p>
            </div>
          </Link>
        </li>

        {cards.map((c, i) => (
          <li key={c.key} className="insights-item" style={{ '--i': i + 1 }}>
            <Link href={c.href} className="insights-card">
              <div className="insights-visual">
                {c.image && <img src={c.image} alt="" loading="lazy" />}
              </div>
              <div className="insights-copy">
                <p className="tiny insights-label">{c.label}</p>
                <h3 className="insights-title">{c.title}</h3>
                <p className="insights-meta">{c.meta}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
