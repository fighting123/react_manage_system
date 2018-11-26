import React from 'react'
import {Card, Form, Button, message, Select, DatePicker, Table} from 'antd'
import axios from './../../Axios/index'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
const FormItem = Form.Item
const Option = Select.Option


export default class Order extends React.Component{
  state = {
    dataSource: []
  }
  params = {
    page: 1
  }
  // 表单搜索框结构
  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '1',
      width: 100,
      list: [
        {id: '0',name: '全部'},
        {id: '1',name: '北京'},
        {id: '2',name: '上海'},
        {id: '3',name: '天津'},
        {id: '4',name: '重庆'},
      ]
    },
    {
      type: 'INPUT',
      label: '模式',
      field: 'order_price',
      initialValue: '',
      placeholder: '请输入模式',
      width: 100
    },
    {
      type: '时间查询',
      field: 'time'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'state',
      placeholder: '全部',
      initialValue: '1',
      width: 100,
      list: [
        {id: '0',name: '全部'},
        {id: '1',name: '进行中'},
        {id: '2',name: '结束行程'}
      ]
    }
  ]
  // 关闭订单
  endOrderHandle = () => {
    if (!this.state.selectedItem) {
      message.warning('请先选择一个订单！')
    } else {
      message.success(`${this.state.selectedItem.order_id} 订单关闭成功！`)
      this.requestList()
    }
  }
  // 订单详情
  openOrderDetail = () => {
    if (!this.state.selectedItem) {
      message.warning('请先选择一个订单！')
      return
    }
    let urlPre = window.location.href.split('#')[0]  // 否则执行yarn deploy之后在github上访问页面跳转会出错
    window.open(`${urlPre}/#/common/order/detail/${this.state.selectedItem.order_id}`, '_blank')
  }
  // 获取接口
  requestList = () => {
    let _this = this
    axios.requestList(this, '/order-list', _this.params)
    // axios.ajax({
    //   url: '/order-list',
    //   data: {
    //     params: {
    //       page: this.params
    //     }
    //   }
    // }).then((res) => {
    //   if (res.code === 0) {
    //     // 为每一个表格数据添加索引key值
    //     res.result.list.forEach((item,index) => {
    //       item.key = index
    //     })
    //     this.setState({
    //       list: res.result.list,
    //       // 分页控件
    //       pagination: Utils.pagination(res, (current) => {
    //         // to-do
    //         _this.params.page = current
    //         this.requestList()
    //       })
    //     })
    //   }
    // })
  }
  // 单选表格的行点击事件
  onRowClick = (record, index) => {
    let selectKey = [index]
    // 获取当前行的key和当前所选项
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  componentDidMount() {
    this.requestList()
  }
  // 封装表单后的查询事件
  handleFilter = (params) => {
    this.params = params
    this.requestList()
  }
  render(){
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_id'
      },
      {
        title: '车辆编号',
        dataIndex: 'car_id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '手机号码',
        dataIndex: 'phone'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance + 'km'
        }
      },
      {
        title: '行程时长',
        dataIndex: 'total_time',
        render(total_time) {
          return `${Math.floor(total_time/3600)}时${Math.floor(total_time%3600/60)}分${total_time%3600%60}`
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          return state === 1 ? '进行中' : '结束'
        }
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
        render: Utils.formateDate
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        render: Utils.formateDate

      },
      {
        title: '订单金额',
        dataIndex: 'order_price'
      },
      {
        title: '实付金额',
        dataIndex: 'pay_price'
      }
    ]
    // 单选表格配置项

    const {selectedRowKeys} = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetail} style={{marginRight: 30}}>订单详情</Button>
          <Button type="primary" onClick={this.endOrderHandle}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            rowSelection={rowSelection}
            onRow = {(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}/>
        </div>
      </div>
    )
  }
}