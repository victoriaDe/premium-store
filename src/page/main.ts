import { IUser } from '@type/user';
import { IProduct } from '@type/product';

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

  async getData() {
    const localUserData = LocalStorage.getLocalData('user');
    const productData = LocalStorage.getLocalData('productData');
    if (!localUserData) {
      this.#userData = await UserAPI.getUserByID('61a6286353b5dad92e57b4c0');
      localStorage.setItem('user', JSON.stringify(this.#userData));
    } else {
      this.#userData = localUserData as IUser;
    }
    if (!productData) {
      this.#productData = await ProductAPI.getProductsByFilter('All');
      localStorage.setItem('productData', JSON.stringify(this.#productData));
    } else {
      this.#productData = productData as IProduct[];
    }
    return [this.#productData, this.#userData];
  }

  init(): void {
    this.getData()
      .then((data: any[]) => {
        Filter.filterProducts('all');
        Shopping.showShoppingList(data[1].shoppingList);
        Shopping.showWishlist(data[1].wishlist);
        return data;
      })
      .then((data) => lazy(20, 100, data[1], data[0], new Item()));
    Filter.addEvent();
    const $wishlistButton: HTMLElement | null =
      document.getElementById('wishlistId');
    $wishlistButton?.addEventListener('click', () => {
      Wishlist.createWishlist();
    });
    MainPage.updateLocalData();
  }
}

const main: MainPage = new MainPage();
main.init();
