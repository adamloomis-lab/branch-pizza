import { Link } from 'wouter'
import { Phone, MapPin, Facebook, Star } from 'lucide-react'
import Logo from './Logo'
import { company, hoursCompact } from '../data/site'

const explore = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact & Directions', href: '/contact' },
]

const policies = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="steel-panel brick-texture border-t-4 border-brick text-cream-dim">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo onDark className="h-24" />
          <p className="mt-5 max-w-xs text-body-md">{company.shortBlurb}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-line-dark text-cream transition-colors hover:border-brick hover:text-brick-light"
              aria-label="Branch Pizza on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={company.social.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded border border-line-dark px-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-brick hover:text-brick-light"
              aria-label="Branch Pizza on Yelp"
            >
              <Star size={14} className="text-bluetip" /> Yelp
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-cond text-headline-sm text-cream">Visit</h3>
          <ul className="mt-5 space-y-4 text-body-md">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brick-light" />
              <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className="flex items-start gap-3 hover:text-cream">
                <Phone size={18} className="mt-0.5 shrink-0 text-brick-light" />
                <span>{company.phone}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-cond text-headline-sm text-cream">Hours</h3>
          <ul className="mt-5 space-y-2.5 text-body-md">
            {hoursCompact.map((h) => (
              <li key={h.day} className="flex items-baseline justify-between gap-3">
                <span className="text-cream-dim">{h.day}</span>
                <span className="whitespace-nowrap text-cream">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-cond text-headline-sm text-cream">Explore</h3>
          <ul className="mt-5 space-y-3 text-body-md">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={company.order.online} target="_blank" rel="noopener noreferrer" className="font-semibold text-brick-light hover:text-brick">
                Order Online →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-label-sm uppercase tracking-[0.16em] text-cream-faint sm:flex-row">
          <span className="order-2 sm:order-1">
            © {year} {company.name}. All rights reserved.
          </span>
          <div className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:order-2">
            {policies.map((p) => (
              <Link key={p.href} href={p.href} className="transition-colors hover:text-cream">
                {p.label}
              </Link>
            ))}
          </div>
          <span className="order-3">
            Website by{' '}
            <a
              href="https://adamloomis.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-dim transition-colors hover:text-brick-light"
            >
              AdamLoomis.online
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
