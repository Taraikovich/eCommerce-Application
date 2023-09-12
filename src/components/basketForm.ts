

export class BasketForm {
  private form: HTMLFormElement;

  private itemsContainer: HTMLDivElement;
  
  private productsInCart: { id: string; key: string; name: string }[] = [];

  constructor() {
    this.form = document.createElement('form');
    this.itemsContainer = document.createElement('div');

    this.form.className = 'basket-form';
    this.itemsContainer.className = 'basket-items';
    
    this.form.appendChild(this.itemsContainer);
  }

  createForm(): HTMLFormElement {
    return this.form;
  }

  addItemToBasket(product: { id: string; key: string; name: string }) {
   
    this.productsInCart.push(product);

 
    this.updateBasket();
 
  }

  private updateBasket() {

    this.itemsContainer.innerHTML = '';

    for (const product of this.productsInCart) {
      const item = document.createElement('div');
      item.textContent = product.name;
      this.itemsContainer.appendChild(item);
    }
  }
}