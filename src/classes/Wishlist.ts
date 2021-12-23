/**
 * @module Wish List
 */

import { IProduct } from '@type/product';

import ItemDOM from '@dom/ItemDOM';
import Item from '@classes/Item';
import LocalStorage from '@classes/LocalStorage';

/**
 * Wishlist class
 */
class Wishlist {
  /**
   * Method to create a 'hat' in the list
   * @param name text content of the 'hat'
   */
  static createHeaderList(name: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${name}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  /**
   * Method to create an empty list
   * @param text list content
   */
  static createEmptyListItems(text: string) {
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `<div class="empty-list">${text}</div>`;
    return $item;
  }

  /**
   * Method to add listeners to product cart buttons in a list
   * @param $item list cart button
   * @param product initial product
   * @param shoppingList
   */
  static addEvent(
    $item: HTMLElement,
    product: IProduct,
    shoppingList: boolean,
  ) {
    const $likeButton: HTMLElement | null = $item.querySelector(
      '.item-description-likeBtn',
    );
    const $buttonPurchase: HTMLElement | null = $item.querySelector(
      '.item-purchase-button',
    );
    Item.addButtonEvent($buttonPurchase, $likeButton, product, shoppingList);
  }

  /**
   * method to create wishList
   */
  static async createWishlist() {
    const wishlistData = await LocalStorage.getListData('wishlist');
    const userData = await LocalStorage.getUserData();
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (userData && wishlistData && wishlistData.length > 0) {
        wishlistData?.forEach((product) => {
          $container.append(
            ItemDOM.createAddedItem(product, userData, 'wishlist'),
          );
        });
        $wrapper.append($container);
        $wrapper.append(this.createHeaderList('Wishlist'));
      } else {
        $wrapper.append(this.createEmptyListItems('Wishlist is empty'));
        $wrapper.append(this.createHeaderList('Wishlist'));
      }
    }
  }

  /**
   * Method to display products amount in a list
   * @param wishList текущий current wishList
   */
  static showWishlistCounter(wishList: string[]): void {
    const $wishListCounter: HTMLElement | null = document.querySelector(
      '.wishlist-span-container',
    );
    if ($wishListCounter) {
      $wishListCounter.textContent = `(${wishList.length})`;
    }
  }

  /**
   * Method to change wishList counter
   * @param product initial product
   * @param showWishList
   * @param $buttonElement element triggered counter changing
   */
  static changeWishlistCounter(
    product: IProduct,
    showWishList: (wishlist: string[]) => void,
    $buttonElement: HTMLElement,
  ): void {
    const data = LocalStorage.changeUserProductList(
      product.data.id,
      'wishlist',
    );
    if (data) {
      showWishList(data.data.wishlist);
      $buttonElement.classList.toggle('button-like_active');
    }
  }
}

export default Wishlist;
