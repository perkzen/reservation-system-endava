import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BE_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

const instance = axios.create({
  baseURL: BASE_URL + API_VERSION,
});

export default instance;
