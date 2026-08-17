import { StudentCredentials, UniversityEligibility, FieldCategory } from '../../types/unipath';

export interface RawUniversityRule {
  uniKey: string;
  name: string;
  shortName: string;
  rankingTier: number;
  logo?: string;
  mockLabTestKey?: string;
  minHsscCs: number;
  minHsscEng: number;
  minHsscBus: number;
  minHsscMed: number;
  minHsscSoc: number;
  minHsscArch: number;
  minHsscHum?: number;
  minHsscNatSci?: number;
  minHsscLaw?: number;
  minHsscMedia?: number;
  minHsscEnv?: number;
  minSscGeneral: number;
  requiredTestName: string;
  allowedStreamsForCs: string[];
  allowedStreamsForEng: string[];
  allowedStreamsForBus: string[];
  allowedStreamsForMed: string[];
  allowedStreamsForSoc: string[];
  allowedStreamsForArch: string[];
  allowedStreamsForHum?: string[];
  allowedStreamsForNatSci?: string[];
  allowedStreamsForLaw?: string[];
  allowedStreamsForMedia?: string[];
  allowedStreamsForEnv?: string[];
  applicationGuide: string;
  applicationGuideByField?: Partial<Record<FieldCategory, string>>;
  programsByField: Partial<Record<FieldCategory, string[]>>;
}

