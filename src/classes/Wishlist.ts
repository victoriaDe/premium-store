import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import LocalStorage from '@classes/LocalStorage';
import ShoppingList from '@classes/ShoppingList';
import Item from '@classes/Item';
import humanPrice from '@scripts/human-price';

class Wishlist {
  static createHeaderList(name: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${name}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  static createWishlistItem(product: IProduct, userData: IUser) {
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    const $item: HTMLElement = document.createElement('div');
    const saleElement = Item.getSale(product);
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `
      <a class="item-filtered-img" href="#${
        product.data.id
      }" onclick="return false"><img src=${product.data.images.span_2x1} alt="${
      product.data.name
    }"></a>
                <div class="item-filtered-description">
                    <h2>
                      ${product.data.name}
                      ${saleElement[1]}
                    </h2>
                    ${product.data.description}
                    <div>
                        <button class="item-description-likeBtn button-like_active"></button>
                        <span class="item-purchase-prise">
                          <span class="item-price-amount ${saleElement[3]}">${humanPrice(
                            product.data.price.basic.cost,
                          )} ${saleElement[2]}</span>
                          ${saleElement[0]}
                        </span>
                        <button class="item-purchase-button ${
                          isAddedToPurchase ? 'button-purchase-added' : ''
                        }">${isAddedToPurchase ? 'added' : 'purchase'}</button>
                    </div>
    `;
    Wishlist.addEvent($item, product);
    return $item;
  }

  static createEmptyListItems(text: string) {
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `<div class="empty-list">${text}</div>`;
    return $item;
  }

  static addEvent ($item: HTMLElement, product: IProduct) {
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

    const $buttonPurchase: any = $item.querySelector('.item-purchase-button');
    if ($buttonPurchase) {
      Item.addEvent(
        'click',
        $buttonPurchase,
        ShoppingList.changeShoppingListCounter,
        false,
        [product, ShoppingList.showShoppingListCounter, $buttonPurchase],
      );
    }
  }

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
          $container.append(this.createWishlistItem(product, userData));
        });
        $wrapper.append($container);
        $wrapper.append(this.createHeaderList('Wishlist'));
      } else {
        $wrapper.append(this.createEmptyListItems('Wishlist is empty'));
        $wrapper.append(this.createHeaderList('Wishlist'));
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
    $buttonElement: HTMLElement,
  ): void {
    const data = LocalStorage.changeLocalWishlist('user', product.data.id);
    if (data) {
      showWishList(data.data.wishlist);
      $buttonElement.classList.toggle('button-like_active');
      setTimeout(() => {
        LocalStorage.sendUserData();
      });
    }
  }
}

export default Wishlist;
