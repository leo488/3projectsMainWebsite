import { useEffect, useRef, useState } from 'react'
import PostBody from './PostBody'
import { absoluteUrl, hrefFor } from '../router'
import { getPost } from '../data/posts'
import { photo } from '../data/images'
import '../pages/Blog.css'
import './PostModal.css'

/* Articles open over the page they were picked from: read, share, close.
   Each article keeps its own page at /blog/:slug, so a shared link still
   lands on it, and a modified click on a card opens that page as usual.

   usePostModal() returns the modal to render and an onClick for any link
   to /blog/:slug. */
export function usePostModal() {
  const [slug, setSlug] = useState(null)

  const open = (s) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    setSlug(s)
  }

  const modal = slug ? <PostModal slug={slug} onClose={() => setSlug(null)} /> : null
  return [modal, open]
}

export function postHref(slug) {
  return hrefFor(`/blog/${slug}`)
}

function PostModal({ slug, onClose }) {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)
  const post = getPost(slug)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!post) return null

  const share = async () => {
    const url = absoluteUrl(`/blog/${post.slug}`)
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url })
      } catch {
        // The reader dismissed the share sheet.
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', url)
    }
  }

  return (
    <dialog
      ref={ref}
      className="post-modal"
      aria-labelledby="post-modal-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close() }}
    >
      <div className="post-modal-panel">
        <div className="post-modal-bar">
          <span className="tiny post-modal-category">{post.category} · {post.read} read</span>
          <div className="post-modal-actions">
            <button type="button" className="btn btn--black post-modal-share" onClick={share}>
              {copied ? 'Link copied' : 'Share'}
            </button>
            <button
              type="button"
              className="post-modal-close"
              aria-label="Close article"
              onClick={() => ref.current.close()}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <h2 className="post-modal-title" id="post-modal-title">{post.title}</h2>

        {post.image && (
          <figure className="post-modal-cover">
            <img {...photo(post.image)} sizes="(max-width: 900px) 100vw, 800px" alt="" />
          </figure>
        )}

        <PostBody post={post} className="post-body post-modal-body" />
      </div>
    </dialog>
  )
}
