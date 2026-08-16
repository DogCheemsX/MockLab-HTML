export type AcademicSystem = 'fsc' | 'alevels';

export type FieldCategory =
  | 'any'
  | 'cs'
  | 'engineering'
  | 'business'
  | 'medical'
  | 'social_sciences'
  | 'architecture';

export interface StudentCredentials {
  system: AcademicSystem;
  sscPercentage: number;
  hsscPercentage: number;
  stream: string;
  desiredField: FieldCategory;
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
}
