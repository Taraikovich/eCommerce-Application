export class Button {
  button = document.createElement('button');

  createButton(): HTMLButtonElement | HTMLElement {
    return this.button;
  }
}
