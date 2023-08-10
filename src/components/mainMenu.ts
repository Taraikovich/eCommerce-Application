import { Router } from '../router/router';

export class Mainmenu {
  list = document.createElement('ul');

  constructor(node: HTMLElement) {
    this.addMenu(node);
  }

  addMenu(node: HTMLElement) {
    this.list.className = 'header__menu';
    const homeLink = this.addMenuItem('Home', './');
    this.list.append(homeLink);
    node.append(this.list);
  }

  addMenuItem(name: string, url: string) {
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
