import { NotFoundPageView } from '../views/notFoundPageView';
import { HomePageView } from '../views/homePageView';
import { LoginPageView } from '../views/loginPageView';
import { RegisterPageView } from '../views/registerPageView';

export class Router {
  homePage = new HomePageView();

  loginPage = new LoginPageView();

  registerPage = new RegisterPageView();

  notFoundPage = new NotFoundPageView();

  constructor() {
    this.createView();
  }

  private createView(): void {
    const rout = this.getUrl();
    if (rout === '/') {
      this.homePage.createView();
    } else if (rout === '/login') {
      this.loginPage.createView();
    } else if (rout === '/register') {
      this.registerPage.createView();
    } else {
      this.notFoundPage.createView();
    }
  }

  private getUrl(): string {
    const url = window.location.pathname;
    return url;
  }
}
