import { ProductCard } from '../components/productCard';
import { View } from './view';
import { getFilterProducts } from '../api/getFilterProducts';
import { FilterForm } from '../components/filterForm';
import { getProductsInCart } from '../api/getProductsInCart';

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
    sortStr = 'name.en-US asc'
  ): Promise<void> {
    this.showLoader();

    this.productsSection.innerHTML = '';
    this.productsSection.className = 'products';
    const productsInCart = await getProductsInCart();
    const productsObj = await getFilterProducts(filterStr, sortStr);
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

  private showLoader(): void {
    this.loader.className = 'preloader';
    const loaderImg = new Image();
    loaderImg.src = require('../images/loader.gif');
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
