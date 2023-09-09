export function setCartId(id: string) {
  localStorage.setItem('cartId', id);
}

export function setCartVersion(version: number) {
  localStorage.setItem('cartVersion', version.toString());
}
