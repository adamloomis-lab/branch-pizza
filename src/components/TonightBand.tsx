import { useEffect, useState } from 'react'
import { ShoppingBag, ArrowRight, Thermometer } from 'lucide-react'
import { Link } from 'wouter'
import { computeStatus, type Status } from '../lib/openStatus'
import { fetchSunburyWeather, isCozyWeather, type Weather } from '../lib/weather'
import { company, subsMenu } from '../data/site'

// "Tonight at Branch", a contextual band under the home hero that reads the
// restaurant's live clock and says something different depending on when you
// visit: weekend Family Special push, "ovens are hot 'til 9", last call, or
// tonight's-a-wrap. All content derives from hours + POS-synced menu data.
// Client-only (renders nothing until mounted), so it's never stale.

const familySpecial = (() => {
  const g = subsMenu.find((s) => s.title === 'Specials')
  const it = g?.items.find((i) => i.name === 'Family Special')
  return it ? { price: it.price, desc: it.desc } : null
})()

type Copy = { kicker: string; headline: string; body: string; cta: 'order' | 'menu' }

function copyFor(s: Status, w: Weather | null): Copy {
  // Cozy weather while the kitchen's open beats every other message.
  if (w && isCozyWeather(w) && (s.kind === 'open' || s.kind === 'closing')) {
    return {
      kicker: 'Pizza weather',
      headline: `${w.temp}° and ${w.label.toLowerCase()} in Sunbury`,
      body: `Sounds like a night to let us do the cooking. Kitchen's open 'til ${s.closes}.`,
      cta: 'order',
    }
  }
  return baseCopyFor(s)
}

function baseCopyFor(s: Status): Copy {
  const weekend = s.dow === 5 || s.dow === 6
  const specialPitch = familySpecial
    ? `Feeding the crew? The Family Special: a 16″ one-topping pizza, 2 Italian subs and a 2-liter, $${familySpecial.price}.`
    : 'Hand-tossed pies, wings and cold ones from the full bar.'

  if (s.kind === 'closing') {
    return {
      kicker: 'Last call',
      headline: `Kitchen closes at ${s.closes}`,
      body: 'Still time to get an order in, we’ll have it hot and ready.',
      cta: 'order',
    }
  }
  if (s.kind === 'open') {
    return weekend
      ? { kicker: 'Tonight at Branch', headline: 'Pizza night, done right', body: specialPitch, cta: 'order' }
      : {
          kicker: 'Tonight at Branch',
          headline: `The ovens are hot ’til ${s.closes}`,
          body: 'Order online for pickup, or pull up a stool at the bar.',
          cta: 'order',
        }
  }
  // Closed
  if (s.opensDay === null) {
    return {
      kicker: 'Coming up today',
      headline: `Doors open at ${s.opens}`,
      body: weekend ? specialPitch : 'Browse the menu now, we’ll see you soon.',
      cta: 'menu',
    }
  }
  return {
    kicker: 'That’s a wrap',
    headline: `Back ${s.opensDay} at ${s.opens}`,
    body: 'The ovens are resting. Plan tomorrow’s order tonight.',
    cta: 'menu',
  }
}

export default function TonightBand() {
  const [status, setStatus] = useState<Status | null>(null)
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    setStatus(computeStatus())
    const t = setInterval(() => setStatus(computeStatus()), 60_000)
    fetchSunburyWeather().then(setWeather)
    return () => clearInterval(t)
  }, [])

  if (!status) return null
  const c = copyFor(status, weather)

  return (
    <section className="steel-panel brick-texture border-y-4 border-brick" aria-label="Tonight at Branch Pizza">
      <div className="container-x flex flex-col items-start gap-5 py-8 md:flex-row md:items-center md:justify-between md:py-9">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-script text-xl text-brick-light">{c.kicker}</p>
            {weather && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 px-3 py-1 font-cond text-[11px] font-semibold uppercase tracking-[0.14em] text-cream-dim">
                <Thermometer size={12} className="text-brick-light" aria-hidden="true" />
                Sunbury right now: {weather.temp}° · {weather.label}
              </span>
            )}
          </div>
          <h2 className="mt-1 font-display text-2xl uppercase text-cream md:text-3xl">{c.headline}</h2>
          <p className="mt-2 max-w-2xl text-body-md text-cream-dim">{c.body}</p>
        </div>
        {c.cta === 'order' ? (
          <a
            href={company.order.online}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-cta inline-flex shrink-0 items-center gap-2 rounded border-2 border-ink bg-brick px-7 py-4 font-cond text-[14px] font-semibold uppercase tracking-[0.14em] text-on-brick transition-colors hover:bg-brick-dark"
          >
            <ShoppingBag size={16} /> Order Online
          </a>
        ) : (
          <Link
            href="/menu"
            className="inline-flex shrink-0 items-center gap-2 rounded border border-cream/35 px-7 py-4 font-cond text-[14px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream/70 hover:bg-cream/8"
          >
            See the Menu <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </section>
  )
}
