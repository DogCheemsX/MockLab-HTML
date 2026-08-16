import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const trackUniPathSubmission = async (desiredField: string, system: string) => {
  // 1. Silent local tracking count
  try {
    const localCount = parseInt(localStorage.getItem('mocklab_unipath_submissions') || '0', 10);
    localStorage.setItem('mocklab_unipath_submissions', (localCount + 1).toString());
  } catch (e) {
    // Ignore local storage quota/security errors
  }

  // 2. Silent Firestore async tracking (fire-and-forget, non-blocking)
  try {
    const statsRef = doc(db, 'analytics', 'unipath_stats');
    await setDoc(
      statsRef,
      {
        totalSubmissions: increment(1),
        lastSubmissionAt: serverTimestamp(),
        [`field_counts.${desiredField}`]: increment(1),
        [`system_counts.${system}`]: increment(1),
      },
      { merge: true }
    );
  } catch (err) {
    // Non-blocking fire-and-forget
    console.debug('UniPath analytics metric:', err);
  }
};
