import './main.scss';
import { Router } from './router/router';

new Router();

window.addEventListener('popstate', () => {
  document.body.textContent = '';
  new Router();
});

import { ctpClient } from './api/BuildClient';
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: 'ecomerce-app' })

console.log(ctpClient)

const client = ctpClient;

async function getToken() {
  try {
    const tokenResponse = await client.authFlow.passwordFlow(); // Вызов метода для аутентификации
    const accessToken = tokenResponse.access_token; // Получение токена из ответа
    console.log("Access Token:", accessToken);
  } catch (error) {
    console.error("Error while obtaining token:", error);
  }
}

// Вызов функции для получения токена
getToken();

// // Example call to return Project information
// // This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// const returnCustomerByEmail = (customerEmail: string) => {
//   return apiRoot
//     .customers()
//     .get({
//       queryArgs: {
//         where: `email="${customerEmail}"`,
//       },
//     })
//     .execute();
// };

// // Retrieve Project information and output the result to the log
// returnCustomerByEmail('1033837@gmail.com')
//   .then(({ body }) => {
//     // As email addresses must be unique, either 0 or 1 Customers will be returned.
//     // If 0, then no Customer exists with this email address.
//     if (body.results.length == 0) {
//       console.log("This email address has not been registered.");
//     }
//     else {
//       // Since there can be only one Customer resource in the result, it must be the first entry of the results array. This outputs the Customer's id.
//       console.log(body.results[0].id);
//     }
//   })
//   .catch(console.error);

  // const login = (cart: string) => {
  //   return apiRoot
  //   .login()
  //   .post({
  //     body: {
  //       "email" : "1033837@gmail.com",
  //       "password" : "141183",
  //       "anonymousCart" : {
  //         "id" : `${cart}`,
  //         "typeId" : "cart"
  //       }
  //     }
  //   })
  //   .execute()
  // }

  // const createCart = () => {
  //   return apiRoot
  //   .carts()
  //   .post({
  //     body: {"currency" : "EUR"}
  //   })
  //   .execute();
  // }

  // createCart()
  // .then(({ body }) => {
  //   const id = body.id;
  //   return id;
  // })
  // .then((id) => {
  //   login(id)
  //   .then(({body}) => {
  //     console.log(body.customer.firstName)
  //   })
  // })
  // .catch(console.error);



