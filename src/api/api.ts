import { IUser } from '@type/user';
import { IProduct } from '@type/product';
import {
  IAddUserReq,
  IGetProductsByListReq,
  IChangeWishlistReq,
  IChangePurchaseReq,
} from '@type/api';

export default class API {
  readonly #baseURL = 'https://wg-force3-backend.herokuapp.com/api';

  async #get(path: string) {
    const response = await fetch(`${this.#baseURL}${path}`);
    if (response.statusText === 'OK') {
      const serializedResponse = await response.json();
      return serializedResponse.data;
    }
    throw new Error('Ooops!');
  }

  async #post(
    path: string,
    data:
      | IAddUserReq
      | IGetProductsByListReq
      | IChangeWishlistReq
      | IChangePurchaseReq,
  ) {
    const response = await fetch(`${this.#baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const serializedResponse = await response.json();
    return serializedResponse.data;
  }

  getAllUsers() {
    const result: Promise<IUser[]> = this.#get('/users');
    return result;
  }

  getUserByID(id: string) {
    const result: Promise<IUser> = this.#get(`/user?id=${id}`);
    return result;
  }

  getProductByID(id: string) {
    const result: Promise<IProduct> = this.#get(`/product?id=${id}`);
    return result;
  }

  getProductsByFilter(filter: string) {
    const result: Promise<IProduct[]> = this.#get(
      `/product/filter?filter=${filter}`,
    );
    return result;
  }

  addUser(name: string) {
    const result: Promise<IUser> = this.#post('/user', { name });
    return result;
  }

  getProductsByList(listProductsID: string[]) {
    const result: Promise<IProduct[]> = this.#post('/products', {
      listProductsId: listProductsID,
    });
    return result;
  }

  changeWishlist(userID: string, productID: string) {
    const result: Promise<IUser> = this.#post('/user/wishlist', {
      userId: userID,
      productId: productID,
    });
    return result;
  }

  changePurchase(userID: string, productID: string, isAdd: boolean) {
    const result: Promise<IUser> = this.#post('/user/purchase', {
      userId: userID,
      productId: productID,
      isAdd,
    });
    return result;
  }
}
