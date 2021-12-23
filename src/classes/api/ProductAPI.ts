/**
 * @module API
 */

import { IProduct, TFilter } from '@type/product';
import { IResponse } from '@type/api';
import { TCurrencyCode } from '@type/price';

import { backEndInstance } from '@api/API';

/**
 * Class for working with products
 */
class ProductAPI {
  /**
   * Method for getting an array of objects by filter
   * @param filter preset filter
   * @param currency валюта товара
   */
  static async getProductsByFilter(
    filter: TFilter | 'All',
    currency: TCurrencyCode,
  ) {
    try {
      const response = await backEndInstance.get<IResponse<IProduct[]>>(
        `product/filter?filter=${filter}&currency=${currency}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for getting an array of objects by filter
   * @param pageNumber номер загружаемой "страницы" продуктов
   * @param pageSize количество загружаемых продуктов за 1 раз
   * @param currency валюта для загрузки
   */
  static async getAllProductsByLazy(
    pageNumber = 1,
    pageSize = 20,
    currency = '$',
  ) {
    try {
      const response = await backEndInstance.get<
        IResponse<{
          countProducts: number;
          products: IProduct[];
        }>
      >(
        `allProducts?pageNumber=${pageNumber}&pageSize=${pageSize}&currency=${currency}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for getting an array of products by array of product ID
   * @param listProductsID array of product ID
   * @param currency валюта товара
   */
  static async getProductsByList(
    listProductsID: string[],
    currency: TCurrencyCode,
  ) {
    const response = await backEndInstance.post<IResponse<IProduct[]>>(
      'products',
      {
        listProductsId: listProductsID,
        currency,
      },
    );
    return response.data.data;
  }
}

export default ProductAPI;
