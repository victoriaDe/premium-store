type TElem = {
  id?: string;
  classes?: string[];
};

type TParElem = TElem & {
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

export type TLinkElem = TElem & {
  href: string;
};
