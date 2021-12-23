import PopupContainer from '@classes/PopupContainer';

/**
 * Function to refresh the page if the link to the page has been clicked
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
 * Function to change text to item through class
 * @param $loginID  HTML element
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
 * Function to add listener to a target to open popup
 * @param $target HTML target element
 */
function addOpenPopup($target: HTMLElement) {
  $target.addEventListener('click', (event) => PopupContainer.openPopup(event));
}

/**
 *  * Function to add listener to a target to close popup
 * @param $target HTML HTML target element
 */
function addClosePopup($target: HTMLElement) {
  $target.addEventListener('click', (event) =>
    PopupContainer.closePopup(event),
  );
}

export { reloadPageSameLink, fixLoginPopup, addOpenPopup, addClosePopup };
