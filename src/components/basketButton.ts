import { Router } from '../router/router';
import { Button } from './button';

export class BasketButton {

    public buttonBasket: HTMLDivElement;

  constructor() {
this.buttonBasket = document.createElement('div');
 const busketImg = new Image();
     busketImg.className = 'basket-button';
    busketImg.src = require('../images/shopping-cart.png');
    this.buttonBasket.append(busketImg);
    this.changePage();
  }

  createButton(): HTMLDivElement {

   
    return this.buttonBasket;
  }

  private changePage(): void {
    this.buttonBasket.addEventListener('click', () => {
      const newURL = '/basket';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
