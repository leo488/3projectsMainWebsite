import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { Link } from '../router'
import { POSTS, getPost } from '../data/posts'
import './Blog.css'

/* Paragraph text with **bold** runs and the author's own line breaks. */
function Inline({ text }) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line.split(/\*\*(.+?)\*\*/).map((part, j) =>
        j % 2 ? <strong key={j}>{part}</strong> : part,
      )}
    </span>
  ))
}

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
        <SiteFooter />
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
        <p className="post-meta tiny">{post.read} read</p>
      </header>

      <article className="post-body">
        {post.blocks.map(([kind, text], i) => {
          if (kind === 'h2') return <h2 key={i}>{text}</h2>
          if (kind === 'pull') return <p key={i} className="post-pull">{text}</p>
          return <p key={i}><Inline text={text} /></p>
        })}
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

      <SiteFooter />
    </>
  )
}
