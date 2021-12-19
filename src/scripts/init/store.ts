import LocalStorage from '@classes/LocalStorage';
import router from '@scripts/init/router';
import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';

// инициализация магазина
const storeInit = () =>
  document.addEventListener(
    'DOMContentLoaded',
    async () => {
      const userData = await LocalStorage.getUserData();
      if (userData) {
        router.init(userData);
        ShoppingList.showShoppingListCounter(userData.shoppingList);
        Wishlist.showWishlistCounter(userData.wishlist);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    },
    { once: true },
  );

export default storeInit;
