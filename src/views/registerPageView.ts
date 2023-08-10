import { View } from './view';

export class RegisterPageView extends View {
  constructor() {
    super();
    this.createContent();
  }

  createContent() {
    this.main.textContent = 'register page';
  }
}
