import {
  createApiBuilderFromCtpClient,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { UserData } from '../components/profileForm';

export async function updateProfileData(data: UserData, event: SubmitEvent) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });
    const addressActions: MyCustomerUpdateAction[] = data.addresses.map(
      (address) => {
        return {
          action: 'changeAddress',
          addressId: address.id,
          address,
        };
      }
    );
    const request: MyCustomerUpdate = {
      version: data.version,
      actions: [
        { action: 'setFirstName', firstName: data.firstName },
        { action: 'setLastName', lastName: data.lastName },
        { action: 'setDateOfBirth', dateOfBirth: data.dateOfBirth },
        { action: 'changeEmail', email: data.email },
        ...addressActions,
      ],
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
