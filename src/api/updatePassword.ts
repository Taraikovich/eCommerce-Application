import {
  createApiBuilderFromCtpClient,
  CustomerChangePassword,
} from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';

export async function updatePassword(
  id: string,
  version: number,
  currentPassword: string,
  newPassword: string,
  event: SubmitEvent
) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const request: CustomerChangePassword = {
      id,
      version,
      currentPassword,
      newPassword,
    };
    const { body } = await apiRoot
      .customers()
      .password()
      .post({ body: request })
      .execute();
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
