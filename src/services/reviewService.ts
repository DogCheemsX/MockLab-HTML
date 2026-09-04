import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

export interface ReviewRecord {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userPhotoURL?: string;
  rating: number;
  comment: string;
  timestamp?: any;
  dateString?: string;
}

export async function submitReview(record: Omit<ReviewRecord, 'id' | 'timestamp'>): Promise<boolean> {
  try {
    const reviewsRef = collection(db, 'reviews');
    await addDoc(reviewsRef, {
      ...record,
      timestamp: serverTimestamp(),
      dateString: new Date().toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });
    return true;
  } catch (error) {
    console.error('Error submitting review to database:', error);
    return false;
  }
}

export async function getAllReviews(): Promise<ReviewRecord[]> {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('timestamp', 'desc'), limit(500));
    const snap = await getDocs(q);
    const reviews: ReviewRecord[] = [];
    snap.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      const data = docSnap.data();
      reviews.push({
        id: docSnap.id,
        userId: data.userId || '',
        userName: data.userName || 'Student',
        userEmail: data.userEmail || '',
        userPhone: data.userPhone || 'No Phone',
        userPhotoURL: data.userPhotoURL || '',
        rating: data.rating || 5,
        comment: data.comment || '',
        dateString: data.dateString || 'Recent'
      });
    });
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}
