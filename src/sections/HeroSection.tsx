import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(image, 
          { opacity: 0, scale: 1.06 }, 
          { opacity: 1, scale: 1, duration: 0.9 }
        )
        .fromTo(content.querySelectorAll('.animate-item'), 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 
          '-=0.5'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
        }
      });

      // Exit animations (70% - 100%)
      scrollTl
        .fromTo(content, 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(image, 
          { x: 0, scale: 1, opacity: 1 }, 
          { x: '-10vw', scale: 1.06, opacity: 0.35, ease: 'power2.in' }, 
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0B2B3B] overflow-hidden"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-full lg:w-[55%] h-full"
      >
        <picture>
          <source
            type="image/webp"
            srcSet="/images/optimized/hero-office-640.webp 640w, /images/optimized/hero-office-960.webp 960w, /images/optimized/hero-office-1280.webp 1280w"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <img
            src="/images/optimized/hero-office-1280.jpg"
            srcSet="/images/optimized/hero-office-640.jpg 640w, /images/optimized/hero-office-960.jpg 960w, /images/optimized/hero-office-1280.jpg 1280w"
            sizes="(max-width: 1024px) 100vw, 55vw"
            alt="Black professionals collaborating in a modern office"
            width={1280}
            height={853}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Gradient overlay for mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B2B3B]/90 lg:to-transparent" />
      </div>

      {/* Right Content Panel */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 w-full lg:w-[45%] h-full flex items-center bg-[#0B2B3B] lg:bg-transparent"
      >
        <div className="px-6 lg:px-12 xl:px-16 py-20 lg:py-0 w-full">
          {/* Micro Label */}
          <p className="animate-item inline-flex rounded-full bg-[#F6F7F9]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0B2B3B] mb-6">
            JANTAHR CONSULTING
          </p>

          {/* Headline */}
          <h1 className="animate-item font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] xl:text-[52px] text-[#F6F7F9] leading-[1.05] mb-6">
            Human-Centered HR Solutions for Today&apos;s Workplace
          </h1>

          {/* Subheadline */}
          <p className="animate-item text-[#F6F7F9]/80 text-base lg:text-lg leading-relaxed max-w-md mb-8">
            JantaHR Consulting partners with organizations to build strong people systems, 
            develop capable teams, and create inclusive, high-performing workplaces.
          </p>

          {/* CTAs */}
          <div className="animate-item flex flex-col sm:flex-row gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-[14px] font-medium transition-all duration-300 bg-[#2EC3E5] text-[#0B2B3B] hover:shadow-lg hover:-translate-y-0.5 text-center"
            >
              Talk to Us
            </Link>
            <Link 
              to="/services" 
              className="px-6 py-3 rounded-[14px] font-medium transition-all duration-300 border-2 border-[#F6F7F9]/40 text-[#F6F7F9] hover:bg-[#F6F7F9]/10 text-center"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
