import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import { IAddEvent } from '@type/item';

import ShoppingList from '@classes/ShoppingList';
import Wishlist from '@classes/Wishlist';
// import HashRouter from '@classes/HashRouter';

import humanPrice from '@scripts/human-price';
import DOMElems from '@classes/DOMElems';

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
    const $item = DOMElems.createItemElement(product, userData);
    if (product.span === 2) {
      $item.classList.add('span-two');
    }
    const $likeButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-like',
    );
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-purchase',
    );

    if ($purchaseButton) {
      Item.addEvent(
        'click',
        $purchaseButton,
        ShoppingList.changeShoppingListCounter,
        false,
        [product, ShoppingList.showShoppingListCounter, $purchaseButton],
      );
    }
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

  /**
   * Метод для создания карточки продукта на странице самого продукта
   * @param product исходный продукт
   * @param userData текущий пользователь
   * @param addEvent
   */

  static createSelectedItem(
    product: IProduct,
    userData: IUser,
    addEvent: IAddEvent,
  ): HTMLElement {
    const $item = DOMElems.createSelectedItemElement(product, userData);
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.item-purchase-button',
    );
    if ($purchaseButton) {
      addEvent(
        'click',
        $purchaseButton,
        ShoppingList.changeShoppingListCounter,
        false,
        [product, ShoppingList.showShoppingListCounter, $purchaseButton],
      );
    }
    return $item;
  }

  /**
   * Метод для отображения карточки продукта
   * @param product исходный продукт
   * @param userData текущий пользователь
   * @param createItem функция создания карточки продукта
   */

  static showSelectedItem(
    product: IProduct,
    userData: IUser,
    createItem: (
      product: IProduct,
      userData: IUser,
      addEvent: IAddEvent,
    ) => HTMLElement,
  ) {
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
      const $item: HTMLElement = createItem(product, userData, Item.addEvent);
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
   * Метод для добавления обработчиков
   * @param event тип события
   * @param $element элемент для навешивания обработчика
   * @param eventFunction функция обработчика
   * @param once срабатывание обработчика только 1 раз
   * @param params параметры для функции обработчика
   */

  static addEvent(
    event: string,
    $element: HTMLElement,
    eventFunction: (...args: any[]) => void,
    once: boolean,
    params: any[],
  ): void {
    $element.addEventListener(
      `${event}`,
      () => {
        eventFunction(...params);
      },
      { once },
    );
  }
}

export default Item;
