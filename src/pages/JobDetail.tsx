import { Link, useParams } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildApplyUrl, jobs } from '@/data/jobs';

const JobDetail = () => {
  const { slug } = useParams();
  const job = jobs.find((item) => item.slug === slug);

  if (!job) {
    return (
      <div className="bg-offwhite pt-20">
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-content mx-auto px-6 lg:px-8 text-center">
            <h1 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep mb-4">
              Job Not Found
            </h1>
            <p className="text-slate-muted max-w-2xl mx-auto mb-8">
              The role you&apos;re looking for may have been filled or removed. Please check the jobs list for current openings.
            </p>
            <Button className="btn-primary" asChild>
              <Link to="/jobs">Back to Jobs</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const applyUrl = buildApplyUrl(job.title, job.applyUrl);

  return (
    <div className="bg-offwhite pt-20">
      <section className="py-16 lg:py-24 bg-teal-deep grain-overlay">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-label text-cyan-accent mb-4">OPEN ROLE</p>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-tight mb-6">
              {job.title}
            </h1>
            <p className="text-offwhite/70 text-lg leading-relaxed mb-6">
              {job.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-offwhite/70">
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
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-offwhite">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-heading font-semibold text-2xl text-teal-deep mb-4">Role Overview</h2>
                <p className="text-slate-muted leading-relaxed">
                  {job.description}
                </p>
              </div>

              {job.responsibilities?.length ? (
                <div>
                  <h3 className="font-heading font-semibold text-xl text-teal-deep mb-4">Key Responsibilities</h3>
                  <ul className="space-y-2 text-slate-muted">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {job.requirements?.length ? (
                <div>
                  <h3 className="font-heading font-semibold text-xl text-teal-deep mb-4">Requirements</h3>
                  <ul className="space-y-2 text-slate-muted">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {job.benefits?.length ? (
                <div>
                  <h3 className="font-heading font-semibold text-xl text-teal-deep mb-4">Benefits</h3>
                  <ul className="space-y-2 text-slate-muted">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <aside className="bg-white rounded-2xl p-6 shadow-card h-fit">
              <h3 className="font-heading font-semibold text-xl text-teal-deep mb-3">Apply for this role</h3>
              <p className="text-slate-muted text-sm mb-6">
                Ready to apply? Use the button below to submit your application and CV.
              </p>
              <Button className="btn-primary w-full" asChild>
                <a href={applyUrl} target="_blank" rel="noreferrer">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Link to="/jobs" className="mt-4 inline-flex text-sm text-cyan-accent hover:underline">
                Back to all jobs
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetail;
