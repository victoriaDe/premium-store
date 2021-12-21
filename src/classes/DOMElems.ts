/**
 * @module DOMElems
 */
import {
  TBtnElem,
  TImgElem,
  TInputElem,
  TLinkElem,
  TParElem,
} from '@scripts/init/dom-elems';

class DOMElems {
  static #elem(tag: string, data: any): HTMLElement {
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

  static btn(data: TBtnElem): HTMLButtonElement {
    return DOMElems.#elem('button', data) as HTMLButtonElement;
  }

  static img(data: TImgElem): HTMLImageElement {
    return DOMElems.#elem('img', data) as HTMLImageElement;
  }

  static link(data: TLinkElem): HTMLLinkElement {
    return DOMElems.#elem('a', data) as HTMLLinkElement;
  }

  static div(data: TParElem): HTMLDivElement {
    return DOMElems.#elem('div', data) as HTMLDivElement;
  }

  static input(data: TInputElem): HTMLInputElement {
    return DOMElems.#elem('input', data) as HTMLInputElement;
  }
}

export default DOMElems;
