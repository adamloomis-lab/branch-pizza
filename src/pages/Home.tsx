import { Star, Phone, ShoppingBag, MapPin, Clock, Award } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import HoursList from '../components/HoursList'
import Reviews from '../components/Reviews'
import { company, featurePillars, gallery, ratingSummary } from '../data/site'

const signature = [
  { src: '/images/pepperoni-cup-rack.webp', label: 'Crisped pepperoni cups' },
  { src: '/images/classic-pepperoni.webp', label: 'Classic pepperoni' },
  { src: '/images/bacon-cheddar-bar.webp', label: "Founder's Favorite" },
  { src: '/images/bbq-chicken-pickle.webp', label: 'BBQ chicken' },
  { src: '/images/white-bacon-pizza.webp', label: 'White bacon pie' },
  { src: '/images/pepperoni-pineapple.webp', label: 'Pepperoni & pineapple' },
]

export default function Home() {
  return (
    <>
      {/* ---- HERO ---------------------------------------------------------- */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/fresh-slice-poster.webp"
          aria-hidden="true"
        >
          <source src="/videos/fresh-slice.mp4" type="video/mp4" />
        </video>
        <div className="smoke-overlay absolute inset-0" aria-hidden="true" />

        <div className="container-x relative z-10 pt-28 pb-24">
          <div className="max-w-2xl">
            <p className="rise eyebrow text-2xl">Sunbury, Ohio · Since 1977</p>
            <h1 className="rise rise-1 mt-3 font-display text-[15vw] leading-[0.92] text-cream sm:text-7xl md:text-[88px]">
              Branch <span className="neon">Pizza</span>
            </h1>
            <p className="rise rise-2 mt-5 max-w-xl font-script text-2xl text-bluetip-light">
              No debate, just delicious.
            </p>
            <p className="rise rise-2 mt-4 max-w-xl text-body-lg text-cream-dim">
              Hand-tossed pies, our famous crisped pepperoni cups, fresh garlic knots, wings and a
              full bar, right on the Sunbury square for nearly 50 years.
            </p>

            <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-4">
              <Button href={company.order.online} variant="brick" external className="glow-cta">
                <ShoppingBag size={16} /> Order Online
              </Button>
              <Button href="/menu" variant="ghost">
                View the Menu
              </Button>
            </div>

            <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream-dim">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={15} className="fill-bluetip text-bluetip" aria-hidden="true" />
                  ))}
                </span>
                <strong className="text-cream">{ratingSummary.value}</strong> · {ratingSummary.count} Google reviews
              </span>
              <a href={company.phoneHref} className="inline-flex items-center gap-2 hover:text-cream">
                <Phone size={15} className="text-brick" /> {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- AWARD / PILLARS ---------------------------------------------- */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="reveal mx-auto mb-14 max-w-3xl text-center">
            <p className="kicker inline-flex items-center justify-center gap-2">
              <Award size={15} className="text-bluetip" /> Grubhub’s best in town, two years running
            </p>
            <h2 className="mt-4 font-display text-headline-lg text-ink md:text-[44px]">
              A Sunbury Tradition Since 1977
            </h2>
            <span className="brick-rule mx-auto mt-5 block w-[72px]" />
          </div>

          <div className="reveal-group grid gap-6 md:grid-cols-3">
            {featurePillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-line bg-card p-7">
                <h3 className="font-cond text-headline-sm uppercase text-brick-light">{p.title}</h3>
                <p className="mt-3 text-body-md text-ink-soft">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- SIGNATURE PIZZAS --------------------------------------------- */}
      <section className="steel-panel brick-texture border-y border-line-dark py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="Off the rack"
            title="Our Signature Pies"
            intro="It starts with dough and sauce made in-house, real cheese you can actually taste, and Old World pepperoni that crisps up into golden little cups. One bite and you’ll get the hype."
          />
          <div className="reveal-group mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {signature.map((s) => (
              <figure key={s.src} className="group relative overflow-hidden rounded-xl border border-line">
                <img
                  src={s.src}
                  alt={s.label}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 font-cond text-sm font-semibold uppercase tracking-[0.12em] text-cream">
                  {s.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="reveal mt-10 text-center">
            <Button href="/menu" variant="outline">
              See the Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* ---- MADE FROM SCRATCH (video band) ------------------------------- */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div className="reveal relative overflow-hidden rounded-2xl border border-line">
            <video
              className="aspect-[4/3] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/making-pizza-poster.webp"
              aria-label="Spreading house-made sauce on fresh dough"
            >
              <source src="/videos/making-pizza.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="reveal">
            <p className="eyebrow">Made by hand</p>
            <h2 className="mt-3 font-display text-headline-lg text-ink md:text-[40px]">
              Built To Order, Never Rushed
            </h2>
            <span className="brick-rule mt-5 block w-[72px]" />
            <p className="mt-6 text-body-lg text-ink-soft">
              Every pie is hand-built the way it’s been done here since 1977, sauce ladled fresh, cheese
              piled on, toppings to the edge. No shortcuts, no debate.
            </p>
            <ul className="check-list mt-6 space-y-2 text-body-md text-ink-soft">
              <li>House-made dough &amp; sauce, every day</li>
              <li>Gluten-free cauliflower crust available</li>
              <li>Wings, subs, salads, pasta &amp; a full bar</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={company.order.online} variant="brick" external className="glow-cta">
                <ShoppingBag size={16} /> Order Online
              </Button>
              <a
                href={company.order.doordash}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-line px-5 py-4 font-cond text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-brick hover:text-ink"
              >
                <img src="/images/doordash.webp" alt="" className="h-4 w-4" /> DoorDash Delivery
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- REVIEWS ------------------------------------------------------- */}
      <Reviews />

      {/* ---- ATMOSPHERE ---------------------------------------------------- */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid items-stretch gap-4 md:grid-cols-2">
          <figure className="reveal relative overflow-hidden rounded-2xl border border-line">
            <img
              src="/images/neon-love-pizza.webp"
              alt={gallery.find((g) => g.src.includes('neon-love'))?.alt}
              loading="lazy"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </figure>
          <div className="reveal flex flex-col justify-center rounded-2xl border border-line bg-card p-9">
            <p className="eyebrow">More than takeout</p>
            <h2 className="mt-3 font-display text-headline-lg text-ink md:text-[40px]">
              Pull Up A Stool
            </h2>
            <span className="brick-rule mt-5 block w-[72px]" />
            <p className="mt-6 text-body-lg text-ink-soft">
              Grab a cold one from the full bar, catch the game, and settle in. Branch Pizza is the kind
              of hometown spot where the neon’s always on and there’s always room for one more.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- VISIT / CTA --------------------------------------------------- */}
      <section className="steel-panel brick-texture border-t border-line-dark py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Come see us</p>
            <h2 className="mt-3 font-display text-headline-lg text-cream md:text-[40px]">
              Find Branch Pizza
            </h2>
            <span className="brick-rule mt-5 block w-[72px]" />
            <ul className="mt-7 space-y-4 text-body-lg text-cream-dim">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 shrink-0 text-brick-light" />
                <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  {company.addressOneLine}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-1 shrink-0 text-brick-light" />
                <a href={company.phoneHref} className="hover:text-cream">
                  {company.phone}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={company.order.online} variant="brick" external className="glow-cta">
                <ShoppingBag size={16} /> Order Online
              </Button>
              <Button href="/contact" variant="ghost">
                Directions &amp; Hours
              </Button>
            </div>
          </div>

          <div className="reveal rounded-2xl border border-line bg-card/60 p-7">
            <h3 className="flex items-center gap-2 font-cond text-headline-sm uppercase text-cream">
              <Clock size={18} className="text-brick-light" /> Hours
            </h3>
            <HoursList tone="dark" className="mt-5" />
          </div>
        </div>
      </section>
    </>
  )
}
