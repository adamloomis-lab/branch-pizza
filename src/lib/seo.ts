import {
  company,
  openingHours,
  reviews,
  ratingSummary,
  specialtyPies,
  startersMenu,
  subsMenu,
  type MenuGroup,
} from '../data/site'

// Production target domain. Canonicals, sitemap, OG and schema all point here so
// SEO value lands on the live host the moment DNS flips from the old site.
export const SITE_URL = 'https://www.branchpizza.com'

const OG_IMAGE = '/images/pepperoni-cup-top.webp'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Netlify serves pages with a trailing slash; keep canonical/sitemap URLs aligned.
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function openingHoursSpec() {
  return openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }))
}

function aggregateRating() {
  return {
    '@type': 'AggregateRating',
    ratingValue: ratingSummary.value,
    reviewCount: String(ratingSummary.count),
    bestRating: '5',
    worstRating: '1',
  }
}

function reviewNodes() {
  return reviews.map((r) => ({
    '@type': 'Review',
    reviewBody: r.quote,
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
  }))
}

export function restaurantSchema() {
  const a = company.address
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'Pizzeria'],
    '@id': `${SITE_URL}/#restaurant`,
    name: company.name,
    url: SITE_URL,
    image: abs(OG_IMAGE),
    logo: abs('/images/logo-dark.webp'),
    telephone: company.phone,
    priceRange: '$$',
    servesCuisine: ['Pizza', 'Italian', 'American', 'Wings', 'Subs'],
    description: company.shortBlurb,
    slogan: company.tagline,
    foundingDate: company.established,
    hasMenu: pageUrl('/menu'),
    acceptsReservations: 'False',
    menu: pageUrl('/menu'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Sunbury, OH' },
      { '@type': 'AdministrativeArea', name: 'Delaware County, OH' },
    ],
    openingHoursSpecification: openingHoursSpec(),
    aggregateRating: aggregateRating(),
    review: reviewNodes(),
    potentialAction: {
      '@type': 'OrderAction',
      target: company.order.online,
      deliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModePickUp', 'http://purl.org/goodrelations/v1#DeliveryModeOwnFleet'],
    },
    sameAs: [company.social.facebook, company.social.yelp],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { '@id': `${SITE_URL}/#restaurant` },
  }
}

// Extract a numeric price (first number) for schema Offers; undefined if none.
function parsePrice(price?: string): string | undefined {
  if (!price) return undefined
  const m = price.match(/(\d+(?:\.\d+)?)/)
  return m ? m[1] : undefined
}

function menuSectionSchema(group: MenuGroup) {
  return {
    '@type': 'MenuSection',
    name: group.title,
    ...(group.note ? { description: group.note } : {}),
    hasMenuItem: group.items.map((it) => {
      const price = parsePrice(it.price)
      return {
        '@type': 'MenuItem',
        name: it.name,
        ...(it.desc ? { description: it.desc } : {}),
        ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'USD' } } : {}),
      }
    }),
  }
}

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu/#menu`,
    name: 'Branch Pizza Menu',
    url: pageUrl('/menu'),
    inLanguage: 'en-US',
    provider: { '@id': `${SITE_URL}/#restaurant` },
    hasMenuSection: [...specialtyPies, ...startersMenu, ...subsMenu].map(menuSectionSchema),
  }
}

const FAQS = [
  {
    q: 'What are Branch Pizza’s hours?',
    a: 'We’re open Monday 4–9pm, Tuesday through Thursday 11am–9pm, Friday 11am–10pm, Saturday 4–10pm, and Sunday 4–9pm.',
  },
  {
    q: 'Where is Branch Pizza located?',
    a: 'We’re right on the square in downtown Sunbury at 34 S Vernon St, Sunbury, OH 43074.',
  },
  {
    q: 'Can I order Branch Pizza online?',
    a: 'Yes. Order directly through our online menu for pickup, or call us at (740) 965-3383.',
  },
  {
    q: 'What is Branch Pizza known for?',
    a: 'We’ve been Sunbury’s pizzeria since 1977 and were voted Grubhub’s best in town two years running. We’re famous for our signature crisped pepperoni-cup pies, made-from-scratch dough and sauce, and our garlic knots.',
  },
  {
    q: 'Does Branch Pizza have gluten-free crust?',
    a: 'Yes, most of our pizzas are available on a 12″ cauliflower crust, and you can build your own gluten-free pie.',
  },
]

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export const faqs = FAQS

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)

  switch (path) {
    case '/':
      return {
        title: 'Branch Pizza | Sunbury, OH | No Debate, Just Delicious',
        description: `${company.shortBlurb} Order online or call ${company.phone}.`,
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [restaurantSchema(), websiteSchema(), faqSchema()],
      }
    case '/menu':
      return {
        title: 'Menu | Branch Pizza, Sunbury OH, Pizza, Wings, Subs & More',
        description:
          'See the full Branch Pizza menu, specialty pies, build-your-own pizzas, wings, subs, salads, dinners and a full bar. Order online for pickup or call us in Sunbury, OH.',
        canonical: pageUrl('/menu'),
        ogImage: abs('/images/pepperoni-cup-rack.webp'),
        jsonLd: [
          restaurantSchema(),
          menuSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
          ]),
        ],
      }
    case '/about':
      return {
        title: 'Our Story | Branch Pizza, Sunbury’s Pizzeria Since 1977',
        description:
          'Branch Pizza has been hand-crafting pizza on the Sunbury square since 1977. Award-winning, women-owned, and famous for our crisped pepperoni-cup pies. Here’s our story.',
        canonical: pageUrl('/about'),
        ogImage: abs('/images/storefront-neon-night.webp'),
        jsonLd: [
          restaurantSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: pageUrl('/about'),
            about: { '@id': `${SITE_URL}/#restaurant` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Our Story', path: '/about' },
          ]),
        ],
      }
    case '/contact':
      return {
        title: 'Contact & Hours | Branch Pizza, Sunbury OH',
        description: `Visit Branch Pizza at ${company.addressOneLine}. Hours, directions, online ordering and contact details. Call ${company.phone}.`,
        canonical: pageUrl('/contact'),
        ogImage: abs('/images/storefront-neon-night.webp'),
        jsonLd: [
          restaurantSchema(),
          faqSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: pageUrl('/contact'),
            about: { '@id': `${SITE_URL}/#restaurant` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ],
      }
    case '/privacy':
      return {
        title: 'Privacy Policy | Branch Pizza',
        description:
          'How Branch Pizza collects, uses, and protects information submitted through this website.',
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])],
      }
    case '/terms':
      return {
        title: 'Terms of Service | Branch Pizza',
        description: 'The terms that govern your use of the Branch Pizza website.',
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }])],
      }
    case '/accessibility':
      return {
        title: 'Accessibility Statement | Branch Pizza',
        description:
          'Our commitment to making the Branch Pizza website accessible to everyone, and how to reach us about accessibility.',
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Accessibility', path: '/accessibility' }])],
      }
    default:
      return {
        title: 'Page Not Found | Branch Pizza',
        description:
          "Sorry, we couldn't find that page. Branch Pizza is Sunbury's award-winning pizzeria since 1977.",
        canonical: pageUrl(path),
        ogImage,
        jsonLd: [restaurantSchema()],
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/',
  '/menu',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
]
