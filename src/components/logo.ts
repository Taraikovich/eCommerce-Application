export class Logo {
  private logo = document.createElement('div');

  constructor(node: HTMLElement) {
    this.createLogo(node);
  }

  private createLogo(node: HTMLElement) {
    this.logo.textContent = 'LOGO';
    this.logo.className = 'header__logo';
    node.append(this.logo);
  }
}
