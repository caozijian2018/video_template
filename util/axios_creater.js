import axios from 'axios'
import Vue from "vue"
const service = axios.create({
  timeout: 10000, // request timeout
  baseURL:process.env.baseUrl
});
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
service.interceptors.response.use(
  response => response.data,
  error => {
    var err_msg='error';
    Vue.prototype.$msg(err_msg,'error')
    return Promise.reject({err_msg,error:"error"})
  });
export default service
