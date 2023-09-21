import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { getCartId, getCartVersion } from '../state/getCart';
import { setCartVersion } from '../state/setCart';

export async function addDiscountCode(code: string) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const result = await apiRoot
      .carts()
      .withId({
        ID: getCartId(),
      })
      .post({
        body: {
          version: getCartVersion(),
          actions: [
            {
              action: 'addDiscountCode',
              code: code,
            },
          ],
        },
      })
      .execute();
    setCartVersion(result.body.version);
    return true;
  } catch (error) {
    return false;
  }
}
