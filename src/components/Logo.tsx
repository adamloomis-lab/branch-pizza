import { Link } from 'wouter'

// Branch Pizza badge (est. 1977). White linework over dark surfaces (hero,
// footer); dark linework on the light scrolled navbar.
export default function Logo({
  onDark = false,
  className = 'h-12',
}: {
  readonly onDark?: boolean
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="Branch Pizza, home" className={`inline-flex ${className}`}>
      <img
        src={onDark ? '/images/logo-white.webp' : '/images/logo-dark.webp'}
        alt="Branch Pizza"
        width={250}
        height={250}
        className="h-full w-auto"
      />
    </Link>
  )
}
