import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';
import {
  clientId,
  clientSecret,
  projectKey,
  scopes,
} from '../constants/constants';
import { tokenCache } from './tokenCache';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export let client: Client;

export function buildClient() {
  const cachedToken = tokenCache.get();
  const refreshToken = cachedToken?.refreshToken;
  if (refreshToken !== undefined) {
    const options: RefreshAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      refreshToken,
      tokenCache,
      fetch,
    };
    client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withRefreshTokenFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  } else {
    client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }
}

buildClient();
