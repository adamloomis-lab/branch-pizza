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

  // Solid light bar once scrolled (or menu open); translucent over the hero.
  const solid = scrolled || open

  const linkBase =
    'font-cond text-[16px] font-semibold uppercase tracking-[0.12em] px-2 py-2 transition-colors'
  const linkColor = solid ? 'text-ink-soft hover:text-brick' : 'text-cream hover:text-brick-light'

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? 'border-b-2 border-ink bg-paper-2/96 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <nav className="container-x flex h-24 items-center justify-between lg:h-28">
        <Logo onDark={!solid} className="h-16 lg:h-24" />

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${active ? 'text-brick' : linkColor}`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className={`inline-flex items-center gap-2 ${linkBase} ${
              solid ? 'text-ink hover:text-brick' : 'text-cream hover:text-brick-light'
            }`}
          >
            <Phone size={17} className="text-brick" /> {company.phone}
          </a>
          <a
            href={company.order.online}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-cta inline-flex items-center rounded border-2 border-ink bg-brick px-7 py-4 font-cond text-[15px] font-semibold uppercase tracking-[0.12em] text-on-brick transition-colors hover:bg-brick-dark"
          >
            Order Online
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${solid ? 'text-ink' : 'text-cream'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={34} /> : <Menu size={34} />}
        </button>
      </nav>

      {open && (
        <div className="border-t-2 border-ink bg-paper-2 lg:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-4 font-cond text-lg font-semibold uppercase tracking-[0.14em] text-ink-soft hover:bg-paper-3 hover:text-brick"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded border-2 border-ink px-5 py-4 font-cond text-base font-semibold uppercase tracking-[0.12em] text-ink"
            >
              <Phone size={18} className="text-brick" /> {company.phone}
            </a>
            <a
              href={company.order.online}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded border-2 border-ink bg-brick px-5 py-4 font-cond text-base font-semibold uppercase tracking-[0.12em] text-on-brick"
            >
              Order Online
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
