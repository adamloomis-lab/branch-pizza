import { useState } from 'react'
import { ShoppingBag, Phone, Beer, Wine, Plus } from 'lucide-react'
import Button from '../components/Button'
import {
  company,
  specialtyPizzas,
  buildYourOwn,
  pizzaSizes,
  startersMenu,
  subsMenu,
  barMenu,
  type MenuGroup,
  type PizzaSizeKey,
} from '../data/site'

function Group({ group }: { group: MenuGroup }) {
  return (
    <div className="reveal">
      <h3 className="font-display text-headline-md uppercase text-ink">{group.title}</h3>
      <span className="brick-rule mt-3 block w-[56px]" />
      {group.note && <p className="mt-4 text-[13px] leading-relaxed text-ink-faint">{group.note}</p>}
      <ul className="mt-5 divide-y divide-line">
        {group.items.map((it) => (
          <li key={it.name} className="py-3.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-cond text-[17px] font-semibold uppercase tracking-[0.02em] text-ink">
                {it.name}
              </span>
              {it.price && (
                <span className="shrink-0 text-right font-cond text-sm font-semibold tabular-nums text-brick">
                  {it.price}
                </span>
              )}
            </div>
            {it.desc && <p className="mt-1 max-w-prose text-[14px] leading-relaxed text-ink-soft">{it.desc}</p>}
          </li>
        ))}
      </ul>
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
      <div className="sticky top-[88px] z-30 mt-8 border-y-2 border-ink bg-paper-2/96 py-3 backdrop-blur lg:top-[112px]">
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

export default function Menu() {
  return (
    <>
      {/* Header */}
      <section className="steel-panel brick-texture relative overflow-hidden">
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
        <div className="container-x grid gap-7 lg:grid-cols-3">
          {startersMenu.map((g) => (
            <div key={g.title} className="card-brut rounded-lg p-7">
              <Group group={g} />
            </div>
          ))}
        </div>
      </section>

      {/* Subs / Dinners / Specials / Dessert / Beverages */}
      <section className="paper-texture-soft bg-paper py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          {subsMenu.map((g) => (
            <Group key={g.title} group={g} />
          ))}
        </div>
      </section>

      {/* Full bar */}
      <section className="paper-texture section-lift bg-paper-3 py-20 md:py-28">
        <div className="container-x">
          <div className="reveal mb-10 text-center">
            <p className="eyebrow">21+ · Dine-in</p>
            <h2 className="mt-3 font-display text-headline-lg text-ink md:text-[40px]">From the Bar</h2>
            <span className="brick-rule mx-auto mt-5 block w-[72px]" />
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            <div className="reveal card-brut rounded-lg p-7 md:col-span-2">
              <h3 className="flex items-center gap-2 font-cond text-headline-sm uppercase text-brick">
                <Beer size={18} /> Beer
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {barMenu.beer.map((b) => (
                  <li key={b} className="rounded-full border border-ink/15 px-3 py-1.5 text-[13px] text-ink-soft">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal card-brut rounded-lg p-7">
              <h3 className="flex items-center gap-2 font-cond text-headline-sm uppercase text-brick">
                <Wine size={18} /> Wine
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {barMenu.wine.map((w) => (
                  <li key={w} className="rounded-full border border-ink/15 px-3 py-1.5 text-[13px] text-ink-soft">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-[12px] uppercase tracking-[0.14em] text-ink-faint">
            Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="paper-texture-soft bg-paper py-16 text-center">
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
