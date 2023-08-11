import { View } from './view';

export class RegisterPageView extends View {
  constructor() {
    super();
    this.createContent();
  }

  private createContent(): void {
    this.main.textContent = 'register page';
  }
}
