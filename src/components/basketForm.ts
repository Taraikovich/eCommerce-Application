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
import { Router } from '../router/router';
import { addDiscountCode } from '../api/addiscountCode';
import { getDiscountCode } from '../api/getDiscoutCode';

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
    console.log(cart);
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
      let totalCostWithDiscont = 0;
      for (const product of this.productsInCart) {
        totalCostWithDiscont += product.totalPrice / 100;
      }
      const totalCostElement = document.createElement('div');
      totalCostElement.className = 'total-cost';
      if (totalCost === totalCostWithDiscont) {
        totalCostElement.innerHTML = `<p>Total cost: ${totalCost.toFixed(
          2
        )} $</p>`;
      } else {
        totalCostElement.innerHTML = `<p>Total cost: ${totalCost.toFixed(
          2
        )} $</p>
                                      <p>With discont: ${totalCostWithDiscont.toFixed(
                                        2
                                      )} $</p>`;
      }

      clearCartButton.addEventListener('click', async () => {
        if (
          confirm("Do you want to clean out your customer's shopping cart?")
        ) {
          await clearCart();
          await createCart();
          await this.createForm();
          if (this.callback) {
            this.callback();
          }
        }
      });
      const discounCodes: string[] = [];
      cart.discountCodes.forEach((item) => {
        const code = item.discountCode.id;
        discounCodes.push(code);
      });
      console.log(discounCodes);

      this.itemsContainer.append(
        await this.discountCode(discounCodes),
        clearCartButton
      );
      this.itemsContainer.appendChild(totalCostElement);
    } else {
      const emptyCart = document.createElement('div');
      const emptyCartWrapper = document.createElement('div');
      emptyCartWrapper.className = 'empty-wrapper';
      emptyCart.className = 'empty-text';
      emptyCart.textContent = 'Your cart is empty!';
      const catalogLink = this.goToCatalog();
      emptyCartWrapper.appendChild(emptyCart);
      emptyCartWrapper.appendChild(catalogLink);
      this.itemsContainer.appendChild(emptyCartWrapper);
    }

    return this.form;
  }

  private goToCatalog(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Go to Catalog';
    button.addEventListener('click', () => {
      const newURL = './products';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });
    return button;
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
    console.log(this.productsInCart);
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
      image.width = 100;
      const price = document.createElement('div');
      console.log(product.totalPrice === product.price);
      if (product.totalPrice === product.price * product.quantity) {
        price.textContent = `${(product.price * product.quantity) / 100} $`;
      } else {
        price.innerHTML = `<span> ${
          (product.price * product.quantity) / 100
        } $</span> ${product.totalPrice / 100} $`;
      }

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

  private async discountCode(cods: string[]): Promise<HTMLElement> {
    const wrapper = document.createElement('div');
    wrapper.className = 'discount-code';

    const input = document.createElement('input');
    input.className = 'discount-code__input';
    input.type = 'text';
    input.id = 'discount-code';
    input.placeholder = 'enter your code';

    const label = document.createElement('label');
    label.setAttribute('for', 'discount-code');
    label.textContent = 'Discount code: ';

    const message = document.createElement('p');
    if (cods.length) {
      async function getCodesNames(arr: string[]) {
        const names: string[] = [];
        for (let code of arr) {
          console.log(code);
          code = await getDiscountCode(code);
          names.push(code);
        }
        return names;
      }
      const codesNames = await getCodesNames(cods);
      message.textContent = `Promo codes applied: ${codesNames.join(', ')}`;
    } else {
      message.textContent = '';
    }

    const button = document.createElement('button');
    button.textContent = 'apply';
    button.className = 'discount-code__button';

    button.addEventListener('click', async () => {
      if (input.value) {
        if (await addDiscountCode(input.value)) {
          this.createForm();
        } else {
          message.textContent = `Discount code "${input.value}" not found`;
        }
      }
    });

    wrapper.append(label, input, button, message);

    return wrapper;
  }
}
