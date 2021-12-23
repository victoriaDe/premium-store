import { IUser } from '@type/user';
import { IProduct } from '@type/product';

export interface IUserLocalStorageData {
  /** пользователь в локальном хранилище */
  data: IUser;

  /** дата добавления */
  dateAdded: number;
}

export interface IProductLocalStorageData {
  /** продукты в локальном хранилище */
  data: IProduct[];

  /** дата добавления */
  dateAdded: number;
}

/** данные в локальном хранилище */
export type TLocalData =
  | IUserLocalStorageData
  | IProductLocalStorageData
  | null;
