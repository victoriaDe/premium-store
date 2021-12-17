import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import { main } from '@page/main';
import LocalStorage from '@classes/LocalStorage';
import ShoppingList from '@classes/ShoppingList';
import Item from '@classes/Item';

class Wishlist {
  static createWishlistItem(product: IProduct, userData: IUser) {
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
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
                        <button class="item-description-likeBtn button-like_active"></button>
                        <span class="item-purchase-prise">${
                          product.data.price.basic.cost
                        }${product.data.price.basic.currency}</span>
                        <button class="button-purchase-5000 ${
                          isAddedToPurchase ? 'button-purchase-added' : ''
                        }">Purchase</button>
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

    const $buttonPurchase: any = $item.querySelector('.button-purchase-5000');
    if ($buttonPurchase && !isAddedToPurchase) {
      Item.addEvent(
        'click',
        $buttonPurchase,
        ShoppingList.changeShoppingListCounter,
        true,
        [product, ShoppingList.showShoppingListCounter, $buttonPurchase],
      );
    }
    return $item;
  }

  static createEmptyListItems(text: string) {
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `<div>${text}</div>`;
    return $item;
  }

  static async createWishlist() {
    const wishlistData = await main.getListData('wishlist');
    const userData = await main.getUserData();
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (userData && wishlistData && wishlistData.length > 0) {
        wishlistData?.forEach((product) => {
          $container.append(this.createWishlistItem(product, userData));
        });
        $wrapper.append($container);
      } else {
        $wrapper.append(this.createEmptyListItems('Wishlist is empty'));
      }
    }
  }

  // show number of wishlist
  static showWishlistCounter(wishList: string[]): void {
    const $wishListCounter: HTMLElement | null = document.querySelector(
      '.wishlist-span-container',
    );
    if ($wishListCounter) {
      $wishListCounter.textContent = `(${wishList.length})`;
    }
  }

  // change product in wishlist
  static changeWishlistCounter(
    product: IProduct,
    showWishList: (wishlist: string[]) => void,
    $element: HTMLElement,
  ): void {
    LocalStorage.changeLocalWishlist('user', product.data.id);
    main.getUserData().then((data) => {
      if (data) {
        showWishList(data.wishlist);
        $element.classList.toggle('button-like_active');
      }
    });
    setTimeout(() => {
      main.sendUserData();
    });
  }
}

export default Wishlist;
