/* Builds a self-contained copy of the site that works from any folder
   (for sharing a preview): hash routes, relative asset paths, and only
   the public files the site actually uses. Output: dist-preview/ */
import { execSync } from 'node:child_process'
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const out = 'dist-preview'
rmSync(out, { recursive: true, force: true })
execSync(`npx vite build --base ./ --outDir ${out} --emptyOutDir`, {
  stdio: 'inherit',
  env: { ...process.env, VITE_HASH_ROUTES: '1', SKIP_SEO_PAGES: '1' },
})

// The build copied all of public/; keep only files the bundle references.
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))
const code = walk(join(out, 'assets')).concat(join(out, 'index.html'))
let bundle = code.map((f) => readFileSync(f, 'utf8')).join('\n')

for (const dir of ['images', 'fonts', 'illustrations', 'media']) {
  const root = join(out, dir)
  if (!existsSync(root)) continue
  for (const file of walk(root)) {
    const rel = file.slice(out.length + 1)
    const encoded = rel.split('/').map(encodeURIComponent).join('/')
    if (!bundle.includes(rel) && !bundle.includes(encoded)) rmSync(file)
  }
}

// Root-absolute public paths -> relative to the file that uses them.
for (const file of code) {
  const up = file.startsWith(join(out, 'assets')) && file.endsWith('.css') ? '../' : './'
  const src = readFileSync(file, 'utf8')
  const fixed = src.replace(/(["'(`])\/(images|fonts|illustrations|media|og-image|favicon)/g, `$1${up}$2`)
  if (fixed !== src) writeFileSync(file, fixed)
}
cpSync('public/favicon.svg', join(out, 'favicon.svg'))
console.log('preview build ready in', out)
