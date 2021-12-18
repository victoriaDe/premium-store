import MainPage from '@classes/MainPage';
import Filter from '@scripts/filter';
import Wishlist from '@classes/Wishlist';
import ShoppingList from '@classes/ShoppingList';
import Popup from '@classes/Popup';
import HashRouter from '@classes/HashRouter';
import Navigation from '@classes/Navigation';
import Item from '@classes/Item';

import LocalStorage from '@classes/LocalStorage';
import '../elements/elements';
import lazy from '@scripts/lazy';
import lazyBD from '@scripts/lazyBD';

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

const localProducts = LocalStorage.getLocalData('All')?.data as IProduct[];
const localUser = LocalStorage.getLocalData('user')?.data as IUser;

router.init(localUser, localProducts);

// инициализация стора
document.addEventListener(
  'DOMContentLoaded',
  async () => {

   /* const data = (await LocalStorage.getAllData()) as any[];*/
    const userData = await LocalStorage.getUserData()
    if(userData){
     /* ShoppingList.showShoppingListCounter(data[1].shoppingList);
      Wishlist.showWishlistCounter(data[1].wishlist);*/
      ShoppingList.showShoppingListCounter(userData.shoppingList);
      Wishlist.showWishlistCounter(userData.wishlist);
      // lazy(20, 100, data[1], data[0], new Item(), router);
      lazyBD(20, 100, userData,  new Item(), router);
      /* setTimeout(() => {
         LocalStorage.updateUserData();
       });*/
      // принудительно рендерим по хэшу
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

const $wrapper: HTMLElement | null = document.getElementById('popupWrapper'); // серый фон попапа
const $body: HTMLBodyElement | null = document.querySelector('body'); // боди

function openPopup(event: MouseEvent) {
  let popup;

  const eventTarget = event.target as HTMLElement; // куда кликнули
  if ($wrapper?.children) $wrapper.innerHTML = ''; // если в обертке что-то есть, то нужно это обнулить, чтобы не плодить попапы
  $body?.classList.add('lock'); // класс запрещает body скроллиться
  $wrapper?.classList.add('visible');
  // описание аргументов класса ниже
  switch (
    eventTarget.id // определяем id элемента, каждому айдишнику соответствуют поля для класса
  ) {
    case 'login': // попап для логина
      popup = new Popup(
        eventTarget,
        [
          ['nickname', 'text'],
          ['password', 'password'],
        ],
        true,
        openPopup,
      );
      break;

    case 'create-account': // попап для создания
      popup = new Popup(
        eventTarget,
        [
          ['full name', 'text'],
          ['nickname', 'text'],
          ['email', 'email'],
          ['password', 'password'],
        ],
        false,
      );
      break;

    case 'reset-password': // попап для забыл пароль
      popup = new Popup(eventTarget, [['email', 'email']], false);
      if ($wrapper) $wrapper.innerHTML = '';
      break;

    default:
      throw new Error('eventTarget has no ID');
  }

  if ($wrapper && popup) {
    $wrapper.appendChild(popup.renderHTML()); // добавить попап в обертку
    $wrapper.classList.add('opened-popup'); // добавить класс, который открывает попап
  }
}

function closePopup(event: MouseEvent) {
  const eventTarget = event.target as HTMLElement; // куда кликнули
  $body?.classList.remove('lock'); // удалить запрет на скролл body

  // если кликнули, чтобы закрыть попап по
  if (
    eventTarget === $wrapper || // врапперу (серому фону)
    eventTarget === document.querySelector('.pop-up-container span') || // крестику
    eventTarget === document.querySelector('.pop-up-container button')
  ) {
    // кнопке ОК

    $wrapper?.classList.remove('opened-popup'); // сворачивает фраппер
    if ($wrapper) $wrapper.innerHTML = ''; // снести все, что осталось в обертке
  }
}

const $login: HTMLElement | null = document.getElementById('login'); // ссылка логина
const $create: HTMLElement | null = document.getElementById('create-account'); // ссылка создать аккаунт

window.addEventListener('resize', () => {
  // отслеживание ширины экрана, если <= 720, то css убирает текст по медиа запросам, а здесь добавляется класс login
  // для логина, который клеит картинку на место текста
  if (window.screen.width <= 720) {
    $login?.classList.add('login');
  } else {
    $login?.classList.remove('login');
  }
});

$login?.addEventListener('click', (event) => openPopup(event));
$create?.addEventListener('click', (event) => openPopup(event));
$wrapper?.addEventListener('click', (event) => closePopup(event));
