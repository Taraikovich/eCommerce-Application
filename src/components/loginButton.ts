import { Router } from '../router/router';
import { Button } from './button';

export class LoginButton extends Button {
  constructor() {
    super();
    this.chengePage();
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.textContent = 'Login';
    return this.button;
  }

  private chengePage(): void {
    this.button.addEventListener('click', () => {
      const newURL = '/login';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
