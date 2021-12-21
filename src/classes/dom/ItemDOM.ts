import { IProduct } from '@type/product';
import { IUser } from '@type/user';

import Wishlist from '@classes/Wishlist';
import Item from '@classes/Item';

import { humanPrice } from '@scripts/price';

/**
 * Класс для создания DOM продукта
 */

class ItemDOM {
  /**
   * Метод для создания карточки продукта на страницах корзины и списка желаний
   * @param product исходный продукт
   * @param user текущий пользователь
   * @param page название страницы
   */

  static createAddedItem(
    product: IProduct,
    user: IUser,
    page: 'wishlist' | 'shoppingList',
  ) {
    const isAddedToShoppingList =
      page === 'shoppingList'
        ? true
        : user.shoppingList.includes(product.data.id);
    const isAddedToWishlist =
      page === 'wishlist' ? true : user.wishlist.includes(product.data.id);
    const saleElement = Item.getSale(product);

    const $item = document.createElement('div');
    $item.classList.add('item-filtered-container');

    $item.innerHTML = `
      <a class="item-filtered-img" href="#${
        product.data.id
      }" onclick="return false">
        <img src=${product.data.images.span_2x1} alt="${product.data.name}">
      </a>
      <div class="item-filtered-description">
        <h2>
          ${product.data.name}
          ${saleElement[1]}
        </h2>
        ${product.data.description}
        <div>
          <button class="item-description-likeBtn ${
            isAddedToWishlist ? 'button-like_active' : ''
          }">
          </button>
          <span class="item-purchase-prise">
            <span class="item-price-amount ${saleElement[3]}">
              ${humanPrice(product.data.price.basic.cost)} ${saleElement[2]}
            </span>
            ${saleElement[0]}
          </span>
          <button class="item-purchase-button ${
            isAddedToShoppingList ? 'button-purchase-added' : ''
          }">${isAddedToShoppingList ? 'added' : 'purchase'}
          </button>
        </div>
      </div>`;

    if (page === 'shoppingList') {
      const $checkboxContainer = document.createElement('div');
      $checkboxContainer.classList.add('checkbox-container');

      $checkboxContainer.innerHTML = `
        <label>
          <input type="checkbox" id="checkbox-${product.data.id}" class="checkbox-buy" name="will-buy" checked>
        </label>`;

      $item.prepend($checkboxContainer);
    }
    ///
    Wishlist.addEvent($item, product, false);
    ///
    return $item;
  }
}

export default ItemDOM;
