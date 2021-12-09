import instance from '@api/api';
import { IProduct, TFilter } from '@type/product';
import { IResponse } from '@type/api';

class ProductAPI {
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
