import { IProduct } from '@type/product';
import LocalStorage from '@scripts/localStorage';

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

  // change product in shoppingList
  static changeShoppingList(
    product: IProduct,
    shopping: string[],
    showShopping: (shopping: string[]) => void,
    $purchaseButton: HTMLElement,
    $containerLink: HTMLElement,
  ): void {
    shopping.push(product.data.id);
    LocalStorage.changeLocalShoppingList('user', product.data.id);
    showShopping(shopping);
    $purchaseButton.classList.add("button-purchase-added")
    $containerLink.classList.add("main-container-link-added")
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

  // change product in wishlist
  static changeWishlist(
    product: IProduct,
    wishlist: string[],
    showWishList: (wishlist: string[]) => void,
    $element: HTMLElement,
  ): void {
    const index: number = wishlist.indexOf(product.data.id);
    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(product.data.id);
    }
    LocalStorage.changeLocalWishlist('user', wishlist);
    showWishList(wishlist);
    // add or remove style for like button
    $element.classList.toggle('button-like_active'); //! disable button!
  }
}

export default ChangeUserLists;
