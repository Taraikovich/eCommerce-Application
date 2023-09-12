import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId, getCartVersion } from '../state/getCart';

export async function clearCart() {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const response = await apiRoot
      .carts()
      .withId({
        ID: getCartId(),
      })
      .delete({
        queryArgs: {
          version: getCartVersion(),
        },
      })
      .execute();
      localStorage.removeItem('cartId')

  } catch (error) {}
}
