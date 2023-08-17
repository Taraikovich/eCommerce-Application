export async function setCart(cartId: string) {
  localStorage.setItem('cart', cartId);
}
