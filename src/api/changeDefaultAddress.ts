import {
  createApiBuilderFromCtpClient,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { UserData } from '../components/profileForm';

export async function changeDefaultAddress(
  data: UserData,
  addressId: string,
  isBilling: boolean
) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const request: MyCustomerUpdate = {
      version: data.version,
      actions: [
        {
          action: isBilling
            ? 'setDefaultBillingAddress'
            : 'setDefaultShippingAddress',
          addressId,
        },
      ],
    };
    const { body } = await apiRoot.me().post({ body: request }).execute();
    localStorage.setItem('userData', JSON.stringify(body));
    return body;
  } catch (error) {}
}
