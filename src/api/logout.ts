import { Router } from '../router/router';
import { createCart } from './createCart';

export function logout(): void {
  window.localStorage.removeItem('cartId');
  window.localStorage.removeItem('userId');
  window.localStorage.removeItem('cartVersion');
  const newURL = '/';
  window.history.pushState({}, '', newURL);
  document.body.textContent = '';
  new Router();
  createCart();
}
