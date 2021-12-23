/**
 * @module API
 */

import { ipLocInstance } from '@api/API';

/**
 * Class to determine user's location through IP
 */
class IPLocationAPI {
  /**
   * Method to reach out user's country code
   */
  static async getCountryCode(): Promise<string> {
    try {
      const resp = await ipLocInstance.get('');
      return resp.data.country_code;
    } catch (err) {
      throw new Error(`Ooops! I can't get country code`);
    }
  }
}

export default IPLocationAPI;
