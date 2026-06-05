import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(40)

  // Solid espresso bar once scrolled (or menu open); translucent over the hero.
  const solid = scrolled || open

  const linkBase = 'font-cond text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors'
  const linkColor = solid ? 'text-cream-dim hover:text-brick-light' : 'text-cream hover:text-brick-light'

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? 'border-b border-line bg-paper-2/95 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/65 to-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Logo className="h-12 sm:h-14" />

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${active ? 'text-brick-light' : linkColor}`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className={`inline-flex items-center gap-2 ${linkBase} ${
              solid ? 'text-cream hover:text-brick-light' : 'text-cream hover:text-brick-light'
            }`}
          >
            <Phone size={15} className="text-brick" /> {company.phone}
          </a>
          <a
            href={company.order.online}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-cta inline-flex items-center rounded bg-brick px-6 py-3 font-cond text-[12px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
          >
            Order Online
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-cream lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper-2 lg:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 font-cond text-sm font-semibold uppercase tracking-[0.16em] text-cream-dim hover:bg-paper-3 hover:text-brick-light"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded border border-brick/45 px-5 py-3 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-brick-light"
            >
              <Phone size={17} /> {company.phone}
            </a>
            <a
              href={company.order.online}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded bg-brick px-5 py-3 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-on-brick"
            >
              Order Online
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
