/**
 * @module API
 */

import axios, { AxiosRequestConfig } from 'axios';

/** URL сервера с БД */
const backEndBaseURL = `https://wg-force3-backend.herokuapp.com/api/`;

/** URL для обратного геокодирования */
const geoLocBaseURL = 'https://eu1.locationiq.com/v1/';

/** URL для определения страны по IP */
const ipLocBaseURL = 'http://ipwhois.app/json/';

/** экземпляр axios для работы с сервером и БД */
const backEndInstance = axios.create({
  baseURL: backEndBaseURL,
  withCredentials: false,
} as AxiosRequestConfig);

/** экземпляр axios для определения местоположения пользователя по геолокации */
const geoLocInstance = axios.create({
  baseURL: geoLocBaseURL,
});

/** экземпляр axios для определения местоположения пользователя по IP адресу */
const ipLocInstance = axios.create({
  baseURL: ipLocBaseURL,
});

export { backEndInstance, geoLocInstance, ipLocInstance };
