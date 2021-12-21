type TElem = {
  id?: string;
  classes?: string[];
};

export type TParElem = TElem & {
  text?: string;
  inner?: HTMLElement;
};

export type TBtnElem = TParElem & {
  type?: 'button' | 'reset' | 'submit';
};

export type TImgElem = TElem & {
  src: string;
  alt: string;
};

export type TLinkElem = TParElem & {
  href: string;
};

export type TInputElem = TElem & {
  type:
    | 'button'
    | 'checkbox'
    | 'file'
    | 'hidden'
    | 'image'
    | 'password'
    | 'radio'
    | 'reset'
    | 'submit'
    | 'text';
  name?: string;
};
