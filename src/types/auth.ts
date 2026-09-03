export interface UserProfile {
  name: string;
  email: string;
  whatsapp: string;
  isPremium: boolean;
  photoURL?: string;
  dateCreated?: any;
}

export interface AdminUserRecord extends UserProfile {
  uid: string;
}

export type AuthMode = 'login' | 'signup' | 'forgot';
