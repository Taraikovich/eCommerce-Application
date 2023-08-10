import { Router } from '../router/router';
import { View } from './view';

export class NotFoundPageView extends View {
  constructor() {
    super();
    this.createContent();
  }

  createContent() {
    const wrapper = document.createElement('div');
    const h1 = document.createElement('h1');
    const button = document.createElement('button');
    button.textContent = 'Open home page';

    button.addEventListener('click', () => {
      const newURL = '/';
      window.history.pushState({}, '', newURL);
      document.body.textContent = '';
      new Router();
    });

    h1.textContent = 'Sorry, the page your requested was not found.';
    wrapper.className = 'wrapper404';
    const img = new Image();
    img.src = require('../images/404.gif');
    wrapper.append(h1, button, img);
    this.main.append(wrapper);
  }
}
