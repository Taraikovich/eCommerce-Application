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
      [key: string]: { name: string; description: string; img: string };
    } = {};

    if (results) {
      results.forEach((item, index) => {
        const pName = item.masterData.current.name['en-US'];
        let pDisc = 'non';
        if (item.masterData.current.description) {
          pDisc = item.masterData.current.description['en-US'];
        }
        let pImg = 'non';
        if (item.masterData.current.masterVariant.images?.length) {
          pImg = item.masterData.current.masterVariant.images[0].url;
        }

        products[index] = {
          name: pName,
          description: pDisc,
          img: pImg,
        };
      });
      console.log(products);
      return products;
    }
  } catch (error) {
    console.log(error);
  }
}
