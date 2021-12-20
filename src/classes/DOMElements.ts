/**
 * @module DOMElements
 */

/**
 * Класс для создания DOM элементов
 */

class DOMElements {
  /**
   * Метод для создания шапки на страницах корзины и списка желаний
   * @param title заголовок шапки
   */

  static createPageHeader(title: string): HTMLDivElement {
    const $header = document.createElement('div');
    $header.innerHTML = `${title}`;
    $header.classList.add('list-header-container');
    return $header;
  }

  /**
   * Метод для создания пустых страниц корзины и списка желаний
   * @param text выводимый на странице текст
   */

  static createEmptyPage(text: string): HTMLDivElement {
    const $item = document.createElement('div');
    $item.classList.add('item-filtered-container');
    $item.innerHTML = `<div class="empty-list">${text}</div>`;
    return $item;
  }
}

export default DOMElements;
