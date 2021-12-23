/**
 * @module Router
 */

import { TFilter } from '@type/product';

/** route callback */
export type TRouteCallback = (...args: any[]) => void;

export type TRoute = {
  /** hash route */
  hash: string;

  /** title of a browser tab */
  title: string;

  /** callback function for route */
  callback: TRouteCallback;
};

export type TFilterRoute = {
  /** hash route */
  hash: string;

  /** title of a browser tab */
  title: string;

  /** filter name for route generating */
  filter: 'All' | TFilter | null;
};
