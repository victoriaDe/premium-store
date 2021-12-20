export type TPage = 'wishlist' | 'shoppingList';

type TTagAtrs = {
  classes?: string[];
  id?: string;
};

export type TBtnAtrs = TTagAtrs & {
  text: string;
};

export type TImgAtrs = TTagAtrs & {
  src: string;
  alt: string;
};
