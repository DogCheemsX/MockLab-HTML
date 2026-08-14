/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_ADMIN_EMAIL: string;
  readonly VITE_PAYMENT_AMOUNT: string;
  readonly VITE_PAYMENT_ACCOUNT_NUMBER: string;
  readonly VITE_PAYMENT_BANK_NAME: string;
  readonly VITE_PAYMENT_WHATSAPP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'firebase/app' {
  export * from '@firebase/app';
}

declare module 'firebase/auth' {
  export * from '@firebase/auth';
}

declare module 'firebase/firestore' {
  export * from '@firebase/firestore';
}
