export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBdP5JcEGJzkgM6O6BDxsQcNyPQ2nc_cQs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mocklab-5f062.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mocklab-5f062",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mocklab-5f062.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "743250587602",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:743250587602:web:5cbbef1fef79f2e39ba20b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5Q7VMFDG84"
};

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "alisherahsan@gmail.com";

export const PAYMENT_INFO = {
  amount: import.meta.env.VITE_PAYMENT_AMOUNT || "PKR 500",
  accountNumber: import.meta.env.VITE_PAYMENT_ACCOUNT_NUMBER || "03465939277",
  bankName: import.meta.env.VITE_PAYMENT_BANK_NAME || "Bank NayaPay",
  whatsappUrl: import.meta.env.VITE_PAYMENT_WHATSAPP_URL || "https://wa.me/923465939277"
};
