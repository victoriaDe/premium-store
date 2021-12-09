import instance from '@api/api';
import { IProduct, TFilter } from '@type/product';
import { IResponse } from '@type/api';

class ProductAPI {
  static getProductByID(id: string) {
    return instance
      .get<IResponse<IProduct>>(`product?id=${id}`)
      .then((response) => response.data);
  }

  static getProductsByFilter(filter: TFilter | 'All') {
    return instance
      .get<IResponse<IProduct[]>>(`product/filter?filter=${filter}`)
      .then((response) => response.data);
  }

  static getProductsByList(listProductsID: string[]) {
    return instance
      .post<IResponse<IProduct[]>>('products', {
        listProductsId: listProductsID,
      })
      .then((response) => response.data);
  }
}

export default ProductAPI;
