import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import Item from '@classes/Item';
import Wishlist from '@classes/Wishlist';
import LocalStorage from '@classes/LocalStorage';


class ShoppingList {
  static createHeaderList(name: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${name}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  static createShoppingListItem(product: IProduct, userData: IUser) {
    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `
      <a class="item-filtered-img" href="#"><img src=${
      product.data.images.span_2x1
    } alt="image"></a>
                <div class="item-filtered-description">
                    <h2>${product.data.name}</h2>
                    <p>${product.data.description}</p>
                    <div>
                        <button class="item-description-likeBtn ${
      isAddedToWishlist ? 'button-like_active' : ' '
    }"></button>
                        <span class="item-purchase-prise">${
      product.data.price.basic.cost
    }${product.data.price.basic.currency}</span>
                        <button class="button-purchase-added">Purchase</button>
                    </div>
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
    $purchaseButton: HTMLElement,
    // $containerLink: HTMLElement,
  ): void {
    LocalStorage.changeLocalShoppingList('user', product.data.id);
    LocalStorage.getUserData().then((data) => {
      if (data) {
        console.log($purchaseButton);
        ShoppingList.showShoppingListCounter(data.shoppingList);
        $purchaseButton.classList.add('button-purchase-added');
        // $containerLink?.classList.add('main-container-link-added');
      }
    });
    setTimeout(() => {
      LocalStorage.sendUserData().then(() => {
      });
    });
  }
}

export default ShoppingList;
