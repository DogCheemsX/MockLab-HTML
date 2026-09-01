import { TestDataMap } from '../types/test';

export const testData: TestDataMap = {
  COMSATS: {
    options: [
      { id: "nat-ie", name: "Pre-Engineering: NAT-IE" },
      { id: "nat-im", name: "Pre-Medical: NAT-IM" },
      { id: "nat-ics", name: "Computer Science / ICS: NAT-ICS" },
      { id: "nat-igs", name: "General Science: NAT-IGS" },
      { id: "nat-ia", name: "Arts / Humanities: NAT-IA" },
      { id: "nat-icom", name: "Commerce: NAT-ICOM" }
    ],
    infoMap: {
      "nat-ie": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 10 MCQs", "Chemistry: 10 MCQs", "Mathematics: 10 MCQs"] },
      "nat-im": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 8 MCQs", "Chemistry: 8 MCQs", "Biology: 14 MCQs"] },
      "nat-ics": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 10 MCQs", "Computer Science: 10 MCQs", "Mathematics: 10 MCQs"] },
      "nat-igs": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 10 MCQs", "Chemistry: 10 MCQs", "Biology: 10 MCQs"] },
      "nat-ia": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Islamic Studies: 10 MCQs", "Pakistan Studies: 10 MCQs", "General Knowledge & Current Affairs: 10 MCQs"] },
      "nat-icom": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Accounting: 10 MCQs", "Commerce: 10 MCQs", "Economics: 10 MCQs"] }
    }
  },
  NTS: {
    options: [
      { id: "nat-ie", name: "Pre-Engineering: NAT-IE" },
      { id: "nat-im", name: "Pre-Medical: NAT-IM" },
      { id: "nat-ics", name: "Computer Science / ICS: NAT-ICS" },
      { id: "nat-igs", name: "General Science: NAT-IGS" },
      { id: "nat-ia", name: "Arts / Humanities: NAT-IA" },
      { id: "nat-icom", name: "Commerce: NAT-ICOM" }
    ],
    infoMap: {
      "nat-ie": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 10 MCQs", "Chemistry: 10 MCQs", "Mathematics: 10 MCQs"] },
      "nat-im": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 8 MCQs", "Chemistry: 8 MCQs", "Biology: 14 MCQs"] },
      "nat-ics": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 10 MCQs", "Computer Science: 10 MCQs", "Mathematics: 10 MCQs"] },
      "nat-igs": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Physics: 10 MCQs", "Chemistry: 10 MCQs", "Biology: 10 MCQs"] },
      "nat-ia": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Islamic Studies: 10 MCQs", "Pakistan Studies: 10 MCQs", "General Knowledge & Current Affairs: 10 MCQs"] },
      "nat-icom": { time: "120 Minutes", marks: "90 Marks (No negative marking)", breakdown: ["Verbal Ability: 20 MCQs", "Analytical Reasoning: 20 MCQs", "Quantitative Reasoning: 20 MCQs", "Accounting: 10 MCQs", "Commerce: 10 MCQs", "Economics: 10 MCQs"] }
    }
  },
  PIEAS: {
    options: [
      { id: "pieas-eng", name: "Pre-Engineering (Maths, Physics, Chemistry)" },
      { id: "pieas-ics", name: "ICS (Maths, Physics, Computer Science)" },
      { id: "pieas-med", name: "Pre-Medical Stream" },
      { id: "pieas-gen", name: "Science General Stream" }
    ],
    infoMap: {
      "pieas-eng": {
        time: "180 Minutes",
        marks: "100 Marks (No negative marking)",
        breakdown: [
          "Section (I) English: 20 MCQs (Q1-20)",
          "Section (II) Mathematics: 30 MCQs (Q21-50)",
          "Section (III) Physics: 30 MCQs (Q51-80)",
          "Section (IV) Chemistry: 20 MCQs (Q81-100)"
        ]
      },
      "pieas-ics": {
        time: "180 Minutes",
        marks: "100 Marks (No negative marking)",
        breakdown: [
          "Section (I) English: 20 MCQs (Q1-20)",
          "Section (II) Mathematics: 30 MCQs (Q21-50)",
          "Section (III) Physics: 30 MCQs (Q51-80)",
          "Section (IV) Computer Science: 20 MCQs (Q81-100)"
        ]
      },
      "pieas-med": {
        time: "180 Minutes",
        marks: "100 Marks (No negative marking)",
        breakdown: [
          "Section (I) English: 20 MCQs (Q1-20)",
          "Section (II) Biology: 30 MCQs (Q21-50)",
          "Section (III) Physics: 30 MCQs (Q51-80)",
          "Section (IV) Chemistry: 20 MCQs (Q81-100)"
        ]
      },
      "pieas-gen": {
        time: "180 Minutes",
        marks: "100 Marks (No negative marking)",
        breakdown: [
          "Section (I) English: 20 MCQs (Q1-20)",
          "Section (II) Mathematics: 30 MCQs (Q21-50)",
          "Section (III) Physics: 30 MCQs (Q51-80)",
          "Section (IV) Statistics & Data Analysis: 20 MCQs (Q81-100)"
        ]
      }
    }
  },
  AIR: {
    options: [
      { id: "air-eng", name: "Pre-Engineering" },
      { id: "air-med", name: "Pre-Medical" },
      { id: "air-ics", name: "Computer Science (ICS)" },
      { id: "air-com", name: "Commerce (I.Com)" },
      { id: "air-gen", name: "General Science" },
      { id: "air-art", name: "Arts / Humanities" }
    ],
    infoMap: {
      "air-eng": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20 MCQs", "Analytical / Logical: 25 MCQs", "Mathematics: 35 MCQs", "Physics: 10 MCQs", "Chemistry: 10 MCQs"] },
      "air-med": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20 MCQs", "Analytical / Logical: 25 MCQs", "Mathematics: 15 MCQs", "Physics: 10 MCQs", "Chemistry: 10 MCQs", "Biology: 20 MCQs"] },
      "air-ics": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20 MCQs", "Analytical / Logical: 25 MCQs", "Mathematics: 35 MCQs", "Physics: 10 MCQs", "Computer Science: 10 MCQs"] },
      "air-com": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20 MCQs", "Analytical / Logical: 25 MCQs", "Mathematics: 15 MCQs", "Accounting: 14 MCQs", "Commerce: 13 MCQs", "Economics: 13 MCQs"] },
      "air-gen": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20 MCQs", "Analytical / Logical: 25 MCQs", "Mathematics: 35 MCQs", "Statistics: 10 MCQs", "Economics: 10 MCQs"] },
      "air-art": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20 MCQs", "Analytical / Logical: 25 MCQs", "Mathematics: 15 MCQs", "Islamic Studies: 10 MCQs", "Pakistan Studies: 10 MCQs", "General Knowledge: 20 MCQs"] }
    }
  },
  BAHRIA: {
    options: [
      { id: "bah-eng", name: "Engineering, CS & IT Tracks (BS CS, SE, IT, AI/DS, EE/CE)" },
      { id: "bah-bus", name: "Business, Humanities & Social Sciences (BBA, A&F, Psych, Media)" },
      { id: "bah-law", name: "Law & Legal Studies Track (LLB 5-Year + LAT)" },
      { id: "bah-med", name: "Medicine & Allied Health (MBBS, BDS, DPT, Nursing)" },
      { id: "bah-env", name: "Earth & Environmental Sciences (Geology, Geophysics, Environmental)" }
    ],
    infoMap: {
      "bah-eng": {
        time: "120 Minutes",
        marks: "100 Marks (100 MCQs)",
        breakdown: [
          "Verbal Ability (English): 30 MCQs",
          "Mathematics: 30 MCQs",
          "Quantitative Reasoning: 15 MCQs",
          "Analytical Reasoning: 15 MCQs",
          "Physics: 10 MCQs"
        ]
      },
      "bah-bus": {
        time: "120 Minutes",
        marks: "100 Marks (100 MCQs)",
        breakdown: [
          "Verbal Ability (English): 50 MCQs",
          "Quantitative Reasoning: 25 MCQs",
          "General Knowledge / Analytical: 25 MCQs"
        ]
      },
      "bah-law": {
        time: "120 Minutes",
        marks: "100 Marks (100 MCQs)",
        breakdown: [
          "English Verbal Ability: 40 MCQs",
          "General Knowledge & Current Affairs: 30 MCQs",
          "Analytical Reasoning & IQ: 30 MCQs"
        ]
      },
      "bah-med": {
        time: "120 Minutes",
        marks: "100 Marks (100 MCQs)",
        breakdown: [
          "Biology / Life Sciences: 40 MCQs",
          "Chemistry: 25 MCQs",
          "Physics: 20 MCQs",
          "English Verbal: 15 MCQs"
        ]
      },
      "bah-env": {
        time: "120 Minutes",
        marks: "100 Marks (100 MCQs)",
        breakdown: [
          "Verbal Ability (English): 25 MCQs",
          "Quantitative Reasoning: 25 MCQs",
          "Analytical Reasoning: 25 MCQs",
          "Elective Science: 25 MCQs"
        ]
      }
    }
  },
  CUST: {
    options: [
      { id: "cust-comp", name: "Computing & General Track" },
      { id: "cust-eng", name: "Engineering Programs" },
      { id: "cust-bus", name: "Business, Humanities & Social Sciences" },
      { id: "cust-med", name: "Pharm-D, Physical Therapy (DPT) & Biosciences" },
      { id: "cust-law", name: "Law & Legal Studies (LL.B Track)" }
    ],
    infoMap: {
      "cust-comp": {
        time: "90 Minutes",
        marks: "60 Marks (60 MCQs)",
        breakdown: [
          "Quantitative Aptitude: 20 MCQs",
          "English / Verbal Ability: 20 MCQs",
          "General Knowledge: 20 MCQs"
        ]
      },
      "cust-eng": {
        time: "90 Minutes",
        marks: "60 Marks (60 MCQs)",
        breakdown: [
          "Mathematics: 25 MCQs",
          "Physics: 20 MCQs",
          "English: 10 MCQs",
          "Reading Comprehension: 5 MCQs"
        ]
      },
      "cust-bus": {
        time: "90 Minutes",
        marks: "55 Marks (55 MCQs)",
        breakdown: [
          "Quantitative Reasoning: 30 MCQs",
          "English Aptitude: 15 MCQs",
          "General Knowledge: 10 MCQs"
        ]
      },
      "cust-med": {
        time: "90 Minutes",
        marks: "60 Marks (60 MCQs)",
        breakdown: [
          "Biology / Life Sciences: 24 MCQs",
          "Chemistry: 18 MCQs",
          "Physics: 9 MCQs",
          "English: 9 MCQs"
        ]
      },
      "cust-law": {
        time: "90 Minutes",
        marks: "60 Marks (60 MCQs)",
        breakdown: [
          "General Knowledge & Pak Studies: 24 MCQs",
          "English Verbal: 21 MCQs",
          "Analytical & Logical Reasoning: 15 MCQs"
        ]
      }
    }
  }
};
