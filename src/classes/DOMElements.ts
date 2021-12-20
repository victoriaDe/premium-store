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

  static createPartitionHeader(title: string) {
    const $header = document.createElement('div');
    $header.innerHTML = `${title}`;
    $header.classList.add('list-header-container');
    return $header;
  }
}

export default DOMElements;
