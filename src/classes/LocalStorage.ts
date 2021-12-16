import { IUser } from '@type/user';
import { IProduct } from '@type/product';

class LocalStorage {
  // get data from localstorage
  static getLocalData(id: string): IUser | IProduct[] | null {
    const dataJson: string | null = localStorage.getItem(`${id}`);
    let data!: IUser | IProduct[];
    if (dataJson) {
      data = JSON.parse(dataJson);
    }
    return data;
  }

  // update shoppingList in localstorage
  static changeLocalShoppingList(id: string, idProduct: string): void {
    const user: IUser | IProduct[] | null = LocalStorage.getLocalData(id);
    if (user) {
      if ('shoppingList' in user) {
        user.shoppingList.push(idProduct);
      }
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // update wishlist in localstorage
  static changeLocalWishlist(id: string, productId: string): void {
    const user: IUser | IProduct[] | null = LocalStorage.getLocalData(id);
    if (user) {
      if ('wishlist' in user) {
        const index: number = user.wishlist.indexOf(productId);
        if (index !== -1) {
          user.wishlist.splice(index, 1);
        } else {
          user.wishlist.push(productId);
        }
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  }
}

export default LocalStorage;
