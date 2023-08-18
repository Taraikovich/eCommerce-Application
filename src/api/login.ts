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
      tokenCache: {
        get: () => {
          try {
            const token = localStorage.getItem('authToken'); // Пример, используйте свою логику
            return token ? JSON.parse(token) : null;
          } catch (error) {
            console.error('Error while getting token from cache:', error);
            return null;
          }
        },
        set: async (token) => {
          try {
            localStorage.setItem('authToken', JSON.stringify(token)); // Пример, используйте свою логику
          } catch (error) {
            console.error('Error while setting token in cache:', error);
          }
        },
      },
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
        .me()
        .login()
        .post({
          body: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          },
        })
        .execute();
      const userId = body.customer.id;
      setUserId(userId);
      const newURL = '/';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
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
