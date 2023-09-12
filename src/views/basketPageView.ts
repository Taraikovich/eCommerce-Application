import { View } from './view';
import { BasketForm } from '../components/basketForm';

export class BasketPageView extends View {
  private basketForm = new BasketForm();

  constructor() {
    super();
    this.createContent();
  }

  private createContent(): void {
    const sectionBasketForm = this.createSection('basket-form');
    sectionBasketForm.append(this.basketForm.createForm());

    this.main.append(
      this.addH1('Basket'),
      sectionBasketForm
    );
  }
}
