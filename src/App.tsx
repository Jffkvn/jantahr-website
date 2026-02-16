import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Jobs from './pages/Jobs';
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const AiTrainingPage = lazy(() => import('./pages/AiTrainingPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SeoManager from './components/SeoManager';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

const RouteLoadingFallback = () => (
  <div className="mx-auto max-w-content px-6 lg:px-8 py-16" role="status" aria-live="polite">
    <p className="text-slate-muted">Loading page...</p>
  </div>
);

function App() {

  return (
    <Router>
      <ScrollToTop />
      <SeoManager />
      <div className="min-h-screen bg-offwhite">
        <Navigation />
        <main>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ai-training" element={<AiTrainingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/jobs/:slug" element={<JobDetail />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
