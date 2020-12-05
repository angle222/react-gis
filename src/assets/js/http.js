// 引入axios
import axios from 'axios';
import { message} from 'antd';
import {withRouter} from "react-router-dom"
import {getCookie,delCookie} from "../../utils/cookie"
import store from '../../store/redux';
// 创建新的axios实例
var $http
// 配置请求地址
$http = axios.create({
  baseURL:'/datagdw',
  // timeout: 60000
  timeout: 60000 * 10
})

const CancelToken = axios.CancelToken;
let sources = []  // 定义数组用于存储每个ajax请求的取消函数及对应标识
/**
 * 请求防抖当一个url地址被请求多次就会取消前一次请求
 */
let removeSource = (config) => {
  for (let source in sources) {
      // 当多次请求相同时，取消之前的请求
    if (sources[source].umet === config.url + '&' + config.method) {
      sources[source].cancel("取消请求")
      sources.splice(source, 1)
    }
  }
}

// 添加请求拦截器
$http.interceptors.request.use( config =>{
  // 再发送请求 之前重新配置header
  if (getCookie('dataUser')) {
    config.headers.common['Authorization'] = getCookie('dataUser')
  }
  removeSource(config)
  config.cancelToken = new CancelToken((c) => {
        // 将取消函数存起来
    sources.push({ umet: config.url + '&' + config.method, cancel: c })
  })
  return config
}, function (error) {
	// 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
$http.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	// 如果是错误返回  这里可以统一抛出错误
  return checkResponse(response);
}, function (error) {
	// 对响应错误做点什么
	// 异常处理
  if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
    return new Promise(() => {});
  } else {
	  switch (error.response.status) {
    case 403:
      message.info('当前登录用户无操作权限')
        
      break
    case 404:
        
      break
    case 302:
        // 重定向
        
      break
    case 500:
      if (error.response.data.message === 'relogin') {
        message.info('请用户重新登录')
          
      }
      break
    default:
      break
  }
    return Promise.reject(error)
  }
});
function checkResponse(response){
  store.dispatch({type:'setUser',payload:true})
  let res
  if (Number(response.data.code) === 1) {
    message.error(response.data.message)
    if (response.data.message.indexOf('重新登录') > -1) {
      // 重新登录
      delCookie('dataUser')
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('premissions')
      router.replace({ path: '/login/login' })
    } else {
      return Promise.reject(response)
    }
  }else if(Number(response.data.code) === 0){
  	res = response.data.data
    return Promise.resolve(res)
  }else{
  	res = response.data
    return Promise.resolve(res)
  }
}

export default function(method, url, data = null,config,cancelObj) {
  method = method.toLowerCase();
  if(method === 'post') {
    return $http.post(url,data, config)
  } else if(method === 'get') {
    return $http.get(url, {params: data})
  } else if(method ==='delete') {
    return $http.delete(url, {params: data})
  } else if(method ==='put') {
    return $http.put(url, Qs.stringify(data))
  } else if(method ==='file') {
    return $http.post(url, data,config)
  } else if(method ==='map') {
    return $http.get(url)
		
  }
  else {
    console.error('未知的method' +method)
    return false
  }
}
