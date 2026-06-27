import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { company } from '../data/site'

// Desktop-only floating "Order Online" pill, revealed once the visitor scrolls
// past the hero. A glowing, sheened brick-red capsule that reads as premium and
// nudges its arrow on hover. Links to the Heartland online-ordering menu.
export default function StickyOrder() {
  const [show, setShow] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const threshold =
        hero && hero.offsetHeight > 0
          ? hero.offsetTop + hero.offsetHeight - 80
          : window.innerHeight * 0.6
      setShow(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location])

  return (
    <a
      href={company.order.online}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order online from Branch Pizza"
      className={`group fixed bottom-8 right-8 z-40 hidden items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-brick to-brick-dark px-7 py-4 font-cond text-[13px] font-bold uppercase tracking-[0.16em] text-on-brick shadow-[0_16px_44px_-8px_rgba(224,32,30,0.6)] ring-1 ring-white/15 transition-all duration-300 hover:scale-[1.04] lg:flex ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_1s_ease]"
        aria-hidden="true"
      />
      <ShoppingBag size={18} /> Order Online
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}
