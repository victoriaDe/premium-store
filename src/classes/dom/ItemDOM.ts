/**
 * @module DOM
 */

import { IProduct } from '@type/product';
import { IUser } from '@type/user';

import Wishlist from '@classes/Wishlist';
import Item from '@classes/Item';

import { humanPrice } from '@scripts/price';

/**
 * Class to create a product DOM
 */
class ItemDOM {
  /**
   * Method to create product card on pages (wishlist and shopping cart)
   * @param product initial product
   * @param user current user
   * @param page page title
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
    const saleElement = Item.getPrice(product);

    const $item = document.createElement('div');
    $item.classList.add('item-filtered-container');

    const $checkboxContainer = document.createElement('div');
    $checkboxContainer.classList.add('checkbox-container');

    $checkboxContainer.innerHTML = `
    <input type="checkbox" id="checkbox-${product.data.id}" name="name-${product.data.id}">
        <label for="checkbox-${product.data.id}">Buy it!</label>
    `;

    $item.innerHTML = `
      ${page === 'shoppingList' ? $checkboxContainer.outerHTML : ''}
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
          <span class="item-purchase-price">
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

    ///
    Wishlist.addEvent($item, product, page === 'shoppingList');
    ///
    return $item;
  }

  /**
   * Method to create product card on pages (main and filters)
   * @param product initial product
   * @param userData current user
   */
  static createItem(product: IProduct, userData: IUser): HTMLElement {
    const $item = document.createElement('div');
    $item.classList.add('main-container-product');
    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    let nation = '';
    let type = '';

    if ('filter' in product.data) {
      nation = `
        <span class="main-container-description_flag" data-country="${product.data.filter.nation}">
        </span>`;
      type = `
        <span class="main-container-description_type" data-type="${product.data.filter.type}">
        </span>`;
    }

    const saleElement = Item.getPrice(product);
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
          <span class="item-price-amount ${saleElement[3]}">
            ${humanPrice(product.data.price.basic.cost)} 
            ${saleElement[2]}
          </span>
          ${saleElement[0]}
        </span>
          <button class="main-container-description_button-purchase ${
            isAddedToPurchase ? 'button-purchase-added' : ''
          }">
            ${isAddedToPurchase ? 'added' : 'purchase'}
          </button>                            
      </div>
      <button class="main-container-description_button-like ${
        isAddedToWishlist ? 'button-like_active' : ''
      }">
      </button>`;

    if (product.span === 2) {
      $item.classList.add('span-two');
    }
    const $likeButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-like',
    );
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-purchase',
    );

    ///
    Item.addButtonEvent($purchaseButton, $likeButton, product, false);
    ///
    return $item;
  }

  /**
   * Method to create product card on page (product)
   * @param product initial product
   * @param userData current user
   */
  static createSelectedItem(product: IProduct, userData: IUser): HTMLElement {
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-container');
    $item.id = 'mainItem';
    const saleElement = Item.getPrice(product);

    if (product) {
      $item.innerHTML = `
        <h2>${product.data.name}
          ${saleElement[1]}
        </h2>
        <img src=${product.data.images.span_1x1} alt="${product.data.name}"/>
        <div class="item-container-purchase">
          <div class="item-price">
            <span class="item-price-amount ${saleElement[3]}">
              ${humanPrice(product.data.price.basic.cost)} 
              ${saleElement[2]}
            </span>
            ${saleElement[0]}
          </div>
          <button class="item-purchase-button ${
            isAddedToPurchase ? 'button-purchase-added' : ''
          }">${isAddedToPurchase ? 'added' : 'purchase'}
          </button>
        </div>
          <div class="item-container-description">
            <h3>Details</h3>
            <p>${product.data.description || 'coming soon...'}</p>
          </div>`;
    }

    ///
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.item-purchase-button',
    );
    if ($purchaseButton) {
      Item.addButtonEvent($purchaseButton, null, product, false);
    }
    ///
    return $item;
  }
}

export default ItemDOM;
