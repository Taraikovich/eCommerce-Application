import { Button } from './button';
import { logout } from '../api/logout';

export class LogoutButton extends Button {
  constructor() {
    super();
    this.chengePage();
  }

  createButton(): HTMLButtonElement {
    super.createButton();
    this.button.textContent = 'Logout';
    return this.button;
  }

  private chengePage(): void {
    this.button.addEventListener('click', () => logout());
  }
}
