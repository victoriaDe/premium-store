import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import Item from '@classes/Item';
import Wishlist from '@classes/Wishlist';
import LocalStorage from '@classes/LocalStorage';
import humanPrice from '@scripts/human-price';

class ShoppingList {
  static createHeaderList(name: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${name}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  static createShoppingListItem(product: IProduct, userData: IUser) {
    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `
      <a class="item-filtered-img" href="#${
        product.data.id
      }" onclick="return false"><img src=${product.data.images.span_2x1} alt="${
      product.data.name
    }"></a>
                <div class="item-filtered-description">
                    <h2>${product.data.name}</h2>
                    <p>${product.data.description}</p>
                    <div>
                        <button class="item-description-likeBtn ${
                          isAddedToWishlist ? 'button-like_active' : ' '
                        }"></button>
                        <span class="item-purchase-prise">${humanPrice(
                          product.data.price.basic.cost,
                        )} ${product.data.price.basic.currency}</span>
                        <button class="button-purchase-5000 ${
                          isAddedToPurchase ? 'button-purchase-added' : ''
                        }">added</button>
    `;
    const $likeButton: any = $item.querySelector('.item-description-likeBtn');
    if ($likeButton) {
      Item.addEvent(
        'click',
        $likeButton,
        Wishlist.changeWishlistCounter,
        false,
        [product, Wishlist.showWishlistCounter, $likeButton],
      );
    }
    const $buttonPurchase: any = $item.querySelector('.button-purchase-5000');
    if ($buttonPurchase) {
      Item.addEvent(
        'click',
        $buttonPurchase,
        ShoppingList.changeShoppingListCounter,
        false,
        [product, ShoppingList.showShoppingListCounter, $buttonPurchase],
      );
    }

    return $item;
  }

  static async createShoppingList() {
    const shoppingListData = await LocalStorage.getListData('shoppingList');
    const userData = await LocalStorage.getUserData();
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (shoppingListData && userData) {
        shoppingListData?.forEach((product) => {
          // временная затычка
          $container.append(this.createShoppingListItem(product, userData));
        });
        $wrapper.append($container);
        $wrapper.append(this.createHeaderList('Shopping list'));
      } else {
        $wrapper.append(Wishlist.createEmptyListItems('ShoppingList is empty'));
        $wrapper.append(this.createHeaderList('Shopping list'));
      }
    }
  }

  // show number of shopping list
  static showShoppingListCounter(shopping: string[]): void {
    const $shoppingCounter: HTMLElement | null = document.querySelector(
      '.cart-span-container',
    );
    if ($shoppingCounter) {
      $shoppingCounter.textContent = `(${shopping.length})`;
    }
  }

  // change product in shoppingList
  static changeShoppingListCounter(
    product: IProduct,
    showShopping: (shopping: string[]) => void,
    $buttonElement: HTMLElement,
  ): void {
    const data = LocalStorage.changeLocalShoppingList('user', product.data.id);
    if (data) {
      ShoppingList.showShoppingListCounter(data.data.shoppingList);

      const isProductInShoppingList = $buttonElement.classList.contains(
        'button-purchase-added',
      );

      // change button text and class
      $buttonElement.textContent = isProductInShoppingList
        ? 'purchase'
        : 'added';
      $buttonElement.classList.toggle('button-purchase-added');

      setTimeout(() => {
        LocalStorage.sendUserData();
      });
    }
  }
}

export default ShoppingList;
