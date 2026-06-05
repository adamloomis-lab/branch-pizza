import { Award, Heart, MapPin } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import { company, storyTimeline } from '../data/site'

export default function About() {
  return (
    <>
      {/* Header with storefront image (dark banner) */}
      <section className="relative overflow-hidden">
        <img
          src="/images/storefront-neon-night.webp"
          alt="Branch Pizza storefront glowing at dusk on the Sunbury square"
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
        <div className="container-x relative z-10 pt-40 pb-20 text-center">
          <p className="eyebrow text-2xl">Since 1977</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-cream md:text-[60px]">
            Our <span className="neon">Story</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">
            Nearly 50 years of hand-tossed pizza on the same Sunbury square, award-winning, women-owned,
            and as hometown as it gets.
          </p>
        </div>
      </section>

      {/* Intro badges */}
      <section className="paper-texture-soft bg-paper py-20 md:py-24">
        <div className="container-x grid gap-7 md:grid-cols-3">
          {[
            { icon: MapPin, title: 'On the Square', body: 'Serving downtown Sunbury from 34 S Vernon St since 1977.' },
            { icon: Award, title: 'Award-Winning', body: 'Voted Grubhub’s best pizza in town two years running.' },
            { icon: Heart, title: 'Women-Owned', body: 'Locally and proudly women-owned, with a full bar to match.' },
          ].map((b) => (
            <div key={b.title} className="reveal card-brut rounded-lg p-7 text-center">
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-md bg-brick text-on-brick">
                <b.icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-headline-sm uppercase text-ink">{b.title}</h3>
              <p className="mt-2 text-body-md text-ink-soft">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="paper-texture section-lift bg-paper-3 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How we got here" title="A Slice of History" />
          <div className="mt-14 space-y-10">
            {storyTimeline.map((s) => (
              <div key={s.title} className="reveal grid gap-4 border-l-4 border-brick pl-6 md:grid-cols-[160px_1fr] md:gap-8 md:border-l-0 md:pl-0">
                <div className="font-display text-3xl uppercase text-brick md:text-right">{s.year}</div>
                <div className="md:border-l-2 md:border-ink/15 md:pl-8">
                  <h3 className="font-cond text-headline-sm uppercase text-ink">{s.title}</h3>
                  <p className="mt-2 max-w-2xl text-body-md text-ink-soft">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From scratch video band (the long ambient clip) */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">The Branch difference</p>
            <h2 className="mt-3 font-display text-headline-lg text-ink md:text-[40px]">
              Real Ingredients, Real Pride
            </h2>
            <span className="brick-rule mt-5 block w-[72px]" />
            <p className="mt-6 text-body-lg text-ink-soft">
              Our regulars will tell you, you can taste the difference. The sauce is made in-house, the
              cheese is real, and that Old World pepperoni crisps up into little cups of flavor you won’t
              forget. It’s the same recipe that’s kept Sunbury coming back since 1977.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/menu" variant="brick">
                See the Menu
              </Button>
              <Button href="/contact" variant="outline">
                Visit Us
              </Button>
            </div>
          </div>
          <div className="reveal card-brut overflow-hidden rounded-lg p-0">
            <video
              className="aspect-video w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero-poster.webp"
              aria-label="Ladling fresh house-made sauce onto pizza dough"
            >
              <source src="/videos/hero-loop.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Atmosphere strip */}
      <section className="bg-paper pb-20 md:pb-28">
        <div className="container-x grid grid-cols-2 gap-5 md:grid-cols-3">
          {[
            { src: '/images/pepperoni-cup-bar.webp', alt: 'Pepperoni-cup pizza held up at the Branch Pizza bar' },
            { src: '/images/bacon-cheddar-box.webp', alt: 'Bacon-cheddar pizza in the box with a side of ranch' },
            { src: '/images/neon-love-pizza.webp', alt: '"All you need is love & pizza" neon sign' },
          ].map((g) => (
            <figure key={g.src} className="reveal overflow-hidden rounded-lg border-2 border-ink">
              <img src={g.src} alt={g.alt} loading="lazy" className="aspect-square w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="paper-texture section-lift bg-paper-3 py-16 text-center">
        <div className="container-x">
          <h2 className="font-display text-headline-lg text-ink md:text-[40px]">Come Grab A Slice</h2>
          <p className="mx-auto mt-3 max-w-md text-body-md text-ink-soft">
            {company.addressOneLine} · {company.phone}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Button href={company.order.online} variant="brick" external>
              Order Online
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
