import '@scripts/elements';
import '@scripts/tree';
import storeInit from '@scripts/init/store';
import {
  reloadPageSameLink,
  fixLoginPopup,
  addOpenPopup,
  addClosePopup,
} from '@scripts/listeners';

import '@scss/main.scss';

storeInit();
reloadPageSameLink();

const $login: HTMLElement | null = document.getElementById('login'); // ссылка логина
const $create: HTMLElement | null = document.getElementById('create-account'); // ссылка создать аккаунт
const $wrapper: HTMLElement | null = document.getElementById('popupWrapper'); // серый фон попапа

if ($login) {
  fixLoginPopup($login);
  addOpenPopup($login);
}

if ($create) {
  addOpenPopup($create);
}

if ($wrapper) {
  addClosePopup($wrapper);
}
