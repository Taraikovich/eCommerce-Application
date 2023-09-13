import { AddToCartButton } from '../components/addToCartBtn';
import { getProduct } from '../api/getProduct';
import { View } from './view';
import { getProductsInCart } from '../api/getProductsInCart';
import { RemoveFromCartButton } from '../components/removeFromCartBtn';

export class ProductView extends View {
  sectionProduct = document.createElement('section');

  loader = document.createElement('div'); // Элемент для прелоадера

  constructor(key: string) {
    super();
    this.creatContent(key);
  }

  private async creatContent(key: string): Promise<void> {
    this.showLoader();

    const product = await getProduct(key);
    this.sectionProduct.className = 'product';
    const productsInCart = await getProductsInCart();

    if (product) {
      this.sectionProduct.append(
        this.addImg(product.img),
        this.addDiscription(product.description),
        this.addPrice(product.price, product.discountedPrice),
        this.addToCart(product.id, key, productsInCart)
      );

      this.main.append(this.addH1(product.name), this.sectionProduct);
    }

    this.hideLoader();
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

  private addToCart(
    id: string,
    key: string,
    productsInCart: string[]
  ): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'add-buttons';
    const addToCartbtn = new AddToCartButton(
      id,
      key,
      productsInCart
    ).createButton();
    wrapper.append(addToCartbtn);
    if (productsInCart.includes(id)) {
      const removeBtn = new RemoveFromCartButton(
        id,
        key,
        productsInCart
      ).createButton();
      wrapper.append(removeBtn);
      removeBtn.addEventListener('click', () => {
        addToCartbtn.textContent = '🛒 +';
        addToCartbtn.disabled = false;
        removeBtn.remove();
      });
    }
    return wrapper;
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
}
