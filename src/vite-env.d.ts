/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_TRAINING_REGISTRATION_ENDPOINT?: string
  readonly VITE_FORMSPREE_CONTACT_ENDPOINT?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_JOBS_ENDPOINT?: string
  readonly VITE_CANDIDATE_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
