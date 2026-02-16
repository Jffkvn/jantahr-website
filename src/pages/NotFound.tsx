import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="bg-offwhite pt-20">
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-accent mb-4">
            404
          </p>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-teal-deep mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-muted max-w-2xl mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-primary" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
            <Button variant="outline" className="h-12 rounded-[14px]" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
