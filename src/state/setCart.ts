export async function setCart(cartId: string): Promise<void> {
  localStorage.setItem('cart', cartId);
}
