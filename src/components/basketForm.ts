export class BasketForm {
  private form = document.createElement('form');

  constructor() {
    this.form.className = 'basket-form';
  }

  createForm(): HTMLFormElement {
    return this.form;
  }
}
