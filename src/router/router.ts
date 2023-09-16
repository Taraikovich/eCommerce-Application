import { NotFoundPageView } from '../views/notFoundPageView';
import { HomePageView } from '../views/homePageView';
import { LoginPageView } from '../views/loginPageView';
import { RegisterPageView } from '../views/registerPageView';
import { ProfilePageView } from '../views/profilePageView';
import { BasketPageView } from '../views/basketPageView';
import { getUserId } from '../state/getUserId';
import { ProductsView } from '../views/productsView';
import { ProductView } from '../views/productView';
import { AboutUsPageView } from '../views/aboutUsPageView';

export class Router {
  homePage = new HomePageView();

  catalogPage = new ProductsView();

  loginPage = new LoginPageView();

  registerPage = new RegisterPageView();

  notFoundPage = new NotFoundPageView();

  profilePage = new ProfilePageView();

  basketPage = new BasketPageView();

  aboutUsPage = new AboutUsPageView();

  constructor() {
    this.createView();
  }

  private createView(): void {
    const rout = this.getUrl();
    if (rout === '/') {
      this.homePage.createView();
    } else if (rout === '/about') {
      this.aboutUsPage.createView();
    }
    else if (rout === '/basket') {
      this.basketPage.createView();
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
      const queryString = decodeURI(window.location.search);
      if (queryString && queryString.includes('key')) {
        document.body.innerHTML = '';
        const query = queryString.slice(5);
        new ProductView(query).createView();
      } else if (queryString) {
        let filterStr: string[] = [];
        let sortStr = 'name.en-US asc';
        let page = 1;
        if (queryString.includes('variants'))
          filterStr = queryString
            .slice(1)
            .split('&')
            .slice(0, 1)
            .join('')
            .split('+');
        if (queryString.includes('name') || queryString.includes('price'))
          sortStr = queryString.slice(1).split('&')[1];
        if (queryString.includes('page')) page = Number(queryString.slice(-1));
        this.catalogPage.createCards(filterStr, sortStr, page);
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
