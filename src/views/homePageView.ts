import { View } from './view';

export class HomePageView extends View {
  constructor() {
    super();
    this.main.append(this.addH1('Welcome to RSSHOP'));
  }
}
