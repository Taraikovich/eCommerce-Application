export function getCart(): string | undefined {
  const cart = localStorage.getItem('cart');
  return cart !== null ? cart : undefined;
}
