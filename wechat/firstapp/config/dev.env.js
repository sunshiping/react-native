var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_BASE_URL: 'http://127.0.0.1:8080/api'  //配置开发环境地址
})
// const baseURL = process.env.API_BASE_URL
// wx.request({ url: `${baseURL}/products` })
