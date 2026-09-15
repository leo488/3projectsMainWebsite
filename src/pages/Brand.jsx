import { useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'
import { PALETTE, TYPE_SPECIMENS, MISUSE } from '../data/brand'
import { PHASES } from '../data/site'
import './Brand.css'

const TABS = [
  { id: 'logo',        label: 'Logo',        note: 'Lockup, mark, reversed' },
  { id: 'colour',      label: 'Colour',      note: 'Palette and roles' },
  { id: 'typography',  label: 'Typography',  note: 'Manrope and Bitroad' },
  { id: 'patterns',    label: 'Patterns',    note: 'Wave and pixel grid' },
  { id: 'merchandise', label: 'Merchandise', note: 'Applied surfaces' },
]

function Panel({ title, intro, children }) {
  return (
    <section className="brand-panel">
      <header className="brand-panel-head">
        <h2>{title}</h2>
        <p>{intro}</p>
      </header>
      {children}
    </section>
  )
}

function LogoPanel() {
  return (
    <Panel
      title="Logo"
      intro="One lockup, three grounds. The mark and the wordmark are drawn as a single set of paths — recolour them together or not at all."
    >
      <div className="brand-grid brand-grid--logos">
        <figure className="brand-box brand-box--light">
          <Logo className="brand-logo" mark="#0031B8" word="#0E1B2E" />
          <figcaption>
            <span className="tiny">Primary</span>
            <span>On white and on bone</span>
          </figcaption>
        </figure>

        <figure className="brand-box brand-box--dark">
          <Logo className="brand-logo" mark="#FFFFFF" word="#FFFFFF" />
          <figcaption>
            <span className="tiny">Reversed</span>
            <span>On carbon, enterprise and photography</span>
          </figcaption>
        </figure>

        <figure className="brand-box brand-box--accent">
          <Logo className="brand-logo" mark="#FFFFFF" word="#FFFFFF" />
          <figcaption>
            <span className="tiny">On cobalt</span>
            <span>Reversed only — never the primary on accent</span>
          </figcaption>
        </figure>

        <figure className="brand-box brand-box--light brand-box--mark">
          <Logo className="brand-logo brand-logo--mark" mark="#0031B8" markOnly />
          <figcaption>
            <span className="tiny">Mark only</span>
            <span>Where the wordmark would fall below 90px wide</span>
          </figcaption>
        </figure>
      </div>

      <div className="brand-split">
        <div className="brand-rules">
          <p className="tiny brand-rules-label">Clear space &amp; minimum size</p>
          <p>
            Keep clear space around the lockup equal to the height of the mark
            on every side. The full lockup stops working below roughly 90px
            wide — use the mark on its own from there down.
          </p>
        </div>

        <div className="brand-rules">
          <p className="tiny brand-rules-label brand-rules-label--stop">Do not</p>
          <ul className="brand-misuse">
            {MISUSE.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      </div>

      <div className="brand-downloads">
        <p className="tiny brand-rules-label">Files</p>
        <ul>
          <li>
            <a href="/images/logo-dark.svg" download>
              Primary lockup <span className="tiny">SVG</span>
            </a>
          </li>
          <li>
            <a href="/images/logo-white.svg" download>
              Reversed lockup <span className="tiny">SVG</span>
            </a>
          </li>
        </ul>
      </div>
    </Panel>
  )
}

function ColourPanel() {
  return (
    <Panel
      title="Colour"
      intro="Cobalt is the only accent. The six hues beneath it each belong to a phase of the work and carry that meaning wherever they appear — they are never used decoratively."
    >
      <div className="brand-swatches">
        {PALETTE.map((c) => (
          <figure
            key={c.hex}
            className={`brand-swatch${c.wide ? ' brand-swatch--wide' : ''}`}
            style={{ background: c.hex }}
          >
            <figcaption>
              <span className="brand-swatch-name">{c.name}</span>
              <span className="tiny brand-swatch-hex">{c.hex}</span>
              <span className="brand-swatch-role">{c.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Panel>
  )
}

function TypePanel() {
  return (
    <Panel
      title="Typography"
      intro="Manrope carries everything that has to be read. Bitroad is a label face only — eyebrows, categories and metadata, never a sentence."
    >
      <div className="brand-grid brand-grid--type">
        {TYPE_SPECIMENS.map((t) => (
          <figure key={t.face} className="brand-box brand-box--light brand-type">
            <span className="brand-type-sample" style={{ fontWeight: t.weight }}>
              Aa
            </span>
            <figcaption>
              <span className="tiny">{t.family} · {t.face}</span>
              <span>{t.use}</span>
            </figcaption>
          </figure>
        ))}

        <figure className="brand-box brand-box--bone brand-type">
          <span className="brand-type-sample brand-type-sample--tiny">AA</span>
          <figcaption>
            <span className="tiny">Bitroad · Regular</span>
            <span>
              Eyebrows, category filters and metadata, set uppercase with wide
              tracking. Never used for body copy.
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="brand-scale">
        <p className="tiny brand-rules-label">Scale in use</p>
        <ul>
          <li><span style={{ fontSize: 28, fontWeight: 400 }}>Display</span><span className="tiny">Manrope Regular · up to 100px</span></li>
          <li><span style={{ fontSize: 22, fontWeight: 500 }}>Headline</span><span className="tiny">Manrope Medium · 36–78px</span></li>
          <li><span style={{ fontSize: 17, fontWeight: 500 }}>Statistic</span><span className="tiny">Manrope Medium · 52–104px</span></li>
          <li><span style={{ fontSize: 15, fontWeight: 400 }}>Body</span><span className="tiny">Manrope Regular · 14–17px</span></li>
        </ul>
      </div>
    </Panel>
  )
}

function PatternPanel() {
  return (
    <Panel
      title="Patterns"
      intro="Two marks of the same idea: a stepped wave for surfaces that need movement, and the pixel grid that builds the human figure out of data."
    >
      <div className="brand-grid brand-grid--patterns">
        <figure className="brand-box brand-box--flush">
          <div className="brand-pattern brand-pattern--wave" />
          <figcaption>
            <span className="tiny">Stepped wave</span>
            <span>Feature panels and large fields. Scale so roughly six crests fill the height.</span>
          </figcaption>
        </figure>

        <figure className="brand-box brand-box--flush">
          <div className="brand-pattern brand-pattern--pixel" />
          <figcaption>
            <span className="tiny">Pixel grid</span>
            <span>Portraiture and hero artwork — the figure assembled from data cells.</span>
          </figcaption>
        </figure>
      </div>

      <div className="brand-phases">
        <p className="tiny brand-rules-label">Phase colours</p>
        <ul>
          {PHASES.map((p) => (
            <li key={p.label}>
              <span className="brand-phase-chip" style={{ background: p.ground }} />
              <span className="brand-phase-name">{p.label}</span>
              <span className="tiny">{p.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

function MerchPanel() {
  const surfaces = [
    { label: 'Report cover',   ground: 'var(--enterprise)', ratio: '3 / 4' },
    { label: 'Tote',           ground: 'var(--bone)',       ratio: '1 / 1' },
    { label: 'Lanyard',        ground: 'var(--cobalt)',     ratio: '1 / 1' },
    { label: 'Notebook',       ground: 'var(--carbon)',     ratio: '3 / 4' },
    { label: 'Signage',        ground: 'var(--indigo)',     ratio: '16 / 9' },
    { label: 'Apparel',        ground: 'var(--slate)',      ratio: '16 / 9' },
  ]

  return (
    <Panel
      title="Merchandise"
      intro="Applied surfaces follow the same rule as everything else: one ground, the reversed lockup, and nothing else competing for the space."
    >
      <div className="brand-grid brand-grid--merch">
        {surfaces.map((s) => (
          <figure key={s.label} className="brand-box brand-box--flush">
            {/* Photography pending — the ground shows the intended
                treatment rather than standing in for a product shot. */}
            <div
              className="brand-merch-plate"
              style={{ background: s.ground, aspectRatio: s.ratio }}
            >
              <Logo
                className="brand-merch-logo"
                mark={s.ground === 'var(--bone)' ? '#0031B8' : '#FFFFFF'}
                word={s.ground === 'var(--bone)' ? '#0E1B2E' : '#FFFFFF'}
              />
            </div>
            <figcaption>
              <span className="tiny">{s.label}</span>
              <span>Awaiting photography</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Panel>
  )
}

const PANELS = {
  logo: LogoPanel,
  colour: ColourPanel,
  typography: TypePanel,
  patterns: PatternPanel,
  merchandise: MerchPanel,
}

export default function Brand() {
  const [tab, setTab] = useState('logo')
  const Active = PANELS[tab]

  return (
    <>
      <Navbar theme="dark" />

      <header className="brand-intro">
        <p className="tiny brand-intro-eyebrow">Brand assets</p>
        <h1 className="brand-intro-headline">
          Everything you need to<br />use the brand correctly
        </h1>
        <p className="brand-intro-body">
          Logo files, the palette and its rules, the typefaces and the patterns
          that carry them. If you are producing something on our behalf, take it
          from here rather than from a screenshot.
        </p>
      </header>

      <div className="brand-body">
        <nav className="brand-tabs" aria-label="Brand asset categories">
          <div className="brand-tabs-sticky">
            <p className="tiny brand-tabs-label">Categories</p>
            <ul role="tablist" aria-orientation="vertical">
              {TABS.map((t) => (
                <li key={t.id} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`brand-tab-${t.id}`}
                    aria-selected={tab === t.id}
                    aria-controls="brand-panel"
                    className={`brand-tab${tab === t.id ? ' is-active' : ''}`}
                    onClick={() => setTab(t.id)}
                  >
                    <span className="brand-tab-label">{t.label}</span>
                    <span className="tiny brand-tab-note">{t.note}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div
          className="brand-content"
          id="brand-panel"
          role="tabpanel"
          aria-labelledby={`brand-tab-${tab}`}
          key={tab}
        >
          <Active />
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
