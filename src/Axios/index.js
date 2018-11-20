import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from '../utils/utils'
export default class Axios{
  // 获取天气所需
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status === 'success') {
          resolve(response)
        } else {
          reject(response.message)
        }
      })
    })
  }
  // 订单请求列表封装（针对于表单查询，处理一些业务列表）
  static requestList(_this, url, params) {
    var data = {
      params
    }
    this.ajax({   // 还是要调用公共机制axios方法
      url,
      data
    }).then((data) => {
      if (data && data.result) {
        // 为每一个表格数据添加索引key值
        data.result.list.forEach((item, index) => {
          item.key = index
        })
        _this.setState({
          list: data.result.list,
          // 分页控件
          pagination: Utils.pagination(data, (current) => {
            // to-do
            _this.params.page = current
            _this.requestList()
          })
        })
      }
    })
  }
  // 请求插件的封装(不对业务代码处理，只用于拦截)
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    let baseApi = `https://www.easy-mock.com/mock/5b6008d30ff99f7416589793/manageapi`
    return new Promise((resolve, reject) => {
      axios({
        url: baseApi + options.url,
        methods: 'get',
        baseUrl: baseApi,
        timeout: 10000,
        params: (options.data && options.data.params) || ''
      }).then((res) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (res.status === 200){
          // 后台接口从业务层面定义的成功的标志
          if (res.data.code === 0) {
            resolve(res.data)
          } else {
            Modal.info({
              content: res.data.message,
              title: '提示'
            })
          }
        } else {
          reject(res.data)
        }
      })
    })
  }
}