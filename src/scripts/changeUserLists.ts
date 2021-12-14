import { IProduct } from '@type/product';
import LocalStorage from '@scripts/localStorage';
import { main } from '@page/main';
import { IUser } from '@type/user';

class ChangeUserLists {
  // show number of shopping list
  static showShoppingList(shopping: string[]): void {
    const $shoppingCounter: HTMLElement | null = document.querySelector(
      '.cart-span-container',
    );
    if ($shoppingCounter) {
      $shoppingCounter.textContent = `(${shopping.length})`;
    }
  }
  // show number of wishlist
  static showWishlist(wishList: string[]): void {
    const $wishListCounter: HTMLElement | null = document.querySelector(
      '.wishlist-span-container',
    );
    if ($wishListCounter) {
      $wishListCounter.textContent = `(${wishList.length})`;
    }
  }


  // change product in shoppingList
  static changeShoppingList(
    product: IProduct,
    showShopping: (shopping: string[]) => void,
    $purchaseButton: HTMLElement,
    $containerLink: HTMLElement,
  ): void {
    LocalStorage.changeLocalShoppingList('user', product.data.id);
    let userActualData: IUser;
    main.getUserData().then((data) => {
      if (data) {
        showShopping(data.shoppingList);
        $purchaseButton.classList.add('button-purchase-added');
        $containerLink?.classList.add('main-container-link-added');
        userActualData = data;
      }
    });
    setTimeout(() => {
      main.sendUserData().then(()=>{});
    });
  }



  // change product in wishlist
  static changeWishlist(
    product: IProduct,
    showWishList: (wishlist: string[]) => void,
    $element: HTMLElement,
  ): void {

    LocalStorage.changeLocalWishlist('user', product.data.id);
    let userActualData: IUser;
    main.getUserData().then((data) => {
      if (data) {
        showWishList(data.wishlist);
        $element.classList.toggle('button-like_active');
        userActualData = data;
      }
    });
    setTimeout(() => {
      main.sendUserData();
    });
  }
}

export default ChangeUserLists;
