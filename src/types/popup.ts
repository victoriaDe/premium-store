/**
 * @module Popup
 */

/** массив с входыми данными для создания попапа */
type TPopupInputs = Array<string[]>;

/** обработчик для ссылки в попапе */
type TLinkHandler = (event: MouseEvent) => void;

export { TPopupInputs, TLinkHandler };
