import Item from '@page/item';
import { Product } from '@page/itemList';
import Shopping from '@page/shopping';
import { DataMethods, UserData } from './dataMethods';

import '@scss/main.scss';
import '@scss/main-content.scss';
import '@scss/item.scss';

class MainPage {
  #productData: Array<Product> = [];

  #item: Item = new Item();

  #shopping: Shopping = new Shopping();

  #userData: UserData = {
    wishList: [],
    shopping: [],
  };

  getData(): void {
    // добавить запрос на сервер дляполучения данных
    this.#productData = DataMethods.getProductData();
    this.#userData = DataMethods.getUserData();
  }

  showMainItems(): void {
    const $container: HTMLElement | null = document.getElementById('main');
    this.#productData.forEach((value, index) => {
      if ($container) {
        $container.appendChild(
          this.#item.createItem(value, this.#userData, this.#productData),
        );
      }
    });
  }

  init(): void {
    this.getData();
    this.#shopping.showShoppingList(this.#userData.shopping);
    this.#shopping.showWishList(this.#userData.wishList);
    this.showMainItems();
  }
}

const main: MainPage = new MainPage();
main.init();
