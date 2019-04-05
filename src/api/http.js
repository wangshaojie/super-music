import axios from 'axios'
// 创建axios实例
var instance = axios.create({timeout: 1000 * 12})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance