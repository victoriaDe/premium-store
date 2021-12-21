/**
 * @module IPLocation
 */

import axios from 'axios';

const baseURL = 'http://ipwhois.app/json/';

const instance = axios.create({
  baseURL,
});

/**
 * Класс для определения местоположения пользователя, опираясь на IP адрес
 */

class IPLocation {
  /**
   * Метод для получения кода страны пользователя
   */

  static async getCountryCode(): Promise<string> {
    try {
      const resp = await instance.get('');
      return resp.data.country_code;
    } catch (err) {
      throw new Error(`Ooops! I can't get country code`);
    }
  }
}

export default IPLocation;
