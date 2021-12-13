import axios, { AxiosRequestConfig } from 'axios';

const baseURL = `https://wg-force3-backend.herokuapp.com/api/`;

const instance = axios.create({
  baseURL,
  withCredentials: false,
} as AxiosRequestConfig);

export default instance;
