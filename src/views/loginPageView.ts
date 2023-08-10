import { View } from './view';

export class LoginPageView extends View {
  constructor() {
    super();
    this.createContent();
  }

  createContent() {
    this.main.textContent = 'Login page';
  }
}
