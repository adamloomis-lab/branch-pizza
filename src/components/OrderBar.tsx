import { Phone, ShoppingBag } from 'lucide-react'
import { company } from '../data/site'

// Sticky bottom action bar on mobile: one tap to call, one tap to order online.
// Hidden on lg+ where the navbar already carries phone + Order Online.
export default function OrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="flex border-t border-line bg-paper-2/95 backdrop-blur-md">
        <a
          href={company.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 font-cond text-[13px] font-semibold uppercase tracking-[0.14em] text-cream"
        >
          <Phone size={17} className="text-brick" /> Call
        </a>
        <a
          href={company.order.online}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-brick py-3.5 font-cond text-[13px] font-semibold uppercase tracking-[0.14em] text-on-brick"
        >
          <ShoppingBag size={17} /> Order Online
        </a>
      </div>
    </div>
  )
}
