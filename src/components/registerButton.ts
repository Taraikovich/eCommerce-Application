import { Router } from '../router/router';
import { Button } from './button';

export class RegisterButton extends Button {
  constructor() {
    super();
    this.chengePage();
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.textContent = 'Register';
    return this.button;
  }

  private chengePage(): void {
    this.button.addEventListener('click', () => {
      const newURL = '/register';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
