/**
 * @module Popup
 */

/** input data array to use in a popup */
type TPopupInputs = Array<string[]>;

/** listener for a link in popup*/
type TLinkHandler = (event: MouseEvent) => void;

export { TPopupInputs, TLinkHandler };
