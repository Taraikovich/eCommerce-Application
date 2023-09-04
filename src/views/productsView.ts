import { PronuctCart } from '../components/productCart';
import { View } from './view';
import { getFilterProducts } from '../api/getFilterProducts';
import { FilterForm } from '../components/filterForm';

export class ProductsView extends View {
  fiilterForm = new FilterForm().create();

  productsSection = document.createElement('section');

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
    this.productsSection.innerHTML = '';
    this.productsSection.className = 'products';
    const productsObj = await getFilterProducts(filterStr, sortStr);
    if (productsObj) {
      const products = Object.values(productsObj);
      for (const product of products) {
        const card = new PronuctCart();
        this.productsSection.append(
          card.createCard(
            product.img,
            product.name,
            product.description,
            product.price,
            product.discountedPrice
          )
        );
      }
    }

    this.main.append(this.productsSection);
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
}
