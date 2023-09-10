import { createCart } from './api/createCart';
import './main.scss';
import { Router } from './router/router';

new Router();

window.addEventListener('popstate', () => {
  document.body.textContent = '';
  new Router();
});

createCart();
