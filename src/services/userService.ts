import { doc, getDoc, setDoc, updateDoc, collection, getDocs, serverTimestamp, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, AdminUserRecord } from '../types/auth';

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function createUserProfile(uid: string, profile: Omit<UserProfile, 'isPremium' | 'dateCreated'>): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    name: profile.name,
    email: profile.email.toLowerCase(),
    whatsapp: profile.whatsapp,
    isPremium: false,
    dateCreated: serverTimestamp()
  });
}

export async function getAllUsers(): Promise<AdminUserRecord[]> {
  const querySnap = await getDocs(collection(db, 'users'));
  const users: AdminUserRecord[] = [];
  querySnap.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
    const data = docSnap.data() as UserProfile;
    users.push({
      uid: docSnap.id,
      ...data
    });
  });
  return users;
}

export async function updateUserPremiumStatus(uid: string, isPremium: boolean): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { isPremium });
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, updates);
}
