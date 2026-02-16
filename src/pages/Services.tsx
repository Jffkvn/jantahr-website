import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, 
  Search, 
  DollarSign, 
  Monitor, 
  ClipboardList, 
  ShieldCheck,
  Brain,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const heroRef = useRef<HTMLElement>(null);
  const coreServicesRef = useRef<HTMLDivElement>(null);
  const aiSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // Core services cards animation
      const serviceCards = coreServicesRef.current?.querySelectorAll('.service-card');
      if (serviceCards) {
        gsap.fromTo(serviceCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: coreServicesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // AI section animation
      gsap.fromTo(aiSectionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aiSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const coreServices = [
    {
      icon: Users,
      title: 'Corporate Staff Training and Development',
      description: 'We design and deliver training programs that build leadership capability, strengthen teams, and improve day-to-day performance. Our training is practical, interactive, and aligned with organizational goals.',
      areas: [
        'Leadership and management development',
        'Sales and customer service training',
        'Team building and personal development',
        'Change and performance management',
      ],
    },
    {
      icon: Search,
      title: 'Recruitment Process Outsourcing',
      description: 'We support organizations with structured and objective recruitment processes that deliver the right talent while reducing time and operational pressure.',
      areas: [
        'Sourcing and screening',
        'Interview coordination',
        'Placement and onboarding',
        'Recruitment strategy advisory',
      ],
    },
    {
      icon: DollarSign,
      title: 'Compensation and Benefits Consulting',
      description: 'We help organizations design fair, competitive, and compliant compensation structures that attract and retain talent while supporting internal equity.',
      areas: [
        'Salary benchmarking',
        'Job evaluation',
        'Benefits design',
        'Employee communication',
      ],
    },
    {
      icon: Monitor,
      title: 'HR Technology Consulting',
      description: 'We support organizations in selecting and using HR technology that improves efficiency and employee experience without unnecessary complexity.',
      areas: [
        'Needs assessment',
        'Vendor selection',
        'System implementation',
        'Staff training',
      ],
    },
    {
      icon: ClipboardList,
      title: 'HR Outsourcing',
      description: 'Our HR outsourcing services allow organizations to focus on core business activities while ensuring HR administration is professionally managed.',
      areas: [
        'Payroll administration',
        'HR records management',
        'Operational HR support',
        'Compliance monitoring',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'HR Compliance',
      description: 'We help organizations navigate employment laws and regulations through clear policies, training, and advisory support.',
      areas: [
        'HR policy audits',
        'Compliance training',
        'Labor law guidance',
        'Ongoing advisory support',
      ],
    },
  ];

  const aiServices = [
    'AI awareness and workplace readiness training',
    'Customer service response drafting',
    'Sales and proposal support',
    'Administrative productivity tools',
    'Responsible data use guidance',
  ];

  return (
    <div className="bg-offwhite pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-16 lg:py-24 bg-teal-deep grain-overlay"
      >
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label text-cyan-accent mb-4">OUR SERVICES</p>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-tight mb-6">
              Comprehensive HR Solutions
            </h1>
            <p className="text-offwhite/70 text-lg leading-relaxed">
              JantaHR Consulting provides structured and practical human resources 
              services designed to strengthen people systems, improve performance, 
              and support sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Core HR Services */}
      <section className="py-20 lg:py-32">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="mb-12 lg:mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-teal-deep mb-4">
              Core HR Services
            </h2>
            <p className="text-slate-muted text-lg max-w-2xl">
              Our services are tailored to each organization&apos;s size, sector, and operating environment.
            </p>
          </div>

          <div ref={coreServicesRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <div
                key={index}
                className="service-card bg-white rounded-2xl p-8 shadow-card hover:shadow-card-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-cyan-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-teal-deep mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-muted leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.areas.map((area, areaIndex) => (
                    <li
                      key={areaIndex}
                      className="flex items-start gap-3 text-sm text-slate-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent mt-1.5 flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applied AI Section */}
      <section
        ref={aiSectionRef}
        className="py-20 lg:py-32 bg-teal-deep grain-overlay"
      >
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-cyan-accent/20 flex items-center justify-center mb-8">
                <Brain className="w-8 h-8 text-cyan-accent" />
              </div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-offwhite mb-6">
                Applied AI for the Workplace
              </h2>
              <p className="text-offwhite/70 leading-relaxed mb-8">
                JantaHR Consulting helps organizations adopt artificial intelligence 
                in a practical and responsible way. Our focus is on supporting productivity 
                and clarity while maintaining professional judgment and accountability.
              </p>
              <p className="text-offwhite/70 leading-relaxed mb-8">
                We guide teams on how to use AI safely within existing workflows, 
                ensuring technology supports people rather than replaces them.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-cyan-accent font-medium hover:gap-3 transition-all"
              >
                Get AI consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white/5 rounded-2xl p-8">
              <h3 className="font-heading font-semibold text-xl text-offwhite mb-6">
                Examples of Support
              </h3>
              <ul className="space-y-4">
                {aiServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-offwhite/80"
                  >
                    <span className="w-6 h-6 rounded-full bg-cyan-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                    </span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