export const UNIVERSITY_RULES: RawUniversityRule[] = [
  {
    uniKey: 'NUST',
    name: 'National University of Sciences & Technology',
    shortName: 'NUST',
    rankingTier: 1,
    logo: 'logos/nust.png',
    mockLabTestKey: undefined,
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 60,
    minHsscMed: 60,
    minHsscSoc: 60,
    minHsscArch: 60,
    minHsscHum: 60,
    minHsscNatSci: 60,
    minHsscLaw: 60,
    minHsscMedia: 60,
    minHsscEnv: 60,
    minSscGeneral: 60,
    requiredTestName: 'NET (NUST Entry Test)',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng', 'arts'],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForNatSci: ['pre_eng', 'ics', 'pre_med'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForEnv: ['pre_eng', 'ics', 'pre_med'],
    applicationGuide: 'NUST Entry Test (NET) contributes 75% to final merit score, with FSc contributing 15% and Matric 10%.',
    applicationGuideByField: {
      cs: 'NUST Computing NET covers Mathematics, Physics, CS/Chemistry, English, and Intelligence (75% merit weightage).',
      engineering: 'NUST Engineering NET covers Mathematics, Physics, Chemistry, English, and Intelligence (75% merit weightage).',
      business: 'NUST Business & Finance NET covers Quantitative Mathematics, English, and Intelligence (75% merit weightage).',
      architecture: 'NUST Architecture (SADA) requires NET-Architecture covering Math, Physics, Intelligence, and Drawing Test.',
      medical: 'NUST Applied Biosciences NET covers Biology, Chemistry, Physics, English, and Intelligence.',
      social_sciences: 'NUST Social Sciences NET covers General Math, English, and Intelligence.',
      media_communications: 'NUST Mass Communication requires Social Sciences NET (General Math, English, IQ).',
      natural_sciences: 'NUST Natural & Basic Sciences requires NET-Engineering (Math, Physics, Chemistry) or NET-Computing.',
      environmental_sciences: 'NUST Environmental Sciences requires NET-Engineering or NET-Biosciences.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Data Science', 'BS Artificial Intelligence'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Civil Engineering', 'BS Aerospace Engineering', 'BS Chemical Engineering', 'BS Environmental Engineering', 'BS Geoinformatics'],
      business: ['BBA (Honors)', 'BS Accounting & Finance', 'BS Tourism & Hospitality'],
      architecture: ['Bachelor of Architecture (SADA)', 'BS Industrial Design'],
      medical: ['BS Applied Biosciences'],
      social_sciences: ['BS Economics', 'BS Psychology'],
      media_communications: ['BS Mass Communication'],
      natural_sciences: ['BS Mathematics', 'BS Physics', 'BS Chemistry'],
      environmental_sciences: ['BS Environmental Sciences', 'BS Environmental Engineering']
    }
  },
  {
    uniKey: 'LUMS',
    name: 'Lahore University of Management Sciences',
    shortName: 'LUMS',
    rankingTier: 2,
    logo: 'logos/lums.png',
    mockLabTestKey: undefined,
    minHsscCs: 70,
    minHsscEng: 70,
    minHsscBus: 70,
    minHsscMed: 70,
    minHsscSoc: 70,
    minHsscArch: 70,
    minHsscHum: 70,
    minHsscNatSci: 70,
    minHsscLaw: 70,
    minHsscMedia: 70,
    minHsscEnv: 70,
    minSscGeneral: 70,
    requiredTestName: 'SAT / LCAT + LUMS SBASSE / LAT Test',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForNatSci: ['pre_eng', 'ics', 'pre_med'],
    allowedStreamsForLaw: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'Requires minimum 70% in Matric & FSc (or 2Bs & 1C in A-Levels) plus SAT/LCAT scores.',
    applicationGuideByField: {
      cs: 'LUMS SBASSE (CS) requires SAT I / LCAT plus mandatory LUMS SBASSE Scientific Aptitude Test.',
      engineering: 'LUMS SBASSE Engineering requires SAT I / LCAT plus mandatory LUMS SBASSE Scientific Aptitude Test.',
      business: 'LUMS SDSB (BBA/Finance) requires SAT I or LCAT score plus min 70% in Matric/FSc (or 2Bs & 1C in A-Levels).',
      social_sciences: 'LUMS HSS (Economics/Politics) requires SAT I or LCAT score.',
      law: 'LUMS SAHSOL requires SAT I or LCAT score plus mandatory Law Admission Test (LAT).',
      humanities_arts: 'LUMS HSS (English/Comparative Literary & Cultural Studies) requires SAT I or LCAT score.',
      natural_sciences: 'LUMS SBASSE Basic Sciences requires SAT I / LCAT plus LUMS Scientific Aptitude Test.'
    },
    programsByField: {
      cs: ['BS Computer Science'],
      engineering: ['BS Electrical Engineering', 'BS Chemical Engineering'],
      business: ['BBA (Honors)', 'BS Accounting & Finance'],
      social_sciences: ['BS Economics', 'BS Politics & Economics', 'BS History'],
      law: ['BA-LL.B (Honors)'],
      humanities_arts: ['BS English', 'BS Comparative Literary & Cultural Studies'],
      natural_sciences: ['BS Physics', 'BS Chemistry', 'BS Mathematics', 'BS Biology']
    }
  },
  {
    uniKey: 'FAST',
    name: 'FAST National University (NUCES)',
    shortName: 'FAST-NUCES',
    rankingTier: 3,
    logo: 'logos/fast.png',
    mockLabTestKey: undefined,
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 60,
    minHsscSoc: 50,
    minHsscArch: 60,
    minHsscMedia: 50,
    minSscGeneral: 60,
    requiredTestName: 'FAST Entry Test / NTS NAT (60%+ cutoff)',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'FAST requires 50-60%+ in FSc depending on computing, engineering or business/social tracks.',
    applicationGuideByField: {
      cs: 'FAST Computing (CS/SE/AI/DS/Cyber) requires min 60% in FSc (Pre-Eng or ICS). Math proficiency in FAST Entry Test is key.',
      engineering: 'FAST Electrical/Civil Engineering requires min 60% in FSc Pre-Engineering plus FAST Entry Test.',
      business: 'FAST Business Administration & Finance requires min 50% in FSc/ICS/I.Com. Test covers Basic Math, English & IQ.',
      social_sciences: 'FAST Social Sciences & Economics require min 50% in FSc/Inter plus FAST Entry Test.',
      media_communications: 'FAST Media Studies requires min 50% in Intermediate plus FAST Entry Test.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Data Science', 'BS Cyber Security'],
      engineering: ['BS Electrical Engineering', 'BS Civil Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Business Analytics', 'BS FinTech'],
      social_sciences: ['BS Economics'],
      media_communications: ['BS Media Studies']
    }
  },
  {
    uniKey: 'GIKI',
    name: 'GIK Institute of Engineering Sciences & Tech',
    shortName: 'GIKI',
    rankingTier: 4,
    logo: 'logos/giki.png',
    mockLabTestKey: undefined,
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 60,
    minHsscMed: 60,
    minHsscSoc: 60,
    minHsscArch: 60,
    minHsscNatSci: 60,
    minSscGeneral: 60,
    requiredTestName: 'GIKI Engineering Admission Test',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: [],
    allowedStreamsForArch: [],
    allowedStreamsForNatSci: ['pre_eng', 'ics'],
    applicationGuide: 'GIKI Admission Test evaluates Mathematics and Physics for Engineering, CS and Basic Sciences applicants.',
    applicationGuideByField: {
      cs: 'GIKI Test for CS covers Advanced Mathematics, Physics, and English.',
      engineering: 'GIKI Test for Engineering covers Advanced Mathematics, Physics, and English.',
      business: 'GIKI Test for Management Sciences covers Basic Mathematics, English, and Analytical Reasoning.',
      natural_sciences: 'GIKI Test for Engineering Physics & Math covers Advanced Mathematics, Physics, and English.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Artificial Intelligence', 'BS Software Engineering', 'BS Data Science'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Civil Engineering', 'BS Materials Engineering', 'BS Chemical Engineering', 'BS Engineering Sciences'],
      business: ['BS Management Sciences'],
      natural_sciences: ['BS Engineering Physics', 'BS Mathematics']
    }
  },
  {
    uniKey: 'PIEAS',
    name: 'Pakistan Institute of Engineering & Applied Sciences',
    shortName: 'PIEAS',
    rankingTier: 5,
    logo: 'logos/pieas.png',
    mockLabTestKey: 'PIEAS',
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 60,
    minHsscMed: 60,
    minHsscSoc: 60,
    minHsscArch: 60,
    minHsscNatSci: 60,
    minSscGeneral: 60,
    requiredTestName: 'PIEAS Written Admission Test',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: [],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: [],
    allowedStreamsForArch: [],
    allowedStreamsForNatSci: ['pre_eng', 'ics'],
    applicationGuide: 'High-rigor STEM paper pattern focusing heavily on Physics, Mathematics, and Analytical reasoning.',
    applicationGuideByField: {
      cs: 'PIEAS Written Test for CS covers English, Mathematics, Physics, and CS.',
      engineering: 'PIEAS Written Test for Engineering covers English, Mathematics, Physics, and Chemistry.',
      natural_sciences: 'PIEAS Written Test for Physics, Chemistry & Math covers English, Mathematics, Physics, and Chemistry/Statistics.'
    },
    programsByField: {
      cs: ['BS Computer Science'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Chemical Engineering', 'BS Materials Engineering', 'BS Nuclear Engineering'],
      natural_sciences: ['BS Physics', 'BS Chemistry', 'BS Mathematics']
    }
  },
  {
    uniKey: 'NTS_COMSATS',
    name: 'COMSATS University Islamabad',
    shortName: 'COMSATS',
    rankingTier: 6,
    logo: 'logos/comsats.jpg',
    mockLabTestKey: 'COMSATS',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 60,
    minHsscHum: 50,
    minHsscNatSci: 50,
    minHsscMedia: 50,
    minHsscEnv: 50,
    minSscGeneral: 50,
    requiredTestName: 'NTS NAT-I / COMSATS Special Test',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng', 'arts'],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForNatSci: ['pre_eng', 'ics', 'pre_med'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForEnv: ['pre_eng', 'pre_med', 'ics'],
    applicationGuide: 'NTS NAT-I score (or COMSATS Special Test) is required. Merit is calculated as 50% NTS + 40% FSc + 10% Matric.',
    applicationGuideByField: {
      cs: 'COMSATS CS/SE/AI requires min 50% in FSc (Pre-Eng/ICS/Pre-Med) plus NTS NAT-I / COMSATS Special Test.',
      engineering: 'COMSATS Engineering requires min 60% in FSc Pre-Engineering plus passing NTS NAT-I / Special Test.',
      business: 'COMSATS Business Administration & Finance requires min 50% in FSc/ICS/I.Com/Arts plus NTS NAT-I.',
      architecture: 'COMSATS Architecture & Design requires 60%+ in FSc plus passing the COMSATS Creative/Drawing Test.',
      medical: 'COMSATS Biosciences & Bioinformatics require min 50% in FSc Pre-Medical plus NTS NAT-I.',
      social_sciences: 'COMSATS Social Sciences (Psychology, Economics) require min 50% in FSc/Inter plus NTS NAT-I.',
      humanities_arts: 'COMSATS English Literature & Linguistics requires min 50% in Intermediate plus NTS NAT-IA / NAT-I.',
      natural_sciences: 'COMSATS Pure Physics, Chemistry, Math & Stats require min 50% in FSc Pre-Eng/ICS/Pre-Med plus NTS NAT-I.',
      media_communications: 'COMSATS Media & Communication Studies requires min 50% in Intermediate plus NTS NAT-I.',
      environmental_sciences: 'COMSATS Environmental Sciences & Meteorology require min 50% in FSc Pre-Eng/Pre-Med plus NTS NAT-I.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Cyber Security', 'BS Data Science'],
      engineering: ['BS Electrical Engineering', 'BS Computer Engineering', 'BS Chemical Engineering', 'BS Civil Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Business Analytics'],
      architecture: ['Bachelor of Architecture (B.Arch)', 'BS Design / Interior Design'],
      medical: ['BS Biosciences', 'BS Bioinformatics'],
      social_sciences: ['BS Psychology', 'BS Economics'],
      humanities_arts: ['BS English Literature & Linguistics'],
      natural_sciences: ['BS Physics', 'BS Mathematics', 'BS Chemistry', 'BS Statistics'],
      media_communications: ['BS Media & Communication Studies'],
      environmental_sciences: ['BS Environmental Sciences', 'BS Meteorology / Earth Sciences']
    }
  },
  {
    uniKey: 'AIR',
    name: 'Air University Islamabad',
    shortName: 'Air University',
    rankingTier: 7,
    logo: 'logos/air.png',
    mockLabTestKey: 'AIR',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minHsscHum: 50,
    minHsscNatSci: 50,
    minHsscMedia: 50,
    minSscGeneral: 50,
    requiredTestName: 'AU-CBT Entry Test / NTS NAT',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForNatSci: ['pre_eng', 'ics'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'Computer-Based Test (CBT) assessing English, Analytical Reasoning, Mathematics, and Physics.',
    applicationGuideByField: {
      cs: 'AU-CBT for CS covers Physics, Math, English, and Analytical Reasoning.',
      engineering: 'AU-CBT for Engineering covers Physics, Math, Chemistry, and English.',
      business: 'AU-CBT for Business & Finance covers General Math, English, and Analytical Reasoning.',
      social_sciences: 'AU-CBT for Social Sciences covers English, General Knowledge, and Verbal Reasoning.',
      humanities_arts: 'AU-CBT for English Literature & Linguistics covers English, General Knowledge, and Verbal Reasoning.',
      natural_sciences: 'AU-CBT for Math & Physics covers Mathematics, Physics, English, and Analytical Reasoning.',
      media_communications: 'AU-CBT for Media & Mass Communication covers English, General Knowledge, and Media Aptitude.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Cyber Security', 'BS Software Engineering', 'BS Data Science', 'BS Gaming & Multimedia', 'BS Information Technology'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Mechatronics Engineering', 'BS Biomedical Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Aviation Management'],
      social_sciences: ['BS Psychology', 'BS International Relations'],
      humanities_arts: ['BS English Literature & Linguistics'],
      natural_sciences: ['BS Mathematics', 'BS Physics'],
      media_communications: ['BS Media & Mass Communication']
    }
  },
  {
    uniKey: 'BAHRIA',
    name: 'Bahria University Islamabad / Karachi',
    shortName: 'Bahria University',
    rankingTier: 8,
    logo: 'logos/bahria.png',
    mockLabTestKey: 'BAHRIA',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 60,
    minHsscSoc: 50,
    minHsscArch: 50,
    minHsscHum: 50,
    minHsscLaw: 50,
    minHsscMedia: 50,
    minHsscEnv: 50,
    minSscGeneral: 50,
    requiredTestName: 'BUET (Bahria University Entry Test)',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForLaw: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForEnv: ['pre_eng', 'pre_med', 'ics'],
    applicationGuide: 'BUET test covers English, Quantitative Math, Analytical Reasoning, and Physics/CS or General fundamentals.',
    applicationGuideByField: {
      cs: 'BUET for CS covers Maths, Physics/CS, English, and Analytical Reasoning.',
      engineering: 'BUET for Engineering covers Maths, Physics, English, and Analytical Reasoning.',
      business: 'BUET for Business covers General Maths, English, General Knowledge, and Verbal Reasoning.',
      social_sciences: 'BUET for Social Sciences covers English, General Knowledge, and Analytical Reasoning.',
      law: 'BUET Law track requires passing BUET General Test plus HEC Law Admission Test (LAT).',
      medical: 'MBBS/BDS requires MDCAT score (55%+ for MBBS, 50%+ for BDS). DPT & Nursing require BUET Bio Test.',
      humanities_arts: 'BUET for English Literature covers English Verbal Ability, Reading & General Knowledge.',
      media_communications: 'BUET for Media Studies covers General Knowledge, Media Aptitude, and Verbal Ability.',
      environmental_sciences: 'BUET Earth & Environmental Sciences test covers Basic Math, English, IQ, and Elective Science.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Information Technology', 'BS Software Engineering', 'BS Artificial Intelligence'],
      engineering: ['BS Electrical Engineering', 'BS Software Engineering', 'BS Computer Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Maritime Business', 'BS Supply Chain'],
      law: ['LLB (5 Years)'],
      medical: ['MBBS', 'BDS', 'Doctor of Physical Therapy (DPT)', 'BS Nursing'],
      social_sciences: ['BS Psychology', 'BS Development Studies'],
      humanities_arts: ['BS English Literature & Linguistics'],
      media_communications: ['BS Media Studies / TV Broadcasting'],
      environmental_sciences: ['BS Environmental Sciences', 'BS Geology', 'BS Geophysics']
    }
  },
  {
    uniKey: 'UET_LAHORE',
    name: 'University of Engineering & Technology, Lahore',
    shortName: 'UET Lahore',
    rankingTier: 4,
    logo: 'logos/uet.png',
    mockLabTestKey: undefined,
    minHsscCs: 60,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 60,
    minHsscSoc: 50,
    minHsscArch: 60,
    minHsscNatSci: 60,
    minHsscEnv: 60,
    minSscGeneral: 60,
    requiredTestName: 'ECAT (Engineering College Admission Test)',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng'],
    allowedStreamsForNatSci: ['pre_eng', 'ics'],
    allowedStreamsForEnv: ['pre_eng', 'ics'],
    applicationGuide: 'ECAT is mandatory for Engineering & Tech. Merit formula: Matric (17%) + FSc/HSSC (50%) + ECAT (33%).',
    applicationGuideByField: {
      cs: 'UET Computing requires min 60% in FSc (Pre-Eng or ICS). Merit includes ECAT (33%) + FSc (50%) + Matric (17%).',
      engineering: 'UET Engineering requires min 60% in FSc Pre-Engineering & ECAT exam. Merit: FSc (50%) + ECAT (33%) + Matric (17%).',
      business: 'UET Management & Business degrees require min 50-60% in FSc/ICS/I.Com. ECAT is exempt for selected non-engineering tracks.',
      architecture: 'UET Architectural Engineering & Architecture requires min 60% in FSc Pre-Engineering plus ECAT score.',
      natural_sciences: 'UET Natural Sciences (Mathematics, Physics, Chemistry) require min 60% in FSc Pre-Engineering/ICS plus ECAT.',
      environmental_sciences: 'UET Environmental Sciences requires min 60% in FSc Pre-Engineering plus ECAT score.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Artificial Intelligence', 'BS Data Science', 'BS Cyber Security'],
      engineering: ['BE Civil Engineering', 'BE Electrical Engineering', 'BE Mechanical Engineering', 'BE Chemical Engineering', 'BE Computer Engineering', 'BE Software Engineering', 'BE Mechatronics', 'BE Industrial & Manufacturing', 'BE Petroleum & Gas', 'BE Mining', 'BE Metallurgical & Materials', 'BE Automotive Engineering'],
      business: ['BS Business Administration', 'BS Business & IT'],
      architecture: ['Bachelor of Architecture (B.Arch)', 'BE Architectural Engineering', 'BS City & Regional Planning'],
      natural_sciences: ['BS Mathematics', 'BS Physics', 'BS Chemistry'],
      environmental_sciences: ['BS Environmental Sciences']
    }
  },
  {
    uniKey: 'IST',
    name: 'Institute of Space Technology, Islamabad',
    shortName: 'IST',
    rankingTier: 7,
    logo: 'logos/ist.png',
    mockLabTestKey: undefined,
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minHsscNatSci: 50,
    minHsscEnv: 50,
    minSscGeneral: 60,
    requiredTestName: 'IST Admission Test / NTS NAT',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForNatSci: ['pre_eng', 'ics'],
    allowedStreamsForEnv: ['pre_eng', 'ics', 'pre_med'],
    applicationGuide: 'Engineering tracks require min 60% in FSc Pre-Engineering & Matric. Computing & Basic Sciences require min 50%.',
    applicationGuideByField: {
      engineering: 'IST Aerospace/Avionics/Electrical/Mechanical Engineering requires min 60% in FSc Pre-Engineering & Matric Science plus IST Test / NAT.',
      cs: 'IST Computing (CS/AI/DS/SE) requires min 50% in FSc (Pre-Eng, ICS, or Pre-Med with Math deficiency course).',
      medical: 'IST Biotechnology & Nanotechnology require min 50% in FSc Pre-Medical.',
      natural_sciences: 'IST Physics & Mathematics require min 50% in FSc Pre-Engineering / ICS.',
      environmental_sciences: 'IST Space Science & Remote Sensing/GIS require min 50% in FSc Pre-Engineering/ICS.'
    },
    programsByField: {
      engineering: ['BE Aerospace Engineering', 'BE Avionics Engineering', 'BE Electrical Engineering', 'BE Mechanical Engineering', 'BE Materials Engineering', 'BE Computer Engineering'],
      cs: ['BS Computer Science', 'BS Artificial Intelligence', 'BS Data Science', 'BS Software Engineering'],
      medical: ['BS Biotechnology', 'BS Nanotechnology (Chemistry)'],
      natural_sciences: ['BS Physics', 'BS Mathematics'],
      environmental_sciences: ['BS Space Science', 'BS Remote Sensing & GIS']
    }
  },
  {
    uniKey: 'GCU_LAHORE',
    name: 'Government College University, Lahore',
    shortName: 'GCU Lahore',
    rankingTier: 9,
    logo: 'logos/gcu.png',
    mockLabTestKey: undefined,
    minHsscCs: 50,
    minHsscEng: 50,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minHsscHum: 50,
    minHsscNatSci: 50,
    minHsscLaw: 50,
    minHsscMedia: 50,
    minSscGeneral: 50,
    requiredTestName: 'GCU Entrance Test / GAT / LAT',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForNatSci: ['pre_eng', 'ics', 'pre_med'],
    allowedStreamsForLaw: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'GCU BS entry requires 50%-60% in Intermediate plus departmental test / GCU GAT.',
    applicationGuideByField: {
      cs: 'GCU Computer Science & Data Science require min 50-60% in FSc (ICS / Pre-Eng / Pre-Med) plus GCU Entry Test.',
      business: 'GCU Management Sciences & Commerce require min 50% in Intermediate plus GCU GAT.',
      medical: 'GCU Life Sciences (Botany, Zoology, Biotechnology, Microbiology) require min 50% in FSc Pre-Medical.',
      social_sciences: 'GCU Social Sciences & Psychology require min 50% in Intermediate.',
      humanities_arts: 'GCU Humanities, Languages (English, History, Philosophy, Fine Arts) require min 50% in Intermediate plus Aptitude Test for Fine Arts.',
      natural_sciences: 'GCU Pure Physics, Chemistry, Math & Statistics require min 50% in FSc Pre-Eng/ICS/Pre-Med.',
      law: 'GCU BA-LL.B (5 Years) requires min 50% in Intermediate plus HEC Law Admission Test (LAT).',
      media_communications: 'GCU Media & Communication Studies requires min 50% in Intermediate plus GCU Interview.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Data Science'],
      business: ['BBA (Hons)', 'BS Commerce', 'BS Economics'],
      medical: ['BS Botany', 'BS Zoology', 'BS Chemistry', 'BS Biotechnology', 'BS Microbiology'],
      social_sciences: ['BS Psychology', 'BS Political Science', 'BS Sociology'],
      humanities_arts: ['BS English Literature', 'BS History', 'BS Philosophy', 'BS Fine Arts', 'BS Persian/Arabic/Urdu'],
      natural_sciences: ['BS Physics', 'BS Chemistry', 'BS Mathematics', 'BS Statistics'],
      law: ['BA-LL.B (5 Years)'],
      media_communications: ['BS Media & Communication Studies']
    }
  },
  {
    uniKey: 'BNU',
    name: 'Beaconhouse National University, Lahore',
    shortName: 'BNU',
    rankingTier: 10,
    logo: 'logos/bnu.png',
    mockLabTestKey: undefined,
    minHsscCs: 50,
    minHsscEng: 50,
    minHsscBus: 60,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 60,
    minHsscHum: 50,
    minHsscMedia: 50,
    minSscGeneral: 50,
    requiredTestName: 'BNU Aptitude Test & Interview',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: [],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng', 'arts'],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'Requires 50%-60% in Intermediate / O-A Levels (min 8 O-Levels & 3 A-Levels).',
    applicationGuideByField: {
      architecture: 'BNU Bachelor of Architecture (B.Arch) & Interior Design require min 60% in Intermediate/A-Levels plus BNU Design Aptitude Test & Portfolio.',
      humanities_arts: 'BNU SVAD (Fine Arts, Visual Comm, Textile & Fashion Design) requires min 50% in Inter/A-Levels plus Portfolio & Drawing Test.',
      business: 'BNU BBA & Business Intelligence require min 55-60% in Intermediate/A-Levels plus BNU Test.',
      cs: 'BNU CS/SE/AI requires min 50% in FSc/ICS/A-Levels with Mathematics prerequisite.',
      social_sciences: 'BNU Applied Psychology & Liberal Arts require min 50% in Intermediate plus interview.',
      media_communications: 'BNU SMC (Journalism, Media Studies, Theatre/Film/TV) requires min 50% in Intermediate plus Interview.'
    },
    programsByField: {
      architecture: ['Bachelor of Architecture (B.Arch)', 'Bachelor of Interior Design (BID)'],
      humanities_arts: ['Fine Arts (BFA)', 'Visual Communication Design', 'BS Textile & Fashion Design', 'Cultural Studies'],
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Business Computing'],
      business: ['BBA (Hons)', 'BS Business Intelligence & Analytics', 'BS Economics & Finance', 'BS Hospitality Management'],
      social_sciences: ['BS Applied Psychology', 'BS Liberal Arts'],
      media_communications: ['BS Journalism & Media Studies', 'BS Communication & Immersive Media', 'BS Theatre, Film & TV']
    }
  },
  {
    uniKey: 'NCA',
    name: 'National College of Arts',
    shortName: 'NCA',
    rankingTier: 13,
    logo: 'logos/nca.jpg',
    mockLabTestKey: undefined,
    minHsscCs: 50,
    minHsscEng: 50,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 45,
    minHsscArch: 50,
    minHsscHum: 45,
    minHsscMedia: 45,
    minSscGeneral: 45,
    requiredTestName: 'NCA Aptitude Test & Drawing Examination',
    allowedStreamsForCs: [],
    allowedStreamsForEng: [],
    allowedStreamsForBus: [],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng', 'arts'],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'NCA requires 45-50% in Intermediate. Selection heavily relies on intensive Drawing/Design Aptitude Test & Interviews.',
    applicationGuideByField: {
      architecture: 'NCA Bachelor of Architecture & Interior Design require min 50% in Intermediate plus mandatory NCA Architecture Aptitude & Drawing Test.',
      humanities_arts: 'NCA Fine Arts, Visual Communication, Textile & Ceramic Design require min 45% in Inter plus Drawing Examination.',
      media_communications: 'NCA Film & Television & Multimedia Arts require min 45% in Intermediate plus NCA Test & Interview.'
    },
    programsByField: {
      architecture: ['Bachelor of Architecture (B.Arch)', 'Bachelor of Interior Design (BID)'],
      humanities_arts: ['Fine Arts (BFA)', 'Visual Communication Design', 'Textile Design', 'Product Design', 'Ceramic Design', 'Cultural Studies'],
      media_communications: ['BS Film & Television', 'BS Multimedia Arts']
    }
  },
  {
    uniKey: 'IVS',
    name: 'Indus Valley School of Art & Architecture',
    shortName: 'IVS',
    rankingTier: 14,
    logo: 'logos/ivs.png',
    mockLabTestKey: undefined,
    minHsscCs: 50,
    minHsscEng: 50,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minHsscHum: 50,
    minHsscMedia: 50,
    minSscGeneral: 50,
    requiredTestName: 'IVS Entrance Test & Interview',
    allowedStreamsForCs: [],
    allowedStreamsForEng: [],
    allowedStreamsForBus: [],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: ['ics', 'pre_eng', 'arts'],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'Requires passing Intermediate/A-Levels with IBCC Equivalence plus clearing IVS Admissions Test & Interview.',
    applicationGuideByField: {
      architecture: 'IVS Architecture & Interior Design require passing Intermediate/A-Levels plus IVS Entrance Test & Foundation Year.',
      humanities_arts: 'IVS Fine Arts, Communication Design, Textile & Fashion Design require passing Inter/A-Levels plus Entrance Exam & Interview.',
      media_communications: 'IVS Film & Interactive Media requires passing Intermediate/A-Levels plus IVS Interview.'
    },
    programsByField: {
      architecture: ['Bachelor of Architecture (B.Arch)', 'Interior Design'],
      humanities_arts: ['Fine Arts (BFA)', 'Communication Design', 'Textile & Fashion Design', 'Liberal Arts'],
      media_communications: ['Film & Interactive Media']
    }
  },
  {
    uniKey: 'NUML',
    name: 'National University of Modern Languages',
    shortName: 'NUML',
    rankingTier: 15,
    logo: 'logos/numl.png',
    mockLabTestKey: undefined,
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 45,
    minHsscMed: 45,
    minHsscSoc: 45,
    minHsscArch: 50,
    minHsscHum: 45,
    minHsscMedia: 45,
    minSscGeneral: 45,
    requiredTestName: 'NUML Entrance Test',
    allowedStreamsForCs: ['ics', 'pre_eng'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: [],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForHum: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMedia: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'Requires 45%-60% depending on computing/engineering vs language/humanities faculties.',
    applicationGuideByField: {
      cs: 'NUML Computing requires min 50% in FSc (ICS or Pre-Eng) plus NUML Entrance Test.',
      business: 'NUML BBA & Accounting require min 45-50% in FSc/ICS/I.Com/Arts.',
      social_sciences: 'NUML IR, Psychology & Public Policy require min 45% in Intermediate.',
      humanities_arts: 'NUML Faculty of Languages (English Literature, Linguistics, Arabic, Chinese, German, French, History) requires min 45% in Intermediate.',
      media_communications: 'NUML Mass Communication & Media Studies require min 45% in Intermediate.'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence', 'BS Information Technology'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance', 'BS Economics'],
      social_sciences: ['BS International Relations', 'BS Psychology', 'BS Governance & Public Policy'],
      humanities_arts: ['BS English Literature', 'BS Linguistics', 'BS Arabic', 'BS Chinese', 'BS German', 'BS French', 'BS History'],
      media_communications: ['BS Mass Communication', 'BS Media & Journalism']
    }
  },
  {
    uniKey: 'CUST',
    name: 'Capital University of Science & Technology',
    shortName: 'CUST',
    rankingTier: 16,
    logo: 'logos/cust.jpg',
    mockLabTestKey: 'CUST',
    minHsscCs: 50,
    minHsscEng: 60,
    minHsscBus: 50,
    minHsscMed: 50,
    minHsscSoc: 50,
    minHsscArch: 50,
    minHsscNatSci: 50,
    minHsscLaw: 50,
    minSscGeneral: 50,
    requiredTestName: 'CUST Admission Test / NTS NAT / LAT',
    allowedStreamsForCs: ['ics', 'pre_eng', 'pre_med'],
    allowedStreamsForEng: ['pre_eng'],
    allowedStreamsForBus: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForMed: ['pre_med'],
    allowedStreamsForSoc: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    allowedStreamsForArch: [],
    allowedStreamsForNatSci: ['pre_eng', 'ics', 'pre_med'],
    allowedStreamsForLaw: ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'],
    applicationGuide: 'CUST Stream-wise entrance exam covering Quantitative Aptitude, English, and General Knowledge.',
    applicationGuideByField: {
      cs: 'CUST Computing requires min 50% in FSc (ICS/Pre-Eng/Pre-Med) plus CUST Entrance Test.',
      engineering: 'CUST Engineering requires min 60% in FSc Pre-Engineering plus CUST Engineering Test.',
      business: 'CUST Business Administration & Finance requires min 50% in Intermediate plus CUST Business Test.',
      medical: 'CUST Allied Health & Life Sciences (Pharm-D, DPT, Biosciences) require min 50-60% in FSc Pre-Medical.',
      social_sciences: 'CUST Psychology requires min 50% in Intermediate.',
      natural_sciences: 'CUST Mathematics & Physics require min 50% in FSc Pre-Engineering / ICS.',
      law: 'CUST LL.B (5 Years) requires min 50% in Intermediate plus HEC Law Admission Test (LAT).'
    },
    programsByField: {
      cs: ['BS Computer Science', 'BS Software Engineering', 'BS Artificial Intelligence'],
      engineering: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Civil Engineering'],
      business: ['BBA (Bachelor of Business Admin)', 'BS Accounting & Finance'],
      medical: ['BS Biosciences', 'Pharm-D', 'Doctor of Physical Therapy (DPT)'],
      social_sciences: ['BS Psychology'],
      natural_sciences: ['BS Mathematics', 'BS Physics'],
      law: ['LL.B (5 Years)']
    }
  }
];

