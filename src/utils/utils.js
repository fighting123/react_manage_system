import React from 'react'
import {Select} from 'antd'
const Option = Select.Option
export default {
  formateDate(time) {
    if (!time) return;
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth()+1)+ '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  },
  // 分页
  // 当点击下一页的时候出发callback
  // page这个对象的内容与远pagination组件一致
  pagination(data, callback) {
    return {
      // current是当前第几页
      onChange: (current) => {
        callback(current)
      },
      // 接收当前页码
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `共${data.result.total}条`
      },
      showQuickJumper: true,
    }
  },
  // 循环生成表单查询组件的option
  getOptionList(data) {
    if (!data) {
      return []
    }
    let options = []
    data.forEach((item) => {
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options
  },
  /**
   * ETable 行点击通用函数
   * @param {*选中行的索引} selectedRowKeys
   * @param {*选中行对象} selectedItem
   */
  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  }
}