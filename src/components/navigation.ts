import { getUserId } from '../state/getUserId';
import { Router } from '../router/router';
import { LoginButton } from './loginButton';
import { RegisterButton } from './registerButton';
import { LogoutButton } from './logoutButton';
import { ProfileButton } from './profileButton';

export class Navigation {
  list = document.createElement('ul');

  nav = document.createElement('nav');

  constructor(node: HTMLElement) {
    this.addMenu(node);
  }

  private addMenu(node: HTMLElement): void {
    this.nav.className = 'header__nav';
    this.list.className = 'header__menu';
    const homeLink = this.addMenuItem('Home', './');
    const catalogLink = this.addMenuItem('Catalog', './catalog');
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
    if (getUserId()) {
      const logoutBtn = new LogoutButton();
      const profileBtn = new ProfileButton();
      buttons.append(profileBtn.createButton(), logoutBtn.createButton());
    } else {
      const loginBtn = new LoginButton();
      const registrBtn = new RegisterButton();
      buttons.append(loginBtn.createButton(), registrBtn.createButton());
    }
    return buttons;
  }
}
