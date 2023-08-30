import { PronuctCart } from '../components/productCart';
import { getProducts } from '../api/getProducts';
import { View } from './view';

export class CatalogView extends View {
  constructor() {
    super();
    this.createContent();
  }

  private async createContent() {
    this.main.append(await this.createCards());
  }

  private async createCards(): Promise<HTMLElement> {
    const sectionProducts = document.createElement('section');
    sectionProducts.className = 'products';
    const productsObj = await getProducts();
    if (productsObj) {
      const products = Object.values(productsObj);
      for (const product of products) {
        const card = new PronuctCart();
        sectionProducts.append(
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
    return sectionProducts;
  }
}
