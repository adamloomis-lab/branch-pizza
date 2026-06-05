import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 pt-20 text-center">
      <img
        src="/images/pepperoni-cup-top.webp"
        alt="Branch Pizza pepperoni pizza"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="smoke-overlay absolute inset-0" aria-hidden="true" />
      <div className="relative z-10">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-display-lg-mobile text-cream md:text-display-lg">
          This slice is gone
        </h1>
        <p className="mx-auto mt-5 max-w-md text-body-lg text-cream-dim">
          We couldn&rsquo;t find the page you were looking for. Let&rsquo;s get you back to the good stuff.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/">Back Home</Button>
          <Button href="/menu" variant="ghost">
            See the Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
