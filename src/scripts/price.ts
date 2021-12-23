/**
 * @module Price
 */

import localStorage from '@classes/LocalStorage';
// import { TCurrencyCode, TCurrencySign } from '@type/price';

/**
 * Function to receive price value in a readable form
 * @param price price value (string)
 */
function humanPrice(price: string): string {
  const numPrice = +price;
  return numPrice.toLocaleString('ru-RU');
}

/**
 * Function to covert readable price value back
 * @param str price value in a readable form (string)
 */
function parseToNumber(str: string): number {
  const practicalStr = str.replace(',', '.').replace(/\s/g, '');
  return Number.parseFloat(practicalStr);
}

/**
 * Function to receive a sign or code of currency
 * @param currencyCode currency code
 */
function getCurrencySign(currencyCode: string): string {
  switch (currencyCode) {
    case 'BYN':
      return 'BYN';
    case 'RUB':
      return '₽';
    case 'UAH':
      return '₴';
    case 'PLN':
      return 'zł';
    case 'CNY':
      return '¥';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
}

/**
 * Function to count final price of the chosen products
 * @param $container HTML element containing products to count
 */
function calcFinalPrice($container: HTMLElement) {
  const $totalPrice = $container.querySelector('.total-price > span');
  const $items = $container.querySelectorAll('.item-filtered-container');

  let summaryPrice = 0;

  $items.forEach(($item) => {
    const $checkbox = $item.querySelector(
      '[type=checkbox]',
    ) as HTMLInputElement | null;

    if ($checkbox && $checkbox.checked) {
      // search two span with price
      let $price = $item.querySelector('.item-price-reduced');
      if (!$price) {
        $price = $item.querySelector('.item-price-amount');
      }

      if ($price && $price.textContent) {
        const price = parseToNumber($price.textContent);
        summaryPrice += price;
      }
    }
  });

  if ($totalPrice) {
    $totalPrice.textContent = `${humanPrice(
      String(summaryPrice),
    )} ${getCurrencySign(localStorage.getCurrency())}`;
  }
}

export { humanPrice, parseToNumber, calcFinalPrice, getCurrencySign };
