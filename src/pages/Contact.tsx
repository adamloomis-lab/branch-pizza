import { useState, useRef } from 'react'
import type { ChangeEvent, FormEvent, ComponentType } from 'react'
import {
  MapPin, Phone, Clock, Facebook, ShoppingBag, Plus,
  HelpCircle, Users, PartyPopper, MessageCircle, Loader2,
} from 'lucide-react'
import { company } from '../data/site'
import { faqs } from '../lib/seo'
import HoursList from '../components/HoursList'
import OpenNow from '../components/OpenNow'
import { FloatField, SuccessCheck } from '../components/FluidField'

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

// Single-select icon cards for "What can we help with?". The submitted `value`
// is identical to the old <select> options so the Netlify form data is unchanged.
const SUBJECT_OPTIONS: { value: string; label: string; icon: ComponentType<{ size?: number; className?: string }> }[] = [
  { value: 'General Question', label: 'General question', icon: HelpCircle },
  { value: 'Large / Group Order', label: 'Large / group order', icon: Users },
  { value: 'Private Event', label: 'Private event', icon: PartyPopper },
  { value: 'Feedback', label: 'Feedback', icon: MessageCircle },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)
  const [firstName, setFirstName] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    setSending(true)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      })
      if (!res.ok) throw new Error()
      setFirstName(formData.name.trim().split(/\s+/)[0] || '')
      setSent(true)
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-brick" />
                  <h3 className="font-cond text-headline-sm uppercase text-ink">Hours</h3>
                </div>
                <OpenNow tone="light" />
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
                  <span
                    className="flex h-20 w-20 items-center justify-center"
                    style={{ animation: 'pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}
                  >
                    <SuccessCheck />
                  </span>
                  <p className="font-cond text-headline-md uppercase text-ink">
                    Thank You{firstName ? `, ${firstName}` : ''}!
                  </p>
                  <p className="max-w-md text-body-md text-ink-soft">
                    Your message is on its way to Branch Pizza. We&rsquo;ll get back to you as soon as we
                    can. For a faster reply, give us a call.
                  </p>
                  <a
                    href={company.phoneHref}
                    className="group relative mt-1 inline-flex items-center gap-2 overflow-hidden rounded border-2 border-ink bg-brick px-7 py-3.5 font-cond text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]"
                    />
                    <Phone size={16} /> {company.phone}
                  </a>
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
                  {/* Mirror the icon-card selection for Netlify form-field detection. */}
                  <input type="hidden" name="subject" value={formData.subject} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FloatField name="name" label="Name" idPrefix="contact" value={formData.name} onChange={handleChange} required />
                    <FloatField name="phone" label="Phone" type="tel" idPrefix="contact" value={formData.phone} onChange={handleChange} />
                  </div>
                  <FloatField name="email" label="Email" type="email" idPrefix="contact" value={formData.email} onChange={handleChange} required />

                  {/* What can we help with? — single-select icon cards. */}
                  <fieldset className="pt-1">
                    <legend className="mb-2.5 block font-cond text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                      What can we help with? <span className="text-brick">*</span>
                    </legend>
                    <div className="grid grid-cols-2 gap-2.5">
                      {SUBJECT_OPTIONS.map((o) => {
                        const active = formData.subject === o.value
                        const Icon = o.icon
                        return (
                          <button
                            key={o.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, subject: active ? '' : o.value }))
                            }
                            className={`flex flex-col items-start gap-2 rounded border-2 px-3.5 py-3.5 text-left font-body transition-all duration-200 active:scale-[0.98] ${
                              active
                                ? 'border-ink bg-brick text-on-brick shadow-[4px_4px_0_0_var(--color-ink)]'
                                : 'border-line bg-paper-3 text-ink hover:border-brick hover:bg-paper-2'
                            }`}
                          >
                            <Icon size={22} className={active ? 'text-on-brick' : 'text-brick'} />
                            <span className="text-body-md font-medium leading-tight">{o.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <FloatField name="message" label="How can we help?" idPrefix="contact" value={formData.message} onChange={handleChange} required textarea rows={5} />
                  {error && (
                    <p className="text-body-md text-error">
                      Oops, there was an error sending your message. Please try again later, or call{' '}
                      {company.phone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending || !formData.subject}
                    className="glow-cta group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded border-2 border-ink bg-brick px-8 py-4 font-cond text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]"
                    />
                    {sending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending
                      </>
                    ) : (
                      'Send Message'
                    )}
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
