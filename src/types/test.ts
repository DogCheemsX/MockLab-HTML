export type UniversityKey = 'COMSATS' | 'NTS' | 'PIEAS' | 'AIR' | 'BAHRIA';

export interface TestOption {
  id: string;
  name: string;
}

export interface TestInfo {
  time: string;
  marks: string;
  breakdown: string[];
}

export interface UniversityData {
  options: TestOption[];
  info?: TestInfo;
  infoMap?: Record<string, TestInfo>;
}

export interface Question {
  q: string;
  options: string[];
  ans: number;
}

export type TestDataMap = Record<UniversityKey, UniversityData>;
export type QuestionBankMap = Record<string, Question[]>;

export type UserAnswers = Record<number, number>;
export type ReviewStatus = Record<number, boolean>;

export type AppScreen =
  | 'loading'
  | 'auth'
  | 'intro'
  | 'admin'
  | 'select-university'
  | 'select-type'
  | 'test-info'
  | 'active-test'
  | 'result';
