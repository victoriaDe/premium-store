import MainPage from '@classes/MainPage';
import Filter from '@scripts/filter';
import Wishlist from '@classes/Wishlist';
import ShoppingList from '@classes/ShoppingList';
import Popup from '@classes/Popup';
import Router from '@classes/Router';
import Navigation from '@classes/Navigation';
import '../elements/elements';

import '@scss/main.scss';
import '@scss/variables/colors.scss';
import '@scss/variables/sizes.scss';
import '@scss/popup.scss';
import '@scss/item.scss';
import '@scss/items-filtered-list.scss';
import '@scss/filters.scss';
import '@scss/main-content.scss';

console.log('eueueu');

const router = new Router(process.env.DEPLOY_PATH!);

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
        Filter.filterProducts('all', router);
    })
    .addRoute('?filter=all', 'All products', () => {
        Filter.filterProducts('all', router);
        Filter.addEvent(router);
    })
    .addRoute('?filter=vehicles', 'Vehicles', () => {
        Filter.filterProducts('vehicles', router);
        Filter.addEvent(router);
    })
    .addRoute('?filter=gold', 'Gold', () => {
        Filter.filterProducts('gold', router);
        Filter.addEvent(router);
    })
    .addRoute('?filter=premium', 'Premium', () => {
        Filter.filterProducts('premium account', router);
        Filter.addEvent(router);
    })
    .addRoute('?filter=provisions', 'Provisions', () => {
        Filter.filterProducts('provisions', router);
        Filter.addEvent(router);
    });

router.init();

export {router};

const $wishlistLink = document.getElementById('wishlistId') as HTMLElement;

$wishlistLink.addEventListener('click', (event) => {
    event.preventDefault();
    router.changeURI('wishlist');
});

const $shoppingCartLink = document.getElementById('shoppingId') as HTMLElement;

$shoppingCartLink.addEventListener('click', (event) => {
    event.preventDefault();
    router.changeURI('shoppingcart');
});

const $headerLogoLink = document.getElementById('headerLogo') as HTMLElement;

$headerLogoLink.addEventListener('click', (event) => {
    event.preventDefault();
    router.changeURI('');
});

export const main: MainPage = new MainPage();

main.init();

/// /////////////////////////////////////////////////////////////////////

const $wrapper: HTMLElement | null = document.getElementById('popupWrapper'); // серый фон попапа
const $body: HTMLBodyElement | null = document.querySelector('body'); // боди

function openPopup(event: MouseEvent) {
    let popup;

    const eventTarget = event.target as HTMLElement; // куда кликнули
    if ($wrapper?.children) $wrapper.innerHTML = ''; // если в обертке что-то есть, то нужно это обнулить, чтобы не плодить попапы
    $body?.classList.add('lock'); // класс запрещает body скроллиться
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
