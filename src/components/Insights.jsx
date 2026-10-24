import useReveal from './useReveal'
import Arrow from './Arrow'
import { Link } from '../router'
import { usePostModal, postHref } from './PostModal'
import { POSTS } from '../data/posts'
import { getProject } from '../data/projects'
import Photo from './Photo'
import './Insights.css'

/* Laid out after McKinsey's home page: the heading and a round arrow in
   the top left, a tall case study down the right, and the articles as
   picture cards in two staggered columns. Unlike McKinsey's, the label
   and title sit under each picture, not on it. A post without an image
   shows a grey box. */
const CASE = {
  slug: 'myspotlyt',
  title: 'A live platform lacking stability, rebuilt to grow',
  image: 'blog-platform',
}

const SLOTS = ['a', 'b', 'c', 'd']

function Card({ post, slot, label, onOpen }) {
  return (
    <a href={postHref(post.slug)} className={`ins-card ins-card--${slot}`} onClick={onOpen}>
      <span className="ins-media">
        {post.image && <Photo name={post.image} sizes="(max-width: 600px) 100vw, 33vw" loading="lazy" />}
      </span>
      <span className="tiny ins-label">{label}</span>
      <span className="ins-card-title">
        {post.title} <Arrow size={18} />
      </span>
    </a>
  )
}

export default function Insights() {
  const ref = useReveal('is-visible')
  const study = getProject(CASE.slug)
  const posts = POSTS.slice(0, SLOTS.length)
  const [modal, openPost] = usePostModal()

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
              <Arrow size={26} />
            </Link>
          </div>
        </header>

        {study && (
          <Link href={`/work/${study.slug}`} className="ins-case">
            <span className="ins-media">
              {CASE.image && <Photo name={CASE.image} sizes="(max-width: 600px) 100vw, 60vw" loading="lazy" />}
            </span>
            <span className="tiny ins-label">Case study</span>
            <span className="ins-case-title">{CASE.title}</span>
            <span className="btn btn--blue ins-case-btn">
              Read the case study <Arrow size={18} />
            </span>
          </Link>
        )}

        {posts.map((p, i) => (
          <Card
            key={p.slug}
            post={p}
            slot={SLOTS[i]}
            label={i === 0 ? 'Blog' : 'Article'}
            onOpen={openPost(p.slug)}
          />
        ))}
      </div>
      {modal}
    </section>
  )
}
