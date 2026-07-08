import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ShoppingBag, Phone, Beer, Wine, Plus, Salad, Flame, Drumstick } from 'lucide-react'
import Button from '../components/Button'
import PizzaEstimator from '../components/PizzaEstimator'
import {
  company,
  specialtyPizzas,
  buildYourOwn,
  pizzaSizes,
  startersMenu,
  subsMenu,
  barMenu,
  saladDressings,
  wingSauces,
  wingDryRubs,
  type MenuItem,
  type MenuGroup,
  type PizzaSizeKey,
  type Drink,
} from '../data/site'

// Prominent chip card for the dressing / sauce / dry-rub lists.
function FlavorCard({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <div className="card-brut reveal rounded-lg p-6 sm:p-7">
      <h4 className="flex items-center gap-2 font-display text-headline-sm uppercase text-ink">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brick text-on-brick">
          <Icon size={18} />
        </span>
        {title}
      </h4>
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {items.map((i) => (
          <li
            key={i}
            className="rounded-full border-2 border-ink/12 bg-paper-3 px-4 py-2 font-cond text-sm font-semibold uppercase tracking-[0.03em] text-ink"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Color-coded by style so each beer/wine stands out and the list is scannable.
const DRINK_STYLES: Record<string, { c: string; on: string }> = {
  'Light Lager': { c: '#ecd27a', on: '#1a1511' },
  Lager: { c: '#e0a32f', on: '#1a1511' },
  'Amber Lager': { c: '#b5701a', on: '#ffffff' },
  IPA: { c: '#cc5a1e', on: '#ffffff' },
  Wheat: { c: '#ecdda6', on: '#1a1511' },
  'Golden Ale': { c: '#e8bc52', on: '#1a1511' },
  Cider: { c: '#e0201e', on: '#ffffff' },
  Seltzer: { c: '#2fa0a0', on: '#ffffff' },
  Seasonal: { c: '#3a2a1a', on: '#ffffff' },
  Red: { c: '#8a2330', on: '#ffffff' },
  White: { c: '#d8c77e', on: '#1a1511' },
  Blush: { c: '#e7a0a8', on: '#1a1511' },
}

function DrinkTile({ drink, kind }: { drink: Drink; kind: 'beer' | 'wine' }) {
  const s = DRINK_STYLES[drink.style] ?? { c: '#e0a32f', on: '#1a1511' }
  const Icon = kind === 'wine' ? Wine : Beer
  return (
    <div className="card-brut card-brut-hover overflow-hidden rounded-lg">
      <span className="block h-1.5 w-full" style={{ backgroundColor: s.c }} aria-hidden="true" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <Icon size={18} style={{ color: s.c }} aria-hidden="true" />
          <span
            className="rounded-full px-2.5 py-0.5 font-cond text-[10px] font-bold uppercase tracking-[0.08em]"
            style={{ backgroundColor: s.c, color: s.on }}
          >
            {drink.style}
          </span>
        </div>
        <h4 className="mt-2.5 font-display text-[17px] uppercase leading-tight text-ink">{drink.name}</h4>
      </div>
    </div>
  )
}

// A single price like "9.00" or "$2.50" (one clean number).
const SINGLE_PRICE = /^\$?\s*\d+(?:\.\d+)?$/
// Put a $ in front of the trailing number of a segment: "Small 6.25" -> "Small $6.25".
const withDollar = (seg: string) => seg.trim().replace(/(\d+(?:\.\d+)?)\s*$/, '$$$1')

// The shared menu card, name + description + price, used for every item on the page.
function ItemCard({ item }: { item: MenuItem }) {
  const p = item.price?.trim()
  const single = !!p && SINGLE_PRICE.test(p)
  const num = single ? p!.replace(/^\$\s*/, '') : null
  const options = !single && p ? p.split('·').map((s) => s.trim()) : []

  return (
    <div className="card-brut flex items-start justify-between gap-5 rounded-lg p-5 sm:p-6">
      <div className="min-w-0">
        <h3 className="font-display text-headline-sm uppercase text-ink">{item.name}</h3>
        {item.desc && <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{item.desc}</p>}
        {options.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {options.map((o, i) => (
              <span
                key={i}
                className="rounded-full border-2 border-ink/15 px-3 py-1 font-cond text-[13px] font-semibold uppercase tracking-[0.04em] text-ink"
              >
                {withDollar(o)}
              </span>
            ))}
          </div>
        )}
      </div>
      {single && <span className="shrink-0 font-display text-3xl leading-none text-brick">${num}</span>}
    </div>
  )
}

// A category, heading + note + a grid of the shared item cards.
function MenuBlock({ group }: { group: MenuGroup }) {
  return (
    <div className="reveal">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 className="font-display text-headline-md uppercase text-ink md:text-[34px]">{group.title}</h2>
        <span className="brick-rule block w-[56px]" />
      </div>
      {group.note && <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-ink-faint">{group.note}</p>}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {group.items.map((it) => (
          <ItemCard key={it.name} item={it} />
        ))}
      </div>
    </div>
  )
}

function SpecialtyPies() {
  const [size, setSize] = useState<PizzaSizeKey>('14')
  const active = pizzaSizes.find((s) => s.key === size)!
  const byoPrice = buildYourOwn.prices[size]

  return (
    <section className="paper-texture-soft bg-paper pt-16 pb-20 md:pt-20 md:pb-28">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Hand-tossed, built to order</p>
          <h2 className="mt-3 font-display text-headline-lg text-ink md:text-[44px]">Specialty Pies</h2>
          <span className="brick-rule mx-auto mt-5 block w-[72px]" />
          <p className="mt-5 text-body-md text-ink-soft">
            Pick a size, every pie below updates to match. Most are also available on a 12″ gluten-free
            cauliflower crust.
          </p>
        </div>
      </div>

      {/* Sticky size picker, the standout interaction */}
      <div className="sticky top-[112px] z-30 mt-8 border-y-2 border-ink bg-paper-2/96 py-3 backdrop-blur lg:top-[144px]">
        <div className="container-x">
          <p className="mb-2 text-center font-cond text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-faint">
            Choose your size
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1.5 sm:gap-2">
            {pizzaSizes.map((s) => {
              const on = s.key === size
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSize(s.key)}
                  aria-pressed={on}
                  className={`rounded-md border-2 px-1 py-2 text-center transition-all ${
                    on
                      ? 'border-ink bg-brick text-on-brick shadow-[3px_3px_0_0_var(--color-ink)]'
                      : 'border-ink/15 bg-paper-2 text-ink hover:border-ink hover:bg-paper-3'
                  }`}
                >
                  <span className="block font-display text-[15px] uppercase leading-none sm:text-lg">{s.label}</span>
                  <span className={`mt-1 block text-[9px] font-semibold uppercase tracking-[0.08em] sm:text-[10px] ${on ? 'text-white/85' : 'text-ink-faint'}`}>
                    {s.sub}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container-x">
        {/* Pie cards, each showing the price for the selected size */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {specialtyPizzas.map((p) => {
            const price = p.prices[size]
            return (
              <div
                key={p.name}
                className={`card-brut flex items-start justify-between gap-5 rounded-lg p-5 sm:p-6 ${price ? '' : 'opacity-55'}`}
              >
                <div className="min-w-0">
                  <h3 className="font-display text-headline-sm uppercase text-ink">{p.name}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{p.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  {price ? (
                    <span className="font-display text-3xl leading-none text-brick">${price}</span>
                  ) : (
                    <span className="font-cond text-xs font-semibold uppercase text-ink-faint">No GF</span>
                  )}
                  <span className="mt-1 block font-cond text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    {active.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Build Your Own, featured red callout sharing the selected size */}
        <div className="card-red mt-6 rounded-lg p-7 md:flex md:items-center md:justify-between md:gap-8 md:p-9">
          <div>
            <p className="font-script text-xl text-white/90">Make it yours</p>
            <h3 className="mt-1 font-display text-2xl uppercase md:text-3xl">Build Your Own Pizza</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
              Start with our cheese base, then pile on any toppings you like. {buildYourOwn.note}
            </p>
          </div>
          <div className="mt-5 shrink-0 text-center md:mt-0">
            <span className="font-display text-5xl leading-none">${byoPrice}</span>
            <span className="mt-1 block font-cond text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              {active.label} base
            </span>
          </div>
        </div>

        {/* Toppings list */}
        <div className="card-brut mt-6 rounded-lg p-6">
          <h4 className="flex items-center gap-2 font-cond text-headline-sm uppercase text-ink">
            <Plus size={18} className="text-brick" /> Toppings
          </h4>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{buildYourOwn.toppings}</p>
        </div>

        {/* Interactive order estimator */}
        <PizzaEstimator />

        <p className="mt-6 text-center text-[12px] text-ink-faint">
          Prices shown for reference and may change.{' '}
          <a href={company.order.online} target="_blank" rel="noopener noreferrer" className="text-brick underline underline-offset-2">
            Order online
          </a>{' '}
          for live pricing.
        </p>
      </div>
    </section>
  )
}

// Group the flat category list into the page's textured background bands.
const startersBlocks = startersMenu // Starters, Salads, Wings
const subsBlocks = subsMenu.filter((g) => ['Subs', 'Dinners'].includes(g.title))
const extrasBlocks = subsMenu.filter((g) => ['Specials', 'Dessert', 'Beverages'].includes(g.title))

export default function Menu() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden">
        <img
          src="/images/pepperoni-cup-rack.webp"
          alt="Branch Pizza signature crisped pepperoni-cup pizza"
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <p className="eyebrow">Branch Pizza · Sunbury</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-cream md:text-[60px]">
            The <span className="neon-soft text-brick-light">Menu</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">
            Hand-tossed specialty pies, build-your-own pizzas, wings, subs, salads, pasta and a full bar.
            Order online for pickup or call us, we’re ready when you are.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={company.order.online} variant="brick" external className="glow-cta">
              <ShoppingBag size={16} /> Order Online
            </Button>
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 font-cond text-[15px] font-semibold uppercase tracking-[0.14em] text-cream-dim hover:text-cream"
            >
              <Phone size={15} className="text-brick-light" /> {company.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Pizzas (interactive) */}
      <SpecialtyPies />

      {/* Starters / Salads / Wings */}
      <section className="paper-texture section-lift bg-paper-3 py-20 md:py-28">
        <div className="container-x space-y-16">
          {startersBlocks.map((g) => (
            <div key={g.title} className="space-y-6">
              <MenuBlock group={g} />
              {g.title === 'Salads' && <FlavorCard icon={Salad} title="Dressings" items={saladDressings} />}
              {g.title === 'Wings' && (
                <div className="grid gap-6 md:grid-cols-2">
                  <FlavorCard icon={Flame} title="Wing Sauces" items={wingSauces} />
                  <FlavorCard icon={Drumstick} title="Dry Rubs" items={wingDryRubs} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Subs / Dinners */}
      <section className="paper-texture-soft bg-paper py-20 md:py-28">
        <div className="container-x space-y-16">
          {subsBlocks.map((g) => (
            <MenuBlock key={g.title} group={g} />
          ))}
        </div>
      </section>

      {/* Specials / Dessert / Beverages */}
      <section className="paper-texture section-lift bg-paper-3 py-20 md:py-28">
        <div className="container-x space-y-16">
          {extrasBlocks.map((g) => (
            <MenuBlock key={g.title} group={g} />
          ))}
        </div>
      </section>

      {/* Full bar */}
      <section className="paper-texture-soft bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="reveal mb-10 text-center">
            <p className="eyebrow">21+ · Dine-in</p>
            <h2 className="mt-3 font-display text-headline-lg text-ink md:text-[40px]">From the Bar</h2>
            <span className="brick-rule mx-auto mt-5 block w-[72px]" />
          </div>
          <div className="reveal">
            <h3 className="flex items-center gap-2 font-cond text-headline-sm uppercase text-ink">
              <Beer size={20} className="text-brick" /> Beer
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {barMenu.beer.map((b) => (
                <DrinkTile key={b.name} drink={b} kind="beer" />
              ))}
            </div>
          </div>

          <div className="reveal mt-12">
            <h3 className="flex items-center gap-2 font-cond text-headline-sm uppercase text-ink">
              <Wine size={20} className="text-brick" /> Wine
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {barMenu.wine.map((w) => (
                <DrinkTile key={w.name} drink={w} kind="wine" />
              ))}
            </div>
          </div>
          <p className="mt-8 text-center text-[12px] uppercase tracking-[0.14em] text-ink-faint">
            Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="paper-texture section-lift bg-paper-3 py-16 text-center">
        <div className="container-x">
          <h2 className="font-display text-headline-lg text-ink md:text-[36px]">Hungry yet?</h2>
          <p className="mx-auto mt-3 max-w-md text-body-md text-ink-soft">
            Order online for pickup, or give us a call.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Button href={company.order.online} variant="brick" external className="glow-cta">
              <ShoppingBag size={16} /> Order Online
            </Button>
            <Button href="/contact" variant="outline">
              Hours &amp; Directions
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
