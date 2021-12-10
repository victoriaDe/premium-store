import instance from '@api/api';
import { IUser } from '@type/user';
import { IResponse } from '@type/api';

class UserAPI {
  static async getUserByID(id: string) {
    try {
      const response = await instance.get<IResponse<IUser>>(`user?id=${id}`);
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  static async getAllUsers() {
    try {
      const response = await instance.get<IResponse<IUser[]>>('users');
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  static async addUser(name: string) {
    try {
      const response = await instance.post<IResponse<IUser>>('user', { name });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  static async changeWishlist(userID: string, productID: string) {
    try {
      const response = await instance.post<IResponse<IUser>>(`user/wishlist`, {
        userId: userID,
        productId: productID,
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  static async changePurchase(
    userID: string,
    productID: string,
    isAdd: boolean,
  ) {
    try {
      const response = await instance.post<IResponse<IUser>>(`user/shopping`, {
        userId: userID,
        productId: productID,
        isAdd,
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  static async changeUserData(user: IUser) {
    try {
      const response = await instance.post<IResponse<IUser>>('userData', {
        data: user,
      });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }
}

export default UserAPI;
