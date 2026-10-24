/* The one arrow on the site, the same shape as the Start a
   conversation button's, so every link that moves you on reads alike.
   It takes the text colour. */
export default function Arrow({ size = 22, className = 'arrow' }) {
  return (
    <svg
      className={className}
      width={size}
      height={Math.round((size * 12) / 22)}
      viewBox="0 0 22 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
