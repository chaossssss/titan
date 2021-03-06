import {
  baseUrl, //引入baseUrl 
} from "../config/env";
import axios from 'axios';
axios.defaults.timeout = 10000; //设置请求时间
axios.defaults.baseURL = baseUrl;//设置默认接口地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
*/
export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
      axios.get(url,{
        params:params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
    })
  }
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
var instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.put(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 export function patch(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.patch(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }


export function del(url,params={}){
    return new Promise((resolve,reject) => {
      axios.delete(url,{
        params:params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
    })
  }

