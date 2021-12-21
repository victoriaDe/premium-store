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
