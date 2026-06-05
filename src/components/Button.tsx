import { Link } from 'wouter'
import type { ReactNode } from 'react'

type Variant = 'brick' | 'outline' | 'ghost' | 'cream'

const base =
  'inline-flex items-center justify-center gap-2 font-cond font-semibold uppercase tracking-[0.16em] text-[13px] px-8 py-4 rounded transition-all'

const variants: Record<Variant, string> = {
  // Primary CTA, red with a hard ink offset shadow (neo-brutalist)
  brick: 'bg-brick text-on-brick border-2 border-ink glow-cta hover:bg-brick-dark',
  // Outline for light sections: ink border + ink text, fills red on hover
  outline: 'border-2 border-ink text-ink hover:bg-brick hover:text-on-brick',
  // Light outline on dark surfaces (hero / dark bands)
  ghost: 'border border-cream/35 text-cream hover:border-cream/70 hover:bg-cream/8',
  // Solid cream on dark surfaces
  cream: 'bg-cream text-steel hover:bg-cream-dim',
}

interface Props {
  readonly href: string
  readonly variant?: Variant
  readonly children: ReactNode
  readonly className?: string
  readonly external?: boolean
}

export default function Button({ href, variant = 'brick', children, className = '', external }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}
