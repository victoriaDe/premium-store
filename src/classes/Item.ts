import { IProduct } from '@type/product';
import { IUser } from '@type/user';

import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';

import { calcFinalPrice, humanPrice } from '@scripts/price';
import LocalStorage from '@classes/LocalStorage';

/**
 * Класс для работы с продуктом
 */

class Item {
  /**
   * Метод для создания карточки продукта на главной странице и страницах фильтров
   * @param product исходный продукт
   * @param userData текущий пользователь
   // * @param router
   */

  static createItem(product: IProduct, userData: IUser): HTMLElement {
    const $item = document.createElement('div');
    $item.classList.add('main-container-product');

    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    let nation = '';
    let type = '';
    if ('filter' in product.data) {
      nation = `<span class="main-container-description_flag" data-country="${product.data.filter.nation}"></span>`;
      type = `<span class="main-container-description_type" data-type="${product.data.filter.type}"></span>`;
    }
    const saleElement = Item.getSale(product);
    $item.innerHTML = `
                     <a class="main-container-link ${
                       isAddedToPurchase ? 'main-container-link-added' : ''
                     }" href="#${product.data.id}">
                          <img class="main-container-link_img" src=${
                            product.data.images.span_2x1
                          } alt="${product.data.name}">
                     </a>
                     <div class="main-container-description">
                            ${nation}
                            ${type}
                            <h2>
                              ${product.data.name}
                              ${saleElement[1]}
                             </h2>
                            <span class="item-price">
                              <span class="item-price-amount ${
                                saleElement[3]
                              }">${humanPrice(product.data.price.basic.cost)} ${
      saleElement[2]
    }</span>
                              ${saleElement[0]}
                            </span>
                            <button class="main-container-description_button-purchase ${
                              isAddedToPurchase ? 'button-purchase-added' : ''
                            }">
                                   ${isAddedToPurchase ? 'added' : 'purchase'}
                            </button>                            
                      </div>
                     <button class="main-container-description_button-like ${
                       isAddedToWishlist ? 'button-like_active' : ' '
                     }"></button>
    `;
    if (product.span === 2) {
      $item.classList.add('span-two');
    }
    const $likeButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-like',
    );
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-purchase',
    );
    this.addButtonEvent($purchaseButton, $likeButton, product, false);

    return $item;
  }

  /**
   * Метод для создания карточки продукта на странице самого продукта
   * @param product исходный продукт
   * @param userData текущий пользователь
   */

  static createSelectedItem(product: IProduct, userData: IUser): HTMLElement {
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-container');
    $item.id = 'mainItem';
    const saleElement = Item.getSale(product);
    if (product) {
      $item.innerHTML = `
          <h2>${product.data.name}
            ${saleElement[1]}
          </h2>
          <img src=${product.data.images.span_1x1} alt="${product.data.name}"/>
          <div class="item-container-purchase">
              <div class="item-price">
                        <span class="item-price-amount ${
                          saleElement[3]
                        }">${humanPrice(product.data.price.basic.cost)} ${
        saleElement[2]
      }</span>
                        ${saleElement[0]}
              </div>
              <button class="item-purchase-button ${
                isAddedToPurchase ? 'button-purchase-added' : ''
              }">${isAddedToPurchase ? 'added' : 'purchase'}</button>
          </div>
          <div class="item-container-description">
                <h3>Details</h3>
                <p>${product.data.description || 'coming soon...'}</p>
            </div>`;
    }
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.item-purchase-button',
    );
    if ($purchaseButton) {
      Item.addButtonEvent($purchaseButton, null, product, false);
    }
    return $item;
  }

  /**
   * Метод для отображения карточки продукта
   * @param product исходный продукт
   * @param userData текущий пользователь
   */

  static showSelectedItem(product: IProduct, userData: IUser) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    const $container: HTMLElement | null = document.getElementById('main');
    const $itemFilter: HTMLElement | null =
      document.querySelector('.item-filters');

    if ($visualContainer) {
      if ($container) {
        $visualContainer?.removeChild($container!);
      }

      if (
        $visualContainer?.parentElement?.children.length === 3 &&
        $itemFilter
      ) {
        $visualContainer?.parentElement?.removeChild($itemFilter);
      }
      const $item: HTMLElement = Item.createSelectedItem(product, userData);
      $visualContainer.appendChild($item);
    }
  }

  /**
   * Метод для получения стоимостных данных продукта
   * @param product исходный продукт
   */

  static getSale(product: IProduct) {
    let priceAmount = '';
    let actualPrice = ``;
    let sale = ``;
    let currency = `${product.data.price.basic.currency}`;
    if (product.data.price.basic.cost !== product.data.price.actual.cost) {
      actualPrice = `
      <span class = "item-arrow icon-arrow-right"></span>
      <span class="item-price-reduced">${humanPrice(
        product.data.price.actual.cost,
      )} ${product.data.price.basic.currency}</span>`;
      let discountAmount = Math.ceil(
        100 -
          (100 * +product.data.price.actual.cost) /
            +product.data.price.basic.cost,
      );
      sale = `<span class='item-sale'>-${discountAmount}%</span>`;
      currency = ``;
      priceAmount = 'price-sale';
      if (product.data.price.actual.discountType === '') {
        discountAmount =
          +product.data.price.basic.cost - +product.data.price.actual.cost;
        sale = `<span class='item-sale'>-${discountAmount} ${product.data.price.basic.currency}</span>`;
      }
    }
    return [actualPrice, sale, currency, priceAmount];
  }

  /**
   * Метод для добавления обработчиков на кнопки
   * @param $buttonPurchase
   * @param $likeButton
   * @param product
   * @param shoppingList
   */

  static addButtonEvent(
    $buttonPurchase: HTMLElement | null,
    $likeButton: HTMLElement | null,
    product: IProduct,
    shoppingList: boolean,
  ): void {
    if ($buttonPurchase) {
      $buttonPurchase.addEventListener('click', (e) => {
        ShoppingList.changeShoppingListCounter(
          product,
          ShoppingList.showShoppingListCounter,
          $buttonPurchase,
        );
        if (shoppingList) {
          if (!$buttonPurchase.classList.contains('button-purchase-added')) {
            const parent = $buttonPurchase.closest('.item-filtered-container');
            parent?.classList.add('delete-item');
            LocalStorage.getLocalData('user');
            const user = LocalStorage.getLocalData('user')?.data as IUser;
            if (user.shoppingList.length === 0) {
              const $totalContainer =
                document.querySelector('.total-container');
              if ($totalContainer) {
                $totalContainer.parentElement?.removeChild($totalContainer);
                parent?.parentElement?.append(
                  Wishlist.createEmptyListItems('Your shopping cart is empty'),
                );
              }
            }
            parent?.addEventListener('animationend', () => {
              parent?.parentElement?.removeChild(parent);
              const $container = document.querySelector(
                '.items-filtered',
              ) as HTMLElement;

              if ($container) {
                calcFinalPrice($container);
              }
            });
          }
        }
      });
    }
    if ($likeButton) {
      $likeButton.addEventListener('click', (e) => {
        ShoppingList.changeShoppingListCounter(
          product,
          Wishlist.showWishlistCounter,
          $likeButton,
        );
      });
    }
  }
}

export default Item;
