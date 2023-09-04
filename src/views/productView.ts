import { getProduct } from '../api/getProduct';
import { View } from './view';

export class ProductView extends View {
  sectionProduct = document.createElement('section');

  constructor(key: string) {
    super();
    this.creatContent(key);
  }

  private async creatContent(key: string): Promise<void> {
    const product = await getProduct(key);
    this.sectionProduct.className = 'product';

    if (product) {
      this.sectionProduct.append(
        this.addImg(product.img),
        this.addDiscription(product.description),
        this.addPrice(product.price, product.discountedPrice)
      );

      this.main.append(this.addH1(product.name), this.sectionProduct);
    }
  }

  private addImg(src: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__img';
    const img = new Image();
    img.src = src;
    img.width = 300;
    wrapper.append(img);
    return wrapper;
  }

  private addDiscription(discription: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__discription';
    const p = document.createElement('p');
    p.textContent = discription;
    wrapper.append(p);
    return wrapper;
  }

  private addPrice(
    productPrice: number,
    productDiscounted: number
  ): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'product__price';
    const price = document.createElement('p');
    price.className = 'products__price';

    if (productDiscounted) {
      price.innerHTML = `<span> ${productPrice / 100} $</span> ${
        productDiscounted / 100
      } $`;
    } else {
      price.textContent = `${productPrice / 100} $`;
    }
    wrapper.append(price);
    return wrapper;
  }
}