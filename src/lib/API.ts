import {APIError} from '@utilities/types';
import axios, {AxiosRequestConfig} from 'axios';

const instance = axios.create({
  baseURL: 'http://xyz',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const API = () => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return instance.get<T>(url, config);
    },
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return instance.delete<T>(url, config);
    },
    put: <T>(url: string, body?: unknown, config: AxiosRequestConfig = {}) => {
      return instance.put<T>(url, body, config);
    },
    post: <T>(url: string, body?: unknown, config: AxiosRequestConfig = {}) => {
      return instance.post<T>(url, body, config);
    },
  };
};
export default instance;

export const InternalError: APIError = {
  message: 'Some error occured',
  code: -500,
};
