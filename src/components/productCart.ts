export class PronuctCart {
  createCard(
    imgUrl: string,
    productName: string,
    productDiscription: string,
    price: number,
    discountedPrice: number
  ) {
    const card = document.createElement('div');
    card.className = 'products__card';

    card.append(
      this.addImage(imgUrl),
      this.addName(productName),
      this.addDiscription(productDiscription),
      this.addPrice(price, discountedPrice)
    );

    return card;
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
}
