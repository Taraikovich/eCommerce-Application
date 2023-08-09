export class Mainmenu {
  list = document.createElement('ul');

  constructor(node: HTMLElement) {
    this.addMenu(node);
  }

  addMenu(node: HTMLElement) {
    const homeLink = document.createElement('li');
    const homeUrl = document.createElement('a');
    homeUrl.href = './';
    homeUrl.textContent = 'Home';
    homeLink.append(homeUrl);
    this.list.append(homeLink);
    node.append(this.list);
  }
}
