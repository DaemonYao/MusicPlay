import {DeletelToken} from '../DeletelToken'
import qs from "qs";
import axios from 'axios'
import {Message} from 'element-ui'
import router from '../../router/index'

// 封装默认数据
var instance = axios.create({
  time: 1000 * 60,
  baseURL: "http://localhost:8081/",
});

// 封装请求头中类型
instance.defaults.responseType = "json";
instance.defaults.withCredentials = true;
instance.defaults.headers= {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',},
// `transformRequest` 允许在向服务器发送前，修改请求数据
instance.defaults.transformRequest = [
  (data) => {
    return qs.stringify(data);
  },
];

// 请求拦截
instance.interceptors.request.use(
  function (config) {
    if( localStorage.getItem("MusicToken") ) {
      config.headers.Authorization = localStorage.getItem("MusicToken")
    }
    DeletelToken();
    return config;
  },
  function (error) {
    //请求出错
    Message.error({message: '请求超时!'});
    return Promise.reject(error);
  }
);

// 响应拦截  在这里做登录请求
instance.interceptors.response.use(
  function (config) {
    //请求成功
    return config;
  },
  function (error) {
    //请求出错
    Message.error({message: '请求超时!请重新刷新'});

    const { status } = error.response;
    if(status == 401){
      Message.error("您的登录过期了，请重新登录！");
      // 清除token
      localStorage.removeItem("MusicToken");
    //  跳转到登录界面
    router.push('/login')
    }

    return Promise.reject(error);
  }
);

// 封装get方法
function get(url, params) {
  return new Promise(function (resolve, reject) {
    instance
      .get(url, params)
      .then((response) => {
          resolve(response);
      })
      .catch((err) => {
        console.log("··········请求出现错误···············");
        reject("err-->",err);
      });
  });
}

// post请求
function post(url, query) {
  return new Promise(function (resolve, reject) {
    instance
      .post(url, query)
      .then((response) => {
        if (response.code == 200) {
          resolve(response);
        }
      })
      .catch((err) => {
        console.log("··········请求出现错误···············");
        reject(err);
      });
  });
}

export { post, get };
