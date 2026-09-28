import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/layout/ScrollToTop'
import SeoManager from '@/components/SeoManager'
import Home from '@/pages/Home'

const Services = lazy(() => import('@/pages/Services'))
const Platform = lazy(() => import('@/pages/Platform'))
const AiTraining = lazy(() => import('@/pages/AiTraining'))
const About = lazy(() => import('@/pages/About'))
const Team = lazy(() => import('@/pages/Team'))
const Contact = lazy(() => import('@/pages/Contact'))
const Jobs = lazy(() => import('@/pages/Jobs'))
const JobDetail = lazy(() => import('@/pages/JobDetail'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center pt-20" role="status" aria-live="polite">
    <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink/10 border-t-teal-primary" />
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoManager />
      <div className="flex min-h-screen flex-col bg-offwhite">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/platform" element={<Platform />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/ai-training" element={<AiTraining />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:slug" element={<JobDetail />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
