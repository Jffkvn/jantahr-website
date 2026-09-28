export type TrainingUnitName = (typeof TRAINING_UNIT_OPTIONS)[number]

export type TrainingUnitData = {
  title: string
  description: string
  bullets: [string, string, string]
}

export const TRAINING_UNIT_OPTIONS = [
  'AI Awareness and Workplace Readiness',
  'AI for Customer Service',
  'AI for Sales and Marketing',
  'AI for Administration and Operations',
] as const

export const trainingUnits: TrainingUnitData[] = [
  {
    title: 'AI Awareness and Workplace Readiness',
    description:
      'Core module to build a shared understanding of AI, risks, and readiness across your organization.',
    bullets: [
      'Understanding what AI is and how it fits into everyday work',
      'Human judgement, risks, and responsible AI use',
      'Building confidence and readiness for AI-assisted workflows',
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
      'For sales and marketing teams that want help with proposals, pitches, and day-to-day communication.',
    bullets: [
      'Supporting proposals, pitches, and follow-ups with AI',
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
]

export const aiTrainingAudience = [
  'Customer service and support teams',
  'Sales, business development, and marketing teams',
  'Administrative, HR support, finance and operations teams',
]

export const aiTrainingWhy = [
  'People-first approach, led by HR practitioners',
  'Designed for real East African workplaces, not tech labs',
  'Focus on responsible and safe adoption of AI at work',
]

export const trainingPricing = 'From UGX 250,000 per participant'
