import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  submitAiTrainingRegistration,
  type AiTrainingRegistrationPayload,
} from '@/services/aiTrainingRegistration';

const TRAINING_UNIT_OPTIONS = [
  'AI Awareness and Workplace Readiness',
  'AI for Customer Service',
  'AI for Sales and Marketing',
  'AI for Administration and Operations',
] as const;

type TrainingUnit = (typeof TRAINING_UNIT_OPTIONS)[number];

type UnitCard = {
  title: TrainingUnit;
  description: string;
  bullets: [string, string, string];
};

const TRAINING_UNITS: UnitCard[] = [
  {
    title: 'AI Awareness and Workplace Readiness',
    description:
      'Core module to build a shared understanding of AI, risks, and readiness across your organization.',
    bullets: [
      'Understanding what AI is and how it fits into everyday work',
      'Human judgement, risks, and responsible AI use',
      'Building confidence and readiness for AI assisted workflows',
    ],
  },
  {
    title: 'AI for Customer Service',
    description:
      'For support and service teams that want to use AI to respond faster while keeping quality and empathy.',
    bullets: [
      'Drafting clear, empathetic customer responses with AI support',
      'Maintaining quality, tone, and human review',
      'Using AI safely while protecting customer data',
    ],
  },
  {
    title: 'AI for Sales and Marketing',
    description:
      'For sales and marketing teams that want help with proposals, pitches, and day to day communication.',
    bullets: [
      'Supporting proposals, pitches, and follow ups with AI',
      'Research and personalization without losing authenticity',
      'Ethical AI use in sales and marketing communication',
    ],
  },
  {
    title: 'AI for Administration and Operations',
    description:
      'For administrative, HR, finance support, and operations teams that want to use AI for productivity.',
    bullets: [
      'Automating routine tasks and documentation',
      'Improving productivity and workflow organization',
      'Accurate review and responsible handling of data',
    ],
  },
];

type RegistrationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  trainingUnit: TrainingUnit | '';
  notes: string;
};

type RegistrationErrors = Partial<Record<'fullName' | 'email' | 'phone' | 'trainingUnit', string>>;

const isTrainingUnit = (value: string): value is TrainingUnit =>
  TRAINING_UNIT_OPTIONS.includes(value as TrainingUnit);

const getInitialFormValues = (): RegistrationFormValues => ({
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  trainingUnit: '',
  notes: '',
});

