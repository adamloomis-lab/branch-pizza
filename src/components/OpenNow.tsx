import { useEffect, useState } from 'react'
import { hours, hoursRanges, hoursTimezone } from '../data/site'

// Live "Open Now" status pill. Computes the restaurant's CURRENT local time
// (America/New_York) regardless of where the visitor is, so a night owl in
// Denver still sees Sunbury's real status. Resolves client-side after mount
// (nothing is prerendered, so there's no hydration mismatch and no stale SSR
// state), then re-checks every 30s.
//
// States: open (green) · closing within 60 min (gold) · closed (red, with the
// next opening time).

type Status =
  | { kind: 'open'; closes: string }
  | { kind: 'closing'; closes: string }
  | { kind: 'closed'; opensDay: string | null; opens: string }

function fmt(mins: number): string {
  const h24 = Math.floor(mins / 60)
  const m = mins % 60
  const h = h24 % 12 === 0 ? 12 : h24 % 12
  const ampm = h24 < 12 ? 'AM' : 'PM'
  return m === 0 ? `${h} ${ampm}` : `${h}:${String(m).padStart(2, '0')} ${ampm}`
}

const DOW: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function restaurantNow(): { dow: number; mins: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: hoursTimezone,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return { dow: DOW[get('weekday')] ?? 0, mins: Number(get('hour')) * 60 + Number(get('minute')) }
}

function computeStatus(): Status {
  const { dow, mins } = restaurantNow()
  const today = hoursRanges[dow]
  if (today && mins >= today.open && mins < today.close) {
    const left = today.close - mins
    return left <= 60
      ? { kind: 'closing', closes: fmt(today.close) }
      : { kind: 'open', closes: fmt(today.close) }
  }
  // Closed: find the next opening (later today, or scan forward).
  if (today && mins < today.open) {
    return { kind: 'closed', opensDay: null, opens: fmt(today.open) }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (dow + i) % 7
    const r = hoursRanges[d]
    if (r) {
      const dayName = i === 1 ? 'tomorrow' : hours.find((h) => h.dow === d)?.day ?? ''
      return { kind: 'closed', opensDay: dayName, opens: fmt(r.open) }
    }
  }
  return { kind: 'closed', opensDay: null, opens: '' }
}

export default function OpenNow({
  tone = 'dark',
  className = '',
}: {
  readonly tone?: 'light' | 'dark'
  readonly className?: string
}) {
  const [status, setStatus] = useState<Status | null>(null)

  useEffect(() => {
    setStatus(computeStatus())
    const t = setInterval(() => setStatus(computeStatus()), 30_000)
    return () => clearInterval(t)
  }, [])

  if (!status) return null

  const dark = tone === 'dark'
  const dot =
    status.kind === 'open' ? '#3fbf5a' : status.kind === 'closing' ? '#e0a32f' : '#ef4540'
  const label =
    status.kind === 'open'
      ? `Open Now · Closes ${status.closes}`
      : status.kind === 'closing'
        ? `Closing Soon · ${status.closes}`
        : `Closed · Opens ${status.opensDay ? `${status.opensDay} at ` : ''}${status.opens}`

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2.5 rounded-full border-2 px-4 py-2 font-cond text-[13px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm ${
        dark ? 'border-cream/30 bg-black/40 text-cream' : 'border-ink bg-paper-2 text-ink'
      } ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {status.kind !== 'closed' && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: dot }}
          />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dot }} />
      </span>
      {label}
    </span>
  )
}
