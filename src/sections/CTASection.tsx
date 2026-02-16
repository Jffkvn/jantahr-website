import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=70%',
          pin: !isMobile,
          scrub: 0.3,
          pinSpacing: true,
        }
      });

      // Entrance animations (0% - 30%)
      scrollTl
        .fromTo(content,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(image,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0
        );

      // Exit animations (70% - 100%)
      scrollTl
        .fromTo(content,
          { y: 0, opacity: 1 },
          { y: -50, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(image,
          { y: 0, opacity: 1 },
          { y: 50, opacity: 0.35, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0B2B3B] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full py-20">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2EC3E5] mb-6">
              READY TO WORK WITH US
            </p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F6F7F9] leading-tight mb-6">
              Let&apos;s build a stronger, more capable workplace.
            </h2>
            <p className="text-[#F6F7F9]/70 leading-relaxed mb-8 max-w-md">
              Whether you&apos;re strengthening your HR foundation or preparing for 
              the future of work, we&apos;re ready to support you.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex px-6 py-3 rounded-[14px] font-medium transition-all duration-300 bg-[#2EC3E5] text-[#0B2B3B] hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-[22px] overflow-hidden shadow-[0_30px_70px_rgba(11,43,59,0.18)]">
              <img
                src="/cta-team.jpg"
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
