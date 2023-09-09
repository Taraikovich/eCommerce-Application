import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '../constants/constants';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { setUserId } from '../state/setUserId';
import { Router } from '../router/router';
import { tokenCache } from './tokenCache';
import { buildClient } from './BuildClient';
import { getCartId } from '../state/getCart';

export async function login(event: SubmitEvent) {
  if (event.target instanceof HTMLFormElement) {
    const formData = new FormData(event.target);

    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user: {
          username: formData.get('email') as string,
          password: formData.get('password') as string,
        },
      },
      scopes,
      tokenCache,
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: 'https://api.europe-west1.gcp.commercetools.com',
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();

    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey,
    });

    try {
      const { body } = await apiRoot
        // .me()
        .login()
        .post({
          body: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            anonymousCart: {
              id: getCartId(),
              typeId: 'cart',
            },
          },
        })
        .execute();
      const userId = body.customer.id;
      setUserId(userId);
      const newURL = '/';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
      buildClient();
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
