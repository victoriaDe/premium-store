import { IProduct, TFilter } from '@type/product';
import { IUser } from '@type/user';

import UserAPI from '@api/user';
import LocalStorage from '@classes/LocalStorage';
import ProductAPI from '@api/product';
import Filter from '@scripts/filter';
import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';
import Item from '@classes/Item';

import lazy from '@scripts/lazy';
import { router } from '@page/main';

class MainPage {
  #productData: IProduct[] | null = [];

  #userData: IUser | null = null;

  #userId = '61a6286353b5dad92e57b4c0';

  async getAllData() {
    const productData = await this.getProductDataByFilter('All');
    const userData = await this.getUserData();
    return [productData, userData];
  }

  async updateUserData() {
    const userData = await UserAPI.getUserByID(this.#userId);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }

  async sendUserData() {
    const userData = LocalStorage.getLocalData('user') as IUser | null;
    if (userData) {
      const data = await UserAPI.changeUserData(userData);
    }
  }

  async updateProductDataByFilter(filter: TFilter | 'All') {
    const productDataByFilter = await ProductAPI.getProductsByFilter(filter);
    localStorage.setItem(filter, JSON.stringify(productDataByFilter));
    return productDataByFilter;
  }

  async getProductDataByFilter(filter: TFilter | 'All') {
    let productDataByFilter = LocalStorage.getLocalData(filter) as
      | IProduct[]
      | null;
    if (!productDataByFilter)
      productDataByFilter = await this.updateProductDataByFilter(filter);
    return productDataByFilter;
  }

  async getUserData() {
    let userData = LocalStorage.getLocalData('user') as IUser | null;
    if (!userData) userData = await this.updateUserData();
    this.#userData = userData;
    return userData;
  }

  async getListData(property: 'shoppingList' | 'wishlist') {
    const userData = await this.getUserData();
    if (userData) {
      if (userData[property].length > 0) {
        return ProductAPI.getProductsByList(userData[property]);
      }
    }
    return null;
  }

  async init(): Promise<any> {
    const data = (await this.getAllData()) as any[];
    await Filter.filterProducts('all', router);
    Filter.addEvent(router);
    ShoppingList.showShoppingListCounter(data[1].shoppingList);
    Wishlist.showWishlistCounter(data[1].wishlist);
    await lazy(20, 100, data[1], data[0], new Item(), router);

    setTimeout(() => {
      this.updateUserData();
    });
  }
}

export default MainPage;
