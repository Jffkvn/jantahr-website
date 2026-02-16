import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAreSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(image,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Text animation
      gsap.fromTo(text,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#F6F7F9]"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef}>
            <div className="aspect-[4/3] rounded-[22px] overflow-hidden shadow-[0_18px_50px_rgba(11,43,59,0.10)]">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/optimized/who-we-are-640.webp 640w, /images/optimized/who-we-are-960.webp 960w"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <img
                  src="/images/optimized/who-we-are-960.jpg"
                  srcSet="/images/optimized/who-we-are-640.jpg 640w, /images/optimized/who-we-are-960.jpg 960w"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="Black professionals in a collaborative workspace"
                  width={960}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2EC3E5] mb-4">WHO WE ARE</p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-[#0B2B3B] leading-tight mb-6">
              We partner with organizations to build strong people systems.
            </h2>
            <div className="space-y-4 text-[#5B6974] leading-relaxed">
              <p>
                JantaHR Consulting is a human resources consultancy supporting small and medium 
                enterprises, growing startups, and established organizations across Uganda and the region. 
                We help businesses strengthen their people practices, improve performance, and remain 
                compliant while preparing for the future of work.
              </p>
              <p>
                Our approach is practical and people-focused. We work closely with leadership teams 
                to understand their context and challenges, then deliver tailored solutions that make 
                a real difference in day-to-day operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
