import { useEffect, useState } from 'react'
import { computeStatus, type Status } from '../lib/openStatus'

// Live "Open Now" status pill. Resolves client-side after mount (nothing is
// prerendered, so there's no hydration mismatch and no stale SSR state), then
// re-checks every 30s. Clock logic lives in lib/openStatus.ts.
//
// States: open (green) · closing within 60 min (gold) · closed (red, with the
// next opening time).

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
