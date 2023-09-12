import { getUserId } from '../state/getUserId';
import { Router } from '../router/router';
import { LoginButton } from './loginButton';
import { RegisterButton } from './registerButton';
import { LogoutButton } from './logoutButton';
import { ProfileButton } from './profileButton';
import { BasketButton } from './basketButton';

export class Navigation {
  list = document.createElement('ul');

  nav = document.createElement('nav');

  basketBtn: BasketButton;

  constructor(node: HTMLElement) {
    this.basketBtn = new BasketButton();
    this.addMenu(node);
  }

  updateNavigation(): void {
    this.basketBtn.updateBasket();
  }

  private addMenu(node: HTMLElement): void {
    this.nav.className = 'header__nav';
    this.list.className = 'header__menu';
    const homeLink = this.addMenuItem('Home', './');
    const catalogLink = this.addMenuItem('Catalog', './products');
    this.list.append(homeLink, catalogLink);
    this.nav.append(this.list, this.addButtons());

    node.append(this.nav);
  }

  private addMenuItem(name: string, url: string): HTMLElement {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url;
    a.textContent = name;
    li.append(a);
    this.list.append(li);

    a.addEventListener('click', (event) => {
      event.preventDefault();
      const newURL = url;
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });

    return li;
  }

  private addButtons() {
    const buttons = document.createElement('div');
    buttons.className = 'buttons-wrapper';

    if (getUserId()) {
      const logoutBtn = new LogoutButton();
      const profileBtn = new ProfileButton();

      buttons.append(
        this.basketBtn.createButton(),
        profileBtn.createButton(),
        logoutBtn.createButton()
      );
    } else {
      const loginBtn = new LoginButton();
      const registrBtn = new RegisterButton();

      buttons.append(
        this.basketBtn.createButton(),
        loginBtn.createButton(),
        registrBtn.createButton()
      );
    }
    return buttons;
  }
}
