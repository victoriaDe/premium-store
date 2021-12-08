import { IUser } from '@type/user';
import { IProduct } from '@type/product';

import Item from '@page/item';

function lazy(
  amount: number,
  margin: number,
  user: IUser,
  products: IProduct[],
  item: Item,
) {
  const $productsContainer = document.querySelector('.main-container-content');

  if ($productsContainer) {
    const $lastProduct = $productsContainer.lastElementChild;

    if ($lastProduct) {
      const observerOptions = {
        root: null,
        rootMargin: `${margin}px`,
        threshold: 0,
      };

      const observerCb: IntersectionObserverCallback = function observerCb(
        entries,
        observer,
      ) {
        const showedProductsAmount = $productsContainer.children.length;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            for (
              let i = showedProductsAmount;
              i < showedProductsAmount + amount;
              i += 1
            ) {
              if (i < products.length) {
                $productsContainer.appendChild(
                  item.createItem(products[i], user, products),
                );
              } else {
                break;
              }
            }

            observer.unobserve(entry.target);

            const newShowedProductsAmount = $productsContainer.children.length;
            if (newShowedProductsAmount < products.length) {
              const $newLastProduct = $productsContainer.lastElementChild;
              if ($newLastProduct) {
                observer.observe($newLastProduct);
              }
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCb, observerOptions);
      observer.observe($lastProduct);
    }
  }
}

export default lazy;
