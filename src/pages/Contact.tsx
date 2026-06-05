import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, Clock, Facebook, Check, ShoppingBag, ChevronDown, Plus } from 'lucide-react'
import { company } from '../data/site'
import { faqs } from '../lib/seo'
import HoursList from '../components/HoursList'

// Interactive FAQ accordion, each question is a brutalist card that expands.
function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="card-brut overflow-hidden rounded-lg">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-paper-3 sm:p-6"
            >
              <span className="font-display text-headline-sm uppercase text-ink">{f.q}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brick text-on-brick transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                <Plus size={20} />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="border-t-2 border-line px-5 py-5 text-body-md text-ink-soft sm:px-6">{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...data }),
      })
      if (!res.ok) throw new Error()
      setFirstName((data.name || '').trim().split(/\s+/)[0] || '')
      setSent(true)
      form.reset()
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  const field =
    'w-full rounded border-2 border-line bg-paper-3 px-4 py-3.5 text-body-md text-ink placeholder:text-ink-faint focus:border-brick focus:outline-none'

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative overflow-hidden">
        <img
          src="/images/neon-love-pizza.webp"
          alt="&quot;All you need is love &amp; pizza&quot; neon sign inside Branch Pizza"
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <p className="eyebrow">On the Sunbury square</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-cream md:text-[56px]">
            Visit &amp; Contact
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">
            Find us right downtown. Order online for pickup, call ahead, or send a note and we&rsquo;ll
            get right back to you.
          </p>
        </div>
      </section>

      {/* ---------- DETAILS + FORM ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          {/* Details */}
          <div className="reveal">
            <p className="eyebrow">Our Location</p>
            <h2 className="mt-3 font-display text-headline-lg text-ink">{company.address.street}</h2>
            <span className="brick-rule mt-5 block w-[72px]" />

            <ul className="mt-8 space-y-5 text-body-md">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-brick" />
                <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-brick">
                  {company.addressOneLine}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={20} className="mt-0.5 shrink-0 text-brick" />
                <a href={company.phoneHref} className="text-ink-soft hover:text-brick">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <ShoppingBag size={20} className="mt-0.5 shrink-0 text-brick" />
                <a href={company.order.online} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-brick">
                  Order online for pickup
                </a>
              </li>
            </ul>

            {/* Red "Call Us" callout, matching the Stitch design */}
            <a href={company.phoneHref} className="card-red mt-8 block rounded-lg p-6">
              <span className="flex items-center gap-3">
                <Phone size={22} className="shrink-0" />
                <span>
                  <span className="font-display text-2xl uppercase">{company.phone}</span>
                  <span className="mt-0.5 block text-sm text-white/85">Phone orders always welcome.</span>
                </span>
              </span>
            </a>

            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded border-2 border-ink text-ink transition-colors hover:bg-brick hover:border-brick hover:text-on-brick"
              aria-label="Branch Pizza on Facebook"
            >
              <Facebook size={18} />
            </a>

            <div className="card-brut mt-10 rounded-lg p-7">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-brick" />
                <h3 className="font-cond text-headline-sm uppercase text-ink">Hours</h3>
              </div>
              <HoursList className="mt-4 -mx-2" />
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            <div ref={formCardRef} className="card-brut scroll-mt-28 rounded-lg p-8 md:p-10">
              <p className="eyebrow">Send a Message</p>
              <h2 className="mt-3 font-cond text-headline-md uppercase text-ink">Get in Touch</h2>

              {sent ? (
                <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-brick/40 bg-brick/5 px-6 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick text-on-brick">
                    <Check size={28} />
                  </span>
                  <p className="font-cond text-headline-md uppercase text-ink">
                    Thanks{firstName ? `, ${firstName}` : ''}!
                  </p>
                  <p className="text-body-md text-ink-soft">
                    Your message is on its way to Branch Pizza. We&rsquo;ll get back to you as soon as we
                    can. For a faster reply, give us a call at {company.phone}.
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  className="mt-7 space-y-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input className={field} type="text" name="name" placeholder="Name" required />
                    <input className={field} type="tel" name="phone" placeholder="Phone" />
                  </div>
                  <input className={field} type="email" name="email" placeholder="Email" required />
                  <div className="relative">
                    <select name="subject" defaultValue="" required className={`${field} appearance-none pr-11`}>
                      <option value="" disabled>
                        What can we help with?
                      </option>
                      <option>General Question</option>
                      <option>Large / Group Order</option>
                      <option>Private Event</option>
                      <option>Feedback</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint"
                    />
                  </div>
                  <textarea className={field} name="message" rows={5} placeholder="How can we help?" required />
                  {error && (
                    <p className="text-body-md text-error">
                      Oops, there was an error sending your message. Please try again later, or call{' '}
                      {company.phone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="glow-cta w-full rounded border-2 border-ink bg-brick px-8 py-4 font-cond text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="paper-texture section-lift bg-paper-3 py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="reveal text-center">
            <p className="eyebrow">Questions?</p>
            <h2 className="mt-3 font-display text-headline-lg text-ink">Good to Know</h2>
            <span className="brick-rule mx-auto mt-5 block w-[72px]" />
          </div>
          <div className="reveal mt-10">
            <FaqAccordion />
          </div>
          <p className="reveal mt-8 text-center text-body-md text-ink-soft">
            Still have a question? Give us a call at{' '}
            <a href={company.phoneHref} className="font-semibold text-brick hover:text-brick-dark">
              {company.phone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="border-t border-line">
        <iframe
          title="Branch Pizza location, 34 S Vernon St, Sunbury, OH"
          src={company.mapsEmbed}
          className="h-[460px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="bg-steel py-3 text-center text-label-sm uppercase tracking-[0.16em] text-cream-faint">
          Serving Sunbury &amp; Delaware County, Ohio
        </p>
      </section>
    </>
  )
}
