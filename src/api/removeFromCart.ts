import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId, getCartVersion } from '../state/getCart';
import { setCartVersion } from '../state/setCart';

export async function removeFromCart(lineItemId: string) {
  try {
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
              lineItemId: lineItemId,
            },
          ],
        },
      })
      .execute();
  } catch (error) {}
}
