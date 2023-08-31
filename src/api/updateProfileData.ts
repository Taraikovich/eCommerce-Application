import {
  createApiBuilderFromCtpClient,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';
import { UserData } from '../components/profileForm';

export async function updateProfileData(data: UserData) {
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
        ...addressActions,
      ],
    };
    const { body } = await apiRoot.me().post({ body: request }).execute();
    localStorage.setItem('userData', JSON.stringify(body));
    return body;
  } catch (error) {
    console.log(error);
  }
}
