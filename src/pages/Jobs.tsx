import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { jobs, GENERAL_APPLICATION_URL } from '@/data/jobs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const Jobs = () => {
  const heroRef = useRef<HTMLElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterType, setFilterType] = useState('all');

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

      // Listings animation
      const listings = listingsRef.current?.querySelectorAll('.job-card');
      if (listings) {
        gsap.fromTo(listings,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listingsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === 'all' || job.location === filterLocation;
    const matchesType = filterType === 'all' || job.type === filterType;

    return matchesSearch && matchesLocation && matchesType;
  });

  const locations = ['all', ...Array.from(new Set(jobs.map(job => job.location)))];
  const types = ['all', ...Array.from(new Set(jobs.map(job => job.type)))];
  const hasJobs = jobs.length > 0;

  return (
    <div className="bg-offwhite pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-16 lg:py-24 bg-teal-deep grain-overlay"
      >
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label text-cyan-accent mb-4">CAREER OPPORTUNITIES</p>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-tight mb-6">
              Find Your Next Role
            </h1>
            <p className="text-offwhite/70 text-lg leading-relaxed">
              JantaHR Consulting connects organizations with talent across a range of
              industries and roles. Browse current opportunities with our clients.
            </p>
          </div>
        </div>
      </section>

      {hasJobs ? (
        <>
          {/* Search & Filter Section */}
          <section className="py-8 bg-white border-b border-teal-deep/10">
            <div className="max-w-content mx-auto px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-muted" />
                  <Input
                    type="text"
                    placeholder="Search jobs, companies, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-xl border-teal-deep/20 focus:border-cyan-accent focus:ring-cyan-accent"
                  />
                </div>

                {/* Location Filter */}
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl border-teal-deep/20">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc} value={loc}>
                        {loc === 'all' ? 'All Locations' : loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl border-teal-deep/20">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Job Listings */}
          <section className="py-12 lg:py-20">
            <div className="max-w-content mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <p className="text-slate-muted">
                  Showing <span className="font-medium text-teal-deep">{filteredJobs.length}</span> opportunities
                </p>
              </div>

              <div ref={listingsRef} className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="job-card bg-white rounded-2xl p-6 shadow-card hover:shadow-card-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading font-semibold text-lg text-teal-deep">
                              {job.title}
                            </h3>
                            <span className="px-3 py-1 rounded-full bg-cyan-accent/10 text-cyan-accent text-xs font-medium">
                              {job.category}
                            </span>
                          </div>
                          <p className="text-slate-muted text-sm mb-3">{job.company}</p>
                          <p className="text-slate-muted text-sm mb-4">{job.summary}</p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-muted">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {job.posted}
                            </span>
                          </div>
                        </div>

                        <Button className="btn-primary shrink-0" asChild>
                          <Link to={`/jobs/${job.slug}`}>
                            Apply
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <p className="text-slate-muted text-lg">
                      No jobs found matching your criteria.
                    </p>
                    <p className="text-slate-muted text-sm mt-2">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Submit Resume CTA */}
          <section className="py-20 lg:py-32 bg-white">
            <div className="max-w-content mx-auto px-6 lg:px-8">
              <div className="bg-offwhite rounded-2xl p-8 lg:p-12 text-center">
                <h2 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep mb-4">
                  Don&apos;t See the Right Fit?
                </h2>
                <p className="text-slate-muted max-w-lg mx-auto mb-8">
                  Submit your resume to be considered for future opportunities.
                  We&apos;re always connecting talented professionals with great organizations.
                </p>
                <Button className="btn-primary" asChild>
                  <a href={GENERAL_APPLICATION_URL} target="_blank" rel="noreferrer">
                    Submit Your Resume
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-content mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep mb-4">
              No Openings Available
            </h2>
            <p className="text-slate-muted max-w-2xl mx-auto mb-8">
              No openings available at the moment. Please keep checking, or simply submit your CV and we&apos;ll be in touch in case of any opening.
            </p>
            <Button className="btn-primary" asChild>
              <a href={GENERAL_APPLICATION_URL} target="_blank" rel="noreferrer">
                Submit Your CV
              </a>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Jobs;
