import ChangeUserLists from '@scripts/changeUserLists';
import { IProduct, ITechniqueData } from '@type/product';
import { IUser } from '@type/user';

interface AddEvent {
  (
    event: string,
    $element: HTMLElement,
    eventFunction: (...args: any[]) => void,
    once: boolean,
    params: any[],
  ): void;
}

class Item {
  static createItem(
    product: IProduct,
    userData: IUser,
    productData: IProduct[],
  ): HTMLElement {
    const $item = document.createElement('div');
    $item.classList.add('main-container-product');

    const isAddedToWishlist = userData.wishlist.includes(product.data.id);
    const isAddedToPurchase = userData.shoppingList.includes(product.data.id);
    const filter = 'filter' in product.data ? product.data.filter : '';

    $item.innerHTML = `
        <a class="main-container-link ${
          isAddedToPurchase ? 'main-container-link-added' : ''
        }">
                    <img class="main-container-link_img" src=${
                      product.data.images.span_2x1
                    } alt="Танк">
                </a>
                <div class="main-container-description">
                            <span class="main-container-description_flag" data-country="${
                              typeof filter !== 'string' ? filter.nation : ''
                            }"></span>
                            <span class="main-container-description_type" data-type="${
                              typeof filter !== 'string' ? filter.type : ''
                            }"></span>
                            <h2>${product.data.name}</h2>
                            <span class="main-container-description_price">${
                              product.data.price.basic.cost
                            }${product.data.price.basic.currency}</span>
                            <button class="main-container-description_button-purchase ${isAddedToPurchase? "button-purchase-added":""}">
                                    purchase
                            </button>                            
                 </div>
                 <button class="main-container-description_button-like ${isAddedToWishlist? "button-like_active":" "}"></button>
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
    const $containerLink: HTMLElement | null = $item.querySelector(
      '.main-container-link',
    );

    if ($purchaseButton && !isAddedToPurchase) {
      Item.addEvent(
        'click',
        $purchaseButton,
        ChangeUserLists.changeShoppingList,
        true,
        [
          product,
          userData.shoppingList,
          ChangeUserLists.showShoppingList,
          $purchaseButton,
          $containerLink,
        ],
      );
    }
    if ($likeButton) {
      Item.addEvent(
        'click',
        $likeButton,
        ChangeUserLists.changeWishlist,
        false,
        [product, userData.wishlist, ChangeUserLists.showWishlist, $likeButton],
      );
    }
    $item.addEventListener('click', (event: UIEvent) => {
      const eventTarget = event.target as HTMLElement;
      if (eventTarget && eventTarget.nodeName !== 'BUTTON') {
        Item.showSelectedItem(
          product.data.id,
          productData,
          userData,
          Item.createSelectedItem,
        );
      }
    });

    return $item;
  }

  static createSelectedItem(
    itemId: string,
    productData: IProduct[],
    userData: IUser,
    addEvent: AddEvent,
  ): HTMLElement {
    const product: IProduct | undefined = productData.find(
      (element: IProduct) => element.data.id === itemId,
    );
    const $item: HTMLElement = document.createElement('div');
    $item.classList.add('item-container');
    $item.id = 'mainItem';
    if (product) {
      $item.innerHTML = `
          <h2>${product.data.name}</h2>
          <img src=${product.data.images.span_1x1} alt="${product.data.name}"/>
          <div class="item-container-purchase">
              <span class="item-purchase-price">${
                product.data.price.basic.cost
              }${product.data.price.basic.currency}</span>
              <button class="item-purchase-button">purchase</button>
          </div>
          <div class="item-container-description">
                <h3>Details</h3>
                <div>${product.data.description || 'coming soon...'}</div>
            </div>`;
    }
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.item-purchase-button',
    );
    if ($purchaseButton) {
      addEvent('click', $purchaseButton, ChangeUserLists.changeShoppingList, true, [
        [product, userData.shoppingList, ChangeUserLists.showShoppingList],
      ]);
    }
    return $item;
  }

  static showSelectedItem(
    itemId: string,
    productDataList: IProduct[],
    userData: IUser,
    createItem: (
      itemId: string,
      productDataList: IProduct[],
      userData: IUser,
      addEvent: AddEvent,
    ) => HTMLElement,
  ) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    const $container: HTMLElement | null = document.getElementById('main');
    if ($visualContainer && $container) {
      $visualContainer?.removeChild($container);
      const $item: HTMLElement = createItem(
        itemId,
        productDataList,
        userData,
        Item.addEvent,
      );
      $visualContainer.appendChild($item);
    }
  }
  static createMainNavContainer(): HTMLElement {
    const $mainNavContainer = document.createElement('div');
    $mainNavContainer.classList.add('main-nav-container');
    $mainNavContainer.innerHTML = `       
            <a class="main-nav-logo"></a>
            <nav class="main-nav-links">
                <button class="main-nav-link" type="submit">all</button>
                <button class="main-nav-link" type="submit">vehicles</button>
                <button class="main-nav-link" type="submit">gold</button>
                <button class="main-nav-link" type="submit">premium account</button>
            </nav>       
    `;
    return $mainNavContainer;
  }

  static showMainNavContainer() {
    const $mainContainer: HTMLElement | null = document.getElementById(
      'main-container-id',
    );
    const $mainVisualContainer = document.createElement('div');
    $mainVisualContainer.innerHTML='<div id="main-visual-container"></div>'

    if($mainContainer){
      $mainContainer.innerHTML=''
      $mainContainer.append(this.createMainNavContainer())
      $mainContainer.append($mainVisualContainer)
    }
  }

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
      { once: once },
    );
  }






}

export default Item;
