import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Brain, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatWeDoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardA = cardARef.current;
    const cardB = cardBRef.current;

    if (!section || !heading || !cardA || !cardB) return;

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

      // Card A animation
      gsap.fromTo(cardA,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Card B animation
      gsap.fromTo(cardB,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const coreServices = [
    'Corporate staff training and development',
    'Recruitment process outsourcing',
    'Compensation and benefits consulting',
    'HR technology and compliance support',
  ];

  const aiServices = [
    'AI awareness and readiness training',
    'Customer service and operations support',
    'Sales and business development workflows',
    'Responsible data use and governance',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#F6F7F9]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0B2B3B]">
            What We Do
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Core HR Services Card */}
          <div
            ref={cardARef}
            className="bg-[#0B2B3B] rounded-[22px] p-8 lg:p-10 text-[#F6F7F9]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2EC3E5]/20 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-[#2EC3E5]" />
            </div>
            <h3 className="font-heading font-bold text-xl lg:text-2xl mb-6">
              Core HR Services
            </h3>
            <ul className="space-y-3 mb-8">
              {coreServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-[#F6F7F9]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2EC3E5] mt-2 flex-shrink-0" />
                  <span className="text-sm lg:text-base">{service}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#2EC3E5] font-medium hover:gap-3 transition-all"
            >
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Applied AI Card */}
          <div
            ref={cardBRef}
            className="bg-[#0B2B3B] rounded-[22px] p-8 lg:p-10 text-[#F6F7F9]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2EC3E5]/20 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-[#2EC3E5]" />
            </div>
            <h3 className="font-heading font-bold text-xl lg:text-2xl mb-6">
              Applied AI for the Workplace
            </h3>
            <ul className="space-y-3 mb-8">
              {aiServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-[#F6F7F9]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2EC3E5] mt-2 flex-shrink-0" />
                  <span className="text-sm lg:text-base">{service}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#2EC3E5] font-medium hover:gap-3 transition-all"
            >
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
