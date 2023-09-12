import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { setCartId, setCartVersion } from '../state/setCart';
import { getUserId } from '../state/getUserId';

export async function gerCartById() {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const result = await apiRoot
      .carts()
      .withCustomerId({
        customerId: getUserId(),
      })
      .get()
      .execute();

    const cartId = result.body.id;

    setCartId(cartId);
    setCartVersion(result.body.version);
  } catch (error) {}
}
