import axios, { AxiosRequestConfig } from 'axios';
import { authAPI } from '@api/authApi';


const LocalBaseURL = `http://localhost:7000/api/`;
const backEndBaseURL = `https://wg-force3-backend.herokuapp.com/api/`;
const ServerAuthBaseURL = `https://wg-server-auth.herokuapp.com/api/`;
const geoLocBaseURL = 'https://eu1.locationiq.com/v1/';
const ipLocBaseURL = 'http://ipwhois.app/json/';


const backEndInstance = axios.create({
  baseURL: LocalBaseURL,
  withCredentials: true,
} as AxiosRequestConfig);

const geoLocInstance = axios.create({
  baseURL: geoLocBaseURL,
});

const ipLocInstance = axios.create({
  baseURL: ipLocBaseURL,
});


backEndInstance.interceptors.request.use((config) => {
  if(config.headers){
    config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`
    return config
  }
})

backEndInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) {
      console.log("Please check your internet connection.");
    }
    return Promise.reject(error)
  }
)

backEndInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) {
      console.log("Please check your internet connection.");
    }
    return Promise.reject(error)
  }
)

backEndInstance.interceptors.response.use((config) => {
  return config
}, async error => {
  const originalRequest = error.config
  if (error.response.status === 401) {
    try {
      const data = await authAPI.refresh()
      localStorage.setItem('token', data.accessToken);
      return backEndInstance.request(originalRequest)
    } catch (e) {
      console.log("не авторизован в интерсепторе")
    }

  }
})







export { backEndInstance, geoLocInstance, ipLocInstance };
