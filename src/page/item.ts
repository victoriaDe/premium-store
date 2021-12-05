import Shopping from '@page/shopping';
import { UserData } from '@page/dataMethods';
import { Product } from './itemList';

class Item {
  #shopping: Shopping = new Shopping();

  createItem(
    product: Product,
    userData: UserData,
    productData: Product[],
  ): Element {
    const $item = document.createElement('div');
    let buttonLike = `<button class="main-container-description_button-like"></button>`;
    $item.classList.add('main-container-product');
    if (
      userData.wishList.find((item) => item.productID === product.productID)
    ) {
      buttonLike = `<button class="main-container-description_button-like button-like_active"></button>`;
    }
    $item.innerHTML = `
        <a class="main-container-link">
                    <img class="main-container-link_img" src=${require('@/assets/images/background/Layer40.svg')} alt="Танк">
                </a>
                <div class="main-container-description">
                            <span class="main-container-description_flag" data-country="${
                              product.productDescription.country
                            }"></span>
                            <span class="main-container-description_type" data-type="${
                              product.productDescription.type
                            }"></span>
                            <h2>${product.productDescription.name}</h2>
                            <span class="main-container-description_price">${
                              product.productCost
                            }</span>
                            <button class="main-container-description_button-purchase">purchase</button>
                 </div>
                ${buttonLike}
    `;
    if (product.productDescription.span === '2') {
      $item.classList.add('span-two');
    }
    const $likeButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-like',
    );
    const $purchaseButton: HTMLElement | null = $item.querySelector(
      '.main-container-description_button-purchase',
    );
    if ($purchaseButton) {
      this.addEvent(
        'click',
        $purchaseButton,
        this.#shopping.changeShoppingList,
        [product, userData.shopping, this.#shopping.showShoppingList],
      );
    }
    if ($likeButton) {
      this.addEvent('click', $likeButton, this.changeLikeState, [
        $likeButton,
        productData,
        userData.wishList,
      ]);
    }
    $item.addEventListener('click', (event: any) => {
      if (event.target.nodeName !== 'BUTTON') {
        this.showSelectedItem(
          product.productID,
          productData,
          this.createSelectedItem,
        );
      }
    });

    return $item;
  }

  createSelectedItem(itemId: number, productDataList: Product[]) {
    const itemData: Product | undefined = productDataList.find(
      (product: Product) => product.productID === itemId,
    );
    const $item = document.createElement('div');
    $item.classList.add('item-container');
    $item.id = 'mainItem';
    if (itemData) {
      $item.innerHTML = `
          <h2>${itemData.productDescription.name}</h2>
          <img src=${itemData.productImage} alt="${itemData.productDescription.name}"/>
          <div class="item-container-purchase">
              <span class="item-purchase-price">${itemData.productCost}</span>
              <button class="item-purchase-button">purchase</button>
          </div>
          <div class="item-container-description">
                <h3>Details</h3>
                <p>${itemData.productDescription.description}</p>
            </div>`;
    }
    return $item;
  }

  addEvent(
    event: string,
    $element: HTMLElement,
    // eslint-disable-next-line @typescript-eslint/ban-types
    eventFunction: Function,
    params: any[],
  ): void {
    $element.addEventListener(`${event}`, () => {
      eventFunction(...params);
    });
  }

  changeLikeState(
    $element: HTMLElement,
    productData: Product,
    wishList: Product[],
  ) {
    wishList.push(productData);
    $element.classList.toggle('button-like_active'); //! disable button!
  }

  showSelectedItem(
    itemId: number,
    productDataList: Product[],
    createItem: Function,
  ) {
    const $container: any = document.getElementById('main');
    const $containerParent = $container.parentElement;
    $container.parentElement.removeChild(
      $container.parentElement.lastElementChild,
    );
    const $item = createItem(itemId, productDataList);
    if ($container) {
      $containerParent.appendChild($item);
    }
  }
}

export default Item;
