import {
  TokenCache,
  TokenStore,
} from '@commercetools/sdk-client-v2/dist/declarations/src/types/sdk';

export const tokenCache: TokenCache = {
  get: () => {
    try {
      const token = localStorage.getItem('authToken');
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.error('Error while getting token from cache:', error);
      return null;
    }
  },
  set: async (cache: TokenStore) => {
    try {
      const token = JSON.stringify(cache); // Assuming cache is an object, adjust as needed
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error while setting token in cache:', error);
    }
  },
};
