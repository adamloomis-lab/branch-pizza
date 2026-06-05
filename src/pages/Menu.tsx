import { ShoppingBag, Phone, Beer, Wine } from 'lucide-react'
import Button from '../components/Button'
import {
  company,
  specialtyPies,
  startersMenu,
  subsMenu,
  barMenu,
  type MenuGroup,
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
                <span className="shrink-0 text-right font-cond text-sm font-semibold tabular-nums text-brick-light">
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
            Order online for pickup, get it delivered, or call us, we’re ready when you are.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={company.order.online} variant="brick" external className="glow-cta">
              <ShoppingBag size={16} /> Order Online
            </Button>
            <a
              href={company.order.doordash}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-cream/25 px-5 py-4 font-cond text-[13px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-brick hover:bg-cream/5"
            >
              <img src="/images/doordash.webp" alt="" className="h-4 w-4" /> DoorDash
            </a>
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 font-cond text-[13px] font-semibold uppercase tracking-[0.14em] text-cream-dim hover:text-cream"
            >
              <Phone size={15} className="text-brick-light" /> {company.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Pizzas */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="mb-12 grid gap-10 lg:grid-cols-2">
            {specialtyPies.map((g) => (
              <Group key={g.title} group={g} />
            ))}
          </div>
          <p className="rounded-lg border border-line bg-card px-5 py-4 text-[13px] text-ink-faint">
            Pizza sizes &amp; prices are shown for reference and may change. For current pricing and to
            customize your order, use the{' '}
            <a href={company.order.online} target="_blank" rel="noopener noreferrer" className="text-brick-light underline underline-offset-2">
              live online menu
            </a>
            .
          </p>
        </div>
      </section>

      {/* Starters / Salads / Wings */}
      <section className="bg-paper-3 py-20 md:py-28">
        <div className="container-x grid gap-7 lg:grid-cols-3">
          {startersMenu.map((g) => (
            <div key={g.title} className="card-brut rounded-lg p-7">
              <Group group={g} />
            </div>
          ))}
        </div>
      </section>

      {/* Subs / Dinners / Specials / Dessert / Beverages */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          {subsMenu.map((g) => (
            <Group key={g.title} group={g} />
          ))}
        </div>
      </section>

      {/* Full bar */}
      <section className="bg-paper py-20 md:py-28">
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
      <section className="bg-paper py-16 text-center">
        <div className="container-x">
          <h2 className="font-display text-headline-lg text-ink md:text-[36px]">Hungry yet?</h2>
          <p className="mx-auto mt-3 max-w-md text-body-md text-ink-soft">
            Order online for pickup or delivery, or give us a call.
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
