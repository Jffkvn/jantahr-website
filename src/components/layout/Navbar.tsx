import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          'border-b border-white/[0.08] bg-[#08202C]/95 backdrop-blur-xl',
          scrolled ? 'shadow-[0_12px_32px_rgba(0,0,0,0.35)]' : 'shadow-sm',
        )}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between lg:h-20">
          <div className="relative z-10 flex items-center">
            <Logo variant="light" heightClass="h-9 sm:h-10" />
          </div>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                    active
                      ? 'text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-cyan-accent" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/contact" className="btn btn-primary btn-md group">
              Talk to Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 -mr-1.5 rounded-xl p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 transition-all duration-300 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          className={cn(
            'absolute inset-x-4 top-[5rem] overflow-hidden rounded-3xl border border-white/10 bg-[#08202C]/98 p-4 shadow-[0_24px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 sm:inset-x-6',
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
          )}
        >
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className={cn(
                'rounded-2xl px-4 py-3 text-[0.95rem] font-medium transition-colors',
                isActive('/')
                  ? 'bg-cyan-accent/15 text-cyan-accent'
                  : 'text-white/80 hover:bg-white/10 hover:text-white',
              )}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'rounded-2xl px-4 py-3 text-[0.95rem] font-medium transition-colors',
                  isActive(link.path)
                    ? 'bg-cyan-accent/15 text-cyan-accent'
                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-white/10 pt-3">
              <Link to="/contact" className="btn btn-primary btn-lg w-full">
                Talk to Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

