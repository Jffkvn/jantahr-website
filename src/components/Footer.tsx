import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

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
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-[#6B7A85] text-sm leading-relaxed mb-6">
              Human-centered HR. Practical AI workplace solutions. We help organizations build strong people systems and capable teams.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-semibold text-[#0B2B3B] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#6B7A85] text-sm hover:text-[#006c8b] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-heading font-semibold text-[#0B2B3B] mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#6B7A85] text-sm hover:text-[#006c8b] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-semibold text-[#0B2B3B] mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#2EC3E5] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#6B7A85]">
                  <p>+256 776 777034</p>
                  <p>+256 752 600250</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#2EC3E5] flex-shrink-0" />
                <a
                  href="mailto:hello@jantahr.com"
                  className="text-sm text-[#6B7A85] hover:text-[#006c8b] transition-colors"
                >
                  hello@jantahr.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2EC3E5] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#6B7A85]">
                  Kampala, Uganda
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#0B2B3B]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#6B7A85]">
              &copy; {currentYear} JantaHR Consulting. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-sm text-[#6B7A85] hover:text-[#006c8b] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-sm text-[#6B7A85] hover:text-[#006c8b] transition-colors"
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
