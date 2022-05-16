import axios, { AxiosRequestConfig } from 'axios';
import { store } from './store/app/store';

const BASE_URL = process.env.REACT_APP_BE_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

const instance = axios.create({
  baseURL: BASE_URL + API_VERSION,
});

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = store.getState().user.accessToken;
    if (token) {
      config.headers!.authorization = `Bearer ${token}`;
    }
    config.headers!.Accpet = `application/json`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
