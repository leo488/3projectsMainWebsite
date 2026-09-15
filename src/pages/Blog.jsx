import { useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import useReveal from '../components/useReveal'
import { Link } from '../router'
import { POSTS, POST_CATEGORIES, formatDate } from '../data/posts'
import './Blog.css'

export default function Blog() {
  const [active, setActive] = useState('All')
  const gridRef = useReveal('is-visible')

  const shown = active === 'All'
    ? POSTS
    : POSTS.filter((p) => p.category === active)

  return (
    <>
      <Navbar theme="dark" />

      {/* Same opening as the work index: a solid brand ground carrying
          the heading. */}
      <header className="blog-intro">
        <p className="tiny blog-intro-eyebrow">Insights</p>
        <h1 className="blog-intro-headline">
          Field notes from inside<br />the operating model
        </h1>
        <p className="blog-intro-body">
          What we are learning on live engagements — where constraints hide,
          what actually moves a number, and which transformations still hold up
          a year later.
        </p>
        <dl className="blog-intro-stats">
          <div><dt className="tiny">Articles</dt><dd>{POSTS.length}</dd></div>
          <div><dt className="tiny">Topics</dt><dd>{POST_CATEGORIES.length - 1}</dd></div>
        </dl>
      </header>

      <nav className="blog-filter" aria-label="Filter articles by topic">
        {POST_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`tiny blog-filter-btn${c === active ? ' is-active' : ''}`}
            aria-pressed={c === active}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
        <span className="tiny blog-filter-count">
          {shown.length} {shown.length === 1 ? 'article' : 'articles'}
        </span>
      </nav>

      <section className="blog-grid-section" ref={gridRef}>
        {shown.length > 0 ? (
          <ul className="blog-grid">
            {shown.map((p, i) => (
              <li key={p.slug} className="blog-card" style={{ '--i': i, '--ratio': p.ratio }}>
                <Link href={`/blog/${p.slug}`} className="blog-card-link">
                  <div className="blog-card-visual" style={{ background: p.ground }}>
                    <span className="tiny blog-card-category">{p.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <p className="tiny blog-card-meta">
                      {formatDate(p.date)} · {p.read}
                    </p>
                    <h2 className="blog-card-title">{p.title}</h2>
                    <p className="blog-card-excerpt">{p.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="blog-empty">Nothing under that topic yet.</p>
        )}
      </section>

      <SiteFooter tone="bone" />
    </>
  )
}
