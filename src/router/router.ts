import { NotFoundPageView } from '../views/notFoundPageView';
import { HomePageView } from '../views/homePageView';
import { LoginPageView } from '../views/loginPageView';
import { RegisterPageView } from '../views/registerPageView';
import { ProfilePageView } from '../views/profilePageView';
import { getUserId } from '../state/getUserId';
import { ProductsView } from '../views/productsView';

export class Router {
  homePage = new HomePageView();

  catalogPage = new ProductsView();

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
    } else if (rout === '/products') {
      this.catalogPage.createView();
      const queryString = window.location.search;
      if (queryString) {
        const filterStr = decodeURIComponent(
          queryString.slice(1).split('&')[0]
        ).split('+');
        const sortStr = decodeURIComponent(queryString.slice(1).split('&')[1]);
        this.catalogPage.createCards(filterStr, sortStr);
      } else {
        this.catalogPage.createCards();
      }
    } else if (rout === '/profile') {
      if (!getUserId()) {
        window.history.pushState({}, '', '/login');
        this.loginPage.createView();
      } else {
        this.profilePage.createView();
      }
    } else {
      this.notFoundPage.createView();
    }
  }

  private getUrl(): string {
    const url = window.location.pathname;
    return url;
  }
}
