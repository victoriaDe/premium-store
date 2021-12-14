import LocalStorage from '@scripts/localStorage';
import { IProduct } from '@type/product';
import Item from '@scripts/item';
import lazy from '@scripts/lazy';
import { IUser } from '@type/user';

class Filter {
  static addEvent(): void {
    const $filterButtons: NodeListOf<Element> =
      document.querySelectorAll('.main-nav-link');
    $filterButtons.forEach((item: Node) => {
      item.addEventListener('click', (e) => {
        const $eventTarget: HTMLElement = e.target as HTMLElement;
        const $prevFilter = document.querySelector('.active-link');

        if ($prevFilter && $prevFilter !== $eventTarget) {
          $prevFilter.classList.remove('active-link');
        }

        $eventTarget.classList.add('active-link');

        Filter.filterProducts($eventTarget.textContent);
      });
    });
  }

  static filterProducts(filter: string | null) {
    const productData = LocalStorage.getLocalData('productData') as IProduct[];
    const userData = LocalStorage.getLocalData('user') as IUser;
    if (filter === 'all') {
      Filter.showFilterProducts(productData, userData, productData);
    } else if (filter === 'vehicles') {
      const vehiclesProductsLoc = LocalStorage.getLocalData(
        'vehicles',
      ) as IProduct[];
      if (vehiclesProductsLoc) {
        Filter.showFilterProducts(vehiclesProductsLoc, userData, productData);
      } else {
        const vehiclesProducts = productData.filter(
          (item: IProduct) => item.type === 'Technique',
        );
        localStorage.setItem('vehicles', JSON.stringify(vehiclesProducts));
        Filter.showFilterProducts(vehiclesProducts, userData, productData);
      }
    } else if (filter === 'gold') {
      const goldProductsLoc = LocalStorage.getLocalData('gold') as IProduct[];
      if (goldProductsLoc) {
        Filter.showFilterProducts(goldProductsLoc, userData, productData);
      } else {
        const goldProducts = productData.filter(
          (item: IProduct) => item.type === 'Gold',
        );
        localStorage.setItem('gold', JSON.stringify(goldProducts));
        Filter.showFilterProducts(goldProducts, userData, productData);
      }
    } else if (filter === 'premium account') {
      const premiumLoc = LocalStorage.getLocalData('premium') as IProduct[];
      if (premiumLoc) {
        Filter.showFilterProducts(premiumLoc, userData, productData);
      } else {
        const premium = productData.filter(
          (item: IProduct) => item.type === 'Premium',
        );
        localStorage.setItem('premium', JSON.stringify(premium));
        Filter.showFilterProducts(premium, userData, productData);
      }
    }
  }

  static showFilterProducts(
    products: IProduct[],
    userData: IUser,
    productData: IProduct[],
  ) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    if ($visualContainer) {
      $visualContainer.innerText = '';
      const $container = document.createElement('div');
      $container.id = 'main';
      $container.classList.add('main-container-content');
      $visualContainer.appendChild($container);

      let itemCounter = 0;
      products.forEach((value: IProduct) => {
        if (itemCounter < 20) {
          $container.appendChild(Item.createItem(value, userData, productData));
          itemCounter += value.span;
        }
      });
    }
    lazy(20, 100, userData, products, new Item());
  }
}

export default Filter;
