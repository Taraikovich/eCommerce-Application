export function getUserId(): string | null {
  const userId = localStorage.getItem('userId');
  return userId;
}
