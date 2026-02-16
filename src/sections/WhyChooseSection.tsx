import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const list = listRef.current;

    if (!section || !heading || !list) return;

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

      // List items animation
      const items = list.querySelectorAll('li');
      gsap.fromTo(items,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
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

  const benefits = [
    'Practical HR solutions tailored to your business needs',
    'Strong focus on inclusion, equity, and ethical practice',
    'Experience working with SMEs and corporate teams',
    'Responsible integration of technology and AI',
    'Long-term partnerships built on trust and results',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#F6F7F9]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-heading font-bold text-3xl lg:text-4xl text-[#0B2B3B] mb-12"
          >
            Why Organizations Choose JantaHR
          </h2>

          {/* Benefits List */}
          <ul ref={listRef} className="space-y-5 text-left">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-[#2EC3E5]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#2EC3E5]" />
                </div>
                <span className="text-[#6B7A85] text-base lg:text-lg">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
