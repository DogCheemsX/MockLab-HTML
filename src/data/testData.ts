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
      "air-eng": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 25%", "Physics: 10%", "Chemistry: 10%", "Maths: 10%"] },
      "air-med": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 15%", "Physics: 10%", "Chemistry: 10%", "Biology: 20%"] },
      "air-ics": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 25%", "Physics: 10%", "CS: 10%", "Maths: 10%"] },
      "air-com": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 15%", "Accounting: 14%", "Commerce: 13%", "Economics: 13%"] },
      "air-gen": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 25%", "Maths: 10%", "Statistics: 10%", "Economics: 10%"] },
      "air-art": { time: "120 Minutes", marks: "100 MCQs", breakdown: ["English: 20%", "Analytical/Logical: 25%", "Maths: 15%", "Islamiat: 10%", "Pak Studies: 10%", "GK: 20%"] }
    }
  },
  BAHRIA: {
    options: [{ id: "bah-cbt", name: "Standard CBT (Mock Format)" }],
    info: { time: "120 Minutes", marks: "100 MCQs", breakdown: ["Test details will be updated based on specific group selection."] }
  }
};
