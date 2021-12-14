import { IProduct, TFilter } from '@type/product';
import Item from '@scripts/item';
import lazy from '@scripts/lazy';
import { IUser } from '@type/user';
import { main } from '@page/main';

export type SetActiveFilterType = 'all' | 'vehicles' | 'gold' | 'premium account' | 'provisions'


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
    main.getUserData().then((userData)=>{
      if(userData){
        let actualFilter: TFilter | 'All';
        if (filter === 'all') {
          actualFilter = 'All';
        } else if (filter === 'vehicles') {
          actualFilter = 'Technique';
        } else if (filter === 'gold') {
          actualFilter = 'Gold';
        } else if (filter === 'premium account') {
          actualFilter = 'Premium';
        } else actualFilter = 'All';

        main.getProductDataByFilter(actualFilter).then((data) => {
          if (data) this.showFilterProducts(data, userData, data);
        });
        setTimeout(()=>{
          main.updateProductDataByFilter(actualFilter).then(()=>{})
        })
      }
    })
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

  static setActiveFilter(changedFilter: SetActiveFilterType | 'none') {

  }

}

export default Filter;
