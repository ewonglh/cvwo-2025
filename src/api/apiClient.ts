import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL as string;

axios.defaults.withCredentials = true; // Ik this is redundant but trying to fix bug :(

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('XSRF-TOKEN');

  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

const isObject = (obj: any): boolean => 
  obj !== null && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date);

const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''))
          .replace(/id$/i, 'Id');
};

// To convert all keys in an object (and nested objects) to camelCase since my backend is very messy
const recursivelyCamelize = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(recursivelyCamelize);
  }
  if (!isObject(obj)) {
    return obj;
  }

  return Object.keys(obj).reduce((acc: any, key: string) => {
    const camelKey = toCamel(key);
    acc[camelKey] = recursivelyCamelize(obj[key]);
    return acc;
  }, {});
};

apiClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = recursivelyCamelize(response.data);
  }
  return response;
});

export const getCsrfToken = () => apiClient.get('/auth/csrf');

export default apiClient;
