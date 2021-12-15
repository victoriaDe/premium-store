import { IUser } from '@type/user';
import { IProduct, TFilter } from '@type/product';

import UserAPI from '@api/user';
import Item from '@scripts/item';
import Shopping from '@scripts/changeUserLists';
import ProductAPI from '@api/product';
import Router from '@scripts/router';
import Filter from '@scripts/filter';
import Wishlist from '@scripts/wishlist';
import LocalStorage from '@scripts/localStorage';
import ShoppingList from '@scripts/shoppingList';
import Popup from '@classes/Popup';

import lazy from '@scripts/lazy';

import '@scss/main.scss';
import '@scss/variables/colors.scss';
import '@scss/variables/sizes.scss';
import '@scss/popup.scss';
import '@scss/main-content.scss';
import '@scss/item.scss';
import '@scss/items-filtered-list.scss';
import '@scss/filters.scss';

class MainPage {
  #productData: IProduct[] | null = [];

  #userData: IUser | null = null;

  #userId = '61a6286353b5dad92e57b4c0';

  static updateLocalData() {
    UserAPI.getUserByID('61a6286353b5dad92e57b4c0').then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
    });
    ProductAPI.getProductsByFilter('All').then((data) => {
      localStorage.setItem('productData', JSON.stringify(data));
    });
  }

  async getAllData() {
    const productData = await this.getProductDataByFilter('All');
    const userData = await this.getUserData();
    return [productData, userData];
  }

  async updateUserData() {
    const userData = await UserAPI.getUserByID(this.#userId);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }

  async sendUserData() {
    const userData = LocalStorage.getLocalData('user') as IUser | null;
    if (userData) {
      const data = await UserAPI.changeUserData(userData);
    }
  }

  async updateProductDataByFilter(filter: TFilter | 'All') {
    const productDataByFilter = await ProductAPI.getProductsByFilter(filter);
    localStorage.setItem(filter, JSON.stringify(productDataByFilter));
    return productDataByFilter;
  }

  async getProductDataByFilter(filter: TFilter | 'All') {
    let productDataByFilter = LocalStorage.getLocalData(filter) as
      | IProduct[]
      | null;
    if (!productDataByFilter)
      productDataByFilter = await this.updateProductDataByFilter(filter);
    return productDataByFilter;
  }

  async getUserData() {
    let userData = LocalStorage.getLocalData('user') as IUser | null;
    if (!userData) userData = await this.updateUserData();
    this.#userData = userData;
    return userData;
  }

  async getListData(property: 'shoppingList' | 'wishlist') {
    const userData = await this.getUserData();
    if (userData) {
      if (userData[property].length > 0) {
        return ProductAPI.getProductsByList(userData[property]);
      }
    }
    return null;
  }

  async init(): Promise<any> {
    const data = (await this.getAllData()) as any[];

    await Filter.filterProducts('all');
    Filter.addEvent();
    Shopping.showShoppingList(data[1].shoppingList);
    Shopping.showWishlist(data[1].wishlist);
    await lazy(20, 100, data[1], data[0], new Item());

    setTimeout(() => {
      this.updateUserData();
    });
  }
}

export const main: MainPage = new MainPage();
main.init();

const router = new Router();

router
  .addRoute('wishlist', () => Wishlist.createWishlist())
  .addRoute('shoppingcart', () => ShoppingList.createShoppingList())
  .addRoute('', () => {
    Item.showMainNavContainer();
    Filter.addEvent();
    Filter.filterProducts('all');
  });

router.init();

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

// class Popup {
//   target: HTMLElement;
//
//   inputs: any; // хз, какой тут должен быть тип, он на все ругается. Передаются данные для инпутов: [0] - текст,[1] - тип инпута
//
//   hasLink: boolean; // есть ли в попапе ссылка, по-хорошему, нужно было бы отпочковаться в другой класс с расширением, но ради одной ссылки не знаю, стоит ли
//
//   constructor(target: HTMLElement, inputs: any, hasLink: boolean) {
//     this.target = target;
//     this.inputs = inputs;
//     this.hasLink = hasLink;
//   }
//
//   // каждый метод возвращает заполненный элемент HTML
//   createHeader() {
//     const title = this.target.id.split('-').join(' '); // айдишник элемента, по которому кликнули переходит в читабельную форму
//     const $header = document.createElement('h2'); // создать Н2
//     $header.innerText = title; // записать
//     return $header;
//   }
//
//   createForm() {
//     const $form = document.createElement('form'); // создать форму
//     $form.classList.add('popup-form'); // только стили
//
//     for (let i = 0; i < this.inputs.length; i++) {
//       // пробегает по каждому input [0] - текст для лейбла и плейсхолдера,[1] - тип инпута
//       $form.innerHTML += `<label>${this.inputs[i][0]} <input type='${this.inputs[i][1]}' placeholder='Enter your ${this.inputs[i][0]}'></label>`;
//     }
//     // после генерации инпутов заталкиваем кнопу в форму
//     $form.appendChild(this.createButton());
//     if (this.hasLink) {
//       // ссылка на восстановление пароля
//       // передавать аргументы наверняка можно и человеческим способом)
//
//       $form.appendChild(
//         this.createLink('forget your password?', 'reset-password'),
//       );
//
//       if (window.screen.width <= 720) {
//         // ссылка на создание аккаунта для мал разрешения
//         $form.appendChild(this.createLink('Create account', 'create-account'));
//       }
//     }
//
//     return $form;
//   }
//
//   createButton() {
//     // единственный адекватный метод без черни
//     const $btn = document.createElement('button');
//     $btn.type = 'submit';
//     $btn.innerText = 'OK';
//     return $btn;
//   }
//
//   createLink(str: string, id: string) {
//     // принимает str - для текста самой ссылки, id - нужен, чтобы генерить попап новый по клику
//     const $link = document.createElement('a');
//     $link.id = id;
//     $link.href = '#';
//     $link.classList.add('popup-form-link');
//     $link.innerText = str;
//     // не знаю, как по-другому повесить листенер, думала через нодлист как-то, он ведь должен обновляться сам, по идее
//     // но у меня не вышло
//     $link.addEventListener('click', openPopup);
//     return $link;
//   }
//
//   createSpan() {
//     // это крестик
//     // можно по- идее сразу на него повесить лисенер на закрытие, как на линках, сейчас он вешается в функции closePopup,
//     // но там диким образом вытягиваю элемент
//
//     const $cross = document.createElement('span');
//     $cross.innerText = 'X';
//     return $cross;
//   }
//
//   renderHTML() {
//     const $container = document.createElement('div'); // контейнер в обертке, оранжевый
//     $container.classList.add('pop-up-container'); // только стили
//
//     $container.append(
//       this.createHeader(),
//       this.createSpan(),
//       this.createForm(),
//     ); // аппендаются все сгенеренные элементы
//     return $container;
//   }
// }
