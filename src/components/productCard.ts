import { Router } from '../router/router';

export class PronuctCart {
  private card = document.createElement('div');

  createCard(
    key: string,
    imgUrl: string,
    productName: string,
    productDiscription: string,
    price: number,
    discountedPrice: number
  ) {
    this.card.className = 'products__card';

    this.card.append(
      this.addImage(imgUrl),
      this.addName(productName),
      this.addDiscription(productDiscription),
      this.addPrice(price, discountedPrice)
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
}
