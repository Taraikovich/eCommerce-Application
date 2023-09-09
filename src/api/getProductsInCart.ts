import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId } from '../state/getCart';

export async function getProductsInCart(): Promise<string[] | []> {
  try {
    const products: string[] = [];

    if (getCartId()) {
      const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey,
      });

      const { body } = await apiRoot
        .carts()
        .withId({
          ID: getCartId(),
        })
        .get()
        .execute();

      body.lineItems.forEach((item) => {
        products.push(item.productId);
      });
    }

    return products || [];
  } catch (error) {
    return [];
  }
}
