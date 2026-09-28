/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_TRAINING_REGISTRATION_ENDPOINT?: string
  readonly VITE_FORMSPREE_CONTACT_ENDPOINT?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
