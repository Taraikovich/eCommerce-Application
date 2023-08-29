import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';

export async function getProducts() {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const { body } = await apiRoot.products().get().execute();

    const results = body.results;

    const products: {
      [key: string]: {
        name: string;
        description: string;
        img: string;
        price: number;
        discountedPrice: number;
      };
    } = {};

    if (results) {
      results.forEach((item, index) => {
        const name = item.masterData.current.name['en-US'];
        let description = 'non';
        if (item.masterData.current.description) {
          description = item.masterData.current.description['en-US'];
        }
        let images = 'non';
        if (item.masterData.current.masterVariant.images?.length) {
          images = item.masterData.current.masterVariant.images[0].url;
        }

        let price = 0;
        if (item.masterData.current.masterVariant.prices?.length) {
          price =
            item.masterData.current.masterVariant.prices[0].value.centAmount;
        }

        let discountedPrice = 0;
        if (item.masterData.current.masterVariant.prices?.length) {
          if (item.masterData.current.masterVariant.prices[0].discounted) {
            discountedPrice =
              item.masterData.current.masterVariant.prices[0].discounted.value
                .centAmount;
          }
        }

        products[index] = {
          name: name,
          description: description,
          img: images,
          price: price,
          discountedPrice: discountedPrice,
        };
      });
      console.log(products);
      return products;
    }
  } catch (error) {
    // console.log(error);
  }
}
