/**
 * @module Local Storage
 */

import { TFilter } from '@type/product';
import UserAPI from '@api/user';
import ProductAPI from '@api/product';
import {
  TCurrency,
  IProductLocalStorageData,
  IUserLocalStorageData,
  TLocalData,
} from '@type/local-storage';

/**
 * Класс для работы с локальным хранилищем
 */

class LocalStorage {
  /** ID пользователя для рабоаты */
  #userId = '61a6286353b5dad92e57b4c0';

  /** Валюта продуктов */
  #currency = 'RUB' as TCurrency;

  /**
   * Метод для получения валюты продуктов
   */

  getCurrency() {
    return this.#currency;
  }

  /**
   * Метод для получения данных из локального хранилища
   * @param id ID запрашиваемых данных
   */

  getLocalData(id: string): TLocalData {
    const dataJson: string | null = localStorage.getItem(`${id}`);
    if (dataJson) return JSON.parse(dataJson);
    return null;
  }

  /**
   * Метод для отправки данных пользователя с локального хранилища в БД
   */

  async sendUserData() {
    const userData = this.getLocalData('user') as IUserLocalStorageData | null;
    if (userData) {
      const data = await UserAPI.changeUserData(userData.data);
    }
  }

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
        this.updateProductDataByFilter(filter).then(() => {});
      });
      return productDataStorageByFilter.data;
    } else {
      const productDataByFilter = await this.updateProductDataByFilter(filter);
      if (productDataByFilter) return productDataByFilter;
    }
    return null;
  }

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

  async getListData(property: 'shoppingList' | 'wishlist') {
    // всегда берем актуальные данные по списку id
    const userData = await this.getUserData();
    if (userData) {
      if (userData[property].length > 0) {
        return ProductAPI.getProductsByList(userData[property], this.#currency);
      }
    }
    return null;
  }

  /**
   * Метод для изменения локальной корзины пользователя
   * @param id ID пользователя
   * @param productId ID продукта
   */

  changeLocalShoppingList(
    id: string,
    productId: string,
  ): IUserLocalStorageData | null {
    const user = this.getLocalData('user') as IUserLocalStorageData | null;
    if (user) {
      const index: number = user.data.shoppingList.indexOf(productId);
      if (index !== -1) {
        user.data.shoppingList.splice(index, 1);
      } else {
        user.data.shoppingList.push(productId);
      }
      localStorage.setItem('user', JSON.stringify(user));
      //передача пользовательских данных на сервер после отрисовки
      setTimeout(() => this.sendUserData());
      return user;
    }
    return null;
  }

  /**
   * Метод для изменения локального списка желаний пользователя
   * @param id ID пользователя
   * @param productId ID продукта
   */

  changeLocalWishlist(
    id: string,
    productId: string,
  ): IUserLocalStorageData | null {
    const user = this.getLocalData('user') as IUserLocalStorageData | null;
    if (user) {
      const index: number = user.data.wishlist.indexOf(productId);
      if (index !== -1) {
        user.data.wishlist.splice(index, 1);
      } else {
        user.data.wishlist.push(productId);
      }
      localStorage.setItem('user', JSON.stringify(user));
      //передача пользовательских данных на сервер после отрисовки
      setTimeout(() => this.sendUserData());
      return user;
    }
    return null;
  }
}

export default new LocalStorage();
