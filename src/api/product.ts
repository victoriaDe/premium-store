/**
 * @module API
 */

import instance from '@api/api';
import { IProduct, TFilter } from '@type/product';
import { IResponse } from '@type/api';
import { CurrencyType } from '@classes/LocalStorage';

/**
 * Class for working with products
 */

class ProductAPI {
  /**
   * Method for getting a product by ID
   * @param id user ID
   * @param currency
   */

  static async getProductByID(id: string, currency: CurrencyType) {
    try {
      const response = await instance.get<IResponse<IProduct>>(
        `product?id=${id}&currency=${currency}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for getting an array of objects by filter
   * @param filter preset filter
   * @param currency
   */

  static async getProductsByFilter(
    filter: TFilter | 'All',
    currency: CurrencyType,
  ) {
    try {
      const response = await instance.get<IResponse<IProduct[]>>(
        `product/filter?filter=${filter}&currency=${currency}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }
  /**
   * Method for getting an array of objects by filter
   * @param pageNumber
   * @param pageSize
   * @param currency
   */

  static async getAllProductsByLazy(
    pageNumber = 1,
    pageSize = 20,
    currency = '$',
  ) {
    try {
      const response = await instance.get<
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
   * @param currency
   */

  static async getProductsByList(
    listProductsID: string[],
    currency: CurrencyType,
  ) {
    try {
      const response = await instance.post<IResponse<IProduct[]>>('products', {
        listProductsId: listProductsID,
        currency,
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }
}

export default ProductAPI;
