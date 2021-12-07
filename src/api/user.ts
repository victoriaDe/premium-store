import instance from '@api/api';
import { IUser } from '@type/user';
import { IResponse } from '@type/api';

class UserAPI {
  static getUserByID(id: string) {
    return instance
      .get<IResponse<IUser>>(`user?id=${id}`, {})
      .then((response) => response.data);
  }

  static getAllUsers() {
    return instance
      .get<IResponse<IUser[]>>('users')
      .then((response) => response.data);
  }

  static addUser(name: string) {
    return instance
      .post<IResponse<IUser>>('user', { name })
      .then((response) => response.data);
  }

  static changeWishlist(userID: string, productID: string) {
    return instance
      .post<IResponse<IUser>>(`user/wishlist`, {
        userId: userID,
        productId: productID,
      })
      .then((response) => response.data);
  }

  static changePurchase(userID: string, productID: string, isAdd: boolean) {
    return instance
      .post<IResponse<IUser>>(`user/shopping`, {
        userId: userID,
        productId: productID,
        isAdd,
      })
      .then((response) => response.data);
  }
}

export default UserAPI;
