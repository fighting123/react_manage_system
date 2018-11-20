import React from 'react'
import{Card, Button, Table, Form, Select, Modal, message} from 'antd'
import axios from './../../Axios/index'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option

export default class City extends React.Component{
  state = {
    dataSource: [],
    // 开通城市弹框显示
    isShowOpenCity: false
  }
  params = {
    page: 1
  }
  // 开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }
  // 开通城市提交
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue()
    axios.ajax({
      url: '/city/open',
      data: {
        params:cityInfo
      }
    }).then((res) => {
      if (res.code ===0) {
        message.success(res.result)
        this.setState({
          isShowOpenCity: false
        })
        this.requestList()
      }
    })
  }
  requestList = () => {
    let _this = this
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res) => {
      if (res.code === 0) {
        // 为每一个表格数据添加索引key值
        res.result.list.forEach((item,index) => {
          item.key = index
        })
        this.setState({
          list: res.result.list,
          // 分页控件
          pagination: Utils.pagination(res, (current) => {
            // to-do
            _this.params.page = current
            this.requestList()
          })
        })
      }
    })
  }
  componentDidMount() {
    this.requestList()
  }
  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode === 1 ? '停车点' : '禁停区'
        }
      },
      {
        title: '运营模式',
        dataIndex: 'op_mode',
        render(mode) {
          return mode === 1 ? '自营' : '加盟'
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map((item) => {
            return item.user_name
          }).join(',')
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        render: Utils.formateDate

      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table
          bordered
          columns={columns}
          dataSource={this.state.list}
          pagination={this.state.pagination}/>
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {this.setState({isShowOpenCity: false})}}
          onOk={this.handleSubmit}>
          <OpenCityForm wrappedComponentRef={(inst) => {
            this.cityForm = inst
          }}/>
        </Modal>
      </div>
    )
  }
}

// 过滤条件
class FilterForm extends React.Component{
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {
            getFieldDecorator('userName')(
              <Select placeholder="全部" style={{width: '100px'}}>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
                <Option value="3">深圳市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式">
          {
            getFieldDecorator('mode')(
              <Select placeholder="全部" style={{width: '150px'}}>
                <Option value="">全部</Option>
                <Option value="1">指定停车点模式</Option>
                <Option value="2">禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="运营模式">
          {
            getFieldDecorator('op_mode')(
              <Select placeholder="全部" style={{width: '100px'}}>
                <Option value="">全部</Option>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="加盟商的授权状态">
          {
            getFieldDecorator('op_mode')(
              <Select placeholder="全部" style={{width: '100px'}}>
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
     </Form>
    )
  }
}
FilterForm = Form.create()(FilterForm)

// 开通城市弹框
class OpenCityForm extends React.Component{
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const { getFieldDecorator }  = this.props.form
    return (
      <Form>
        <FormItem label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: "1"
            })(
              <Select style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="运营模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: "1"
            })(
              <Select style={{width: 100}}>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: "1"
            })(
              <Select style={{width: 120}}>
                <Option value="1">指定停车点</Option>
                <Option value="2">禁停区</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
OpenCityForm = Form.create()(OpenCityForm)