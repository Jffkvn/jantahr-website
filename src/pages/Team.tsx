import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Team cards animation
      const cards = gridRef.current?.querySelectorAll('.team-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0, rotate: -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const teamMembers = [
    {
      name: 'Sarah Namukasa',
      role: 'Founder & Managing Director',
      bio: 'Over 15 years of experience in HR leadership and organizational development across East Africa.',
      image: '/team-1.jpg',
    },
    {
      name: 'David Okello',
      role: 'Senior HR Consultant',
      bio: 'Specializes in compensation strategy and HR technology implementation for growing organizations.',
      image: '/team-2.jpg',
    },
    {
      name: 'Grace Auma',
      role: 'Training & Development Lead',
      bio: 'Expert in leadership development and organizational change management.',
      image: '/team-3.jpg',
    },
    {
      name: 'Michael Kintu',
      role: 'Recruitment Specialist',
      bio: 'Focuses on inclusive hiring practices and talent acquisition strategy.',
      image: '/team-4.jpg',
    },
    {
      name: 'Patricia Nalwoga',
      role: 'HR Technology Consultant',
      bio: 'Helps organizations select and optimize HR systems for improved efficiency.',
      image: '/team-5.jpg',
    },
    {
      name: 'Robert Ssemanda',
      role: 'Compliance & Policy Advisor',
      bio: 'Expert in employment law and HR policy development across multiple sectors.',
      image: '/team-6.jpg',
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
            <p className="section-label text-cyan-accent mb-4">OUR TEAM</p>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-tight mb-6">
              Meet Our People
            </h1>
            <p className="text-offwhite/70 text-lg leading-relaxed">
              Our team brings experience across human resources, training, recruitment, 
              and organizational development. We work collaboratively with clients, 
              combining professional expertise with a practical understanding of local 
              and regional business environments.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 lg:py-32">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-shadow"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-teal-deep mb-1">
                    {member.name}
                  </h3>
                  <p className="text-cyan-accent text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-muted text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-teal-deep/5 flex items-center justify-center hover:bg-cyan-accent/20 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4 text-teal-deep" />
                    </a>
                    <a
                      href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@jantahr.com`}
                      className="w-8 h-8 rounded-full bg-teal-deep/5 flex items-center justify-center hover:bg-cyan-accent/20 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4 text-teal-deep" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="bg-teal-deep rounded-2xl p-8 lg:p-12 text-center grain-overlay">
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-offwhite mb-4">
              Join Our Team
            </h2>
            <p className="text-offwhite/70 max-w-lg mx-auto mb-8">
              We&apos;re always looking for talented professionals who are passionate 
              about helping organizations build better workplaces.
            </p>
            <a
              href="/jobs"
              className="inline-flex btn-primary"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
