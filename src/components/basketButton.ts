import { Router } from '../router/router';
import { Button } from './button';

export class BasketButton extends Button {
  constructor() {
    super();
    this.changePage();
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.textContent = 'Basket';
    this.button.className = 'basket-button';
    return this.button;
  }

  private changePage(): void {
    this.button.addEventListener('click', () => {
      const newURL = '/basket';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
