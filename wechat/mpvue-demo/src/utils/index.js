import config from '@/config'

let util = {}

const ajaxUrl = process.env.NODE_ENV === 'development'
  // 测试接口地址
  ? 'code.net.cn/api'
  // 线上接口地址
  : 'https://api.code.net.cn'

util.API = ajaxUrl
util.oauthUrl = ajaxUrl

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data: data,
      method: method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModel('添加失败', '图书已存在')
          reject(res.data)
        }
      }
    })
  })
}

// showToast 提示信息
export function showToast (text, type) {
  wx.showToast({
    title: text,
    icon: type
  })
}
export function showModel (title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  })
}

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  util
}
