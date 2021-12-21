/**
 * @module DOMElems
 */
import { TBtnElem, TImgElem, TLinkElem } from '@scripts/init/dom-elems';

class DOMElems {
  static #elem(tag: string, data: any) {
    const { classes } = data;

    const $elem = document.createElement(tag);

    const attributes = Object.keys(data);

    for (const attr of attributes) {
      if (attr !== 'classes' && attr !== 'text') {
        $elem.setAttribute(attr, data[attr]);
      }
    }

    if (classes) {
      classes.forEach((cl: string) => {
        if (cl.trim() !== '') {
          $elem.classList.add(cl);
        }
      });
    }

    if (data.text) {
      $elem.textContent = data.text;
    }

    if (data.inner) {
      $elem.append(data.inner);
    }

    return $elem;
  }

  static btn(data: TBtnElem) {
    return DOMElems.#elem('button', data);
  }

  static img(data: TImgElem) {
    return DOMElems.#elem('img', data);
  }

  static link(data: TLinkElem) {
    return DOMElems.#elem('a', data);
  }
}

export default DOMElems;
