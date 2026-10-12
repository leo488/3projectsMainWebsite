/* Search and share metadata for every route. Read in two places: the
   app sets the tags on each navigation, and the build writes a static
   copy of index.html per route with the same tags baked in, so crawlers
   and link previews (which don't run JavaScript) see the right page. */

import { PROJECTS, getProject } from './projects.js'
import { POSTS, getPost } from './posts.js'

// The production domain. Change it here if the site moves.
export const SITE_URL = 'https://3projects.com'
export const SITE_NAME = '3Projects'
export const DEFAULT_IMAGE = '/og-image.jpg'

const HOME = {
  title: '3Projects | Operating Model Transformation for Enterprises',
  description:
    '3Projects redesigns how complex enterprises run, from discovery and strategy through to the systems that carry the work. Built by operators, for organisations that have outgrown their operating model.',
}

const PAGES = {
  '/': HOME,
  '/work': {
    title: 'Case Studies | 3Projects',
    description:
      'Selected engagements in operating model redesign across financial services, infrastructure, energy and technology, and the measurable change each one delivered.',
  },
  '/about': {
    title: 'About Us | 3Projects',
    description:
      'A practice built by operators, working between the operating model an enterprise has and the one it needs. Meet the team, our story and where we work.',
  },
  '/careers': {
    title: 'Careers | 3Projects',
    description:
      'Join a team where strategy, design and technology work at one table. Explore open roles at 3Projects across our offices.',
  },
  '/blog': {
    title: 'Insights | 3Projects',
    description:
      'Field notes from inside the operating model: practical thinking on transformation, process, technology and what makes change last.',
  },
  '/brand': {
    title: 'Brand Assets | 3Projects',
    description:
      'Logos, colours, typography and usage rules for representing the 3Projects brand correctly.',
  },
}

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-dark.svg`,
  email: 'hello@3projects.com',
  description: HOME.description,
}

const clip = (text, max = 160) =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)) + '…'

export function normalisePath(path) {
  return path.replace(/\/+$/, '') || '/'
}

/* Everything the <head> needs for one path. */
export function getSeo(rawPath) {
  const path = normalisePath(rawPath)
  const url = SITE_URL + (path === '/' ? '/' : path)

  if (PAGES[path]) {
    return {
      ...PAGES[path],
      url,
      image: DEFAULT_IMAGE,
      type: 'website',
      jsonLd: path === '/' ? ORGANIZATION : null,
    }
  }

  if (path.startsWith('/work/')) {
    const project = getProject(path.slice('/work/'.length))
    if (project) {
      return {
        title: `${project.title} | 3Projects Case Study`,
        description: clip(project.summary),
        url,
        image: DEFAULT_IMAGE,
        type: 'article',
        jsonLd: null,
      }
    }
    return notFound(url)
  }

  if (path.startsWith('/blog/')) {
    const post = getPost(path.slice('/blog/'.length))
    if (post) {
      return {
        title: `${post.title} | 3Projects Insights`,
        description: clip(post.excerpt),
        url,
        image: DEFAULT_IMAGE,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          mainEntityOfPage: url,
        },
      }
    }
    return notFound(url)
  }

  // Unknown paths fall through to the home page in the app.
  return { ...getSeo('/'), noindex: true }
}

function notFound(url) {
  return {
    title: 'Page not found | 3Projects',
    description: HOME.description,
    url,
    image: DEFAULT_IMAGE,
    type: 'website',
    noindex: true,
    jsonLd: null,
  }
}

/* Every indexable path, for the sitemap and the static pages. */
export function allPaths() {
  return [
    ...Object.keys(PAGES),
    ...PROJECTS.map((p) => `/work/${p.slug}`),
    ...POSTS.map((p) => `/blog/${p.slug}`),
  ]
}

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* The tags as an HTML string, for the build step. */
export function seoHeadHtml(seo) {
  const image = SITE_URL + seo.image
  const tags = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}" />`,
    `<link rel="canonical" href="${seo.url}" />`,
    seo.noindex ? `<meta name="robots" content="noindex" />` : '',
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:title" content="${escape(seo.title)}" />`,
    `<meta property="og:description" content="${escape(seo.description)}" />`,
    `<meta property="og:url" content="${seo.url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(seo.title)}" />`,
    `<meta name="twitter:description" content="${escape(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    seo.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')}</script>`
      : '',
  ]
  // data-seo marks the tags the app swaps out on navigation.
  return tags
    .filter(Boolean)
    .map((t) => t.replace(/^<(meta|link|script)/, '<$1 data-seo'))
    .join('\n    ')
}
