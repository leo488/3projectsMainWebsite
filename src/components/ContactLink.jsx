import { hrefFor } from '../router'
import { openContact } from '../contact'

/* A Start a conversation link: it opens the contact modal in place, and
   still points at /contact for a new tab or a reader without script. */
export default function ContactLink({ topic, mode, className, children, ...rest }) {
  const query = [topic && `topic=${topic}`, mode === 'call' && 'call'].filter(Boolean).join('&')
  const href = `/contact${query ? `?${query}` : ''}`

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    openContact({ topic, mode })
  }

  return (
    <a href={hrefFor(href)} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}
