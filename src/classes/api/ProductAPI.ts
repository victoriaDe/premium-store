/**
 * @module API
 */

import { IProduct, TFilter } from '@type/product';
import { IResponse } from '@type/api';
import { TCurrency } from '@type/local-storage';

import { backEndInstance } from '@api/API';

/**
 * Class for products
 */
class ProductAPI {
  /**
   * Method to get an array of objects using filter
   * @param filter preset filter
   * @param currency currency
   */
  static async getProductsByFilter(
    filter: TFilter | 'All',
    currency: TCurrency,
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
   * Method to get an array of objects using filter
   * @param pageNumber loading 'product page' number
   * @param pageSize раз loading products number per time
   * @param currency currency while loading
   */
  static async getAllProductsByLazy(
    pageNumber = 1,
    pageSize = 20,
    currency = '$',
  ) {
    try {
      const response = await backEndInstance.get<IResponse<{
        countProducts: number;
        products: IProduct[];
      }>>(
        `allProducts?pageNumber=${pageNumber}&pageSize=${pageSize}&currency=${currency}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method to get an array of products using array of products ID
   * @param listProductsID array of products' ID
   * @param currency product currency
   */
  static async getProductsByList(
    listProductsID: string[],
    currency: TCurrency,
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
