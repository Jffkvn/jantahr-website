import Reveal from '@/components/effects/Reveal'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] pt-28">
      <div className="container-page flex min-h-[70vh] items-center justify-center">
        <div className="py-20 text-center lg:py-28">
          <Reveal>
            <p className="section-label mx-auto justify-center text-teal-primary">404</p>
            <h1 className="mt-5 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-slate-muted">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to="/" variant="primary" size="lg">
                Back to home
              </ButtonLink>
              <ButtonLink to="/contact" variant="outline" size="lg">
                Contact us
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
