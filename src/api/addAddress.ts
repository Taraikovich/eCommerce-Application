import {
  createApiBuilderFromCtpClient,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { UserDataAddress, UserData } from '../components/profileForm';

export async function addAddress(
  data: UserData,
  address: UserDataAddress,
  isBilling: boolean,
  event: SubmitEvent
) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const request: MyCustomerUpdate = {
      version: data.version,
      actions: [{ action: 'addAddress', address }],
    };
    const { body } = await apiRoot.me().post({ body: request }).execute();

    const requestSecond: MyCustomerUpdate = {
      version: body.version,
      actions: [
        {
          action: isBilling ? 'addBillingAddressId' : 'addShippingAddressId',
          addressId: body.addresses[body.addresses.length - 1].id,
        },
      ],
    };
    const bodySecond = await (
      await apiRoot.me().post({ body: requestSecond }).execute()
    ).body;
    localStorage.setItem('userData', JSON.stringify(bodySecond));
    return bodySecond;
  } catch (error) {
    if (event.target instanceof HTMLFormElement) {
      const errorMessage = document.createElement('p');
      errorMessage.className = 'error-message';
      if (error instanceof Error) {
        errorMessage.textContent = error.message;
        event.target.append(errorMessage);
      }
    }
  }
}
