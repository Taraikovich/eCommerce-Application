import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';

export async function getDiscountCode(code: string) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const result = await apiRoot
      .discountCodes()
      .withId({ ID: code })
      .get()
      .execute();

    return result.body.code;
  } catch (error) {
    return 'Discount code not found';
  }
}
