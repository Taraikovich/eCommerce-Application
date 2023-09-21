import { Button } from './button';
import { addToCart } from '../api/addToCart';
import { RemoveFromCartButton } from './removeFromCartBtn';

export class AddToCartButton extends Button {
  constructor(id: string, key: string, productsInCart: string[]) {
    super();
    this.button.textContent = '🛒 +';
    this.buttonEvent(id, key, productsInCart);
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.className = 'button button__add-to-cart';
    return this.button;
  }

  private buttonEvent(
    productId: string,
    productKey: string,
    productsInCart: string[]
  ): void {
    if (productsInCart.includes(productId)) {
      this.button.textContent = '🛒 ✔';
      this.button.disabled = true;
    }

    const removeBtn = new RemoveFromCartButton(
      productId,
      productKey,
      productsInCart
    ).createButton();
    removeBtn.addEventListener('click', () => {
      this.button.textContent = '🛒 +';
      this.button.disabled = false;
      removeBtn.remove();
    });

    this.button.addEventListener('click', async (event) => {
      event.stopPropagation();
      this.button.textContent = '🛒 ✔';
      this.button.disabled = true;
      await addToCart(productId, productKey);
    });
  }
}
