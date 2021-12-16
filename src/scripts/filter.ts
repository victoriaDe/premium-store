import { IProduct, TFilter } from '@type/product';
import Item from '@scripts/item';
import lazy from '@scripts/lazy';
import { IUser } from '@type/user';
import { main } from '@page/main';
import Router from '@classes/Router';
import LocalStorage from '@scripts/localStorage';

export type SetActiveFilterType =
  | 'all'
  | 'vehicles'
  | 'gold'
  | 'premium account'
  | 'provisions';

class Filter {
  static #nation: string | undefined;

  static #type: string | undefined;

  static #tier: string | undefined;

  static addEvent(router: Router): void {
    const $filterButtons: NodeListOf<Element> =
      document.querySelectorAll('.main-nav-link');
    $filterButtons.forEach((item: Node) => {
      item.addEventListener('click', (e) => {
        const $eventTarget: HTMLElement = e.target as HTMLElement;
        const $prevFilter = document.querySelector('.active-link');

        router.changeURI(`?filter=${$eventTarget.dataset.filter}`);

        if ($prevFilter && $prevFilter !== $eventTarget) {
          $prevFilter.classList.remove('active-link');
        }

        $eventTarget.classList.add('active-link');

        // Filter.filterProducts($eventTarget.textContent);
      });
    });
  }

  static filterProducts(filter: string | null, router: Router) {
    main.getUserData().then((userData) => {
      if (userData) {
        let actualFilter: TFilter | 'All';
        if (filter === 'all') {
          actualFilter = 'All';
        } else if (filter === 'vehicles') {
          actualFilter = 'Technique';
        } else if (filter === 'gold') {
          actualFilter = 'Gold';
        } else if (filter === 'provisions') {
          actualFilter = 'Provisions';
        } else if (filter === 'premium account') {
          actualFilter = 'Premium';
        } else actualFilter = 'All';

        main.getProductDataByFilter(actualFilter).then((data) => {
          if (data)
            this.createFilterProducts(
              data,
              userData,
              data,
              actualFilter,
              router,
            );
        });
        setTimeout(() => {
          main.updateProductDataByFilter(actualFilter).then(() => {});
        });
      }
    });
  }

  static filterTechniqueProducts(
    userData: IUser,
    productData: IProduct[],
    router: Router,
  ) {
    const techniqueProduct = LocalStorage.getLocalData(
      'Technique',
    ) as IProduct[];
    let check = false;
    const filteredProducts = techniqueProduct.filter((item) => {
      if ('filter' in item.data) {
        check = true;
        if (this.#nation && this.#nation !== 'all') {
          check = item.data.filter.nation === this.#nation;
        }
        if (this.#tier && this.#tier !== 'all') {
          check = check && item.data.filter.tier === this.#tier;
        }
        if (this.#type && this.#type !== 'all') {
          check = check && item.data.filter.type === this.#type;
        }
      }
      return check;
    });
    Filter.showFilterProduct(filteredProducts, userData, productData, router);
  }

  static createFilterProducts(
    filteredProducts: IProduct[],
    userData: IUser,
    productData: IProduct[],
    filter: string,
    router: Router,
  ) {
    const $visualContainer: HTMLElement | null = document.getElementById(
      'main-visual-container',
    );
    const $wrapper: HTMLElement | null =
      document.querySelector('.main-container');
    if ($wrapper?.lastChild) {
      if ($wrapper?.children.length === 3) {
        $wrapper?.removeChild($wrapper?.lastChild);
      }
      $wrapper?.removeChild($wrapper?.lastChild);
    }
    if (filter === 'Technique') {
      const $itemFilter = document.createElement('div');
      $itemFilter.classList.add('item-filters');
      $itemFilter.innerHTML = `
        <div class="filter-container">
                <button class="filter-container-checkedBtn nations" id="allNations" type="button">All nations</button>
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
                <button class="filter-container-checkedBtn types" id="allTypes" type="button">All types</button>
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
                <button class="filter-container-checkedBtn tiers" id="allTiers" type="button">All Tiers</button>
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
      $wrapper?.append($itemFilter);
      const filterList = $itemFilter.querySelectorAll(
        '.filter-container-checkedBtn',
      );
      const typeList = $itemFilter.querySelectorAll('.type-btn');
      const tierList = $itemFilter.querySelectorAll('.tires-btn');
      const nationList = $itemFilter.querySelectorAll('.nations-btn');
      const allVehicles = $itemFilter.querySelector('.item-filters-btn');
      allVehicles?.addEventListener('click', () => {
        this.#type = 'all';
        this.#tier = 'all';
        this.#nation = 'all';
        this.filterTechniqueProducts(userData, productData, router);
      });
      typeList.forEach((item) => {
        item.addEventListener('click', (e: any) => {
          e.currentTarget.parentElement.parentElement.lastElementChild.classList.toggle(
            'opened-list',
          );
          this.#type = e.currentTarget.dataset.type;
          this.filterTechniqueProducts(userData, productData, router);
        });
      });
      tierList.forEach((item) => {
        item.addEventListener('click', (e: any) => {
          e.currentTarget.parentElement.parentElement.lastElementChild.classList.toggle(
            'opened-list',
          );
          this.#tier = e.currentTarget.dataset.tier;
          this.filterTechniqueProducts(userData, productData, router);
        });
      });
      nationList.forEach((item) => {
        item.addEventListener('click', (e: any) => {
          e.currentTarget.parentElement.parentElement.lastElementChild.classList.toggle(
            'opened-list',
          );
          this.#nation = e.currentTarget.dataset.nation;
          this.filterTechniqueProducts(userData, productData, router);
        });
      });
      filterList.forEach((item) => {
        item.addEventListener('click', (e: any) => {
          e.currentTarget.nextElementSibling.classList.toggle('opened-list');
        });
      });
    }
    if ($visualContainer) {
      $wrapper?.append($visualContainer);
    }
    Filter.showFilterProduct(filteredProducts, userData, productData, router);
  }

  static showFilterProduct(
    filteredProducts: IProduct[],
    userData: IUser,
    productData: IProduct[],
    router: Router,
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
      filteredProducts.forEach((value: IProduct) => {
        if (itemCounter < 20) {
          $container.appendChild(
            Item.createItem(value, userData, productData, router),
          );
          itemCounter += value.span;
        }
      });
    }
    lazy(20, 100, userData, filteredProducts, new Item(), router);
  }
}

export default Filter;
