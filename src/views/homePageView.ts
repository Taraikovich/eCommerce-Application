import { View } from './view';

export class HomePageView extends View {
  constructor() {
    super();
    this.main.append(this.addH1('Welcome to RSSHOP'), this.addSale());
    this.main.className = 'home-page';
  }

  private addSale() {
    const sale = document.createElement('div');
    sale.className = 'home-page__sale';

    sale.innerHTML = `
    <h2>Fall sale!</h2>
    <p>Discount on women's umbrellas <b>50%</b> by promo code: <b>ladies50</b></p>
    <p>Discount on cane umbrellas <b>50%</b> by promo code: <b>cane50</b></p>
    <p>Discount on children's umbrellas <b>80%</b> by promo code: <b>kids80</b></p>`;

    return sale;
  }
}
