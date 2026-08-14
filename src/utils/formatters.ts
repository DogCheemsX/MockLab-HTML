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
