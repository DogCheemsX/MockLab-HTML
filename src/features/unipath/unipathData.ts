import { StudentCredentials, UniversityEligibility, FieldCategory } from '../../types/unipath';

export interface RawUniversityRule {
  uniKey: string;
  name: string;
  shortName: string;
  logo?: string;
  mockLabTestKey?: string;
  minHsscCs: number;
  minHsscEng: number;
  minHsscBus: number;
  minHsscMed: number;
  minHsscSoc: number;
  minHsscArch: number;
  minSscGeneral: number;
  requiredTestName: string;
  allowedStreamsForCs: string[];
  allowedStreamsForEng: string[];
  allowedStreamsForBus: string[];
  allowedStreamsForMed: string[];
  allowedStreamsForSoc: string[];
  allowedStreamsForArch: string[];
  applicationGuide: string;
  programsByField: Partial<Record<FieldCategory, string[]>>;
}

export const UNIVERSITY_RULES: RawUniversityRule[] = [
  {
    uniKey: 'NTS_COMSATS',
    name: 'COMSATS University Islamabad',
    shortName: 'COMSATS',
    logo: 'logos/comsats.jpg',
    mockLabTestKey: 'COMSATS',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 60,
    minSscGeneral: 50,
    requiredTestName: 'NTS NAT-I / COMSATS Special Test',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng', 'arts'],
    applicationGuide: 'COMSATS Architecture & Design requires 60%+ in FSc plus passing the COMSATS Creative/Drawing Test.',
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Cyber Security', 'BS Data Science'],
      engineering: ['BS Electrical Engineering', 'BS Computer Engineering', 'BS Chemical Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Business Analytics'],
      architecture: ['Bachelor of Architecture (B.Arch)', 'BS Design / Interior Design'],
      medical: ['BS Biosciences', 'BS Bioinformatics'],
      social_sciences: ['BS Psychology', 'BS Economics', 'BS English']
    }
  },
  {
    uniKey: 'NUST',
    name: 'National University of Sciences & Technology',
    shortName: 'NUST',
    logo: 'logos/nust.png',
    mockLabTestKey: undefined,
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 60,
    minHsscMed: 60,
    minHsscSoc: 60,
    minHsscArch: 60,
    minSscGeneral: 60,
    requiredTestName: 'NET (NUST Entry Test)',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng', 'arts'],
    applicationGuide: 'NUST Entry Test (NET) contributes 75% to final merit score, with FSc contributing 15% and Matric 10%.',
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Data Science', 'BS Artificial Intelligence'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Civil Engineering', 'BS Aerospace Engineering', 'BS Chemical Engineering'],
      business: ['BBA (Honors)', 'BS Accounting & Finance', 'BS Tourism & Hospitality'],
      architecture: ['Bachelor of Architecture (SADA)', 'BS Industrial Design'],
      medical: ['BS Applied Biosciences'],
      social_sciences: ['BS Economics', 'BS Psychology', 'BS Mass Communication']
    }
  },
  {
    uniKey: 'FAST',
    name: 'FAST National University (NUCES)',
    shortName: 'FAST-NUCES',
    logo: 'logos/fast.png',
    mockLabTestKey: undefined,
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 60,
    minHsscSoc: 50,
    minHsscArch: 60,
    minSscGeneral: 60,
    requiredTestName: 'FAST Entry Test / NTS NAT (60%+ cutoff)',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    applicationGuide: 'FAST requires 60%+ in FSc for Computing & Engineering tracks. Math proficiency in FAST admission test is crucial.',
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Data Science', 'BS Cyber Security'],
      engineering: ['BS Electrical Engineering', 'BS Civil Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Business Analytics']
    }
  },
  {
    uniKey: 'PIEAS',
    name: 'Pakistan Institute of Engineering & Applied Sciences',
    shortName: 'PIEAS',
    logo: 'logos/pieas.png',
    mockLabTestKey: 'PIEAS',
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 60,
    minHsscMed: 60,
    minHsscSoc: 60,
    minHsscArch: 60,
    minSscGeneral: 60,
    requiredTestName: 'PIEAS Written Admission Test',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: [],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: [],
    allowedStreamsForArch: [],
    applicationGuide: 'High-rigor STEM paper pattern focusing heavily on Physics, Mathematics, and Analytical reasoning.',
    programsByField: {
      cs: ['BS Computer Science'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Chemical Engineering', 'BS Materials Engineering']
    }
  },
  {
    uniKey: 'AIR',
    name: 'Air University Islamabad',
    shortName: 'Air University',
    logo: 'logos/air.png',
    mockLabTestKey: 'AIR',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minSscGeneral: 50,
    requiredTestName: 'AU-CBT Entry Test / NTS NAT',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    applicationGuide: 'Computer-Based Test (CBT) assessing English, Analytical Reasoning, Mathematics, and Physics.',
    programsByField: {
      cs: ['BS Computer Science', 'BS Cyber Security', 'BS Software Engineering', 'BS Data Science', 'BS Gaming & Multimedia'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Mechatronics Engineering', 'BS Biomedical Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Aviation Management'],
      social_sciences: ['BS Psychology', 'BS International Relations', 'BS English']
    }
  },
  {
    uniKey: 'BAHRIA',
    name: 'Bahria University Islamabad / Karachi',
    shortName: 'Bahria University',
    logo: 'logos/bahria.png',
    mockLabTestKey: 'BAHRIA',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minSscGeneral: 50,
    requiredTestName: 'BUET (Bahria University Entry Test)',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    applicationGuide: 'BUET test covers English, Quantitative Math, Analytical Reasoning, and Physics/CS fundamentals.',
    programsByField: {
      cs: ['BS Computer Science', 'BS Information Technology', 'BS Software Engineering', 'BS Artificial Intelligence'],
      engineering: ['BS Electrical Engineering', 'BS Software Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Maritime Business'],
      social_sciences: ['BS Psychology', 'BS Media Studies', 'BS Law (LL.B)']
    }
  },
  {
    uniKey: 'CUST',
    name: 'Capital University of Science & Technology',
    shortName: 'CUST',
    logo: 'logos/cust.jpg',
    mockLabTestKey: 'CUST',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minSscGeneral: 50,
    requiredTestName: 'CUST Admission Test / NTS NAT',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    applicationGuide: 'CUST Stream-wise entrance exam covering Quantitative Aptitude, English, and General Knowledge.',
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Civil Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance'],
      medical: ['BS Biosciences', 'BS Pharm-D'],
      social_sciences: ['BS Psychology']
    }
  },
  {
    uniKey: 'LUMS',
    name: 'Lahore University of Management Sciences',
    shortName: 'LUMS',
    logo: 'logos/lums.png',
    mockLabTestKey: undefined,
    minHsscCs: 70,
    minHsscEng: 70,
    minHsscBus: 70,
    minHsscMed: 70,
    minHsscSoc: 70,
    minHsscArch: 70,
    minSscGeneral: 70,
    requiredTestName: 'SAT / LCAT + LUMS SBASSE Test',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    applicationGuide: 'Requires minimum 70% in Matric & FSc (or 2Bs & 1C in A-Levels) plus SAT/LCAT scores.',
    programsByField: {
      cs: ['BS Computer Science'],
      engineering: ['BS Electrical Engineering', 'BS Chemical Engineering'],
      business: ['BBA (Honors)', 'BS Accounting & Finance'],
      social_sciences: ['BA-LL.B (Honors)', 'BS Economics', 'BS History', 'BS English']
    }
  },
  {
    uniKey: 'GIKI',
    name: 'GIK Institute of Engineering Sciences & Tech',
    shortName: 'GIKI',
    logo: 'logos/giki.png',
    mockLabTestKey: undefined,
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 60,
    minHsscMed: 60,
    minHsscSoc: 60,
    minHsscArch: 60,
    minSscGeneral: 60,
    requiredTestName: 'GIKI Engineering Admission Test',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: [],
    allowedStreamsForArch: [],
    applicationGuide: 'GIKI Admission Test evaluates Mathematics and Physics for Engineering and Computer Science applicants.',
    programsByField: {
      cs: ['BS Computer Science', 'BS Artificial Intelligence', 'BS Software Engineering', 'BS Data Science'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Civil Engineering', 'BS Materials Engineering', 'BS Chemical Engineering'],
      business: ['BS Management Sciences']
    }
  }
];

export const calculateEligibility = (creds: StudentCredentials): UniversityEligibility[] => {
  const { sscPercentage, hsscPercentage, stream, desiredField } = creds;

  const results: UniversityEligibility[] = [];

  UNIVERSITY_RULES.forEach((rule) => {
    // 1. Filter out universities that do NOT offer the desired field category at all
    if (desiredField !== 'any') {
      const offeredPrograms = rule.programsByField[desiredField];
      if (!offeredPrograms || offeredPrograms.length === 0) {
        return; // Exclude university completely from results list
      }
    }

    let minReq = 50;
    let fieldAllowed = true;
    let fieldPrograms: string[] = [];

    if (desiredField === 'cs') {
      minReq = rule.minHsscCs;
      fieldPrograms = rule.programsByField.cs || [];
      if (rule.allowedStreamsForCs.length > 0 && !rule.allowedStreamsForCs.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'engineering') {
      minReq = rule.minHsscEng;
      fieldPrograms = rule.programsByField.engineering || [];
      if (rule.allowedStreamsForEng.length > 0 && !rule.allowedStreamsForEng.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'business') {
      minReq = rule.minHsscBus;
      fieldPrograms = rule.programsByField.business || [];
      if (rule.allowedStreamsForBus.length > 0 && !rule.allowedStreamsForBus.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'medical') {
      minReq = rule.minHsscMed;
      fieldPrograms = rule.programsByField.medical || [];
      if (rule.allowedStreamsForMed.length > 0 && !rule.allowedStreamsForMed.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'social_sciences') {
      minReq = rule.minHsscSoc;
      fieldPrograms = rule.programsByField.social_sciences || [];
      if (rule.allowedStreamsForSoc.length > 0 && !rule.allowedStreamsForSoc.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'architecture') {
      minReq = rule.minHsscArch;
      fieldPrograms = rule.programsByField.architecture || [];
      if (rule.allowedStreamsForArch.length > 0 && !rule.allowedStreamsForArch.includes(stream)) {
        fieldAllowed = false;
      }
    } else {
      // 'any'
      minReq = Math.min(rule.minHsscCs, rule.minHsscEng, rule.minHsscBus);
      fieldPrograms = Object.values(rule.programsByField).flat();
    }

    const sscPass = sscPercentage >= rule.minSscGeneral;
    const hsscPass = hsscPercentage >= minReq;

    const isEligible = sscPass && hsscPass && fieldAllowed;

    let reason = '';
    if (!fieldAllowed) {
      reason = `Required background (Pre-Engineering/ICS/Arts) not matched for ${desiredField.toUpperCase()} program.`;
    } else if (!hsscPass) {
      reason = `HSSC / A-Levels score (${hsscPercentage.toFixed(1)}%) is below the minimum required threshold of ${minReq}%.`;
    } else if (!sscPass) {
      reason = `Matric / O-Levels score (${sscPercentage.toFixed(1)}%) is below the minimum required threshold of ${rule.minSscGeneral}%.`;
    } else {
      reason = `Eligible! Your score (${hsscPercentage.toFixed(1)}%) meets the minimum academic criteria of ${minReq}%.`;
    }

    results.push({
      uniKey: rule.uniKey,
      name: rule.name,
      shortName: rule.shortName,
      logo: rule.logo,
      isEligible,
      minPercentageReq: minReq,
      userPercentage: hsscPercentage,
      reason,
      requiredTestName: rule.requiredTestName,
      mockLabTestKey: rule.mockLabTestKey,
      applicationGuide: rule.applicationGuide,
      recommendedFields: fieldPrograms
    });
  });

  return results.sort((a, b) => (a.isEligible === b.isEligible ? 0 : a.isEligible ? -1 : 1));
};
