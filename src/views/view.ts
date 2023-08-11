import { Logo } from '../components/logo';
import { Navigation } from '../components/navigation';

export class View {
  header = document.createElement('header');

  main = document.createElement('main');

  footer = document.createElement('footer');

  constructor() {
    this.burgerMenu();
  }

  createView() {
    document.body.append(this.header, this.main, this.footer);
    this.header.className = 'header';
    this.addLogo();
    this.addMenu();
  }

  private addLogo(): void {
    new Logo(this.header);
  }

  private addMenu(): void {
    new Navigation(this.header);
  }

  private burgerMenu(): void {
    const burgerMenu = document.createElement('div');
    burgerMenu.className = 'header__burger-menu';

    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('header__burger-menu_open');
      const nav = document.querySelector('.header__nav');
      nav?.classList.toggle('open');
    });

    this.header.append(burgerMenu);
  }
}
