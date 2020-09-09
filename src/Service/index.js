import axios from 'axios'
import qs from 'querystring'

export default class Api {

  //根据所处环境不同选择不同的基础 URL
  static getBaseUrl(){
    console.log(process.env.NODE_ENV)
    const env = process.env.NODE_ENV
    let baseUrl = ""
    //开发环境
    if(env === 'development'){
      // baseUrl = "http://127.0.0.1:9536/"
      // Easy Mock 模仿的后台接口
      baseUrl = "https://easy-mock.com/mock/5f587209d5906660c22dae2e/personal/"
    }
    //生成环境
    if(env === 'production'){
      baseUrl = "http://127.0.0.1:8080/"
    }
    return baseUrl
  }

  //get请求时，分割参数拼接到url后面
  static getQueryString(url,query){
    let str = []
    for(let key in query){
      str.push(key + "=" + query[key])
    }
    let paramStr = str.join("&")
    return paramStr ? `${url}?${paramStr}` : url
  }

  //get请求
  static get(url, params){
    const baseUrl = this.getBaseUrl()
    let token = localStorage.getItem("token")
    let res = {}
    return axios({
      method: "GET",
      url: this.getQueryString(url,params),
      data: null,
      baseURL: baseUrl,
      timeout: 10000,
      headers: { Token: token },
      withCredentials: false  //跨域请求时是否需要凭证
    }).then((result)=>{
      res.rtncod = "success"
      res.data = result.data
      return res
    }).catch((err)=>{
      res.rtncod = "error"
      res.msg = err
      return res
    })
  }

  //post请求
  static post(url, params){
    const baseUrl = this.getBaseUrl()
    let token = ""
    let res = {}
    if(url !== "login"){    //登录时token还未生成
      token = localStorage.getItem("token")
    }
    return axios({
      method: "POST",
      url: url,
      data: qs.stringify(params),
      baseURL: baseUrl,
      timeout: 10000,
      headers: { Token: token },
      withCredentials: false  //跨域请求时是否需要凭证
    }).then((result)=>{
      res.rtncod = "success"
      res.data = result.data
      return res
    }).catch((err)=>{
      res.rtncod = "error"
      res.msg = err
      return res
    })
  }
}