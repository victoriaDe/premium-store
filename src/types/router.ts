import { TFilter } from '@type/product';

export type TRouteCallback = (...args: any[]) => void;

/**
 * @param hash hash route
 * @param title title of browser tab
 * @param callback callback function for route
 * @param isCalled indicator whether this route has been called
 */

export type TRoute = {
  hash: string;
  title: string;
  callback: TRouteCallback;
  isCalled: boolean;
};

/**
 * @param hash hash route
 * @param title title of browser tab
 * @param filter filter name for route generation
 */

export type TFilterRoute = {
  hash: string;
  title: string;
  filter: 'All' | TFilter | null;
};
