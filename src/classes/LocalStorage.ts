import { IUser } from '@type/user';
import { IProduct, TFilter } from '@type/product';
import UserAPI from '@api/user';
import ProductAPI from '@api/product';

export interface IUserLocalStorageData {
  data: IUser,
  dateAdded: number
}

export interface IProductLocalStorageData {
  data: IProduct[]
  dateAdded: number
}
type LocalDataType = IUserLocalStorageData | IProductLocalStorageData | null

class LocalStorage {
  #userId = '61a6286353b5dad92e57b4c0';

  // get data from localstorage
  getLocalData(id: string): LocalDataType {
    const dataJson: string | null = localStorage.getItem(`${id}`);
    if (dataJson) return JSON.parse(dataJson);
    return null;
  }

  async getAllData() {
    const productData = await this.getProductDataByFilter('All');
    const userData = await this.getUserData();
    return [productData, userData];
  }

  async sendUserData() {
    const userData = this.getLocalData('user') as IUserLocalStorageData | null;
    if (userData) {
      const data = await UserAPI.changeUserData(userData.data);
    }
  }

  async updateUserData() {
    const userData = await UserAPI.getUserByID(this.#userId);
    if (!userData) return null;
    const localUserData = {
      data: userData,
      dateAdded: Date.now(),
    };
    localStorage.setItem('user', JSON.stringify(localUserData));
    return userData;
  }

  async updateProductDataByFilter(filter: TFilter | 'All') {
    const productDataByFilter = await ProductAPI.getProductsByFilter(filter);
    if (!productDataByFilter) return null;
    const localProductData = {
      data: productDataByFilter,
      dateAdded: Date.now(),
    };
    localStorage.setItem(filter, JSON.stringify(localProductData));
    return productDataByFilter;
  }

  async getProductDataByFilter(filter: TFilter | 'All') {
    let productDataStorageByFilter = this.getLocalData(filter) as IProductLocalStorageData | null;
    if (!productDataStorageByFilter) {
      const productDataByFilter = await this.updateProductDataByFilter(filter);
      if (productDataByFilter) return productDataByFilter;
    } else if (Date.now() - productDataStorageByFilter.dateAdded < 3000000) {
      //3000000 - 10 минут
      return productDataStorageByFilter.data;
    } else {
      const productDataByFilter = await this.updateProductDataByFilter(filter);
      if (productDataByFilter) return productDataByFilter;
    }
    return null;
  }

  async getUserData() {
    let userDataStorage = this.getLocalData('user') as IUserLocalStorageData | null;
    if (!userDataStorage) {
      const userData = await this.updateUserData();
      if (userData) return userData;
    } else if (Date.now() - userDataStorage.dateAdded < 3000000) {
      //3000000 - 10 минут
      return userDataStorage.data;
    } else {
      const userData = await this.updateUserData();
      if (userData) return userData;
    }
    return null;
  }

  async getListData(property: 'shoppingList' | 'wishlist') {
    // всегда берем актуальные данные по списку id
    const userData = await this.getUserData();
    if (userData) {
      if (userData[property].length > 0) {
        return ProductAPI.getProductsByList(userData[property]);
      }
    }
    return null;
  }


  // update shoppingList in localstorage
  changeLocalShoppingList(id: string, idProduct: string): void {
    const user = this.getLocalData('user') as IUserLocalStorageData | null;
    if (user) {
      user.data.shoppingList.push(idProduct);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // update wishlist in localstorage
  changeLocalWishlist(id: string, productId: string): void {
    const user = this.getLocalData('user') as IUserLocalStorageData | null;
    if (user) {
      const index: number = user.data.wishlist.indexOf(productId);
      if (index !== -1) {
        user.data.wishlist.splice(index, 1);
      } else {
        user.data.wishlist.push(productId);
      }
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}

export default new LocalStorage;
