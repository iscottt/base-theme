import axios from 'axios'
import { storage } from '@/assets/utils'
import useAppStore from '@/bases/store/app'
//请求拦截器，总是要手动添加nvnonce
axios.interceptors.request.use(function(config) {
  const appStore = useAppStore();
  var nvnonce = storage.local.get('nvnonce') || storage.session.get('nvnonce') || appStore.nonce;
  if (nvnonce) {
    config.headers.nvnonce = nvnonce;
    return config;
  }
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.status == 401) {
    storage.local.remove('nvnonce')
    storage.session.remove('nvnonce')
    location.reload();
  }
  return Promise.reject(error);
});
export const $API = process.env.NODE_ENV === 'production' ? "" : '/vite-proxy';
export const axiosGet = (url, params = {}, config = {}) => {
  return axios.get($API + url, {
    ...config,
    params
  })
}
export const axiosPost = (url, data = {}, config = {}) => {
  return axios.post($API + url, data, config)
}
