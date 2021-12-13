import LocalStorage from '@scripts/localStorage';
import ProductAPI from '@api/product';
import { IProduct } from '@type/product';
import ChangeUserLists from '@scripts/changeUserLists';
import Item from '@scripts/item';
import { IUser } from '@type/user';

class Wishlist {
  static createWishlistItem(product: IProduct, user: IUser) {
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `
      <a class="item-filtered-img" href="#"><img src=${product.data.images.span_2x1} alt="image"></a>
                <div class="item-filtered-description">
                    <h2>${product.data.name}</h2>
                    <p>${product.data.description}</p>
                    <div>
                        <button class="item-description-likeBtn button-like_active"></button>
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
        [product, user.wishlist, ChangeUserLists.showWishlist, $likeButton],
      );
    }
    return $item;
  }

  static createWishlist() {
    const user = LocalStorage.getLocalData('user');
    const $container: HTMLElement = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    if ('wishlist' in user) {
      ProductAPI.getProductsByList(user.wishlist).then((data) =>
        data?.forEach((product) => {
          $container.append(Wishlist.createWishlistItem(product, user));
        }),
      );
    }
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    $wrapper?.removeChild($wrapper?.children[1]);
    $wrapper?.append($container);
  }
}

export default Wishlist;
