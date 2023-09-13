import { View } from './view';
import { BasketForm } from '../components/basketForm';

export class BasketPageView extends View {
  private basketForm = new BasketForm();

  createView(): void {
    super.createView();
    this.createContent();
  }

  async createContent(): Promise<void> {
    const sectionBasketForm = this.createSection('basket-form');

    sectionBasketForm.append(
      await this.basketForm.createForm(() => {
        this.updateNavigation();
      })
    );

    this.main.append(sectionBasketForm);
  }
}
