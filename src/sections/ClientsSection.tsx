import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const stats = statsRef.current;
    const tags = tagsRef.current;

    if (!section || !leftCol || !stats || !tags) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(leftCol,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Stats count-up animation
      const statNumbers = stats.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // Tags animation
      const tagElements = tags.querySelectorAll('.sector-tag');
      gsap.fromTo(tagElements,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const sectors = [
    'Technology',
    'Healthcare',
    'Finance',
    'Telecommunications',
    'Manufacturing',
    'Professional Services',
    'Non-Profit',
    'Education',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div ref={leftColRef}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2EC3E5] mb-4">CLIENTS</p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0B2B3B] leading-tight mb-6">
              Serving diverse organizations
            </h2>
            <p className="text-[#6B7A85] leading-relaxed">
              We support clients across sectors, from local businesses to organizations 
              with regional and international operations. Our experience spans multiple 
              industries, allowing us to bring best practices and fresh perspectives to every engagement.
            </p>
          </div>

          {/* Right Column */}
          <div>
            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <span
                  className="stat-number font-heading font-bold text-5xl lg:text-6xl text-[#0B2B3B] block mb-2"
                  data-target="120"
                >
                  0
                </span>
                <span className="text-[#6B7A85] text-sm">Organizations supported</span>
              </div>
              <div>
                <span
                  className="stat-number font-heading font-bold text-5xl lg:text-6xl text-[#0B2B3B] block mb-2"
                  data-target="15"
                >
                  0
                </span>
                <span className="text-[#6B7A85] text-sm">Industries served</span>
              </div>
            </div>

            {/* Sector Tags */}
            <div ref={tagsRef} className="flex flex-wrap gap-3">
              {sectors.map((sector, index) => (
                <span
                  key={index}
                  className="sector-tag px-4 py-2 rounded-full bg-[#0B2B3B]/5 text-[#0B2B3B] text-sm font-medium"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
