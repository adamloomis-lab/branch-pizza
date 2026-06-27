import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'wouter'
import { X, Phone, MapPin, Clock, ArrowRight, Facebook } from 'lucide-react'
import { company } from '../data/site'

export interface MobileMenuProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly links: ReadonlyArray<{ label: string; href: string }>
}

// Full-screen, high-trust mobile navigation. Backdrop-blurred near-black panel
// with a brick-red glow, staggered link entrance, and prominent contact CTAs.
// Brand-adapted from the Adam Loomis Marketing "D&D" pattern.
export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Double rAF: ensure the panel mounts in its hidden (off-screen) state and
      // is painted once before we flip to `shown`, so the slide transition runs.
      let id2 = 0
      const id1 = requestAnimationFrame(() => {
        id2 = requestAnimationFrame(() => setShown(true))
      })
      return () => {
        cancelAnimationFrame(id1)
        cancelAnimationFrame(id2)
        document.body.style.overflow = ''
      }
    }
    setShown(false)
    document.body.style.overflow = ''
  }, [open])

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  // SSR guard — document only exists in the browser.
  if (typeof document === 'undefined') return null

  // IMPORTANT: render at document.body via portal so the panel's `position: fixed`
  // escapes the header's containing block. The header applies `backdrop-filter`
  // (backdrop-blur-md) once scrolled/solid, which makes it a containing block for
  // fixed descendants — that trapped the full-screen menu to the header strip.
  return createPortal(
    <div className="lg:hidden fixed inset-0 z-[60]">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`steel-panel brick-texture relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto border-l-2 border-brick text-cream shadow-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative flex min-h-full flex-col px-7 pt-6 pb-10">
          <div className="flex items-center justify-between">
            <img src="/images/logo-white.webp" alt={company.name} className="h-16 w-auto" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
            >
              <X size={24} />
            </button>
          </div>

          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-brick px-3 py-1.5 font-cond text-[11px] font-semibold uppercase tracking-[0.18em] text-on-brick">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-glow-pulse" /> Family-Owned on the Square Since {company.established}
          </span>

          <nav className="mt-6 flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-cream/10 py-4 font-display text-[30px] uppercase leading-none text-cream/90 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none hover:text-brick-light ${
                  shown ? 'translate-x-0' : 'translate-x-6'
                }`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                {l.label}
                <ArrowRight
                  size={20}
                  className="text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-brick-light"
                />
              </Link>
            ))}
          </nav>

          <div
            className={`mt-8 flex flex-col gap-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              shown ? 'translate-y-0' : 'translate-y-4'
            }`}
            style={{ transitionDelay: `${120 + links.length * 70 + 60}ms` }}
          >
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 rounded border-2 border-ink bg-brick px-6 py-4 font-cond text-[15px] font-semibold uppercase tracking-[0.12em] text-on-brick shadow-accent transition-colors hover:bg-brick-dark"
            >
              <Phone size={18} /> Call {company.phone}
            </a>
            <a
              href={company.order.online}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded border-2 border-cream/70 px-6 py-4 font-cond text-[15px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Order Online
            </a>
          </div>

          <div className="mt-auto space-y-3 pt-10 font-body text-[15px] text-cream/70">
            <a
              href={company.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-cream"
            >
              <MapPin size={18} className="shrink-0 text-brick-light" /> {company.addressOneLine}
            </a>
            <p className="flex items-center gap-3">
              <Clock size={18} className="shrink-0 text-brick-light" /> Tue to Sat, lunch &amp; dinner
            </p>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-cream"
            >
              <Facebook size={18} className="shrink-0 text-brick-light" /> Branch Pizza on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
