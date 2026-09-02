import { User } from 'firebase/auth';
import { UserProfile } from '../types/auth';

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
  originalPrice: "PKR 1,500",
  discountPercent: "67% OFF",
  accountNumber: import.meta.env.VITE_PAYMENT_ACCOUNT_NUMBER || "03465939277",
  accountTitle: "MockLab Official",
  bankName: import.meta.env.VITE_PAYMENT_BANK_NAME || "NayaPay",
  whatsappUrl: import.meta.env.VITE_PAYMENT_WHATSAPP_URL || "https://wa.me/923465939277",
  qrImage: "/qr.png"
};

/**
 * General support inquiry URL for footer and Help buttons.
 */
export const SUPPORT_WHATSAPP_URL =
  "https://wa.me/923465939277?text=" +
  encodeURIComponent("Hi MockLab! I have a question regarding the entry test prep portal.");

/**
 * Generates dynamic payment verification WhatsApp link pre-filled with Name, Email, and Phone Number.
 */
export function getPaymentVerificationWhatsappUrl(
  user?: User | null,
  userData?: UserProfile | null
): string {
  const name = userData?.name || user?.displayName || "";
  const email = userData?.email || user?.email || "";
  const phone = userData?.whatsapp || user?.phoneNumber || "";

  const text = `Hi Admin, I have paid PKR 500 via NayaPay for MockLab Lifetime Access. Please activate my account.\n\nName: ${name}\nEmail: ${email}\nPhone Number: ${phone}`;

  return `https://wa.me/923465939277?text=${encodeURIComponent(text)}`;
}

export const FREE_TEST_ID = 'nat-ics';

/**
 * Access Control Rule:
 * - Free tier users get access to exactly one baseline test (instanceIndex === 0) per stream.
 * - Premium users unlock all test instances across all streams.
 */
export const isTestUnlocked = (_typeId?: string, isPremium?: boolean, instanceIndex: number = 0): boolean => {
  if (isPremium) return true;
  return instanceIndex === 0;
};
