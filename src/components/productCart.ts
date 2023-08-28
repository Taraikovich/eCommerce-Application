export class PronuctCart {
  createCard(imgUrl: string, productName: string, productDiscription: string) {
    const card = document.createElement('div');
    card.className = 'products__card';

    card.append(
      this.addImage(imgUrl),
      this.addName(productName),
      this.addDiscription(productDiscription)
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
}
