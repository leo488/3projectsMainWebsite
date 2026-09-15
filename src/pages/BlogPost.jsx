import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { Link } from '../router'
import { POSTS, getPost, formatDate } from '../data/posts'
import './Blog.css'

export default function BlogPost({ slug }) {
  const post = getPost(slug)

  if (!post) {
    return (
      <>
        <Navbar />
        <section className="post-missing">
          <p className="tiny">404</p>
          <h1>That article isn&rsquo;t here.</h1>
          <Link href="/blog" className="post-back-link">Back to insights</Link>
        </section>
        <SiteFooter tone="bone" />
      </>
    )
  }

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Navbar theme="dark" />

      <header className="post-intro" style={{ background: post.ground }}>
        <Link href="/blog" className="tiny post-back">← All insights</Link>
        <p className="tiny post-category">{post.category}</p>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta tiny">{formatDate(post.date)} · {post.read} read</p>
      </header>

      <p className="post-lede">{post.excerpt}</p>

      <article className="post-body">
        {post.sections.map((s) => (
          <section key={s.heading} className="post-section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </article>

      <section className="post-next">
        <p className="tiny post-next-eyebrow">More insights</p>
        <ul className="post-next-list">
          {more.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="post-next-link">
                <span className="post-next-plate" style={{ background: p.ground }} />
                <h3>{p.title}</h3>
                <span className="tiny">{p.category} · {p.read}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter tone="bone" />
    </>
  )
}