const GRADE_RANK: Record<string, number> = {
  'A*': 6,
  'A': 5,
  'B': 4,
  'C': 3,
  'D': 2,
  'E': 1
};

export const LUMS_ALLOWED_ALEVEL_COMBINATIONS = new Set([
  'A*,A*,A*',
  'A*,A*,A',
  'A*,A*,B',
  'A*,A*,C',
  'A*,A*,D',
  'A*,A*,E',
  'A*,A,A',
  'A*,A,B',
  'A*,A,C',
  'A*,A,D',
  'A*,A,E',
  'A*,B,B',
  'A*,B,C',
  'A*,B,D',
  'A*,C,C',
  'A*,C,D',
  'A,A,A',
  'A,A,B',
  'A,A,C',
  'A,A,D',
  'A,A,E',
  'A,B,B',
  'A,B,C',
  'A,B,D',
  'A,C,C',
  'B,B,B',
  'B,B,C'
]);

export const isLumsALevelGradeCombinationValid = (grades: { g1: string; g2: string; g3: string }): boolean => {
  const sorted = [grades.g1, grades.g2, grades.g3].sort((a, b) => (GRADE_RANK[b] || 0) - (GRADE_RANK[a] || 0));
  const key = sorted.join(',');
  return LUMS_ALLOWED_ALEVEL_COMBINATIONS.has(key);
};

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
    } else if (desiredField === 'humanities_arts') {
      minReq = rule.minHsscHum ?? 50;
      fieldPrograms = rule.programsByField.humanities_arts || [];
      const allowed = rule.allowedStreamsForHum ?? ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'];
      if (allowed.length > 0 && !allowed.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'natural_sciences') {
      minReq = rule.minHsscNatSci ?? 50;
      fieldPrograms = rule.programsByField.natural_sciences || [];
      const allowed = rule.allowedStreamsForNatSci ?? ['pre_eng', 'ics', 'pre_med'];
      if (allowed.length > 0 && !allowed.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'law') {
      minReq = rule.minHsscLaw ?? 50;
      fieldPrograms = rule.programsByField.law || [];
      const allowed = rule.allowedStreamsForLaw ?? ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'];
      if (allowed.length > 0 && !allowed.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'media_communications') {
      minReq = rule.minHsscMedia ?? 50;
      fieldPrograms = rule.programsByField.media_communications || [];
      const allowed = rule.allowedStreamsForMedia ?? ['ics', 'pre_eng', 'pre_med', 'icom', 'arts'];
      if (allowed.length > 0 && !allowed.includes(stream)) {
        fieldAllowed = false;
      }
    } else if (desiredField === 'environmental_sciences') {
      minReq = rule.minHsscEnv ?? 50;
      fieldPrograms = rule.programsByField.environmental_sciences || [];
      const allowed = rule.allowedStreamsForEnv ?? ['pre_eng', 'pre_med', 'ics'];
      if (allowed.length > 0 && !allowed.includes(stream)) {
        fieldAllowed = false;
      }
    } else {
      // 'any'
      minReq = Math.min(rule.minHsscCs, rule.minHsscEng, rule.minHsscBus, rule.minHsscSoc);
      fieldPrograms = Object.values(rule.programsByField).flat();
    }

    const sscPass = sscPercentage >= rule.minSscGeneral;
    const hsscPass = hsscPercentage >= minReq;

    let isEligible = sscPass && hsscPass && fieldAllowed;
    let lumsGradePass = true;

    // LUMS A-Level minimum grade combination enforcement (over equivalence)
    if (rule.uniKey === 'LUMS' && creds.system === 'alevels' && creds.aLevelGrades) {
      lumsGradePass = isLumsALevelGradeCombinationValid(creds.aLevelGrades);
      if (!lumsGradePass) {
        isEligible = false;
      }
    }

    let reason = '';
    if (!fieldAllowed) {
      reason = `Required academic stream background not matched for ${desiredField.replace('_', ' ').toUpperCase()} program.`;
    } else if (rule.uniKey === 'LUMS' && creds.system === 'alevels' && creds.aLevelGrades && !lumsGradePass) {
      reason = `Ineligible for LUMS: A-Level grades (${creds.aLevelGrades.g1}, ${creds.aLevelGrades.g2}, ${creds.aLevelGrades.g3}) do not meet LUMS's minimum grade requirement (must be at least 2Bs & 1C or an official allowed combination).`;
    } else if (!hsscPass) {
      reason = `HSSC / A-Levels score (${hsscPercentage.toFixed(1)}%) is below the minimum required threshold of ${minReq}%.`;
    } else if (!sscPass) {
      reason = `Matric / O-Levels score (${sscPercentage.toFixed(1)}%) is below the minimum required threshold of ${rule.minSscGeneral}%.`;
    } else {
      reason = `Eligible! Your score (${hsscPercentage.toFixed(1)}%) meets the minimum academic criteria of ${minReq}%.`;
    }

    const selectedGuide = (desiredField !== 'any' && rule.applicationGuideByField?.[desiredField])
      ? rule.applicationGuideByField[desiredField]!
      : rule.applicationGuide;

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
      applicationGuide: selectedGuide,
      recommendedFields: fieldPrograms,
      rankingTier: rule.rankingTier
    });
  });

  return results.sort((a, b) => {
    if (a.isEligible !== b.isEligible) {
      return a.isEligible ? -1 : 1;
    }
    return (a.rankingTier || 99) - (b.rankingTier || 99);
  });
};
