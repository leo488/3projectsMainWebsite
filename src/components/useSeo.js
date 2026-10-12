import { useEffect } from 'react'
import { getSeo, seoHeadHtml } from '../data/seo'

/* Keeps the <head> in step with the route. The build already bakes the
   right tags into each page's HTML; this takes over on in-app navigation. */
export default function useSeo(path) {
  useEffect(() => {
    const seo = getSeo(path)
    document.title = seo.title
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
    const tpl = document.createElement('template')
    tpl.innerHTML = seoHeadHtml(seo).replace(/^<title>.*?<\/title>/, '')
    document.head.append(tpl.content)
  }, [path])
}
