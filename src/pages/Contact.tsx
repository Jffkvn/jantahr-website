import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjbagpr';

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

      // Form animation
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Info animation
      gsap.fromTo(infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
        });
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Unable to send your message right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+256 776 777034', '+256 752 600250'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['hello@jantahr.com'],
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Kampala, Uganda'],
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
            <p className="section-label text-cyan-accent mb-4">GET IN TOUCH</p>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-tight mb-6">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-offwhite/70 text-lg leading-relaxed">
              We welcome inquiries from organizations seeking HR support, training, 
              or advisory services, as well as candidates exploring career opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div ref={infoRef}>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep mb-6">
                Contact Information
              </h2>
              <p className="text-slate-muted leading-relaxed mb-10">
                Reach out to us through any of the channels below. Our team is ready 
                to discuss how we can support your organization&apos;s HR needs.
              </p>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-cyan-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-teal-deep mb-2">
                        {item.title}
                      </h3>
                      {item.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-slate-muted">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="mt-12 p-6 bg-white rounded-2xl shadow-card">
                <h3 className="font-heading font-semibold text-teal-deep mb-4">
                  Working Hours
                </h3>
                <div className="space-y-2 text-slate-muted">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-card">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-cyan-accent/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-cyan-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-teal-deep mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-slate-muted">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-heading font-bold text-2xl text-teal-deep mb-6">
                    Send Us a Message
                  </h2>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                    <input type="hidden" name="_subject" value="New Contact Form Submission" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-teal-deep">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="h-12 rounded-xl border-teal-deep/20 focus:border-cyan-accent focus:ring-cyan-accent"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-teal-deep">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="h-12 rounded-xl border-teal-deep/20 focus:border-cyan-accent focus:ring-cyan-accent"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-teal-deep">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="h-12 rounded-xl border-teal-deep/20 focus:border-cyan-accent focus:ring-cyan-accent"
                          placeholder="Your company"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-teal-deep">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-12 rounded-xl border-teal-deep/20 focus:border-cyan-accent focus:ring-cyan-accent"
                          placeholder="+256..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-teal-deep">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="rounded-xl border-teal-deep/20 focus:border-cyan-accent focus:ring-cyan-accent resize-none"
                        placeholder="Tell us about your HR needs..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-primary h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                    {submitError ? (
                      <p className="text-sm text-red-600">{submitError}</p>
                    ) : null}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
