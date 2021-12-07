import Item from '@page/item';
import Shopping from '@page/shopping';
import ProductAPI from '@api/product';

import '@scss/main.scss';
import '@scss/main-content.scss';
import '@scss/item.scss';
import UserAPI from '@api/user';
import { IResponse } from '@type/api';
import { IProduct } from '@type/product';
import { IUser } from '@type/user';

class MainPage {
  #productData: IResponse<IProduct[]> | [] = [];

  #item: Item = new Item();

  #userData: IResponse<any> | [] = [];

  async getData() {
    // добавить запрос на сервер дляполучения данных
    this.#productData = await ProductAPI.getProductsByFilter('Technique');
    this.#userData = await UserAPI.getUserByID('61a6286353b5dad92e57b4c0');
    return [this.#productData.data, this.#userData.data];
  }

  showMainItems(productData: IProduct[], userData: IUser): void {
    const $container: HTMLElement | null = document.getElementById('main');
    let itemCounter = 0;
    productData.forEach((value: IProduct) => {
      if ($container) {
        if (itemCounter < 20) {
          $container.appendChild(
            this.#item.createItem(value, userData, productData),
          );
          itemCounter += value.span;
        }
      }
    });
  }

  init(): void {
    this.getData().then((data: any[]) => {
      this.showMainItems(data[0], data[1]);
      Shopping.showShoppingList(data[1].shoppingList);
      Shopping.showWishList(data[1].wishlist);
    });
  }
}

const main: MainPage = new MainPage();
main.init();
