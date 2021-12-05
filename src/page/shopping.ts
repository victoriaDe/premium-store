import { Product } from '@page/itemList';

class Shopping {
  showShoppingList(shopping: Product[]) {
    const $shoppingCounter: HTMLElement | null = document.querySelector(
      '.cart-span-container',
    );
    if ($shoppingCounter) {
      $shoppingCounter.textContent = `(${shopping.length})`;
    }
  }

  changeShoppingList(
    product: Product,
    shopping: Product[],
    showShopping: Function,
  ) {
    shopping.push(product);
    showShopping(shopping);
  }

  showWishList(wishList: Product[]) {
    const $wishListCounter: HTMLElement | null = document.querySelector(
      '.wishlist-span-container',
    );
    if ($wishListCounter) {
      $wishListCounter.textContent = `(${wishList.length})`;
    }
  }

  changeWishList(product: Product, wishList: Product[], showWishList:Function) {

  }
}

export default Shopping;
