import axios from 'axios';
import { AxiosInstance } from 'axios';


function createAPI({ url, headers } : any) {
  const instance = axios.create({
    headers,
    baseURL: `${url}`,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    (request: any): any => {
      if (request.method === 'get') {
        request.headers.common['Pragma'] = 'no-cache';
        request.headers.common['Cache-control'] = 'no-cache';
      }
      return request;
    },
    (errorData: any): any => {
      return Promise.reject(errorData);
    },
  );

  instance.interceptors.response.use(
    (response: any): any => {
      return response;
    },
    (errorData: any): any => {
      return Promise.reject(errorData?.response || {});
    },
  );

  return instance;
}

export const apiCreator: (headers?: any) => AxiosInstance = (headers) => {
  return createAPI({
    url: '/rng',
    headers: { ...headers},
  });
};

