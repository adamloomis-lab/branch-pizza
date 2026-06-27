import type { ChangeEvent } from 'react'

// Shared "fluid" form controls for Branch Pizza, tuned for the warm paper form
// surface: floating-label fields (brick-red center-out underline + focus glow)
// and the animated drawn-checkmark for the personalized thank-you state.

interface FloatFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  idPrefix?: string
}

export function FloatField({
  name,
  label,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
  rows = 5,
  idPrefix = 'f',
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-body-md text-ink placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-body text-body-md text-ink-faint transition-all duration-200 ' +
    'peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-brick ' +
    'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:text-ink-soft'
  return (
    <div className="group relative rounded border-2 border-line bg-paper-3 transition-all duration-300 focus-within:border-brick focus-within:bg-paper-2 focus-within:shadow-[0_10px_30px_-14px_rgba(224,32,30,0.5)]">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={`${input} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={input}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-brick">*</span>}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-1.5rem)] -translate-x-1/2 scale-x-0 bg-brick transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  )
}

// Animated drawn checkmark for the personalized thank-you state.
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
      <circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="var(--color-brick)"
        strokeWidth="3"
        strokeDasharray="151"
        strokeDashoffset="151"
        style={{ animation: 'draw-check 0.6s ease forwards' }}
      />
      <path
        d="M15 27 l7 7 l15 -16"
        fill="none"
        stroke="var(--color-brick)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{ animation: 'draw-check 0.4s 0.5s ease forwards' }}
      />
    </svg>
  )
}
