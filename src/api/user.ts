/**
 * @module API
 */

import instance from '@api/api';
import { IUser } from '@type/user';
import { IResponse } from '@type/api';

/**
 * Class for working with users
 */

class UserAPI {
  /**
   * Method for getting a user by ID
   * @param id user ID
   */

  static async getUserByID(id: string) {
    try {
      const response = await instance.get<IResponse<IUser>>(`user?id=${id}`);
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method to get all users
   */

  static async getAllUsers() {
    try {
      const response = await instance.get<IResponse<IUser[]>>('users');
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for adding a new user to the database
   * @param name new user`s name
   */

  static async addUser(name: string) {
    try {
      const response = await instance.post<IResponse<IUser>>('user', { name });
      return response.data.data;
    } catch (err) {
      throw new Error('Ooops!');
    }
  }

  /**
   * Method for adding / removing an product from the user's wishlist
   * @param userID user ID
   * @param productID product ID
   */

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

  /**
   * Method for adding / removing an product to the shopping cart
   * @param userID user ID
   * @param productID product ID
   * @param isAdd flag indicating whether there is such a product in the cart
   */

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

  /**
   * Method for complex modification of user data (name, wishlist, shopping cart)
   * @param user complete user data
   */

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
