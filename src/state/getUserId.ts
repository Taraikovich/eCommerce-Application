export function getUserId(): string {
  const userId = localStorage.getItem('userId');
  return userId || '';
}
