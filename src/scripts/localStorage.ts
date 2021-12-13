import { IUser } from '@type/user';
import { IProduct } from '@type/product';

class LocalStorage {
  // get data from localstorage
  static getLocalData(id: string): IUser | IProduct[] {
    const dataJson: string | null = localStorage.getItem(`${id}`);
    let data!: IUser | IProduct[];
    if (dataJson) {
      data = JSON.parse(dataJson);
    }
    return data;
  }

  // update shoppingList in localstorage
  static changeLocalShoppingList(id: string, idProduct: string): void {
    const user: IUser | IProduct[] = LocalStorage.getLocalData(id);
    if ('shoppingList' in user) {
      user.shoppingList.push(idProduct);
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  // update wishlist in localstorage
  static changeLocalWishlist(id: string, wishlist: string[]): void {
    const user: IUser | IProduct[] = LocalStorage.getLocalData(id);
    if ('wishlist' in user) {
      user.wishlist = wishlist;
    }
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default LocalStorage;
