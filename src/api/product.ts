/**
 * @module Product API
 */

import instance from '@api/api';
import { IProduct, TFilter } from '@type/product';
import { IResponse } from '@type/api';

/**
 * Class for working with products
 */

class ProductAPI {
  /**
   * Method for getting a product by ID
   * @param id user ID
   */

  static async getProductByID(id: string) {
    try {
      const response = await instance.get<IResponse<IProduct>>(
        `product?id=${id}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for getting an array of objects by filter
   * @param filter preset filter
   */

  static async getProductsByFilter(filter: TFilter | 'All') {
    try {
      const response = await instance.get<IResponse<IProduct[]>>(
        `product/filter?filter=${filter}`,
      );
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for getting an array of products by array of product ID
   * @param listProductsID array of product ID
   */

  static async getProductsByList(listProductsID: string[]) {
    try {
      const response = await instance.post<IResponse<IProduct[]>>('products', {
        listProductsId: listProductsID,
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }
}

export default ProductAPI;
