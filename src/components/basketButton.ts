import { Cart } from '@commercetools/platform-sdk';
import { getCart } from '../api/getCart';
import { Router } from '../router/router';
import { Button } from './button';

export class BasketButton {
  public buttonBasket: HTMLDivElement;
  
  public quantityBasket: HTMLSpanElement;

  constructor() {
    this.buttonBasket = document.createElement('div');
    this.buttonBasket.className = 'basket-button';
    this.quantityBasket = document.createElement('span');

    const busketImg = new Image();
    busketImg.className = 'basket-button-img';
    busketImg.src = require('../images/shopping-cart.png');
    this.buttonBasket.append(busketImg);
    this.buttonBasket.append(this.quantityBasket);
    this.changePage();
    this.updateBasket();
  }

  createButton(): HTMLDivElement {
    return this.buttonBasket;
  }

  public async updateBasket(): Promise<void> {
    const cart: Cart = (await getCart()) as Cart;
    this.quantityBasket.textContent = `${cart?.lineItems?.reduce(
      (prev, current) => {
        return prev + current.quantity;
      },
      0
    ) || 0}`;
  }

  private async changePage(): Promise<void> {
    this.buttonBasket.addEventListener('click', () => {
      const newURL = '/basket';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
  }
}
