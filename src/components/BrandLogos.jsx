import './BrandLogos.css'

const BRANDS = [
  'Meridian Bank',
  'Northfield Foods',
  'Clearview Health',
  'Atlas Retail',
  'Vantage Energy',
  'Solstice Insurance',
  'Harbor Logistics',
  'Crestline Capital',
]

export default function BrandLogos() {
  return (
    <section className="brands-section">
      <div className="brands-track">
        <ul className="brands-list">
          {BRANDS.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <ul className="brands-list" aria-hidden="true">
          {BRANDS.map((b) => <li key={`${b}-dup`}>{b}</li>)}
        </ul>
      </div>
    </section>
  )
}
