export function getCartId() {
  return localStorage.getItem('cartId') || '';
}

export function getCartVersion(): number {
  return Number(localStorage.getItem('cartVersion')) || 1;
}
