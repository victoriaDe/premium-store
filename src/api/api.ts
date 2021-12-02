export default class API {
  readonly #baseURL = 'https://wg-force3-backend.herokuapp.com/api';

  async #get(path: string) {
    const response = await fetch(`${this.#baseURL}${path}`);
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
}
