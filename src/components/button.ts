export class Button {
  button = document.createElement('button');

  constructor(node: HTMLElement) {
    this.addButton(node);
  }

  addButton(node: HTMLElement) {
    node.append(this.button);
  }
}
