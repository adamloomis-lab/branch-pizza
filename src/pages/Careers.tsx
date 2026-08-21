import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Heart, Award, Users, Phone, Paperclip, Loader2 } from 'lucide-react'
import { company } from '../data/site'
import { FloatField, SuccessCheck } from '../components/FluidField'

// Employment page: evergreen "join the crew" application (no specific openings
// are claimed). Submits to the Netlify form "application" as multipart so the
// optional resume file uploads too.

const pillars = [
  {
    icon: Heart,
    title: 'Family-Run Since 1977',
    body: 'A women-owned pizzeria on the Sunbury square, where the crew is small, the regulars know your name, and nearly 50 years of hometown pride comes out of the oven every day.',
  },
  {
    icon: Award,
    title: 'Work Somewhere Award-Winning',
    body: 'Voted Grubhub’s best in town two years running. You’ll be part of the team behind the pies people drive across Delaware County for.',
  },
  {
    icon: Users,
    title: 'Every Role Matters',
    body: 'Kitchen, front counter, or behind the bar, every shift is part of what makes Branch feel like Branch. Tell us where you fit.',
  },
]

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    availability: '',
    experience: '',
  })
  const [resume, setResume] = useState<File | null>(null)
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
      const body = new FormData()
      body.append('form-name', 'application')
      for (const [k, v] of Object.entries(formData)) body.append(k, v)
      if (resume) body.append('resume', resume)
      const res = await fetch('/', { method: 'POST', body })
      if (!res.ok) throw new Error()
      setFirstName(formData.name.trim().split(/\s+/)[0] || '')
      setSent(true)
      setFormData({ name: '', phone: '', email: '', position: '', availability: '', experience: '' })
      setResume(null)
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
          src="/images/pepperoni-cup-bar.webp"
          alt="Serving a fresh pepperoni-cup pizza at the Branch Pizza bar"
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <h1 className="font-display text-display-lg-mobile text-cream md:text-[56px]">
            Join the <span className="neon">Crew</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">
            We&rsquo;re always happy to hear from good people who love good pizza. Tell us about
            yourself and we&rsquo;ll keep your application on file.
          </p>
        </div>
      </section>

      {/* ---------- WHY BRANCH ---------- */}
      <section className="paper-texture-soft bg-paper py-20 md:py-24">
        <div className="container-x grid gap-7 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="reveal card-brut rounded-lg p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brick text-on-brick">
                <p.icon size={22} />
              </span>
              <h2 className="mt-5 font-display text-headline-sm uppercase text-ink">{p.title}</h2>
              <p className="mt-3 text-body-md text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- APPLICATION ---------- */}
      <section className="paper-texture section-lift bg-paper-3 py-20 md:py-28">
        <div className="container-x max-w-3xl">
          <div ref={formCardRef} className="card-brut scroll-mt-28 rounded-lg p-8 md:p-10">
            <h2 className="font-cond text-headline-md uppercase text-ink">Tell Us About Yourself</h2>

            {sent ? (
              <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-brick/40 bg-brick/5 px-6 py-12 text-center">
                <SuccessCheck />
                <p className="font-cond text-headline-md uppercase text-ink">
                  Thanks{firstName ? `, ${firstName}` : ''}!
                </p>
                <p className="text-body-md text-ink-soft">
                  Your application is on its way to Branch Pizza. If it looks like a fit, we&rsquo;ll
                  reach out. Feel free to stop by the shop and say hello too.
                </p>
              </div>
            ) : (
              <form name="application" method="POST" data-netlify="true" encType="multipart/form-data" netlify-honeypot="bot-field" onSubmit={onSubmit} className="mt-7 space-y-5">
                <input type="hidden" name="form-name" value="application" />
                <p className="hidden">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatField name="name" label="Name" idPrefix="job" value={formData.name} onChange={handleChange} required />
                  <FloatField name="phone" label="Phone" type="tel" idPrefix="job" value={formData.phone} onChange={handleChange} required />
                </div>
                <FloatField name="email" label="Email" type="email" idPrefix="job" value={formData.email} onChange={handleChange} />

                <FloatField
                  name="position"
                  label="What position are you interested in?"
                  idPrefix="job"
                  value={formData.position}
                  onChange={handleChange}
                />
                <FloatField
                  name="availability"
                  label="Availability (days, evenings, weekends...)"
                  idPrefix="job"
                  value={formData.availability}
                  onChange={handleChange}
                />
                <FloatField
                  name="experience"
                  label="Tell us a little about yourself and any experience"
                  idPrefix="job"
                  value={formData.experience}
                  onChange={handleChange}
                  textarea
                  rows={5}
                />

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-ink/25 bg-paper-2 px-4 py-4 text-body-md text-ink-soft transition-colors hover:border-brick">
                  <Paperclip size={18} className="shrink-0 text-brick" />
                  <span className="min-w-0 truncate">
                    {resume ? resume.name : 'Attach a resume (optional, PDF or Word)'}
                  </span>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                  />
                </label>

                {error && (
                  <p className="text-body-md text-error">
                    Oops, something went wrong sending your application. Please try again, or call us
                    at {company.phone}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="glow-cta w-full rounded border-2 border-ink bg-brick px-8 py-4 font-cond text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark disabled:opacity-60"
                >
                  {sending ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </span>
                  ) : (
                    'Send My Application'
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="mt-8 text-center text-body-md text-ink-soft">
            Prefer to talk first? Call us at{' '}
            <a href={company.phoneHref} className="font-semibold text-brick hover:text-brick-dark">
              {company.phone}
            </a>{' '}
            or stop in at {company.addressOneLine}.
            <Phone size={14} className="ml-1.5 inline text-brick" aria-hidden="true" />
          </p>
        </div>
      </section>
    </>
  )
}
