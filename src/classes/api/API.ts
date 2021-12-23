/**
 * @module API
 */

import axios, { AxiosRequestConfig } from 'axios';

/** database server URL */
const backEndBaseURL = `https://wg-force3-backend.herokuapp.com/api/`;

/** reverse geocode URL */
const geoLocBaseURL = 'https://eu1.locationiq.com/v1/';

/** country identification through IP URL*/
const ipLocBaseURL = 'http://ipwhois.app/json/';

/** axios instance for server and database */
const backEndInstance = axios.create({
  baseURL: backEndBaseURL,
  withCredentials: false,
} as AxiosRequestConfig);

/** axios instance for user's location determining through geolocation*/
const geoLocInstance = axios.create({
  baseURL: geoLocBaseURL,
});

/** axios instance for user's location determining through IP*/
const ipLocInstance = axios.create({
  baseURL: ipLocBaseURL,
});

export { backEndInstance, geoLocInstance, ipLocInstance };
