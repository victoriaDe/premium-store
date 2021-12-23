import PopupContainer from '@classes/PopupContainer';

/**
 * Функция для работы перезагрузки страницы при клике по ссылке на эту же страницу
 */
function reloadPageSameLink() {
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
}

/**
 * Функция для отображения правильной шапки магазина в зависимости от ширины экрана
 * @param $loginID HTML элемент ссылки Login
 */
function fixLoginPopup($loginID: HTMLElement) {
  window.addEventListener('resize', () => {
    // отслеживание ширины экрана, если <= 720, то css убирает текст по медиа запросам, а здесь добавляется класс login
    // для логина, который клеит картинку на место текста
    if (window.screen.width <= 720) {
      $loginID.classList.add('login');
    } else {
      $loginID.classList.remove('login');
    }
  });
}

/**
 * Функция, добавляющая обработчик кликов на выбранный элемент для открытия попапа
 * @param $target HTML элемент для активации попапа
 */
function addOpenPopup($target: HTMLElement) {
  $target.addEventListener('click', (event) => PopupContainer.openPopup(event));
}

/**
 * Функция, добавляющая обработчик кликов на выбранный элемент для закрытия попапа
 * @param $target HTML элемент для дезактивации попапа
 */
function addClosePopup($target: HTMLElement) {
  $target.addEventListener('click', (event) =>
    PopupContainer.closePopup(event),
  );
}

export { reloadPageSameLink, fixLoginPopup, addOpenPopup, addClosePopup };
