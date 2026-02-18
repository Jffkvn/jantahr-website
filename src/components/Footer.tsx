import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Core HR Services', path: '/services' },
      { label: 'Training & Development', path: '/services' },
      { label: 'Recruitment', path: '/services' },
      { label: 'AI for Workplace', path: '/services' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Team', path: '/team' },
      { label: 'Careers', path: '/jobs' },
      { label: 'Contact', path: '/contact' },
    ],
  };

  return (
    <footer className="bg-[#F6F7F9] border-t border-[#0B2B3B]/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="JantaHR Consulting" 
                width={160}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-slate-muted text-sm leading-relaxed mb-6">
              Human-centered HR. Practical AI workplace solutions. We help organizations build strong people systems and capable teams.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/jantahr/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B2B3B]/5 flex items-center justify-center text-[#0B2B3B] hover:bg-[#006c8b]/10 hover:text-[#006c8b] transition-colors"
                aria-label="JantaHR on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/janta_hr/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B2B3B]/5 flex items-center justify-center text-[#0B2B3B] hover:bg-[#006c8b]/10 hover:text-[#006c8b] transition-colors"
                aria-label="JantaHR on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/janta_hr"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#0B2B3B]/5 flex items-center justify-center text-[#0B2B3B] hover:bg-[#006c8b]/10 hover:text-[#006c8b] transition-colors"
                aria-label="JantaHR on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <p className="font-heading font-semibold text-[#0B2B3B] mb-6 text-base">
              Services
            </p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-muted text-sm hover:text-[#006c8b] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <p className="font-heading font-semibold text-[#0B2B3B] mb-6 text-base">
              Company
            </p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-muted text-sm hover:text-[#006c8b] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p className="font-heading font-semibold text-[#0B2B3B] mb-6 text-base">
              Contact
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#2EC3E5] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-muted">
                  <p>+256 776 777034</p>
                  <p>+256 752 600250</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2EC3E5] flex-shrink-0" />
                <div className="text-sm">
                  <a
                    href="mailto:hello@jantahr.com"
                    className="block text-slate-muted hover:text-[#006c8b] transition-colors"
                  >
                    hello@jantahr.com
                  </a>
                  <a
                    href="mailto:jantahrconsult@gmail.com"
                    className="block text-slate-muted hover:text-[#006c8b] transition-colors"
                  >
                    jantahrconsult@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2EC3E5] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-muted">
                  Kampala, Uganda
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#0B2B3B]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-muted">
              &copy; {currentYear} JantaHR Consulting. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-sm text-slate-muted hover:text-[#006c8b] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-sm text-slate-muted hover:text-[#006c8b] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
