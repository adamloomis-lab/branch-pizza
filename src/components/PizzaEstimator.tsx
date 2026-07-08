import { useMemo, useState } from 'react'
import { Calculator, Plus, Minus, Trash2, ShoppingBag, ChevronDown, Copy, Check } from 'lucide-react'
import {
  company,
  specialtyPizzas,
  buildYourOwn,
  pizzaSizes,
  type PizzaSizeKey,
} from '../data/site'

// "Estimate your order", an interactive calculator built on the same POS-synced
// price data as the menu. Pick a pie + size + quantity, stack up an order, see
// the total, then jump to the real online ordering to place it. Prices mirror
// the register (synced daily), so the math is honest.

type Line = { pie: string; sizeKey: PizzaSizeKey; sizeLabel: string; each: number; qty: number }

const BYO = 'Build Your Own (cheese)'
const PIES = [BYO, ...specialtyPizzas.map((p) => p.name)]

function priceFor(pie: string, size: PizzaSizeKey): number | null {
  const prices = pie === BYO ? buildYourOwn.prices : specialtyPizzas.find((p) => p.name === pie)?.prices
  const v = prices?.[size]
  return v ? Number(v) : null
}

const money = (n: number) => `$${n.toFixed(2)}`

export default function PizzaEstimator() {
  const [pie, setPie] = useState<string>(PIES[1] ?? BYO)
  const [size, setSize] = useState<PizzaSizeKey>('14')
  const [qty, setQty] = useState(1)
  const [lines, setLines] = useState<Line[]>([])
  const [copied, setCopied] = useState(false)

  // Plain-text order summary for the clipboard, handy while ordering online or
  // reading the order over the phone. (Heartland's ordering app has no cart
  // prefill or deep links, so a clean copy-paste list is the best handoff.)
  const copyList = async () => {
    const text = [
      'My Branch Pizza order:',
      ...lines.map((l) => `${l.qty}x ${l.pie} (${l.sizeLabel.replace('″', ' inch')}) ${money(l.each * l.qty)}`),
      `Estimated total: ${money(total)}`,
    ].join('\n')
    let ok = false
    try {
      await navigator.clipboard.writeText(text)
      ok = true
    } catch {
      // Fallback for older browsers / restricted contexts.
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ok = document.execCommand('copy')
        ta.remove()
      } catch {
        /* clipboard unavailable */
      }
    }
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const current = priceFor(pie, size)
  const total = useMemo(() => lines.reduce((s, l) => s + l.each * l.qty, 0), [lines])

  const add = () => {
    if (current == null) return
    const sizeLabel = pizzaSizes.find((s) => s.key === size)?.label ?? size
    setLines((prev) => {
      const i = prev.findIndex((l) => l.pie === pie && l.sizeKey === size)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: Math.min(20, next[i].qty + qty) }
        return next
      }
      return [...prev, { pie, sizeKey: size, sizeLabel, each: current, qty }]
    })
    setQty(1)
  }

  return (
    <div className="card-brut mt-10 overflow-hidden rounded-lg">
      <div className="border-b-2 border-ink bg-brick px-6 py-4 text-on-brick sm:px-7">
        <p className="font-script text-lg text-white/90">What'll it run me?</p>
        <h3 className="flex items-center gap-2 font-display text-2xl uppercase">
          <Calculator size={22} /> Estimate Your Order
        </h3>
      </div>

      <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_360px]">
        {/* Builder */}
        <div>
          <label className="block font-cond text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            Pick your pie
            <span className="relative mt-2 block">
              <select
                value={pie}
                onChange={(e) => setPie(e.target.value)}
                className="w-full appearance-none rounded border-2 border-ink bg-paper-2 px-4 py-3.5 pr-11 font-cond text-base font-semibold uppercase tracking-[0.04em] text-ink focus:outline-none"
              >
                {PIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            </span>
          </label>

          <p className="mt-5 font-cond text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">Size</p>
          <div className="mt-2 grid grid-cols-5 gap-1.5 sm:gap-2">
            {pizzaSizes.map((s) => {
              const available = priceFor(pie, s.key) != null
              const on = s.key === size
              return (
                <button
                  key={s.key}
                  type="button"
                  disabled={!available}
                  onClick={() => setSize(s.key)}
                  aria-pressed={on}
                  className={`rounded-md border-2 px-1 py-2 text-center transition-all ${
                    on
                      ? 'border-ink bg-brick text-on-brick shadow-[3px_3px_0_0_var(--color-ink)]'
                      : available
                        ? 'border-ink/15 bg-paper-2 text-ink hover:border-ink hover:bg-paper-3'
                        : 'cursor-not-allowed border-ink/10 bg-paper-3 text-ink-faint opacity-50'
                  }`}
                >
                  <span className="block font-display text-[15px] uppercase leading-none">{s.label}</span>
                  <span className={`mt-1 block text-[9px] font-semibold uppercase tracking-[0.08em] ${on ? 'text-white/85' : 'text-ink-faint'}`}>
                    {available ? s.sub : 'N/A'}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-cond text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">Quantity</p>
              <div className="mt-2 inline-flex items-center rounded border-2 border-ink">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 text-ink hover:bg-paper-3" aria-label="Fewer">
                  <Minus size={16} />
                </button>
                <span className="min-w-10 text-center font-display text-lg text-ink">{qty}</span>
                <button type="button" onClick={() => setQty(Math.min(20, qty + 1))} className="px-3 py-2.5 text-ink hover:bg-paper-3" aria-label="More">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-cond text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">This pie</span>
              <span className="font-display text-3xl leading-none text-brick">
                {current != null ? money(current * qty) : 'N/A'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={add}
            disabled={current == null}
            className="glow-cta mt-5 w-full rounded border-2 border-ink bg-ink px-6 py-3.5 font-cond text-[13px] font-semibold uppercase tracking-[0.16em] text-paper-2 transition-colors hover:bg-steel-3 disabled:opacity-50"
          >
            <Plus size={15} className="mr-1 inline" /> Add to Estimate
          </button>
        </div>

        {/* Ticket */}
        <div className="flex flex-col rounded-lg border-2 border-ink/15 bg-paper-3 p-5">
          <p className="font-cond text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">Your estimate</p>
          {lines.length === 0 ? (
            <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ink-faint">
              Nothing yet. Build a pie on the left and add it here to see your total.
            </p>
          ) : (
            <ul className="mt-3 flex-1 divide-y divide-ink/10">
              {lines.map((l) => (
                <li key={`${l.pie}-${l.sizeKey}`} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate font-cond text-[14px] font-semibold uppercase text-ink">
                      {l.qty} × {l.pie}
                    </p>
                    <p className="text-[12px] text-ink-faint">{l.sizeLabel} · {money(l.each)} each</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-cond text-sm font-bold tabular-nums text-ink">{money(l.each * l.qty)}</span>
                    <button
                      type="button"
                      onClick={() => setLines(lines.filter((x) => x !== l))}
                      className="text-ink-faint transition-colors hover:text-brick"
                      aria-label={`Remove ${l.pie}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex items-baseline justify-between border-t-2 border-ink pt-3">
            <span className="font-cond text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-soft">Estimated total</span>
            <span className="font-display text-3xl leading-none text-brick">{money(total)}</span>
          </div>
          <a
            href={company.order.online}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-cta mt-4 inline-flex w-full items-center justify-center gap-2 rounded border-2 border-ink bg-brick px-6 py-3.5 font-cond text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
          >
            <ShoppingBag size={15} /> Order For Real
          </a>
          {lines.length > 0 && (
            <button
              type="button"
              onClick={copyList}
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded border-2 border-ink/20 px-6 py-2.5 font-cond text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-brick" /> Copied, read it off while you order
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy List
                </>
              )}
            </button>
          )}
          <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-faint">
            Prices mirror the register and sync daily. Extra toppings, Chicago style and add-ons may change the final total.
          </p>
        </div>
      </div>
    </div>
  )
}
