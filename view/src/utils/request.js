//axios的封装处理
import axios from "axios";

//1.根域名配置
//2.超时时间
//3.请求拦截器/响应拦截器
const request = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 5000
})


export { request }