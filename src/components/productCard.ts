import { Router } from '../router/router';
import { AddToCartButton } from './addToCartBtn';
import { RemoveFromCartButton } from './removeFromCartBtn';

export class ProductCard {
  private card = document.createElement('div');

  createCard(
    id: string,
    key: string,
    imgUrl: string,
    productName: string,
    productDiscription: string,
    price: number,
    discountedPrice: number,
    productsInCart: string[]
  ) {
    this.card.className = 'products__card';

    this.card.append(
      this.addImage(imgUrl),
      this.addName(productName),
      this.addDiscription(productDiscription),
      this.addPrice(price, discountedPrice),
      this.addToCart(id, key, productsInCart)
      // this.removeFromCartBtn(id, key, productsInCart)
    );

    this.openProduct(key);

    return this.card;
  }

  private addImage(imgUrl: string) {
    const image = new Image();
    image.src = imgUrl;
    image.width = 150;
    return image;
  }

  private addName(productName: string) {
    const name = document.createElement('h4');
    name.textContent = productName;
    return name;
  }

  private addDiscription(productDiscription: string) {
    const discription = document.createElement('p');
    discription.textContent = productDiscription;
    return discription;
  }

  private addPrice(productPrice: number, productDiscounted: number) {
    const price = document.createElement('p');
    price.className = 'products__price';

    if (productDiscounted) {
      price.innerHTML = `<span> ${productPrice / 100} $</span> ${
        productDiscounted / 100
      } $`;
    } else {
      price.textContent = `${productPrice / 100} $`;
    }
    return price;
  }

  private openProduct(key: string) {
    this.card.addEventListener('click', () => {
      const newURL = `./products?key=${key}`;
      window.history.pushState({}, '', newURL);
      new Router();
    });
  }

  private addToCartBtn(
    id: string,
    key: string,
    productsInCart: string[]
  ): HTMLButtonElement {
    const button = new AddToCartButton(id, key, productsInCart).createButton();
    // button.addEventListener('click', () => {

    // })
    return button;
  }

  private addToCart(
    id: string,
    key: string,
    productsInCart: string[]
  ): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'add-buttons';
    const addToCartbtn = new AddToCartButton(
      id,
      key,
      productsInCart
    ).createButton();
    wrapper.append(addToCartbtn);
    addToCartbtn.addEventListener('click', () => {
      const removeBtn = new RemoveFromCartButton(
        id,
        key,
        productsInCart
      ).createButton();
      wrapper.append(removeBtn);
      removeBtn.addEventListener('click', () => {
        addToCartbtn.textContent = '🛒 +';
        addToCartbtn.disabled = false;
        removeBtn.remove();
      });
      wrapper.append(removeBtn);
    });
    if (productsInCart.includes(id)) {
      const removeBtn = new RemoveFromCartButton(
        id,
        key,
        productsInCart
      ).createButton();
      wrapper.append(removeBtn);
      removeBtn.addEventListener('click', () => {
        addToCartbtn.textContent = '🛒 +';
        addToCartbtn.disabled = false;
        removeBtn.remove();
      });
    }
    return wrapper;
  }
}
