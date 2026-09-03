export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => (num < 10 ? '0' + num : num.toString());
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

export function getScoreMessage(score: number, total: number): string {
  if (total === 0) return '';
  const percent = (score / total) * 100;
  if (percent > 80) return 'Excellent Job! 🚀';
  if (percent > 50) return 'Good Effort! 👍';
  return 'Keep Practicing! 📚';
}

/**
 * Extract initials from a user's display name.
 * - Single name ("Ali") -> "A"
 * - Multi-word name ("Ali Ahsan") -> "AA"
 * - Multi-word name ("Syed Ali Ahsan") -> "SA" (first & last initials)
 */
export function getUserInitials(name?: string | null): string {
  if (!name) return 'S';
  const cleanName = name.trim();
  if (!cleanName) return 'S';

  const parts = cleanName.split(/[\s._]+/).filter(Boolean);
  if (parts.length === 0) return 'S';
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Formats elapsed seconds into human-readable duration (e.g. 1h 24m 15s, 42m 10s, 35s).
 */
export function formatDurationHHMMSS(totalSeconds?: number): string {
  if (!totalSeconds || totalSeconds <= 0) return 'Under 1m';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const parts: string[] = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0 || hrs > 0) parts.push(`${mins}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
}

