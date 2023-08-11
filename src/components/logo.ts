import { Router } from '../router/router';

export class Logo {
  private logo = document.createElement('div');

  constructor(node: HTMLElement) {
    this.createLogo(node);
  }

  private createLogo(node: HTMLElement): void {
    const a = document.createElement('a');
    a.href = './';
    a.textContent = 'RSSHOP';
    a.className = 'header__logo';
    this.logo.append(a);

    a.addEventListener('click', (event) => {
      event.preventDefault();
      const newURL = '/';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });

    node.append(this.logo);
  }
}
