import { IProduct } from '@type/product';

class Shopping {
  static showShoppingList(shopping: IProduct[]): void {
    const $shoppingCounter: HTMLElement | null = document.querySelector(
      '.cart-span-container',
    );
    if ($shoppingCounter) {
      $shoppingCounter.textContent = `(${shopping.length})`;
    }
  }

  static changeShoppingList(
    product: IProduct,
    shopping: IProduct[],
    showShopping: (shopping: IProduct[]) => void,
  ) {
    shopping.push(product);
    showShopping(shopping);
  }

  static showWishList(wishList: IProduct[]): void {
    const $wishListCounter: HTMLElement | null = document.querySelector(
      '.wishlist-span-container',
    );
    if ($wishListCounter) {
      $wishListCounter.textContent = `(${wishList.length})`;
    }
  }

  // changeWishList(product: IProduct, wishList: string[], showWishList: Function) {
  //
  // }
}

export default Shopping;