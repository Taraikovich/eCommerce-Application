import { Router } from '../router/router';
import { setUserId } from '../state/setUserId';

export function logout() {
  setUserId('');
  const newURL = '/';
  window.history.pushState({}, '', newURL);
  document.body.textContent = '';
  new Router();
}
