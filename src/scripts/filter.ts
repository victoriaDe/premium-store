import LocalStorage from '@scripts/localStorage';
import { IProduct } from '@type/product';
import Item from '@scripts/item';
import lazy from '@scripts/lazy';

class Filter {
  static addEvent(): void {
    const $filterButtons: NodeListOf<Element> =
      document.querySelectorAll('.main-nav-link');
    $filterButtons.forEach((item: Node) => {
      item.addEventListener('click', (e) => {
        const $eventTarget: HTMLElement = e.target as HTMLElement;
        Filter.filterProducts($eventTarget.textContent);
      });
    });
  }

  static filterProducts(filter: string | null) {
    const productData = LocalStorage.getLocalData('productData');
    const userData = LocalStorage.getLocalData('user');
    if (filter === 'all') {
      const allProduct = productData;
      Filter.showFilterProducts(allProduct, userData, productData);
    } else if (filter === 'vehicles') {
      const vehiclesProducts = productData.filter(
        (item: any) => item.type === 'Technique',
      );
      Filter.showFilterProducts(vehiclesProducts, userData, productData);
    } else if (filter === 'gold') {
      const goldProducts = productData.filter(
        (item: any) => item.type === 'Gold',
      );
      Filter.showFilterProducts(goldProducts, userData, productData);
    } else if (filter === 'premium account') {
      const premiumProducts = productData.filter(
        (item: any) => item.type === 'Premium',
      );
      Filter.showFilterProducts(premiumProducts, userData, productData);
    }
  }

  static showFilterProducts(products: [], userData: any, productData: any) {
    const $container: HTMLElement | null = document.getElementById('main');
    let itemCounter = 0;
    if ($container) {
      $container.innerText = '';
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
