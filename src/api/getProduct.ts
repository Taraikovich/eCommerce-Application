import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';

export async function getProduct(key: string) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const { body } = await apiRoot
      .products()
      .withKey({ key: key })
      .get()
      .execute();

    const results = body.masterData.current;

    const product: {
      name: string;
      description: string;
      img: string;
      price: number;
      discountedPrice: number;
    } = {
      name: '',
      description: '',
      img: '',
      price: 0,
      discountedPrice: 0,
    };

    if (results) {
      product.name = results.name['en-US'];
      if (results.description) {
        product.description = results.description['en-US'];
      }
      if (results.masterVariant.images) {
        product.img = results.masterVariant.images[0].url;
      }
      if (results.masterVariant.prices?.length) {
        product.price = results.masterVariant.prices[0].value.centAmount;
      }

      if (results.masterVariant.prices?.length) {
        if (results.masterVariant.prices[0].discounted) {
          product.discountedPrice =
            results.masterVariant.prices[0].discounted.value.centAmount;
        }
      }

      return product;
    }
  } catch (error) {
    // console.log(error);
  }
}
