import { Phone, Navigation, ShoppingBag } from 'lucide-react'
import { company } from '../data/site'

// High-end floating action bar (mobile): an elevated, blurred near-black capsule
// that stands off the edge rather than sitting flat. Glassy Call + Directions
// flank a glowing brick-red Order Online button (the primary conversion).
export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-steel/85 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <a
          href={company.phoneHref}
          aria-label={`Call Branch Pizza at ${company.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-cond text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-all active:scale-95"
        >
          <Phone size={17} className="text-brick-light" /> Call
        </a>
        <a
          href={company.mapsDir}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions to Branch Pizza"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-cond text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-all active:scale-95"
        >
          <Navigation size={17} className="text-brick-light" /> Directions
        </a>
        <a
          href={company.order.online}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order online from Branch Pizza"
          className="group relative flex flex-[1.3] items-center justify-center gap-2 overflow-hidden rounded-xl bg-brick py-3.5 font-cond text-[12px] font-bold uppercase tracking-[0.14em] text-on-brick shadow-accent animate-glow-pulse transition-all active:scale-95"
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]"
            aria-hidden="true"
          />
          <ShoppingBag size={17} /> Order
        </a>
      </div>
    </nav>
  )
}
