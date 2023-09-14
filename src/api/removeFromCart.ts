import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId, getCartVersion } from '../state/getCart';

export async function removeFromCart(lineItemId: string) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    await apiRoot
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
