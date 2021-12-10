import { IUser } from '@type/user';

class LocalStorage {
  // get data from localstorage
  static getLocalData(id: string): IUser {
    let data: any = localStorage.getItem(`${id}`);
    if (data) {
      data = JSON.parse(data);
    }
    return data;
  }

  // update shoppingList in localstorage
  static changeLocalShoppingList(id: string, idProduct: string): void {
    const user: any = LocalStorage.getLocalData(id);
    user.data.shoppingList.push(idProduct);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // update wishlist in localstorage
  static changeLocalWishlist(id: string, wishlist: string[]): void {
    const user: any = LocalStorage.getLocalData(id);
    user.data.wishlist = wishlist;
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default LocalStorage;
