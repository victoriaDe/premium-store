import { IProduct, TFilter } from '@type/product';
import Item from '@scripts/item';
import lazy from '@scripts/lazy';
import { IUser } from '@type/user';
import { main } from '@page/main';

export type SetActiveFilterType =
  | 'all'
  | 'vehicles'
  | 'gold'
  | 'premium account'
  | 'provisions';

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
    main.getUserData().then((userData) => {
      if (userData) {
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
          if (data) this.showFilterProducts(data, userData, data, actualFilter);
        });
        setTimeout(() => {
          main.updateProductDataByFilter(actualFilter).then(() => {});
        });
      }
    });
  }

  static showFilterProducts(
    products: IProduct[],
    userData: IUser,
    productData: IProduct[],
    filter: string,
  ) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    const $wrapper: any = document.querySelector('.main-container');
    if ($wrapper.children.length === 3) {
      $wrapper?.removeChild($wrapper?.lastChild);
    }
    $wrapper?.removeChild($wrapper?.lastChild);
    if (filter === 'Technique') {
      const $itemFilter = document.createElement('div');
      $itemFilter.classList.add('item-filters');
      $itemFilter.innerHTML = `
        <div class="filter-container">
                <button class="filter-container-checkedBtn nations" id="allNations" type="button">All nations</button>
                <ul class="filter-list nations-list">
                    <li class="nations-btn filter-btn">
                        <button class="nations">All nations</button>
                    </li>
                    <li class="nations-btn filter-btn">
                        <button class="china_btn">China</button>
                    </li>
                    <li class="nations-btn filter-btn">
                        <button class="france_btn">France</button>
                    </li>
                    <li class="nations-btn filter-btn">
                        <button class="germany_btn">Germany</button>
                    </li>
                    <li class="nations-btn filter-btn">
                        <button class="japan_btn">Japan</button>
                    </li>
                    <li class="nations-btn filter-btn">
                        <button class="uk_btn">U.K.</button>
                    </li>
                    <li class="nations-btn filter-btn">
                        <button class="usa_btn">U.S.A.</button>
                    </li>
                    <li class="nations-btn filter-btn">
                        <button class="ussr_btn">U.S.S.R.</button>
                    </li>
                </ul>
            </div>
            <div class="filter-container">
                <button class="filter-container-checkedBtn types" id="allTypes" type="button">All types</button>
                <ul class="filter-list type-list">
                    <li class="type-btn filter-btn">
                        <button class="types">All types</button>
                    </li>
                    <li class="type-btn filter-btn">
                        <button class="light">Light Tanks</button>
                    </li>
                    <li class="type-btn filter-btn">
                        <button class="medium">Medium Tanks</button>
                    </li>
                    <li class="type-btn filter-btn">
                        <button class="heavy">Heavy Tanks</button>
                    </li>
                    <li class="type-btn filter-btn">
                        <button class="destroy">Tank DEstroyers</button>
                    </li>
                    <li class="type-btn filter-btn">
                        <button class="spg">SPGs</button>
                    </li>
                    <li class="type-btn filter-btn">
                        <button class="multirole">Multirole fighter</button>
                    </li>
                </ul>
            </div>
            <div class="filter-container">
                <button class="filter-container-checkedBtn tiers" id="allTiers" type="button">All Tiers</button>
                <ul class="filter-list tiers-list">
                  <li class="tires-btn filter-btn">
                        <button>&#8545;-&#8553;</button>
                    </li>
                    <li class="tires-btn filter-btn">
                        <button>&#8545;</button>
                    </li>
                    <li class="tires-btn filter-btn">
                        <button>&#8544;&#8548;</button>
                    </li>
                    <li class="tires-btn filter-btn">
                        <button>&#8548;</button>
                    </li>
                    <li class="tires-btn filter-btn">
                        <button>&#8548;&#8545;</button>
                    </li>
                    <li class="tires-btn filter-btn">
                        <button>&#8544;&#8553;</button>
                    </li>
                    <li class="tires-btn filter-btn">
                        <button>&#8553;</button>
                    </li>
                </ul>
            </div>
            <button class="item-filters-btn" id="allVehicles">Show all vehicles</button>
      `;
      $wrapper?.append($itemFilter);

      const filterList = document.querySelectorAll(
        '.filter-container-checkedBtn',
      );
      const filterTypes = document.querySelectorAll('.filter-btn');
      filterTypes.forEach((item) => {
        item.addEventListener('click', (e: any) => {
          e.currentTarget.parentElement.parentElement.firstElementChild.classList.add(
            e.currentTarget.children[0].classList[0],
          );
          e.currentTarget.parentElement.parentElement.firstElementChild.textContent = `${e.currentTarget.children[0].textContent}`;
        });
      });
      filterList.forEach((item) => {
        item.addEventListener('click', (e: any) => {
          e.currentTarget.nextElementSibling.classList.toggle('opened-list');
        });
      });
    }
    $wrapper.append($visualContainer);
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
