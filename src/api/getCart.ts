import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId } from '../state/getCart';
import { setCartVersion } from '../state/setCart';

export async function getCart() {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const result = await apiRoot
      .carts()
      .withId({
        ID: getCartId(),
      })
      .get()
      .execute();
    setCartVersion(result.body.version);
    return result.body;
  } catch (error) {}
}
