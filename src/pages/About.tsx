import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart, Users, Lightbulb, Award, Handshake, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

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

      // Story section animation
      gsap.fromTo(storyRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Mission/Vision animation
      const missionCards = missionRef.current?.querySelectorAll('.mission-card');
      if (missionCards && missionCards.length > 0) {
        gsap.fromTo(missionCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Values animation
      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      if (valueCards && valueCards.length > 0) {
        gsap.fromTo(valueCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and professionalism in all our engagements.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously improve our services and responsibly adopt new methods and tools.',
    },
    {
      icon: Handshake,
      title: 'Collaboration',
      description: 'We work closely with clients and partners to achieve shared success.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for high standards, measurable impact, and continuous learning.',
    },
    {
      icon: Globe,
      title: 'Inclusivity',
      description: 'We believe inclusive workplaces drive stronger organizational outcomes.',
    },
    {
      icon: Users,
      title: 'People-First',
      description: 'We put people at the center of everything we do.',
    },
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
            <p className="section-label text-cyan-accent mb-4">ABOUT US</p>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-tight mb-6">
              Building Stronger Workplaces Together
            </h1>
            <p className="text-offwhite/70 text-lg leading-relaxed">
              We believe people are at the center of organizational success 
              and that well-designed HR systems enable both individuals and businesses to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div ref={storyRef} className="max-w-3xl mx-auto">
            <p className="section-label mb-4">OUR STORY</p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-teal-deep mb-8">
              A Journey of Impact
            </h2>
            <div className="space-y-6 text-slate-muted leading-relaxed">
              <p>
                JantaHR Consulting was established to support organizations in building strong, 
                inclusive, and effective workplaces. We believe people are at the center of 
                organizational success and that well-designed HR systems enable both individuals 
                and businesses to thrive.
              </p>
              <p>
                Our work combines practical HR expertise with a deep understanding of organizational 
                dynamics, inclusion, and responsible use of technology. We partner with organizations 
                to create workplaces where people can thrive and organizations can grow sustainably.
              </p>
              <p>
                Our purpose is to support clients in attracting, developing, and retaining talent 
                while strengthening systems, leadership, and compliance. We are committed to promoting 
                diversity, equity, and inclusion, supporting employment opportunities for all, and 
                contributing positively to the communities in which we operate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div ref={missionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="mission-card bg-offwhite rounded-2xl p-8 lg:p-10">
              <div className="w-14 h-14 rounded-xl bg-cyan-accent/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-cyan-accent" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-teal-deep mb-4">
                Our Mission
              </h3>
              <p className="text-slate-muted leading-relaxed">
                To provide innovative, inclusive, and practical human resources solutions 
                that empower organizations to succeed through strong people practices and 
                responsible use of technology.
              </p>
            </div>

            {/* Vision */}
            <div className="mission-card bg-offwhite rounded-2xl p-8 lg:p-10">
              <div className="w-14 h-14 rounded-xl bg-cyan-accent/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-cyan-accent" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-teal-deep mb-4">
                Our Vision
              </h3>
              <p className="text-slate-muted leading-relaxed">
                To be a leading human resources consultancy in East Africa, supporting 
                organizations to build inclusive cultures, high-performing teams, and 
                future-ready workforces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-32">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <p className="section-label mb-4">WHAT GUIDES US</p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-teal-deep">
              Our Values
            </h2>
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-2xl p-8 shadow-card hover:shadow-card-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 flex items-center justify-center mb-5">
                  <value.icon className="w-6 h-6 text-cyan-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-teal-deep mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-muted text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
