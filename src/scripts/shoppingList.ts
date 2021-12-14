import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import Item from '@scripts/item';
import ChangeUserLists from '@scripts/changeUserLists';
import { main } from '@page/main';
import Wishlist from '@scripts/wishlist';

class ShoppingList {
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

  static async createShoppingList() {
    const shoppingListData = await main.getListData('shoppingList');
    const userData = await main.getUserData();
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
      } else {
        $wrapper.append(Wishlist.createEmptyListItems('ShoppingList is empty'));
      }
    }
  }
}

export default ShoppingList;
