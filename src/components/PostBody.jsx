/* An article's blocks: paragraphs with **bold** runs and the author's
   own line breaks, pull lines, and section headings. Shared by the
   article page and the article modal. */
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

export default function PostBody({ post, className = 'post-body' }) {
  return (
    <article className={className}>
      {post.blocks.map(([kind, text], i) => {
        if (kind === 'h2') return <h2 key={i}>{text}</h2>
        if (kind === 'pull') return <p key={i} className="post-pull">{text}</p>
        return <p key={i}><Inline text={text} /></p>
      })}
    </article>
  )
}
