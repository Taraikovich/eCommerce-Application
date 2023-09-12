import {
  Cart,
  LineItem,
  LocalizedString,
  Image,
} from '@commercetools/platform-sdk';
import { getCart } from '../api/getCart';
import { changeLineItemQuantity } from '../api/changeLineItemQuantity';
import { removeFromCart } from '../api/removeFromCart';
import { createCart } from '../api/createCart';
import { clearCart } from '../api/clearCart';

export class BasketForm {
  private form: HTMLDivElement;

  private itemsContainer: HTMLDivElement;

  callback?: () => void;

  private productsInCart: {
    id: string;
    key: string;
    name: LocalizedString;
    image: string;
    quantity: number;
    price: number;
  }[] = [];

  constructor() {
    this.form = document.createElement('div');
    this.itemsContainer = document.createElement('div');

    this.form.className = 'basket-form';
    this.itemsContainer.className = 'basket-items';

    this.form.appendChild(this.itemsContainer);
  }

  async createForm(callback?: () => void): Promise<HTMLDivElement> {
    this.callback = callback ? callback : this.callback;
    const cart: Cart = (await getCart()) as Cart;
    this.productsInCart = [];
    this.itemsContainer.innerHTML = '';
    if (cart?.lineItems?.length) {
      cart.lineItems.forEach((item: LineItem) => {
        this.addItemToBasket({
          id: item.id,
          key: item.key as string,
          name: item.name,
          image: (item.variant?.images as Image[])[0]?.url,
          quantity: item.quantity,
          price: item.price.value.centAmount,
        });
      });
      this.updateBasket();
      const clearCartButton = document.createElement('button');
      clearCartButton.textContent = 'Clear shoping cart';
      clearCartButton.addEventListener('click', async () => {
        await clearCart();
        await createCart();
        await this.createForm();
        if (this.callback) {
          this.callback();
        }
      });
      this.itemsContainer.appendChild(clearCartButton);
    } else {
      const emptyCart = document.createElement('div');
      emptyCart.textContent = 'Your cart is empty!';

      this.itemsContainer.appendChild(emptyCart);
    }

    return this.form;
  }

  addItemToBasket(product: {
    id: string;
    key: string;
    name: LocalizedString;
    image: string;
    quantity: number;
    price: number;
  }) {
    this.productsInCart.push(product);
  }

  private updateBasket() {
    console.log(this.productsInCart);
    for (const product of this.productsInCart) {
      const leftButton = document.createElement('button');
      leftButton.textContent = '-';
      leftButton.addEventListener('click', async () => {
        await changeLineItemQuantity(product.id, product.quantity - 1);
        await this.createForm();
        if (this.callback) {
          this.callback();
        }
      });
      const quantityInCart = document.createElement('span');
      quantityInCart.textContent = `${product.quantity}`;
      const rightButton = document.createElement('button');
      rightButton.textContent = '+';
      rightButton.addEventListener('click', async () => {
        await changeLineItemQuantity(product.id, product.quantity + 1);
        await this.createForm();
        if (this.callback) {
          this.callback();
        }
      });
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove from cart';
      removeButton.addEventListener('click', async () => {
        await removeFromCart(product.id);
        await this.createForm();
        if (this.callback) {
          this.callback();
        }
      });
      const item = document.createElement('div');
      item.textContent = product.name['en-US'];
      const image = new Image();
      image.src = product.image;
      image.width = 150;
      const price = document.createElement('div');
      price.textContent = `${product.price / 100} $`;
      item.appendChild(image);
      item.appendChild(price);
      item.appendChild(removeButton);
      item.appendChild(leftButton);
      item.appendChild(quantityInCart);
      item.appendChild(rightButton);
      this.itemsContainer.appendChild(item);
    }
  }
}
