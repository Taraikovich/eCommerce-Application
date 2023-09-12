import { View } from './view';
import { BasketForm } from '../components/basketForm';

export class BasketPageView extends View {
  private basketForm = new BasketForm();

  constructor() {
    super();
    this.createContent();
  }

  private async createContent(): Promise<void> {
    const sectionBasketForm = this.createSection('basket-form');

    sectionBasketForm.append(
      await this.basketForm.createForm(() => {
        this.updateNavigation();
      })
    );

    this.main.append(this.addH1('Basket'), sectionBasketForm);
  }
}
