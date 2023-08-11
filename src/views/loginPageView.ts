import { View } from './view';

export class LoginPageView extends View {
  constructor() {
    super();
    this.createContent();
  }

  private createContent(): void {
    this.main.textContent = 'Login page';
  }
}
