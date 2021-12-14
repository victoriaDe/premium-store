import ProductAPI from '@api/product';
import { IProduct } from '@type/product';
import ChangeUserLists from '@scripts/changeUserLists';
import Item from '@scripts/item';
import { IUser } from '@type/user';
import { main } from '@page/main';

class Wishlist {
  static createWishlistItem(product: IProduct,userData:IUser) {
    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);

    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `
      <a class="item-filtered-img" href="#"><img src=${product.data.images.span_2x1} alt="image"></a>
                <div class="item-filtered-description">
                    <h2>${product.data.name}</h2>
                    <p>${product.data.description}</p>
                    <div>
                        <button class="item-description-likeBtn ${isAddedToWishlist ? 'button-like_active' : ' '}"></button>
                        <span class="item-purchase-prise">${product.data.price.basic.cost}${product.data.price.basic.currency}</span>
                        <button id="button-purchase">Purchase</button>
                    </div>
    `;

    const $likeButton: any = $item.querySelector('.item-description-likeBtn');
    if ($likeButton) {
      Item.addEvent(
        'click',
        $likeButton,
        ChangeUserLists.changeWishlist,
        false,
        [product, ChangeUserLists.showWishlist, $likeButton],
      );
    }
    const $buttonPurchase: any = $item.querySelectorAll("button")[1];
    if ($buttonPurchase && !isAddedToPurchase) {
      Item.addEvent(
        'click',
        $buttonPurchase,
        ChangeUserLists.changeShoppingList,
        true,
        [
          product,
          ChangeUserLists.showShoppingList,
          $buttonPurchase,
          null,
        ],
      );
    }
    return $item;
  }

  static createShoppingListItem(product: IProduct, userData:IUser) {
    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);

    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `
      <a class="item-filtered-img" href="#"><img src=${product.data.images.span_2x1} alt="image"></a>
                <div class="item-filtered-description">
                    <h2>${product.data.name}</h2>
                    <p>${product.data.description}</p>
                    <div>
                        <button class="item-description-likeBtn ${isAddedToWishlist ? 'button-like_active' : ' '}"></button>
                        <span class="item-purchase-prise">${product.data.price.basic.cost}${product.data.price.basic.currency}</span>
                        <button>Purchase</button>
                    </div>
    `;
    const $likeButton: any = $item.querySelector('.item-description-likeBtn');
    if ($likeButton) {
      Item.addEvent(
        'click',
        $likeButton,
        ChangeUserLists.changeWishlist,
        false,
        [product, ChangeUserLists.showWishlist, $likeButton],
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
    const userData = await main.getUserData()
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (userData && wishlistData && wishlistData.length > 0) {
        wishlistData?.forEach((product) => {
          $container.append(this.createWishlistItem(product,userData));
        });
        $wrapper.append($container);
      } else {
        $wrapper.append(this.createEmptyListItems('Wishlist is empty'));
      }
    }
  }

  static async createShoppingList() {
    const shoppingListData = await main.getListData('shoppingList');
    const userData = await main.getUserData()
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper: HTMLElement | null = document.querySelector('.main-container');
    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (shoppingListData && userData) {
        shoppingListData?.forEach((product) => {
          //временная затычка
          $container.append(this.createShoppingListItem(product, userData));
        });
        $wrapper.append($container);
      } else {
        $wrapper.append(this.createEmptyListItems('ShoppingList is empty'));
      }
    }
  }
}

export default Wishlist;
