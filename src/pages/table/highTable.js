import React from 'react'
import {Card, Table, Badge, Modal, message, Button} from 'antd'
import axios from './../../Axios/index'
const { Column } = Table;

export default class HighTable extends React.Component{
  state = ({
    dataSource: [],
    dataSource2: []
  })
  params = {
    page: 1
  }
  // 请求数据函数
  request = () => {
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
        res.result.list.map((item,index) => {
          item.key = index
        })
        this.setState({
          dataSource: res.result.list
        })
      }
    })
  }
  request2 = () => {
    axios.ajax({
      url: '/table/listmore',
      data: {
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then((res) => {
      if (res.code === 0) {
        // 为每一个表格数据添加索引key值
        res.result.list.map((item,index) => {
          item.key = index
        })
        this.setState({
          dataSource: res.result.list
        })
      }
    })
  }
  componentDidMount() {
    this.request()
    this.request2()
  }
  handleChange = (pagination,filters,sorter) => {
    this.setState({
      sortOrder:sorter.order
    })
  }
  handleDelete  = (item) => {
    let id = item.id
    Modal.confirm({
      title: '确认',
      content: '确认删除此条数据么？',
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
        dataIndex: 'id',
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
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
        width: 120,
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
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        width: 80
      }
    ]
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: this.state.sortOrder
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
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      }
    ]
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: this.state.sortOrder
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
            '1': <Badge status="success" text="成功"/>,
            '2': <Badge status="error" text="报错"/>,
            '3': <Badge status="default" text="正常"/>,
            '4': <Badge status="processing" text="进行中"/>,
            '5': <Badge status="warning" text="警告"/>,
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(ele) {
          let config = {
            '1': '游泳',
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
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      },
      {
        title: '操作',
        render: (text,item) => {
          return <Button size="small" onClick={() => {this.handleDelete(item)}}>删除</Button>
        }
      }
    ]
    return (
      <div>
        <Card title="基础表格" className="card-warp">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={this.state.dataSource}
            scroll={{y:240}}
          />
        </Card>
        <Card title="左侧固定" className="card-warp">
          <Table
            bordered
            pagination={false}
            dataSource={this.state.dataSource}
            scroll={{x:3600}}
          >
            <Column
              title="id"
              dataIndex="id"
              key="id"
              fixed="left"
              width="120"
            />
            <Column
              title="userName"
              dataIndex="userName"
              key="userName"
              fixed="left"
              width="120"
            />
            <Column
              title="userName1"
              dataIndex="userName1"
              key="userName1"
              width="120"
            />
            <Column
              title="userName2"
              dataIndex="userName2"
              key="userName2"
              width="120"
            />
            <Column
              title="userName3"
              dataIndex="userName3"
              key="userName3"
              width="120"
            />
            <Column
              title="userName4"
              dataIndex="userName4"
              key="userName4"
              width="120"
            />
            <Column
              title="userName5"
              dataIndex="userName5"
              key="userName5"
              width="120"
            />
            <Column
              title="sex"
              dataIndex="sex"
              key="sex"
              width="120"
            />
            <Column
              title="state"
              dataIndex="state"
              key="state"
              width="120"
            />
            <Column
              title="interest"
              dataIndex="interest"
              key="interest"
              width="120"
            />
            <Column
              title="address"
              dataIndex="address"
              key="address"
              width="120"
            />
            <Column
              title="time"
              dataIndex="time"
              key="time"
              fixed="right"
              width="120"
            />
            <Column
              title="birthday"
              dataIndex="birthday"
              key="birthday"
              fixed="right"
              width="120"
            />
          </Table>
        </Card>
        <Card title="排序表格" className="card-warp">
          <Table
            bordered
            pagination={false}
            columns={columns2}
            dataSource={this.state.dataSource}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作按钮" className="card-warp">
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
          />
        </Card>
      </div>
    )
  }
}