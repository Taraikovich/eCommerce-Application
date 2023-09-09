import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId } from '../state/getCart';
import { setCartId } from '../state/setCart';

export async function createCart() {
  try {
    if (!getCartId()) {
      const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey,
      });

      const result = await apiRoot
        .carts()
        .post({
          body: {
            currency: 'USD',
          },
        })
        .execute();

      const cartId = result.body.id;

      setCartId(cartId);
    }
  } catch (error) {}
}
