type TElem = {
  id?: string;
  classes?: string[];
};

type TParElem = TElem & {
  text?: string;
};

export type TBtnElem = TParElem & {
  type?: 'button' | 'reset' | 'submit';
};

export type TImgElem = TElem & {
  src: string;
  alt: string;
};
