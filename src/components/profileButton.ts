import { Router } from '../router/router';
import { Button } from './button';

export class ProfileButton extends Button {
  constructor() {
    super();
    this.changePage();
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.textContent = 'Profile';
    return this.button;
  }

  private changePage(): void {
    this.button.addEventListener('click', () => {
      const newURL = '/profile';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
