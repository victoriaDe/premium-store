import MainPage from '@classes/MainPage';
import Filter from '@scripts/filter';
import Wishlist from '@classes/Wishlist';
import ShoppingList from '@classes/ShoppingList';
import HashRouter from '@classes/HashRouter';
import Navigation from '@classes/Navigation';
import PopupContainer from '@classes/PopupContainer';

import LocalStorage from '@classes/LocalStorage';
import '../elements/elements';

import '@scss/main.scss';
import '@scss/variables/colors.scss';
import '@scss/variables/sizes.scss';
import '@scss/popup.scss';
import '@scss/item.scss';
import '@scss/items-filtered-list.scss';
import '@scss/filters.scss';
import '@scss/main-content.scss';

export const main: MainPage = new MainPage();

const router = new HashRouter();

router
  .addRoute('wishlist', 'Wishlist', () => {
    Wishlist.createWishlist();
  })
  .addRoute('shoppingcart', 'Shopping cart', () =>
    ShoppingList.createShoppingList(),
  )
  .addRoute('', 'Premium Store', () => {
    Navigation.showMainNavContainer();
    Filter.addEvent(router);
    Filter.filterProducts('All', router);
  })
  .addRoute('all', 'All products', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('All', router);
    Filter.addEvent(router);
  })
  .addRoute('vehicles', 'Vehicles', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Technique', router);
    Filter.addEvent(router);
  })
  .addRoute('gold', 'Gold', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Gold', router);
    Filter.addEvent(router);
  })
  .addRoute('premium', 'Premium', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Premium', router);
    Filter.addEvent(router);
  })
  .addRoute('provisions', 'Provisions', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Provisions', router);
    Filter.addEvent(router);
  });

// инициализация стора
document.addEventListener(
  'DOMContentLoaded',
  async () => {
    const userData = await LocalStorage.getUserData();
    if (userData) {
      router.init(userData);
      ShoppingList.showShoppingListCounter(userData.shoppingList);
      Wishlist.showWishlistCounter(userData.wishlist);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  },
  { once: true },
);

export { router };

// для работы перезагрузки по кликам
document.addEventListener('click', (event) => {
  const $target = event.target as HTMLElement;
  let fullHash = window.location.hash;

  // фикс для главной страницы
  if (fullHash === '') {
    fullHash = `#`;
  }

  if (
    $target.classList.contains('hash-link') &&
    $target.getAttribute('href') === fullHash
  ) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
});

/// /////////////////////////////////////////////////////////////////////

const $login: HTMLElement | null = document.getElementById('login'); // ссылка логина
const $create: HTMLElement | null = document.getElementById('create-account'); // ссылка создать аккаунт
const $wrapper: HTMLElement | null = document.getElementById('popupWrapper'); // серый фон попапа

window.addEventListener('resize', () => {
  // отслеживание ширины экрана, если <= 720, то css убирает текст по медиа запросам, а здесь добавляется класс login
  // для логина, который клеит картинку на место текста
  if (window.screen.width <= 720) {
    $login?.classList.add('login');
  } else {
    $login?.classList.remove('login');
  }
});

$login?.addEventListener('click', (event) => PopupContainer.openPopup(event));
$create?.addEventListener('click', (event) => PopupContainer.openPopup(event));
$wrapper?.addEventListener('click', (event) =>
  PopupContainer.closePopup(event),
);
