import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Button } from './button';
import { client } from '../api/BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId, getCartVersion } from '../state/getCart';
import { setCartVersion } from '../state/setCart';
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
      this.button.after(removeBtn);

      const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey,
      });

      const response = await apiRoot
        .carts()
        .withId({
          ID: getCartId(),
        })
        .post({
          body: {
            version: getCartVersion(),
            actions: [
              {
                action: 'addLineItem',
                productId: productId,
                key: productKey,
              },
            ],
          },
        })
        .execute();

      setCartVersion(response.body.version);
    });
  }
}
