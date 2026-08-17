/**
 * Calculates Levenshtein distance between two strings.
 */
export function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Checks if query matches target with typo tolerance, sub-sequence, or substring matching.
 */
export function fuzzyMatch(query: string, target: string, maxDistance: number = 2): boolean {
  const cleanQuery = query.trim().toLowerCase();
  const cleanTarget = target.trim().toLowerCase();

  if (!cleanQuery) return true;
  if (cleanTarget.includes(cleanQuery)) return true;

  // Words breakdown comparison
  const queryWords = cleanQuery.split(/\s+/);
  const targetWords = cleanTarget.split(/\s+/);

  return queryWords.every((qWord) => {
    if (!qWord) return true;
    // Direct substring match in any word
    if (targetWords.some((tWord) => tWord.includes(qWord) || qWord.includes(tWord))) {
      return true;
    }
    // Typo tolerance Levenshtein check
    return targetWords.some((tWord) => {
      if (Math.abs(tWord.length - qWord.length) > maxDistance) return false;
      return getLevenshteinDistance(qWord, tWord) <= maxDistance;
    });
  });
}
