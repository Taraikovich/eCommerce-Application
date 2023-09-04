import {
  createApiBuilderFromCtpClient,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { UserDataAddress, UserData } from '../components/profileForm';

export async function editAddress(
  data: UserData,
  addressId: string,
  address: UserDataAddress,
  event: SubmitEvent
) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const request: MyCustomerUpdate = {
      version: data.version,
      actions: [{ action: 'changeAddress', addressId, address }],
    };
    const { body } = await apiRoot.me().post({ body: request }).execute();
    localStorage.setItem('userData', JSON.stringify(body));
    return body;
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
