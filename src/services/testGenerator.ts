import { Question, TestInstance } from '../types/test';
import { questionBank } from '../data/questionBank';

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
    title: "Free Test",
    subtitle: "Complimentary practice test paper.",
    badgeText: "FREE TEST",
    difficulty: "Standard"
  },
  {
    title: "Premium Test 1",
    subtitle: "Full practice test paper.",
    badgeText: "PREMIUM TEST",
    difficulty: "Standard"
  },
  {
    title: "Premium Test 2",
    subtitle: "Full practice test paper.",
    badgeText: "PREMIUM TEST",
    difficulty: "Standard"
  },
  {
    title: "Premium Test 3",
    subtitle: "Full practice test paper.",
    badgeText: "PREMIUM TEST",
    difficulty: "Standard"
  }
];

/**
 * Returns the list of test instances for a given university stream.
 * - Instance 1 (Free Test) is strictly free for all users.
 * - Instances 2+ (Premium Test 1, 2, 3) are locked for unpaid users, and unlocked for PRO users.
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
 * Retrieves the unique question set for a specific test instance.
 * Ensures that each mock test paper has a distinct, non-identical permutation.
 */
export function getQuestionsForTestInstance(typeId: string, instanceIndex: number): Question[] {
  const baseQuestions = questionBank[typeId] || [];
  if (baseQuestions.length === 0) return [];

  // Instance 0 (Free Test) returns the baseline curated question set
  if (instanceIndex === 0) {
    return baseQuestions;
  }

  // Instances 1, 2, 3 return distinct seeded permutations
  let seedValue = 0;
  for (let i = 0; i < typeId.length; i++) {
    seedValue += typeId.charCodeAt(i) * (i + 1);
  }
  seedValue += (instanceIndex + 1) * 7919;

  return createSeededShuffle(baseQuestions, seedValue);
}
