import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { client } from './BuildClient';
import { projectKey } from '../constants/constants';

export async function getFilterProducts(
  filterStr: string[] = [],
  sortStr = 'name.en-US asc'
) {
  try {
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey,
    });

    const { body } = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: filterStr,
          sort: sortStr,
        },
      })
      .execute();

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
        const name = item.name['en-US'];
        let description = 'non';
        if (item.description) {
          description = item.description['en-US'];
        }
        let images = 'non';
        if (item.masterVariant.images?.length) {
          images = item.masterVariant.images[0].url;
        }

        let price = 0;
        if (item.masterVariant.prices?.length) {
          price = item.masterVariant.prices[0].value.centAmount;
        }

        let discountedPrice = 0;
        if (item.masterVariant.prices?.length) {
          if (item.masterVariant.prices[0].discounted) {
            discountedPrice =
              item.masterVariant.prices[0].discounted.value.centAmount;
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
      return products;
    }
  } catch (error) {}
}
