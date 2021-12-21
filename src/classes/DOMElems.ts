/**
 * @module DOMElems
 */
import { TBtnElem } from '@scripts/init/dom-elems';

class DOMElems {
  static #elem(tag: string, data: TBtnElem) {
    const { id, classes, text, type } = data;

    const $elem = document.createElement(tag);

    if (classes) {
      classes.forEach((cl) => {
        if (cl.trim() !== '') {
          $elem.classList.add(cl);
        }
      });
    }

    if (id) {
      $elem.id = id;
    }

    if (text) {
      $elem.textContent = text;
    }

    if (tag === 'button' || tag === 'input') {
      if (type) {
        $elem.setAttribute('type', type);
      }
    }

    return $elem;
  }

  static btn(data: TBtnElem) {
    return DOMElems.#elem('button', data);
  }
}

export default DOMElems;
