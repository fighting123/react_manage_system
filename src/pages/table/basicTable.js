import React from 'react'
import {Card, Table, Modal, message, Button} from 'antd'
import axios from './../../Axios/index'
import Utils from './../../utils/utils'

export default class BasicTable extends React.Component {
  state = ({
    dataSource: [],
    dataSource2: []
  })
  params = {
    page: 1
  }
  componentDidMount() {
    // 静态表格数据
    const dataSource = [
      {
        key: 0,
        id: '0',
        userName: 'Jack',
        sex: '121=',
        state: '1',
        interest: '1',
        birthday: '2018-07-31',
        address: '陕西西安',
        time: '09:00'
      },
      {
        key: 1,
        id: '0',
        userName: 'Jack',
        sex: '121=',
        state: '1',
        interest: '1',
        birthday: '2018-07-31',
        address: '陕西西安',
        time: '09:00'
      },
      {
        key: 2,
        id: '0',
        userName: 'Jack',
        sex: '121=',
        state: '1',
        interest: '1',
        birthday: '2018-07-31',
        address: '陕西西安',
        time: '09:00'
      }
    ]
    this.setState({
      dataSource
    })
    // 获取动态表格数据
    this.request()
  }
  // 请求数据函数
  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then((res) => {
      if (res.code === 0) {
        // 为每一个表格数据添加索引key值
        res.result.list.forEach((item,index) => {
          item.key = index
        })
        this.setState({
          dataSource2: res.result.list,
          // 若不及时清空，会一直重复添加上传数据
          selectedRowKeys: [],
          selectedRows: null,
          // 分页控件
          pagination: Utils.pagination(res, (current) => {
            // to-do
            _this.params.page = current
            this.request()
          })
        })
      }
    })
  }
  // 单选表格的行点击事件
  onRowClick = (record, index) => {
    let selectKey = [index]
    Modal.info({
      message: '信息',
      content: `${record.userName}`
    })
    // 获取当前行的key和当前所选项
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  // 多选表格的删除事件
  handleDelete = () => {
    let rows = this.state.selectedRows
    let ids = []
    rows.forEach((item) => {
      ids.push(item.id)
    })
    Modal.confirm({
      message: '删除提示',
      content: `你确定要删除这些数据么？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功！')
        this.request()
      }
    })
  }
  render() {
    // 设置表格表头
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼1',
            '2': '咸鱼2',
            '3': '咸鱼3',
            '4': '咸鱼4',
            '5': '咸鱼5',
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(ele) {
          let config = {
            '1': '游泳1',
            '2': '跑步',
            '3': '健身',
            '4': '羽毛球',
            '5': '篮球',
          }
          return config[ele]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    const {selectedRowKeys} = this.state
    // 单选表格配置项
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    // 多选表格配置项
    const rowCheckedSelection = {
      type: 'checked',
      selectedRowKeys,
      // 选中项发生改变时
      onChange: (selectedRowKeys, selectedRows) => {
        let ids = []
        selectedRows.forEach((item) => {
          ids.push(item.id)
        })
        this.setState({
          selectedRowKeys,
          selectedIds: ids, // 方便增删改查
          selectedRows
        })
      }
    }
    return (
      <div>
        <Card title="基础表格" className="card-warp">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource}
          />
        </Card>
        <Card title="动态数据渲染表格-EasyMock" className="card-warp">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource2}
          />
        </Card>
        <Card title="单选-EasyMock" className="card-warp">
          <Table
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            onRow = {(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </Card>
        <Card title="多选-EasyMock" className="card-warp">
          <div>
            <Button onClick={this.handleDelete} style={{marginBottom: 10}}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckedSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
          />
        </Card>
      </div>
    )
  }
}