import { useEffect, useState } from 'react'
import { Link } from 'wouter'

// Dismissible cookie-consent notice. Remembers choice in localStorage so it
// shows once. Sits above the mobile order bar.
const KEY = 'cookie-consent'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => {
      try {
        if (!localStorage.getItem(KEY)) setShow(true)
      } catch {
        /* private mode, just don't show */
      }
    }, 700)
    return () => clearTimeout(delay)
  }, [])

  if (!show) return null

  const respond = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-14 z-50 lg:bottom-0"
    >
      <div className="container-x py-3">
        <div className="card-brut flex flex-col items-center gap-3 rounded-xl p-4 sm:flex-row sm:gap-4">
          <p className="text-center text-sm text-ink-soft sm:text-left">
            This site uses cookies to keep things running smoothly. We never sell your data.{' '}
            <Link href="/privacy" className="text-brick underline underline-offset-2 hover:text-brick-dark">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => respond('accepted')}
              className="rounded bg-brick px-5 py-2.5 font-cond text-[12px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
            >
              Got It
            </button>
            <button
              type="button"
              onClick={() => respond('declined')}
              className="rounded border border-brick px-5 py-2.5 font-cond text-[12px] font-semibold uppercase tracking-[0.16em] text-brick transition-colors hover:bg-brick/10"
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
