import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

export interface SubjectStat {
  title: string;
  correct: number;
  total: number;
  pct: number;
}

export interface TestResultRecord {
  id?: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userPhotoURL?: string;
  testTitle: string;
  uniKey: string;
  typeId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTakenSeconds?: number;
  timeTakenFormatted?: string;
  subjectBreakdown?: SubjectStat[];
  timestamp?: any;
  dateString?: string;
}

export async function saveTestResult(record: Omit<TestResultRecord, 'id' | 'timestamp'>): Promise<void> {
  try {
    const resultsRef = collection(db, 'testResults');
    await addDoc(resultsRef, {
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
  } catch (error) {
    console.error('Error saving test result to database:', error);
  }
}

export async function getAllTestResults(): Promise<TestResultRecord[]> {
  try {
    const resultsRef = collection(db, 'testResults');
    const q = query(resultsRef, orderBy('timestamp', 'desc'), limit(500));
    const snap = await getDocs(q);
    const results: TestResultRecord[] = [];
    snap.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        userId: data.userId || '',
        userName: data.userName || 'Anonymous Student',
        userPhone: data.userPhone || 'No Phone',
        userEmail: data.userEmail || '',
        userPhotoURL: data.userPhotoURL || '',
        testTitle: data.testTitle || 'Entry Test',
        uniKey: data.uniKey || '',
        typeId: data.typeId || '',
        score: data.score || 0,
        totalQuestions: data.totalQuestions || 0,
        percentage: data.percentage !== undefined ? data.percentage : (data.totalQuestions > 0 ? Math.round((data.score / data.totalQuestions) * 100) : 0),
        timeTakenSeconds: data.timeTakenSeconds || 0,
        timeTakenFormatted: data.timeTakenFormatted || 'N/A',
        subjectBreakdown: data.subjectBreakdown || [],
        dateString: data.dateString || 'Recent'
      });
    });
    return results;
  } catch (error) {
    console.error('Error fetching test results:', error);
    return [];
  }
}
