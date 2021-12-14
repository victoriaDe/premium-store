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
    const userData = await this.getUserData('61a6286353b5dad92e57b4c0');
    return [productData, userData];
  }

  async updateUserData(id: string) {
    const userData = await UserAPI.getUserByID(id);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }

  async sendUserData(id: string){
    let userData = LocalStorage.getLocalData('user') as IUser | null;
    if(userData){
      const data = await UserAPI.changeUserData(userData)
    }
  }

  async updateProductDataByFilter(filter: TFilter | 'All') {
    const productDataByFilter = await ProductAPI.getProductsByFilter(filter);
    localStorage.setItem(filter, JSON.stringify(productDataByFilter));
    return productDataByFilter;
  }

  async getProductDataByFilter(filter: TFilter | 'All') {
    let productDataByFilter = LocalStorage.getLocalData(filter);
    if (!productDataByFilter) productDataByFilter = await this.updateProductDataByFilter(filter);
    return productDataByFilter;
  }

  async getUserData(id: string) {
    let userData = LocalStorage.getLocalData('user') as IUser | null;
    if (!userData) userData = await this.updateUserData(id);
    this.#userData = userData;
    return userData;
  }


  async init(): Promise<any> {
    const data = await this.getAllData() as any[];
    Filter.filterProducts('all');
    Filter.addEvent();
    Shopping.showShoppingList(data[1].shoppingList);
    Shopping.showWishlist(data[1].wishlist);
    lazy(20, 100, data[1], data[0], new Item());


    //вынести в отдельный класс
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

    setTimeout(()=>{
      this.updateUserData("61a6286353b5dad92e57b4c0")
      this.updateProductDataByFilter("All")
    })

  }
}

export const main: MainPage = new MainPage();
main.init();
