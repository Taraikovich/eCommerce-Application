import { Router } from '../router/router';
import { Button } from './button';

export class LoginButton extends Button {
  constructor(node: HTMLElement) {
    super(node);
    this.chengePage();
  }

  addButton(node: HTMLElement) {
    super.addButton(node);
    this.button.textContent = 'Login';
  }

  chengePage() {
    this.button.addEventListener('click', () => {
      const newURL = '/login';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
