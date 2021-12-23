/**
 * @module Local Storage
 */

import { TFilter } from '@type/product';
import UserAPI from '@api/UserAPI';
import ProductAPI from '@api/ProductAPI';
import {
  TCurrency,
  IProductLocalStorageData,
  IUserLocalStorageData,
  TLocalData,
} from '@type/local-storage';

/**
 * Localstorage Class
 */

class LocalStorage {
  /** user ID */
  #userId = '61a6286353b5dad92e57b4c0';

  /** product currency */
  #currency = 'PLN' as TCurrency;

  /**
   * Method to receive product currency
   */

  getCurrency() {
    return this.#currency;
  }

  /**
   * Method to receive data from localStorage
   * @param id requested data ID
   */

  getLocalData(id: string): TLocalData {
    const dataJson: string | null = localStorage.getItem(`${id}`);
    if (dataJson) return JSON.parse(dataJson);
    return null;
  }

  /**
   * Method to sent user data from localStorage to database
   */

  async sendUserData() {
    const userData = this.getLocalData('user') as IUserLocalStorageData | null;
    if (userData) {
      const data = await UserAPI.changeUserData(userData.data);
    }
  }

  /**
   * Method to receive user data from database and save it in localStorage
   */

  async updateUserData() {
    const userData = await UserAPI.getUserByID(this.#userId);
    if (!userData) return null;
    const localUserData = {
      data: userData,
      dateAdded: Date.now(),
    };
    localStorage.setItem('user', JSON.stringify(localUserData));
    return userData;
  }

  /**
   * Method to receive products from database using theirs type and save them in localStorage
   * @param filter - product type
   */

  async updateProductDataByFilter(filter: TFilter | 'All') {
    const productDataByFilter = await ProductAPI.getProductsByFilter(
      filter,
      this.#currency,
    );
    if (!productDataByFilter) return null;
    const localProductData = {
      data: productDataByFilter,
      dateAdded: Date.now(),
    };
    localStorage.setItem(filter, JSON.stringify(localProductData));
    return productDataByFilter;
  }

  /**
   * Main method to receive products
   * @param filter - product type
   */

  async getProductDataByFilter(filter: TFilter | 'All') {
    const productDataStorageByFilter = this.getLocalData(
      filter,
    ) as IProductLocalStorageData | null;
    if (!productDataStorageByFilter) {
      const productDataByFilter = await this.updateProductDataByFilter(filter);
      if (productDataByFilter) return productDataByFilter;
    } else if (Date.now() - productDataStorageByFilter.dateAdded < 3000000) {
      // 3000000 - 10 минут - максимальное время актуальности данных в локальном хранилище
      setTimeout(() => {
        // запрос на получение новых данных после отрисоки на основе данных из локального хранилища
        this.updateProductDataByFilter(filter).then(() => {
        });
      });
      return productDataStorageByFilter.data;
    } else {
      const productDataByFilter = await this.updateProductDataByFilter(filter);
      if (productDataByFilter) return productDataByFilter;
    }
    return null;
  }

  /**
   * Main method to receive user data
   */

  async getUserData() {
    const userDataStorage = this.getLocalData(
      'user',
    ) as IUserLocalStorageData | null;
    if (!userDataStorage) {
      const userData = await this.updateUserData();
      if (userData) return userData;
    } else if (Date.now() - userDataStorage.dateAdded < 3000000) {
      // 3000000 - 10 минут
      return userDataStorage.data;
    } else {
      const userData = await this.updateUserData();
      if (userData) return userData;
    }
    return null;
  }

  /**
   * Method to receive products from database user data list
   * @param listType - list type
   */

  async getListData(listType: 'shoppingList' | 'wishlist') {
    // всегда берем актуальные данные с сервера по списку id
    const userData = await this.getUserData();
    if (userData) {
      if (userData[listType].length > 0) {
        return ProductAPI.getProductsByList(userData[listType], this.#currency);
      }
    }
    return null;
  }

  /**
   * Method to change user local cart
   * @param productId product ID
   * @param listType choosing of product list type
   */

  changeUserProductList(
    productId: string,
    listType: 'shoppingList' | 'wishlist',
  ): IUserLocalStorageData | null {
    const user = this.getLocalData('user') as IUserLocalStorageData | null;
    if (user) {
      const index: number = user.data[listType].indexOf(productId);
      if (index !== -1) {
        user.data[listType].splice(index, 1);
      } else {
        user.data[listType].push(productId);
      }
      localStorage.setItem('user', JSON.stringify(user));
      // передача пользовательских данных на сервер после отрисовки
      setTimeout(() => this.sendUserData());
      return user;
    }
    return null;
  }
}

export default new LocalStorage();
