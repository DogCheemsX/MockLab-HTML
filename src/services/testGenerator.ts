import { Question, TestInstance } from '../types/test';
import { questionBank } from '../data/questionBank';
import { getOfficialSectionTitle } from '../utils/sectionUtils';

/**
 * Seeded deterministic permutation generator to guarantee
 * unique non-overlapping question sequences per test instance.
 */
function createSeededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let m = result.length;
  let t: T;
  let i: number;
  let s = seed;

  while (m) {
    s = (s * 9301 + 49297) % 233280;
    i = Math.floor((s / 233280) * m--);
    t = result[m];
    result[m] = result[i];
    result[i] = t;
  }

  return result;
}

export interface InstanceMeta {
  title: string;
  subtitle: string;
  badgeText: string;
  difficulty: 'Standard' | 'Challenging' | 'High-Rigor' | 'Mastery';
}

const INSTANCE_DEFINITIONS: InstanceMeta[] = [
  {
    title: "Free Full Length Past Paper",
    subtitle: "Full length past paper based on official exam pattern.",
    badgeText: "FREE TEST",
    difficulty: "Standard"
  },
  {
    title: "Full Length Past Paper #1",
    subtitle: "Randomized paper draw with exact subject weightage.",
    badgeText: "FULL LENGTH PAST PAPER",
    difficulty: "Standard"
  },
  {
    title: "Full Length Past Paper #2",
    subtitle: "Randomized paper draw with exact subject weightage.",
    badgeText: "FULL LENGTH PAST PAPER",
    difficulty: "Standard"
  },
  {
    title: "Full Length Past Paper #3",
    subtitle: "Randomized paper draw with exact subject weightage.",
    badgeText: "FULL LENGTH PAST PAPER",
    difficulty: "Standard"
  }
];

/**
 * Returns the list of test instances for a given university stream.
 * - Instance 1 (Free Full Length Past Paper) is free for all users.
 * - Instances 2+ are unlocked for PRO users.
 */
export function getTestInstances(typeId: string, isPremium?: boolean): TestInstance[] {
  const baseQuestions = questionBank[typeId] || [];
  const questionCount = baseQuestions.length || 100;
  const isUserPremium = isPremium === true;

  return INSTANCE_DEFINITIONS.map((meta, index) => {
    const isFree = index === 0;
    const isLocked = !isFree && !isUserPremium;

    return {
      id: `${typeId}-test-${index + 1}`,
      instanceNumber: index + 1,
      title: meta.title,
      tag: isFree ? "FREE" : "PREMIUM",
      badgeText: meta.badgeText,
      difficulty: meta.difficulty,
      isLocked,
      isFree,
      questionCount,
      durationMinutes: 120,
      description: meta.subtitle
    };
  });
}

/**
 * Generates an on-demand, dynamically shuffled past paper.
 * Preserves strict subject block ordering, section headers, and mark counts.
 */
export function generateOnDemandSimulation(typeId: string, seed?: number): Question[] {
  const baseQuestions = questionBank[typeId] || [];
  if (baseQuestions.length === 0) return [];

  const activeSeed = seed || (Date.now() + Math.floor(Math.random() * 1000000));

  // Group questions by official section title to preserve strict sequential subject order
  const subjectGroups: { subject: string; questions: Question[] }[] = [];
  baseQuestions.forEach((q) => {
    const officialSubj = getOfficialSectionTitle(typeId, q.subject);
    const lastGroup = subjectGroups[subjectGroups.length - 1];
    if (lastGroup && lastGroup.subject === officialSubj) {
      lastGroup.questions.push(q);
    } else {
      subjectGroups.push({ subject: officialSubj, questions: [q] });
    }
  });

  // Shuffle within each subject block separately
  const shuffledQuestions: Question[] = [];
  subjectGroups.forEach((group, idx) => {
    const groupSeed = activeSeed + (idx + 1) * 3137;
    const shuffledBlock = createSeededShuffle(group.questions, groupSeed);
    shuffledQuestions.push(...shuffledBlock);
  });

  return shuffledQuestions;
}

/**
 * Retrieves the unique question set for a specific test instance.
 */
export function getQuestionsForTestInstance(typeId: string, instanceIndex: number): Question[] {
  if (instanceIndex === 0) {
    return questionBank[typeId] || [];
  }
  let seedValue = 0;
  for (let i = 0; i < typeId.length; i++) {
    seedValue += typeId.charCodeAt(i) * (i + 1);
  }
  seedValue += (instanceIndex + 1) * 7919;
  return generateOnDemandSimulation(typeId, seedValue);
}
