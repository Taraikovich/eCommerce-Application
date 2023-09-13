import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Button } from './button';
import { client } from '../api/BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId, getCartVersion } from '../state/getCart';
import { setCartVersion } from '../state/setCart';

export class RemoveFromCartButton extends Button {
  constructor(id: string, key: string, productsInCart: string[]) {
    super();
    this.button.textContent = 'remove from cart';
    this.buttonEvent(id, key, productsInCart);
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.className = 'button button__remove-from-cart';
    return this.button;
  }

  private buttonEvent(
    productId: string,
    productKey: string,
    productsInCart: string[]
  ): void {
    if (productsInCart.includes(productId)) {
      this.button.classList.toggle('button__remove-from-cart_active');
    }

    this.button.addEventListener('click', async (event) => {
      event.stopPropagation();
      this.button.classList.toggle('button__remove-from-cart_active');

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
                action: 'removeLineItem',
                // productId: productId,
                // key: productKey,
                lineItemKey: productKey,
              },
            ],
          },
        })
        .execute();

      setCartVersion(response.body.version);
    });
  }
}
