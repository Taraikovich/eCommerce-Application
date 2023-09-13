import { ProductCard } from '../components/productCard';
import { View } from './view';
import { getFilterProducts } from '../api/getFilterProducts';
import { FilterForm } from '../components/filterForm';
import { getProductsInCart } from '../api/getProductsInCart';
import { Router } from '../router/router';

export class ProductsView extends View {
  fiilterForm = new FilterForm().create();

  productsSection = document.createElement('section');

  loader = document.createElement('div');

  constructor() {
    super();
    this.createContent();
    this.filter();
  }

  private async createContent(): Promise<void> {
    this.main.append(this.fiilterForm, this.productsSection);
  }

  async createCards(
    filterStr: string[] = [],
    sortStr = 'name.en-US asc',
    page = 1
  ): Promise<void> {
    this.showLoader();

    this.productsSection.innerHTML = '';
    this.productsSection.className = 'products';
    const productsInCart = await getProductsInCart();
    const productsObj = await getFilterProducts(filterStr, sortStr, page);
    if (productsObj) {
      const products = Object.values(productsObj);
      for (const product of products) {
        const card = new ProductCard();

        this.productsSection.append(
          card.createCard(
            product.id,
            product.key,
            product.img,
            product.name,
            product.description,
            product.price,
            product.discountedPrice,
            productsInCart
          )
        );
      }
      this.productsSection.append(this.pagination(productsObj[0].total));
    }

    this.addItemToBasket();
    this.main.append(this.productsSection);


    this.hideLoader();
  }

  private filter(): void {
    this.fiilterForm.addEventListener('change', () => {
      const checkboxes = this.fiilterForm.querySelectorAll(
        'input[type="checkbox"]'
      );
      const select = this.fiilterForm.querySelector('select');
      const checkboxStates: { [key: string]: string[] } = {};

      const sortStr = select?.selectedOptions[0].value;

      checkboxes.forEach((checkbox: Element) => {
        if (checkbox instanceof HTMLInputElement) {
          const filterValue = checkbox.getAttribute('filter');
          if (checkbox.checked && filterValue !== null) {
            if (!checkboxStates[filterValue]) {
              checkboxStates[filterValue] = [];
            }
            checkboxStates[filterValue].push(`"${checkbox.name}"`);
          }
        }
      });

      const filterStr = [];
      const checkboxKeys = Object.keys(checkboxStates);
      for (const key of checkboxKeys) {
        filterStr.push(
          `variants.attributes.${key}.key:${checkboxStates[key].join(',')}`
        );
      }

      const newURL = `/products?${filterStr.join('+')}&${sortStr}`;
      window.history.pushState({}, '', newURL);

      this.createCards(filterStr, sortStr);
    });
  }

  private pagination(countProducts: number): HTMLElement {
    let countPage = Math.floor(countProducts / 10);

    if (countProducts % 10) countPage += 1;

    const wrapper = document.createElement('div');
    wrapper.className = 'pagination';

    function urlBuilder(filter: string[] | [], sort: string, page: number) {
      const queryString = decodeURI(window.location.search);
      if (queryString.includes('variants'))
        filter = queryString
          .slice(1)
          .split('&')
          .slice(0, 1)
          .join('')
          .split('+');
      if (queryString.includes('name') || queryString.includes('price'))
        sort = queryString.slice(1).split('&')[1];
      const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${filter}&${sort}&page=${page}`;
      return url;
    }

    function changePage(page: number) {
      window.history.pushState({}, '', urlBuilder([], '', page));
      document.body.innerHTML = '';
      new Router();
    }

    for (let i = 1; i <= countPage; i++) {
      const page = document.createElement('div');
      page.className = 'pagination__page';
      if (!window.location.search.includes('page') && i === 1)
        page.classList.add('pagination__page_current');
      if (window.location.search.slice(-1) === i.toString())
        page.classList.add('pagination__page_current');
      page.textContent = `${i}`;
      wrapper.append(page);
      page.addEventListener('click', () => {
        changePage(i);
      });
    }

    return wrapper;
  }

  private showLoader(): void {
    this.loader.className = 'preloader';
    const loaderImg = new Image();
    loaderImg.src = require('../images/loader.gif');
    this.loader.innerHTML = '';
    this.loader.append(loaderImg);
    this.main.appendChild(this.loader);
  }

  private hideLoader(): void {
    this.loader.remove();
  }

  private addItemToBasket() {
    const addToCartButtons = document.querySelectorAll('.button__add-to-cart');

    addToCartButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.navigation?.addItemToBasket();
      });
    });
  }
}
