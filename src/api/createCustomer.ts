import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';
import { projectKey } from '../constants/constants';
import { login } from './login';

export async function createCustomer(event: SubmitEvent) {
  event.preventDefault();
  if (event.target instanceof HTMLFormElement) {
    const formData = new FormData(event.target);

    try {
      const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
        projectKey,
      });

      await apiRoot
        .me()
        .signup()
        .post({
          body: {
            email: formData.get('email') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            dateOfBirth: formData.get('birth') as string,
            password: formData.get('password') as string,
            addresses: [
              {
                country: formData.get('shipping-country') as string,
                city: formData.get('shipping-city') as string,
                postalCode: formData.get('shipping-postal-code') as string,
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                streetName: formData.get('shipping-street') as string,
              },
              {
                country: formData.get('billing-country') as string,
                city: formData.get('billing-city') as string,
                postalCode: formData.get('billing-postal-code') as string,
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                streetName: formData.get('billing-street') as string,
              },
            ],
            defaultShippingAddress: 0,
            defaultBillingAddress: 1,
          },
        })
        .execute();
      login(event);

      
    } catch (error) {
      const errorMessage = document.createElement('p');
      errorMessage.className = 'error-message';
      if (error instanceof Error) {
        errorMessage.textContent = error.message;
        event.target.append(errorMessage);
      }
    }
  }
}
