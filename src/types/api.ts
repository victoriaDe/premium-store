/**
 * @module API
 */

export interface IResponse<T> {
  /** execution code */
  resultCode: 0 | 1;

  /** errors (execution code 1) */
  messages: string[];

  /** server data */
  data: T | null;
}

export interface IAddUserReq {
  /** user name */
  name: string;
}

export interface IGetProductsByListReq {
  /** list of products ID */
  listProductsId: string[];
}

export interface IChangeWishlistReq {
  /** user ID */
  userId: string;

  /**product ID */
  productId: string;
}

export interface IChangePurchaseReq extends IChangeWishlistReq {
  /** has the product been added to a cart */
  isAdd: boolean;
}
