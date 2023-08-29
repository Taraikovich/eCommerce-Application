import { NotFoundPageView } from '../views/notFoundPageView';
import { HomePageView } from '../views/homePageView';
import { LoginPageView } from '../views/loginPageView';
import { RegisterPageView } from '../views/registerPageView';
import { ProfilePageView } from '../views/profilePageView';
import { getUserId } from '../state/getUserId';
import { CatalogView } from '../views/CatalogViev';

export class Router {
  homePage = new HomePageView();

  catalogPage = new CatalogView();

  loginPage = new LoginPageView();

  registerPage = new RegisterPageView();

  notFoundPage = new NotFoundPageView();

  profilePage = new ProfilePageView();

  constructor() {
    this.createView();
  }

  private createView(): void {
    const rout = this.getUrl();
    if (rout === '/') {
      this.homePage.createView();
    } else if (rout === '/login') {
      if (getUserId()) {
        window.history.pushState({}, '', '/');
        this.homePage.createView();
      } else {
        this.loginPage.createView();
      }
    } else if (rout === '/register') {
      if (getUserId()) {
        window.history.pushState({}, '', '/');
        this.homePage.createView();
      } else {
        this.registerPage.createView();
      }
    } else if (rout === '/catalog') {
      this.catalogPage.createView();
    } else if (rout === '/profile') {
      this.profilePage.createView();
    } else {
      this.notFoundPage.createView();
    }
  }

  private getUrl(): string {
    const url = window.location.pathname;
    return url;
  }
}
