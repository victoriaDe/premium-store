/**
 * @module Popup
 */

import Popup from '@classes/Popup';
import { authAPI } from '@api/authApi';

/**
 * Класс для работы со всплывающими окнами
 */

async function loginSubmit(event:any) {
  console.log("loginSubmit")
  const usedDada = {
    email:"victor_sinitca@mail.ru",
    password:"aaaaa123",
  }
  try {
    const user = await authAPI.login(usedDada.email, usedDada.password)
    if(user){
      localStorage.setItem('token', user.accessToken);
      console.log(`user:${JSON.stringify(user)}`)
    }
  }catch (e) {
    console.log(e)
  }
}

async function createAccountSubmit(event:any) {
  console.log("createAccountSubmit")
  const usedDada = {
    email:"victor_sinitca@mail.ru",
    password:"aaaaa123",
    name:"Tester"    ,
  }
  const user = await  authAPI.registration(usedDada.email, usedDada.password, usedDada.name)
  if(user){
    localStorage.setItem('token', user.accessToken);
    console.log(`user:${JSON.stringify(user)}`)
  }
  console.log(`user:${user}`)
}

async function logoutSubmit(event:any) {
  const user = await  authAPI.logout()
  if(user){
    localStorage.setItem('token', "");
    console.log(`user:${JSON.stringify(user)}`)
  }
  console.log("logoutSubmit")
}



function resetSubmit(event:any) {
  console.log("createAccountSubmit")
}


class PopupContainer {
  /**
   * Метод для открытия всплывающего окна
   * @param event объект события, вызвавшего метод
   */
  static openPopup(event: MouseEvent) {
    let popup;
    const $wrapper: HTMLElement | null =
      document.getElementById('popupWrapper'); // серый фон попапа
    const $body: HTMLBodyElement | null = document.querySelector('body'); // боди
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
          loginSubmit,
          this.openPopup,
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
          createAccountSubmit
        );
        break;

      case 'reset-password': // попап для забыл пароль
        popup = new Popup(eventTarget, [['email', 'email']], false,resetSubmit);
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

  /**
   * Метод для закрытия всплывающего окна
   * @param event объект события, вызвавшего метод
   */

  static closePopup(event: MouseEvent) {
    const $wrapper: HTMLElement | null =
      document.getElementById('popupWrapper'); // серый фон попапа
    const $body: HTMLBodyElement | null = document.querySelector('body'); // боди
    const eventTarget = event.target as HTMLElement; // куда кликнули
    $body?.classList.remove('lock'); // удалить запрет на скролл body

    // если кликнули, чтобы закрыть попап по
    if (
      eventTarget === $wrapper || // врапперу (серому фону)
      eventTarget === document.querySelector('.pop-up-container span') || // крестику
      eventTarget === document.querySelector('.pop-up-container button') // кнопке ОК
    ) {
      $wrapper?.classList.remove('opened-popup'); // сворачивает фраппер
      if ($wrapper) $wrapper.innerHTML = ''; // снести все, что осталось в обертке
    }
  }
}

export default PopupContainer;
