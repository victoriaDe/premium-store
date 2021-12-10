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
import Filter from '@scripts/filter';

class MainPage {
  #productData: IProduct[] | null = [];

  #userData: IUser | null = null;

  async getData() {
    const localUserData = localStorage.getItem('user');
    if (localUserData) {
      this.#userData = JSON.parse(localUserData);
    } else {
      this.#userData = await UserAPI.getUserByID('61a6286353b5dad92e57b4c0');
      localStorage.setItem('user', JSON.stringify(this.#userData));
    }
    this.#productData = await ProductAPI.getProductsByFilter('All');
    localStorage.setItem('productData', JSON.stringify(this.#productData));
    return [this.#productData, this.#userData];
  }

  static showMainItems(productData: IProduct[], userData: IUser): void {
    const $container: HTMLElement | null = document.getElementById('main');
    let itemCounter = 0;
    productData.forEach((value: IProduct) => {
      if ($container) {
        if (itemCounter < 20) {
          $container.appendChild(Item.createItem(value, userData, productData));
          itemCounter += value.span;
        }
      }
    });
  }

  init(): void {
    this.getData()
      .then((data: any[]) => {
        console.log(data[0]);
        MainPage.showMainItems(data[0], data[1]);
        Shopping.showShoppingList(data[1].data.shoppingList);
        Shopping.showWishlist(data[1].data.wishlist);
        return data;
      })
      .then((data) => lazy(20, 100, data[1], data[0], new Item()));
    Filter.addEvent();
  }
}

const main: MainPage = new MainPage();
main.init();