const AiTrainingPage = () => {
  const [formValues, setFormValues] = useState<RegistrationFormValues>(getInitialFormValues);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const audienceGroups = useMemo(
    () => [
      'Customer service and support teams',
      'Sales, business development, and marketing teams',
      'Administrative, HR support, finance and operations teams',
    ],
    [],
  );

  const whyJantaHrPoints = useMemo(
    () => [
      'People first approach, led by HR practitioners',
      'Designed for real East African workplaces, not tech labs',
      'Focus on responsible and safe adoption of AI at work',
    ],
    [],
  );

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('ai-training-registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateForm = (): RegistrationErrors => {
    const nextErrors: RegistrationErrors = {};

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!formValues.email.trim()) {
      nextErrors.email = 'Please enter your work email.';
    }
    if (!formValues.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number including country code.';
    }
    if (!formValues.trainingUnit) {
      nextErrors.trainingUnit = 'Please select a training unit.';
    }

    return nextErrors;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = event.target.name as
      | 'fullName'
      | 'email'
      | 'phone'
      | 'organization'
      | 'notes';
    const { value } = event.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [fieldName]: value,
    }));

    if (fieldName === 'fullName' || fieldName === 'email' || fieldName === 'phone') {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [fieldName]: undefined,
      }));
    }
  };

  const handleTrainingUnitChange = (value: string) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      trainingUnit: isTrainingUnit(value) ? value : '',
    }));
    setErrors((previousErrors) => ({
      ...previousErrors,
      trainingUnit: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const honeypot = formData.get('website')?.toString().trim() ?? '';

    const payload: AiTrainingRegistrationPayload = {
      fullName: formValues.fullName.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      organization: formValues.organization.trim() || undefined,
      trainingUnit: formValues.trainingUnit,
      notes: formValues.notes.trim() || undefined,
      honeypot,
      sourcePage: '/ai-training',
    };

    setIsSubmitting(true);

    try {
      await submitAiTrainingRegistration(payload);
      setFormValues(getInitialFormValues());
      setErrors({});
      setSubmitSuccess(true);
    } catch {
      setSubmitError(
        'Something went wrong while submitting. Please try again or contact us directly.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-offwhite pt-20">
      <section className="py-16 lg:py-24 bg-teal-deep grain-overlay">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="section-label text-cyan-accent mb-4">AI TRAINING</p>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-offwhite leading-tight mb-6">
                AI Awareness and Workplace Readiness
              </h1>
              <p className="text-offwhite/80 text-lg leading-relaxed mb-8">
                Practical AI training for real workplaces. Help your teams understand AI, use it
                safely, and apply it to customer service, sales, and everyday operations across
                Kampala and East Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  onClick={scrollToRegistration}
                  className="h-12 rounded-[14px] px-6"
                >
                  Register for training
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-[14px] px-6 border-offwhite/50 bg-transparent text-offwhite hover:bg-offwhite/10 hover:text-offwhite"
                  asChild
                >
                  <Link to="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>

            <div
              className="ai-training-hero-image-placeholder rounded-2xl border border-offwhite/20 bg-offwhite/10 shadow-card-lg min-h-[320px] sm:min-h-[380px] flex items-center justify-center p-8"
              role="img"
              aria-label="Group of Black professionals in smart casual attire learning about AI in a modern training room"
            >
              <p className="text-center text-sm text-offwhite/80 max-w-xs">
                Hero image placeholder
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-offwhite">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep mb-8">
            Who this training is for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audienceGroups.map((group) => (
              <div key={group} className="bg-white rounded-2xl p-6 shadow-card">
                <p className="text-slate-muted leading-relaxed">{group}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="section-label mb-3">COURSE UNITS</p>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep">
                Training structure
              </h2>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 w-fit">
              <p className="text-sm text-primary font-semibold">From UGX 250,000 per participant</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRAINING_UNITS.map((unit) => (
              <article
                key={unit.title}
                className="rounded-2xl border border-teal-deep/10 bg-offwhite p-7 shadow-card"
              >
                <h3 className="font-heading font-semibold text-xl text-teal-deep mb-3">{unit.title}</h3>
                <p className="text-slate-muted leading-relaxed mb-5">{unit.description}</p>
                <ul className="space-y-3">
                  {unit.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-slate-muted">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-8 text-slate-muted">
            Delivery options include half day or full day sessions, with pricing tailored to team
            size and format.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="ai-training-scene-placeholder-1 rounded-2xl border border-teal-deep/10 bg-offwhite shadow-card min-h-[220px] flex items-center justify-center p-6"
              role="img"
              aria-label="Black professionals in smart casual clothing during an AI training session"
            >
              <p className="text-sm text-slate-muted text-center max-w-xs">
                Training scene placeholder
              </p>
            </div>
            <div
              className="ai-training-scene-placeholder-2 rounded-2xl border border-teal-deep/10 bg-offwhite shadow-card min-h-[220px] flex items-center justify-center p-6"
              role="img"
              aria-label="Team members collaborating on laptops during AI awareness training"
            >
              <p className="text-sm text-slate-muted text-center max-w-xs">
                Collaboration scene placeholder
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-offwhite">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep mb-8">
            Why JantaHR for AI training
          </h2>
          <ul className="space-y-4">
            {whyJantaHrPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-muted">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ai-training-registration" className="scroll-mt-28 py-16 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <p className="section-label mb-3">REGISTRATION</p>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-teal-deep mb-4">
                Register for AI training
              </h2>
              <p className="text-slate-muted leading-relaxed">
                Share your details and preferred unit. We will follow up with dates, delivery
                options, and final pricing based on your team setup.
              </p>
            </div>

            <div className="lg:col-span-3 bg-offwhite rounded-2xl p-6 lg:p-8 shadow-card">
              {submitSuccess ? (
                <p
                  id="ai-training-registration-success"
                  className="mb-6 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-primary"
                  aria-live="polite"
                >
                  Thank you. Our team will contact you to confirm your AI training booking.
                </p>
              ) : null}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-teal-deep">
                    Full name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    className="h-12 rounded-xl border-teal-deep/20 focus:border-primary focus:ring-primary"
                  />
                  {errors.fullName ? (
                    <p id="fullName-error" className="text-sm text-red-600" role="alert">
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="workEmail" className="text-teal-deep">
                      Work email *
                    </Label>
                    <Input
                      id="workEmail"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      placeholder="you@organization.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'workEmail-error' : undefined}
                      className="h-12 rounded-xl border-teal-deep/20 focus:border-primary focus:ring-primary"
                    />
                    {errors.email ? (
                      <p id="workEmail-error" className="text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-teal-deep">
                      Phone number (include country code) *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      placeholder="+256..."
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className="h-12 rounded-xl border-teal-deep/20 focus:border-primary focus:ring-primary"
                    />
                    {errors.phone ? (
                      <p id="phone-error" className="text-sm text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-teal-deep">
                    Organization name
                  </Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formValues.organization}
                    onChange={handleInputChange}
                    placeholder="Organization (optional)"
                    className="h-12 rounded-xl border-teal-deep/20 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trainingUnit" className="text-teal-deep">
                    Training unit *
                  </Label>
                  <Select
                    value={formValues.trainingUnit || undefined}
                    onValueChange={handleTrainingUnitChange}
                  >
                    <SelectTrigger
                      id="trainingUnit"
                      className="w-full h-12 rounded-xl border-teal-deep/20 focus:border-primary focus:ring-primary"
                      aria-invalid={Boolean(errors.trainingUnit)}
                      aria-describedby={errors.trainingUnit ? 'trainingUnit-error' : undefined}
                    >
                      <SelectValue placeholder="Select training unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRAINING_UNIT_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.trainingUnit ? (
                    <p id="trainingUnit-error" className="text-sm text-red-600" role="alert">
                      {errors.trainingUnit}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-teal-deep">
                    Any specific goals or notes
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formValues.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Share any context or outcomes your team wants from the training."
                    className="rounded-xl border-teal-deep/20 focus:border-primary focus:ring-primary resize-none"
                  />
                </div>

                <Button type="submit" className="h-12 rounded-[14px] px-6" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit registration'}
                </Button>
                {submitError ? (
                  <p
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-offwhite">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="rounded-2xl bg-teal-deep p-8 lg:p-10 grain-overlay flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="font-heading font-semibold text-2xl text-offwhite mb-2">
                Ready to train your team?
              </h2>
              <p className="text-offwhite/75">
                Choose a unit and we will tailor delivery for your organization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                size="sm"
                onClick={scrollToRegistration}
                className="h-10 rounded-[12px] px-4"
              >
                Register for training
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 rounded-[12px] px-4 border-offwhite/50 bg-transparent text-offwhite hover:bg-offwhite/10 hover:text-offwhite"
                asChild
              >
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiTrainingPage;
