/**
 * @module DOMElems
 */
import {
  TBtnElem,
  TImgElem,
  TInputElem,
  TLabelElem,
  TLinkElem,
  TParElem,
} from '@scripts/init/dom-elems';
import humanPrice from '@scripts/human-price';
import { IProduct } from '@type/product';
import { IUser } from '@type/user';
import Item from '@classes/Item';

class DOMElems {
  static createVehiclesFiltersElement() {
    const $itemFilter = document.createElement('div');
    $itemFilter.classList.add('item-filters');
    $itemFilter.innerHTML = `
        <div class="filter-container">
                <button class="filter-container-checkedBtn nations arrow" id="allNations" type="button">All nations</button>
                <ul class="filter-list nations-list">
                    <li class="nations-btn filter-btn" data-nation="all">
                        <button class="nations">All nations</button>
                    </li>
                    <li class="nations-btn filter-btn" data-nation="china">
                        <button class="china_btn">China</button>
                    </li>
                    <li class="nations-btn filter-btn" data-nation="france">
                        <button class="france_btn">France</button>
                    </li>
                    <li class="nations-btn filter-btn" data-nation="germany">
                        <button class="germany_btn">Germany</button>
                    </li>
                    <li class="nations-btn filter-btn" data-nation="japan">
                        <button class="japan_btn">Japan</button>
                    </li>
                    <li class="nations-btn filter-btn" data-nation="uk">
                        <button class="uk_btn">U.K.</button>
                    </li>
                    <li class="nations-btn filter-btn" data-nation="usa">
                        <button class="usa_btn">U.S.A.</button>
                    </li>
                    <li class="nations-btn filter-btn" data-nation="ussr">
                        <button class="ussr_btn">U.S.S.R.</button>
                    </li>
                </ul>
            </div>
            <div class="filter-container">
                <button class="filter-container-checkedBtn types arrow" id="allTypes" type="button">All types</button>
                <ul class="filter-list type-list">
                    <li class="type-btn filter-btn" data-type="all">
                        <button class="types">All types</button>
                    </li>
                    <li class="type-btn filter-btn" data-type="lightTank">
                        <button class="light">Light Tanks</button>
                    </li>
                    <li class="type-btn filter-btn" data-type="mediumTank">
                        <button class="medium">Medium Tanks</button>
                    </li>
                    <li class="type-btn filter-btn" data-type="heavyTank">
                        <button class="heavy">Heavy Tanks</button>
                    </li>
                    <li class="type-btn filter-btn" data-type="AT-SPG">
                        <button class="destroy">Tank Destroyers</button>
                    </li>
                    <li class="type-btn filter-btn" data-type="SPG">
                        <button class="spg">SPGs</button>
                    </li>
                    <li class="type-btn filter-btn" data-type="all">
                        <button class="multirole">Multirole fighter</button>
                    </li>
                </ul>
            </div>
            <div class="filter-container">
                <button class="filter-container-checkedBtn tiers arrow" id="allTiers" type="button">All Tiers</button>
                <ul class="filter-list tiers-list">
                  <li class="tires-btn filter-btn" data-tier="all">
                        <button>&#8545;-&#8553;</button>
                    </li>
                    <li class="tires-btn filter-btn" data-tier="2">
                        <button>&#8545;</button>
                    </li>
                    <li class="tires-btn filter-btn" data-tier="4">
                        <button>&#8544;&#8548;</button>
                    </li>
                    <li class="tires-btn filter-btn" data-tier="5">
                        <button>&#8548;</button>
                    </li>
                    <li class="tires-btn filter-btn" data-tier="7">
                        <button>&#8548;&#8545;</button>
                    </li>
                    <li class="tires-btn filter-btn" data-tier="9">
                        <button>&#8544;&#8553;</button>
                    </li>
                    <li class="tires-btn filter-btn" data-tier="10">
                        <button>&#8553;</button>
                    </li>
                </ul>
            </div>
            <button class="item-filters-btn" id="allVehicles">Show all vehicles</button>
      `;
    return $itemFilter;
  }

  static createItemElement(product: IProduct, userData: IUser) {
    const saleElement = Item.getSale(product);
    const $item = document.createElement('div');
    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    let nation = '';
    let type = '';
    if ('filter' in product.data) {
      nation = `<span class="main-container-description_flag" data-country="${product.data.filter.nation}"></span>`;
      type = `<span class="main-container-description_type" data-type="${product.data.filter.type}"></span>`;
    }
    $item.classList.add('main-container-product');
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
                       isAddedToWishlist ? 'button-like_active' : ' '
                     }"></button>
    `;
    return $item;
  }

  static createSelectedItemElement(product: IProduct, userData: IUser) {
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
                        <span class="item-price-amount ${saleElement[3]}">
                          ${humanPrice(product.data.price.basic.cost)} 
                          ${saleElement[2]}
                        </span>
                        ${saleElement[0]}
              </div>
              <button class="item-purchase-button ${
                isAddedToPurchase ? 'button-purchase-added' : ''
              }">
                ${isAddedToPurchase ? 'added' : 'purchase'}
              </button>
          </div>
          <div class="item-container-description">
                <h3>Details</h3>
                <p>${product.data.description || 'coming soon...'}</p>
            </div>`;
    }
    return $item;
  }
}

export default DOMElems;
