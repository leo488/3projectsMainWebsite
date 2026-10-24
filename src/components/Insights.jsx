import useReveal from './useReveal'
import { Link } from '../router'
import { POSTS } from '../data/posts'
import { getProject } from '../data/projects'
import './Insights.css'

/* Laid out after McKinsey's home page: the heading and a round arrow in
   the top left, a tall case study down the right, and the articles as
   picture cards with their label and title set on the picture. The
   second column starts lower than the first. Article pictures are grey
   until their images are supplied. */
const CASE = {
  slug: 'myspotlyt',
  title: 'A live platform lacking stability, rebuilt to grow',
  image: '/images/hero-myspotlyt-1600.jpg',
}

const SLOTS = ['a', 'b', 'c', 'd']

function Card({ post, slot, label }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`ins-card ins-card--${slot}`}>
      {post.image && <img src={post.image} alt="" loading="lazy" />}
      <span className="ins-card-text">
        <span className="tiny ins-label">{label}</span>
        <span className="ins-card-title">
          {post.title} <span aria-hidden="true">›</span>
        </span>
      </span>
    </Link>
  )
}

export default function Insights() {
  const ref = useReveal('is-visible')
  const study = getProject(CASE.slug)
  const posts = POSTS.slice(0, SLOTS.length)

  return (
    <section className="insights" ref={ref} aria-labelledby="insights-heading">
      <div className="ins-grid">
        <header className="ins-head">
          <h2 className="ins-headline" id="insights-heading">Featured insights</h2>
          <div className="ins-intro">
            <p>
              Field notes from live engagements: where constraints hide, what
              actually moves a number, and what holds up a year later.
            </p>
            <Link href="/blog" className="ins-arrow" aria-label="See all insights">
              <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
                <path d="M0 9h24M16 1l8 8-8 8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
          </div>
        </header>

        {study && (
          <Link href={`/work/${study.slug}`} className="ins-case">
            <img src={CASE.image} alt="" loading="lazy" />
            <span className="ins-case-top">
              <span className="tiny ins-label">Case study</span>
              <span className="ins-case-title">{CASE.title}</span>
            </span>
            <span className="btn btn--white ins-case-btn">
              Read the case study <span aria-hidden="true">→</span>
            </span>
          </Link>
        )}

        {posts.map((p, i) => (
          <Card key={p.slug} post={p} slot={SLOTS[i]} label={i === 0 ? 'Blog' : 'Article'} />
        ))}
      </div>
    </section>
  )
}
