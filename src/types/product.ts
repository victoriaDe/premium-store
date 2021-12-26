/**
 * @module Product
 */

import { TCurrencyCode } from '@type/price';

/** country of origin */
type TCountry =
  | 'china'
  | 'czech'
  | 'france'
  | 'germany'
  | 'italy'
  | 'japan'
  | 'poland'
  | 'sweden'
  | 'uk'
  | 'usa'
  | 'ussr';

/** type */
type TTechnique = 'AT-SPG' | 'heavyTank' | 'lightTank' | 'mediumTank' | 'SPG';

/** tier */
type TTier = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

/** product type */
export type TFilter = 'Technique' | 'Premium' | 'Gold' | 'Provisions';

export interface IProductData {
  /** product ID */
  id: string;

  /** product name */
  name: string;

  /** product description */
  description: string;

  /** product value */
  price: {
    /** basic value */
    basic: {
      /** basic value amount */
      cost: string;

      /** basic value currency */
      currency: TCurrencyCode;
    };

    /** actual price */
    actual: {
      /** actual price value */
      cost: string;

      /** sale type */
      discountType: 'percent' | 'fixed';
    };
  };

  /** product img */
  images: {
    /** link to a big product img */
    span_1x1: string;

    /** link to a small product img */
    span_2x1: string;
  };
}

export interface ITechniqueData extends IProductData {
  filter: {
    /** country */
    nation: TCountry;

    /** type */
    type: TTechnique;

    /** tier */
    tier: TTier;
  };
}

export interface IProduct {
  /** type */
  type: TFilter;

  /** number of column which product can take */
  span: number;

  /** product data */
  data: IProductData | ITechniqueData;
}
