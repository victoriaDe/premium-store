/**
 * @module DOMElements
 */

import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import { TPage } from '@type/dom-elements';

import Item from '@classes/Item';
import Wishlist from '@classes/Wishlist';

import humanPrice from '@scripts/human-price';
import LocalStorage from '@classes/LocalStorage';

/**
 * Класс для создания DOM элементов
 */

class DOMElements {
  /**
   * Метод для создания шапки на страницах корзины и списка желаний
   * @param title заголовок шапки
   */

  static createListHeader(title: string): HTMLDivElement {
    const $header = document.createElement('div');
    $header.innerHTML = `${title}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  /**
   * Метод для создания пустых страниц корзины и списка желаний
   * @param text выводимый на странице текст
   */

  static createEmptyList(text: string): HTMLDivElement {
    const $item = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `<div class="empty-list">${text}</div>`;
    return $item;
  }

  /**
   * Метод для создания карточки продукта на страницах корзины и списка желаний
   * @param product исходный продукт
   * @param user текущий пользователь
   * @param page название страницы
   */

  static createAddedItem(product: IProduct, user: IUser, page: TPage) {
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
                    <button class="item-description-likeBtn ${
                      isAddedToWishlist ? 'button-like_active' : ''
                    }"></button>
                        <span class="item-purchase-prise">
                          <span class="item-price-amount ${
                            saleElement[3]
                          }">${humanPrice(product.data.price.basic.cost)} ${
      saleElement[2]
    }</span>
                          ${saleElement[0]}
                        </span>
                        <button class="item-purchase-button ${
                          isAddedToShoppingList ? 'button-purchase-added' : ''
                        }">${
      isAddedToShoppingList ? 'added' : 'purchase'
    }</button>
                        </div>
                    </div>
    `;

    if (page === 'shoppingList') {
      const $checkboxContainer = document.createElement('div');
      $checkboxContainer.classList.add('checkbox-container');

      $checkboxContainer.innerHTML = `
    <label>
       <input type="checkbox" id="checkbox-${product.data.id}" class="checkbox-buy"
          name="will-buy" checked>
    </label>
    }
    `;

      $item.prepend($checkboxContainer);
    }
    Wishlist.addEvent($item, product);
    return $item;
  }

  static async createUsersList(page: TPage) {
    const addedProducts = await LocalStorage.getListData(page);
    const user = await LocalStorage.getUserData();

    const $container = document.createElement('div');
    $container.classList.add('items-filtered');
    $container.id = 'items-filtered';
    const $wrapper = document.querySelector('.main-container');

    if ($wrapper) {
      $wrapper.innerHTML = '';
      if (user && addedProducts) {
        addedProducts.forEach((product) => {
          $container.append(DOMElements.createAddedItem(product, user, page));
        });
        if (page === 'shoppingList') {
          const $totalContainer = document.createElement('div');
          $totalContainer.classList.add('total-container');

          $totalContainer.innerHTML = `
          <p class="total-price">
        Total: 
        <span>100 500$</span>
</p>
        <button class="total-button">buy</button>
          `;

          $container.append($totalContainer);
        }

        $wrapper.append($container);
      } else {
        $wrapper.append(
          DOMElements.createEmptyList(
            `${page === 'wishlist' ? 'Wishlist' : 'Shopping List'} is empty`,
          ),
        );
      }
      $wrapper.append(
        DOMElements.createListHeader(
          page === 'wishlist' ? 'Wishlist' : 'Shopping List',
        ),
      );
    }
  }
}

export default DOMElements;
