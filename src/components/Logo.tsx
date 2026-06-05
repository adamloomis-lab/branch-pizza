import { Link } from 'wouter'

// Branch Pizza badge (est. 1977). The white linework variant reads on the dark
// espresso theme; `onDark` is accepted for call-site compatibility but the
// white mark is used everywhere on this dark site.
export default function Logo({
  onDark: _onDark = true,
  className = 'h-12',
}: {
  readonly onDark?: boolean
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="Branch Pizza, home" className={`inline-flex ${className}`}>
      <img
        src="/images/logo-white.webp"
        alt="Branch Pizza"
        width={250}
        height={250}
        className="h-full w-auto"
      />
    </Link>
  )
}
