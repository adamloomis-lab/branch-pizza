import { useEffect, useState } from 'react'
import { Link } from 'wouter'

// Dismissible cookie-consent notice. Remembers dismissal in localStorage so it
// shows once. Sits above the mobile order bar.
const KEY = 'bp-cookie-ok'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* private mode, just don't show */
    }
  }, [])

  if (!show) return null

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-14 z-50 lg:bottom-0">
      <div className="container-x py-3">
        <div className="card-brut flex flex-col items-center gap-3 rounded-xl p-4 sm:flex-row sm:gap-4">
          <p className="text-center text-sm text-ink-soft sm:text-left">
            We use cookies to improve your experience on our site. By using branchpizza.com you accept our{' '}
            <Link href="/privacy" className="text-brick underline underline-offset-2 hover:text-brick-dark">
              Privacy Policy
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded bg-brick px-5 py-2.5 font-cond text-[12px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
