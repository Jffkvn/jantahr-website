import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ApproachSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.approach-card');
      gsap.fromTo(cardElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Understand',
      description: 'We learn your goals, culture, and constraints. Every engagement begins with understanding your organization\'s unique context and challenges.',
    },
    {
      number: '02',
      title: 'Design',
      description: 'We build practical, measurable solutions tailored to your specific needs and aligned with your business objectives.',
    },
    {
      number: '03',
      title: 'Deliver',
      description: 'We implement with your team and refine as you grow, ensuring solutions are sustainable and evolve with your organization.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2EC3E5] mb-4">OUR APPROACH</p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0B2B3B] max-w-lg">
            How we work with you
          </h2>
        </div>

        {/* Steps Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="approach-card bg-[#F6F7F9] border-2 border-[#0B2B3B]/10 rounded-[22px] p-8 hover:border-[#2EC3E5]/30 transition-colors"
            >
              {/* Step Number */}
              <div className="mb-6">
                <span 
                  className="font-heading font-bold text-5xl lg:text-6xl"
                  style={{
                    WebkitTextStroke: '2px #0B2B3B',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-heading font-semibold text-xl text-[#0B2B3B] mb-4">
                {step.title}
              </h3>
              <p className="text-[#6B7A85] leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
