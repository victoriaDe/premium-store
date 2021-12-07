import Shopping from '@page/shopping';
import { IProduct } from '@type/product';
import { IUser } from '@type/user';

class Item {
  createItem(
    product: any,
    userData: IUser,
    productData: IProduct[],
  ): HTMLElement {
    const $item = document.createElement('div');
    let buttonLike = `<button class="main-container-description_button-like"></button>`;
    $item.classList.add('main-container-product');
    if (userData.wishlist.find((item: string) => item === product.data.id)) {
      buttonLike = `<button class="main-container-description_button-like button-like_active"></button>`;
    }
    $item.innerHTML = `
        <a class="main-container-link">
                    <img class="main-container-link_img" src=${product.data.images.span_2x1} alt="Танк">
                </a>
                <div class="main-container-description">
                            <span class="main-container-description_flag" data-country="${product.data.filter.nation}"></span>
                            <span class="main-container-description_type" data-type="${product.data.filter.type}"></span>
                            <h2>${product.data.name}</h2>
                            <span class="main-container-description_price">${product.data.price.basic.cost}${product.data.price.basic.currency}</span>
                            <button class="main-container-description_button-purchase">purchase</button>
                 </div>
                ${buttonLike}
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
    if ($purchaseButton) {
      this.addEvent('click', $purchaseButton, Shopping.changeShoppingList, [
        product,
        userData.shoppingList,
        Shopping.showShoppingList,
      ]);
    }
    if ($likeButton) {
      this.addEvent('click', $likeButton, this.changeLikeState, [
        $likeButton,
        productData,
        userData.wishlist,
      ]);
    }
    $item.addEventListener('click', (event: UIEvent) => {
      const eventTarget = event.target as HTMLElement;
      if (eventTarget && eventTarget.nodeName !== 'BUTTON') {
        this.showSelectedItem(
          product.data.id,
          productData,
          this.createSelectedItem,
        );
      }
    });

    return $item;
  }

  createSelectedItem(itemId: string, productData: IProduct[]): HTMLElement {
    const product: any = productData.find(
      (element: IProduct) => element.data.id === itemId,
    );
    const $item = document.createElement('div');
    $item.classList.add('item-container');
    $item.id = 'mainItem';
    if (product) {
      $item.innerHTML = `
          <h2>${product.data.name}</h2>
          <img src=${product.data.images.span_1x1} alt="${product.data.name}"/>
          <div class="item-container-purchase">
              <span class="item-purchase-price">${product.data.price.basic.cost}${product.data.price.basic.currency}</span>
              <button class="item-purchase-button">purchase</button>
          </div>
          <div class="item-container-description">
                <h3>Details</h3>
                <p>${product.data.description}</p>
            </div>`;
    }
    return $item;
  }

  addEvent(
    event: string,
    $element: HTMLElement,
    eventFunction: Function,
    params: any[],
  ): void {
    $element.addEventListener(`${event}`, () => {
      eventFunction(...params);
    });
  }

  changeLikeState(
    $element: HTMLElement,
    productData: IProduct,
    wishList: IProduct[],
  ) {
    wishList.push(productData);
    $element.classList.toggle('button-like_active'); //! disable button!
  }

  showSelectedItem(
    itemId: string,
    productDataList: IProduct[],
    createItem: (itemId: string, productDataList: IProduct[]) => HTMLElement,
  ) {
    const $container: HTMLElement | null = document.getElementById('main');
    const $item = createItem(itemId, productDataList);
    let $containerParent: HTMLElement | null;
    if (
      $container &&
      $container.parentElement &&
      $container.parentElement.lastElementChild
    ) {
      $containerParent = $container.parentElement;
      $container.parentElement.removeChild(
        $container.parentElement.lastElementChild,
      );
      $containerParent.appendChild($item);
    }
  }
}

export default Item;
