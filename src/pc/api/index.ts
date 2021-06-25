import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Loading, Message } from 'element-ui'
import { apiUrl } from '@/pc/url.config.js'
let loadingInstance: any;
let arr: any = []
function createAPI({ url, headers }: any) {
  arr.push(url)
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
      request.headers.common['TOKEN'] = sessionStorage.getItem("token");
      return request;
    },
    (errorData: any): any => {
      return Promise.reject(errorData);
    },
  );

  instance.interceptors.response.use(
    (response: any): any => {
      arr.splice(0, 1)
      setTimeout(() => {
        if (!arr.length) {
          loadingInstance.close()
        }
      }, 400)
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
      if (!arr.length) {
        loadingInstance.close()
      }
      return Promise.reject(errorData?.response || {});
    },
  );

  return instance;
}

export const apiCreator: (headers?: any) => AxiosInstance = (headers) => {
  return createAPI({
    url: apiUrl,
    withCredentials: true,
    headers: { ...headers }
  });
};

