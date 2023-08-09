import { Button } from './button';

export class RegisterButton extends Button {
  addButton(node: HTMLElement) {
    super.addButton(node);
    this.button.textContent = 'Register';
  }
}
