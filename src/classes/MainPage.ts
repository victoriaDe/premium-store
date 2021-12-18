import LocalStorage from '@classes/LocalStorage';
import Filter from '@scripts/filter';
import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';
import Item from '@classes/Item';

import lazy from '@scripts/lazy';
import { router } from '@page/main';


class MainPage {
  async init(): Promise<any> {
    const data = (await LocalStorage.getAllData()) as any[];
    await Filter.filterProducts('All', router);
    Filter.addEvent(router);
    ShoppingList.showShoppingListCounter(data[1].shoppingList);
    Wishlist.showWishlistCounter(data[1].wishlist);
    await lazy(20, 100, data[1], data[0], new Item(), router);
    setTimeout(() => {
      LocalStorage.updateUserData();
    });
  }
}

export default MainPage;
