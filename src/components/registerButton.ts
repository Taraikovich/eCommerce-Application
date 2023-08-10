import { Router } from '../router/router';
import { Button } from './button';

export class RegisterButton extends Button {
  constructor(node: HTMLElement) {
    super(node);
    this.chengePage();
  }

  addButton(node: HTMLElement) {
    super.addButton(node);
    this.button.textContent = 'Register';
  }

  chengePage() {
    this.button.addEventListener('click', () => {
      const newURL = '/register';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
