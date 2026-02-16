import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/ai-training', label: 'AI Training' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F6F7F9]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(11,43,59,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="JantaHR Consulting" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-2 ${
                    isActive(link.path)
                      ? 'text-[#006c8b]'
                      : 'text-[#0B2B3B]/70 hover:text-[#0B2B3B]'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2EC3E5] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex px-6 py-3 rounded-[14px] font-medium text-sm transition-all duration-300 bg-[#2EC3E5] text-[#0B2B3B] hover:shadow-lg hover:-translate-y-0.5"
            >
              Talk to Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#0B2B3B]/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#0B2B3B]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0B2B3B]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0B2B3B]/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-[#F6F7F9] rounded-2xl shadow-[0_30px_70px_rgba(11,43,59,0.18)] p-6 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium py-3 px-4 rounded-xl transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#006c8b]/10 text-[#006c8b]'
                    : 'text-[#0B2B3B] hover:bg-[#0B2B3B]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 px-6 py-3 rounded-[14px] font-medium text-center transition-all duration-300 bg-[#2EC3E5] text-[#0B2B3B] hover:shadow-lg"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
