import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Loading, Message } from 'element-ui'
import { apiUrl } from '@/pc/url.config.js'
console.log(apiUrl)
let loadingInstance: any;

function createAPI({ url, headers } : any) {
  const instance = axios.create({
    headers,
    baseURL: `${url}`,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    (request: any): any => {
      loadingInstance  = Loading.service({ //加载loading
				fullscreen: true, 
				text: 'Loading',
	            spinner: 'el-icon-loading',
	            background: 'rgba(0, 0, 0, 0.7)' 
	      });
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
      loadingInstance.close()
      if (response.data.errorCode == '0000') {
        return response.data;
      }
      Message({  //elemen组件库中的提示组件
        message: response.data.errorMessage,
        type:'error',
        duration: 2000
      })
      return Promise.reject(response || {});
    },
    (errorData: any): any => {
      loadingInstance.close()
      return Promise.reject(errorData?.response || {});
    },
  );

  return instance;
}

export const apiCreator: (headers?: any) => AxiosInstance = (headers) => {
  console.log(headers)
  return createAPI({
    url: apiUrl,
    headers: { ...headers},
  });
};

