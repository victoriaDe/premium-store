/**
 * @module Popup
 */

import Popup from '@classes/Popup';
import LocalStorage from '@classes/LocalStorage';
/**
 * Class to work with popups
 */

class PopupContainer {
  /**
   * Method to open popup
   * @param event event object triggered the method
   */
  static openPopup(event: MouseEvent) {
    let popup;
    const $wrapper: HTMLElement | null = document.getElementById('popupWrapper');
    const $body: HTMLBodyElement | null = document.querySelector('body');
    const eventTarget = event.target as HTMLElement;

    if ($wrapper?.children) $wrapper.innerHTML = '';

    $body?.classList.add('lock');
    $wrapper?.classList.add('visible');

    switch (
      eventTarget.id
      ) {
      case 'login':
        popup = new Popup(
          eventTarget,
          [
            ['nickname', 'text'],
            ['password', 'password'],
          ],
          true,
          LocalStorage.loginSubmit,
          this.openPopup,
        );
        break;

      case 'create-account':
        popup = new Popup(
          eventTarget,
          [
            ['full name', 'text'],
            ['nickname', 'text'],
            ['email', 'email'],
            ['password', 'password'],
          ],
          false,
          LocalStorage.createAccountSubmit
        );
        break;

      case 'reset-password': // попап для забыл пароль
        popup = new Popup(eventTarget, [['email', 'email']], false, LocalStorage.logoutSubmit);
        if ($wrapper) $wrapper.innerHTML = '';
        break;
      case 'logout': // попап для логаута
        popup = new Popup(eventTarget, [], false, LocalStorage.logoutSubmit);
        if ($wrapper) $wrapper.innerHTML = '';
        break;

      default:
        throw new Error('eventTarget has no ID');
    }

    if ($wrapper && popup) {
      $wrapper.appendChild(popup.renderHTML());
      $wrapper.classList.add('opened-popup');
    }
  }

  /**
   * Method to close popup
   * @param event event object triggered the method
   */

  static closePopup(event: MouseEvent) {
    const $wrapper: HTMLElement | null = document.getElementById('popupWrapper');
    const $body: HTMLBodyElement | null = document.querySelector('body');
    const eventTarget = event.target as HTMLElement;

    $body?.classList.remove('lock');


    if (
      eventTarget === $wrapper ||
      eventTarget === document.querySelector('.pop-up-container span') ||
      eventTarget === document.querySelector('.pop-up-container button')
    ) {
      $wrapper?.classList.remove('opened-popup');
      if ($wrapper) $wrapper.innerHTML = '';
    }
  }
}

export default PopupContainer;
