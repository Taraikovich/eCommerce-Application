import { Button } from './button';

export class LoginButton extends Button {
  addButton(node: HTMLElement) {
    super.addButton(node);
    this.button.textContent = 'Login';
  }
}
