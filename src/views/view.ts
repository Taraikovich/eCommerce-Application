import { Logo } from '../components/logo';
import { Navigation } from '../components/navigation';

export class View {
  header = document.createElement('header');

  main = document.createElement('main');

  footer = document.createElement('footer');

  navigation: Navigation | null = null;

  constructor() {
    this.burgerMenu();
  }

  createView() {
    document.body.append(this.header, this.main, this.footer);
    this.header.className = 'header';

    this.footer.className = 'footer';
    this.footer.textContent = 'rsshop © 2023 ';
    this.addLogo();
    this.addMenu();
  }

  private addLogo(): void {
    new Logo(this.header);
  }

  private addMenu(): void {
    this.navigation = new Navigation(this.header);
  }

  updateNavigation(): void {
    (this.navigation as Navigation).updateNavigation();
  }

  addH1(text: string) {
    const h1 = document.createElement('h1');
    h1.textContent = text;
    return h1;
  }

  addH2(text: string) {
    const h2 = document.createElement('h2');
    h2.textContent = text;
    return h2;
  }

  createParagraph(text: string) {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
  }

  private burgerMenu(): void {
    const burgerMenu = document.createElement('div');
    burgerMenu.className = 'header__burger-menu';

    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('header__burger-menu_open');
      const nav = document.querySelector('.header__nav');
      nav?.classList.toggle('open');
      document.body.classList.toggle('open');
    });

    this.header.append(burgerMenu);
  }

  createSection(className: string) {
    const section = document.createElement('section');
    section.className = className;
    return section;
  }
}
