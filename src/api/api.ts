export default class API {
  readonly #baseURL = 'https://wg-force3-backend.herokuapp.com/api';

  async #get(path: string) {
    const response = await fetch(`${this.#baseURL}${path}`);
    const serializedResponse = await response.json();
    return serializedResponse.data;
  }

  async #post(path: string, data: any) {
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
    return this.#get('/users');
  }

  getUserByID(id: string) {
    return this.#get(`/user?id=${id}`);
  }

  getProductByID(id: string) {
    return this.#get(`/product?id=${id}`);
  }

  getProductsByFilter(filter: string) {
    return this.#get(`/product/filter?filter=${filter}`);
  }

  addUser(name: string) {
    return this.#post('/user', { name });
  }

  getProductsByList(listProductsID: string[]) {
    return this.#post('/products', { listProductsId: listProductsID });
  }

  changeWishlist(userID: string, productID: string) {
    return this.#post('/user/wishlist', {
      userId: userID,
      productId: productID,
    });
  }

  changePurchase(userID: string, productID: string, isAdd: boolean) {
    return this.#post('/user/purchase', {
      userId: userID,
      productId: productID,
      isAdd,
    });
  }
}
