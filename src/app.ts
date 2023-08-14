import './main.scss';
import { Router } from './router/router';

new Router();

window.addEventListener('popstate', () => {
  document.body.textContent = '';
  new Router();
});

// import { ctpClient } from './api/BuildClient';
// import {
//   ApiRoot,
//   createApiBuilderFromCtpClient,
// } from '@commercetools/platform-sdk';

// // Create apiRoot from the imported ClientBuilder and include your Project key
// const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
//   projectKey: 'ecomerce-app',
// });

// console.log(ctpClient);

// const client = ctpClient;

