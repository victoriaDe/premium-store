/**
 * @module API
 */

import { geoLocInstance } from '@api/API';

/**
 * Geolocation class
 */
class GeoAPI {
  /**
   * Method to get user's location by browser
   */
  static getPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { longitude, latitude } = pos.coords;
      GeoAPI.savePositon(longitude, latitude);
    });
  }

  /**
   * Method to save user's location in local storage
   * @param longitude geographic longitude
   * @param latitude geographic latitude
   */
  static savePositon(longitude: number, latitude: number): void {
    window.localStorage.setItem('longitude', String(longitude));
    window.localStorage.setItem('latitude', String(latitude));
  }

  /**
   * Method to reach out user's country code
   * @param longitude geographic longitude
   * @param latitude geographic latitude
   */
  static async getCountryCode(
    longitude: number,
    latitude: number,
  ): Promise<string> {
    try {
      const resp = await geoLocInstance.get(
        `reverse.php?key=pk.6622c6988c1228ba51e625c22d5efb77&lat=${latitude}&lon=${longitude}&format=json`,
      );
      return resp.data.address.country_code.toUpperCase();
    } catch (err) {
      throw new Error(`Ooops! I can't get country code`);
    }
  }
}

export default GeoAPI;
