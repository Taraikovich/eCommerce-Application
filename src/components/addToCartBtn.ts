import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Button } from './button';
import { client } from '../api/BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId, getCartVersion } from '../state/getCart';
import { setCartVersion } from '../state/setCart';
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
      await addToCart(productId, productKey)
    });
  }
}
