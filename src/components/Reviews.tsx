import { useEffect, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import { reviews as staticReviews, ratingSummary, company } from '../data/site'

// "What people are saying", real Google reviews.
//
// The static reviews from site.ts are server-rendered into the HTML (good for
// SEO and a guaranteed render), then on mount we hit /api/reviews (Places API)
// and swap in the freshest live reviews when available. If the function is
// missing or unconfigured, the baked reviews simply stay, no empty shell.
interface LiveReview {
  author: string
  photo: string
  profileUrl: string
  rating: number | null
  text: string
  when: string
}
interface ReviewsResponse {
  configured?: boolean
  found?: boolean
  rating?: number | null
  total?: number | null
  mapsUri?: string
  reviews?: LiveReview[]
}

function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(n) ? 'fill-bluetip text-bluetip' : 'text-line'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

type Card = { author: string; rating: number | null; text: string; when?: string }

const initialCards: Card[] = staticReviews.map((r) => ({ author: r.name, rating: r.rating, text: r.quote }))

export default function Reviews() {
  const [cards, setCards] = useState<Card[]>(initialCards)
  const [rating, setRating] = useState<number>(Number(ratingSummary.value))
  const [total, setTotal] = useState<number>(ratingSummary.count)
  const [mapsUri, setMapsUri] = useState<string>(company.mapsReviews)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/reviews?id=${encodeURIComponent(company.placeId)}`)
      .then((r) => r.json())
      .then((d: ReviewsResponse) => {
        if (cancelled || !d || d.configured === false || !d.found) return
        if (d.reviews && d.reviews.length) {
          setCards(d.reviews.map((r) => ({ author: r.author, rating: r.rating, text: r.text, when: r.when })))
        }
        if (typeof d.rating === 'number') setRating(d.rating)
        if (typeof d.total === 'number') setTotal(d.total)
        if (d.mapsUri) setMapsUri(d.mapsUri)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="bg-paper-3 py-20 md:py-28">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Don’t take our word for it</p>
          <h2 className="mt-3 font-display text-headline-lg text-ink md:text-[44px]">
            What People Are Saying
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="font-display text-3xl text-ink">{rating.toFixed(1)}</span>
            <Stars n={rating} size={18} />
            <span className="text-ink-soft">{total.toLocaleString()} Google reviews</span>
          </div>
        </div>

        <div className="reveal-group mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.slice(0, 6).map((r, i) => (
            <figure key={i} className="card-brut flex flex-col rounded-lg p-6">
              <div className="mb-3 flex items-center justify-between">
                {r.rating != null && <Stars n={r.rating} />}
                {r.when && <span className="text-xs text-ink-faint">{r.when}</span>}
              </div>
              <blockquote className="flex-1 text-body-md leading-relaxed text-ink-soft">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 font-cond text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                {r.author}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-cond text-sm font-semibold uppercase tracking-[0.14em] text-brick hover:text-brick-dark"
          >
            Read all reviews on Google <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
