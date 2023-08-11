import { Router } from '../router/router';
import { LoginButton } from './loginButton';
import { RegisterButton } from './registerButton';

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
    const buttons = document.createElement('div');
    const loginBtn = new LoginButton();
    const registrBtn = new RegisterButton();
    buttons.append(loginBtn.createButton(), registrBtn.createButton());
    this.list.append(homeLink);
    this.nav.append(this.list, buttons);
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
}
