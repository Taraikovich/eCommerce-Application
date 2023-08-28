import './main.scss';
import { Router } from './router/router';
import { CatalogView } from './views/CatalogViev';

new Router();

window.addEventListener('popstate', () => {
  document.body.textContent = '';
  new Router();
});

// async function addCards() {
//   const prod = await getProducts();
//   console.log(prod);
//   if (prod) {
//     console.log(prod[0].img);
//     const products = Object.values(prod);
//     for (const key of products) {
//       const card = new PronuctCart();
//       document.body.append(card.createCard(key.img, key.name, key.description));
//     }
//   }
// }

// addCards();
document.body.innerHTML = '';
new CatalogView().createView();
