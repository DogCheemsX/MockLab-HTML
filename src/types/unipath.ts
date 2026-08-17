export type AcademicSystem = 'fsc' | 'alevels';

export type FieldCategory =
  | 'any'
  | 'cs'
  | 'engineering'
  | 'business'
  | 'medical'
  | 'social_sciences'
  | 'architecture'
  | 'humanities_arts'
  | 'natural_sciences'
  | 'law'
  | 'media_communications'
  | 'environmental_sciences';

export interface StudentCredentials {
  system: AcademicSystem;
  sscPercentage: number;
  hsscPercentage: number;
  stream: string;
  desiredField: FieldCategory;
  aLevelGrades?: { g1: string; g2: string; g3: string };
}

export interface UniversityEligibility {
  uniKey: string;
  name: string;
  shortName: string;
  logo?: string;
  isEligible: boolean;
  minPercentageReq: number;
  userPercentage: number;
  reason: string;
  requiredTestName: string;
  mockLabTestKey?: string;
  applicationGuide: string;
  recommendedFields: string[];
  rankingTier?: number;
}
