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
    totalPrice: number;
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
          totalPrice: item.totalPrice.centAmount,
        });
      });
      this.updateBasket();
      const clearCartButton = document.createElement('button');
      clearCartButton.textContent = 'Clear shoping cart';
      let totalCost = 0;
      for (const product of this.productsInCart) {
        totalCost += (product.price * product.quantity) / 100;
      }
      const totalCostElement = document.createElement('div');
      totalCostElement.className = 'total-cost';
      totalCostElement.textContent = `Total cost: ${totalCost.toFixed(2)} $ `;
      clearCartButton.addEventListener('click', async () => {
        await clearCart();
        await createCart();
        await this.createForm();
        if (this.callback) {
          this.callback();
        }
      });
      this.itemsContainer.appendChild(clearCartButton);
      this.itemsContainer.appendChild(totalCostElement);
    } else {
      const emptyCart = document.createElement('div');
      const emptyCartWrapper = document.createElement('div');
      emptyCartWrapper.className = 'empty-wrapper';
      emptyCart.className = 'empty-text';
      emptyCart.textContent = 'Your cart is empty!';
      const catalogLink = document.createElement('a');
      catalogLink.textContent = 'Go to Catalog';
      catalogLink.href = '/products';
      emptyCartWrapper.appendChild(emptyCart);
      emptyCartWrapper.appendChild(catalogLink);
      this.itemsContainer.appendChild(emptyCartWrapper);
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
    totalPrice: number;
  }) {
    this.productsInCart.push(product);
  }

  private updateBasket() {
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
      item.className = 'item-cart';
      const itemWrapper = document.createElement('div');
      itemWrapper.className = 'item-cart-wrapper';
      const itemWrapperRight = document.createElement('div');
      itemWrapperRight.className = 'item-wrapper-right';
      const quantityWrapper = document.createElement('div');
      quantityWrapper.className = 'quantity-wrapper';
      item.textContent = product.name['en-US'];
      const image = new Image();
      image.src = product.image;
      image.width = 150;
      const price = document.createElement('div');
      price.textContent = `${(product.price * product.quantity) / 100} $`;
      item.appendChild(image);
      item.appendChild(price);
      itemWrapper.appendChild(item);
      quantityWrapper.appendChild(leftButton);
      quantityWrapper.appendChild(quantityInCart);
      quantityWrapper.appendChild(rightButton);
      itemWrapperRight.appendChild(quantityWrapper);
      itemWrapperRight.appendChild(removeButton);
      itemWrapper.appendChild(itemWrapperRight);
      this.itemsContainer.appendChild(itemWrapper);
  
    }
  }
}
