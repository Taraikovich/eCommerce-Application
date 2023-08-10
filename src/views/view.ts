import { RegisterButton } from '../components/registerButton';
import { LoginButton } from '../components/loginButton';
import { Logo } from '../components/logo';
import { Mainmenu } from '../components/mainMenu';

export class View {
  header = document.createElement('header');

  main = document.createElement('main');

  footer = document.createElement('footer');

  // constructor() {
  //   this.createView();
  // }

  createView() {
    document.body.append(this.header, this.main, this.footer);
    this.header.className = 'header';
    this.addLogo();
    this.addMenu();
    this.addAuthButtons();
  }

  private addLogo() {
    new Logo(this.header);
  }

  private addAuthButtons() {
    const btnWrapper = document.createElement('div');
    new LoginButton(btnWrapper);
    new RegisterButton(btnWrapper);
    this.header.append(btnWrapper);
  }

  private addMenu() {
    new Mainmenu(this.header);
  }
}
