import { Button } from './button';
import { addToCart } from '../api/addToCart';

export class AddToCartButton extends Button {
  constructor(id: string, key: string, productsInCart: string[]) {
    super();
    this.button.textContent = '🛒 +';
    this.chengePage(id, key, productsInCart);
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.className = 'button button__add-to-cart';
    return this.button;
  }

  private chengePage(
    productId: string,
    productKey: string,
    productsInCart: string[]
  ): void {
    if (productsInCart.includes(productId)) {
      this.button.textContent = '🛒 ✔';
      this.button.disabled = true;
    }

    this.button.addEventListener('click', async (event) => {
      event.stopPropagation();
      this.button.textContent = '🛒 ✔';
      this.button.disabled = true;
      await addToCart(productId, productKey);
    });
  }
}
