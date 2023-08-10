import { View } from './view';

export class NotFoundPageView extends View {
  constructor() {
    super();
    this.createContent();
  }

  createContent() {
    const img = new Image();
    img.src = require('../images/404.gif');
    this.main.append(img);
  }
}
