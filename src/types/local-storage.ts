/**
 * @module Local Storage
 */

import { IUser } from '@type/user';
import { IProduct } from '@type/product';

export interface IUserLocalStorageData {
  /** user in a LocalStorage */
  data: IUser;

  /** adding date */
  dateAdded: number;
}

export interface IProductLocalStorageData {
  /** products in a local storage */
  data: IProduct[];

  /** adding date */
  dateAdded: number;
}

/** data in localStorage */
export type TLocalData =
  | IUserLocalStorageData
  | IProductLocalStorageData
  | null;
