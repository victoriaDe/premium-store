// T  =  IProduct  ore IUser
export interface IResponse<T> {
  resultCode: 0 | 1;
  messages: string[];
  data: T | null;
}
