import { IUser } from '@type/user';
import { IProduct, TFilter } from '@type/product';

import UserAPI from '@api/user';
import Item from '@scripts/item';
import Shopping from '@scripts/changeUserLists';
import ProductAPI from '@api/product';
import lazy from '@scripts/lazy';

import '@scss/main.scss';
import '@scss/main-content.scss';
import '@scss/item.scss';
import '@scss/items-filtered-list.scss';
import Filter from '@scripts/filter';
import Wishlist from '@scripts/wishlist';
import LocalStorage from '@scripts/localStorage';

class MainPage {
  #productData: IProduct[] | null = [];

  #userData: IUser | null = null;
  #userId = '61a6286353b5dad92e57b4c0';

  // Я НЕ РЕФАКТОРИЛ ЭТОТ КОД

  static updateLocalData() {
    UserAPI.getUserByID('61a6286353b5dad92e57b4c0').then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
    });
    ProductAPI.getProductsByFilter('All').then((data) => {
      localStorage.setItem('productData', JSON.stringify(data));
    });
  }

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
    let userData = LocalStorage.getLocalData('user') as IUser | null;
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
    let productDataByFilter = LocalStorage.getLocalData(filter) as IProduct[] | null;
    if (!productDataByFilter) productDataByFilter = await this.updateProductDataByFilter(filter);
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
      if(userData[property].length > 0){
        return await ProductAPI.getProductsByList(userData[property]);
      }
    }
    return null;
  }


  async init(): Promise<any> {
    const data = await this.getAllData() as any[];

    await Filter.filterProducts('all');
    Filter.addEvent();
    Shopping.showShoppingList(data[1].shoppingList);
    Shopping.showWishlist(data[1].wishlist);
    await lazy(20, 100, data[1], data[0], new Item());


    //вынести в отдельные классы
    const $headerLogo: HTMLElement | null =
      document.getElementById('headerLogo');
    $headerLogo?.addEventListener('click', () => {
      Item.showMainNavContainer();
      Filter.addEvent();
      Filter.filterProducts('all');
    });
    const $wishlistButton: HTMLElement | null =
      document.getElementById('wishlistId');
    $wishlistButton?.addEventListener('click', () => {
      Wishlist.createWishlist();
    });
    const $shoppingListButton: HTMLElement | null =
      document.getElementById('shoppingId');
    $shoppingListButton?.addEventListener('click', () => {
      Wishlist.createShoppingList();
    });

    setTimeout(() => {
      this.updateUserData();
    });
  }
}

export const main: MainPage = new MainPage();
main.init();
