import React from 'react'
import {Card, Button, Modal, Form, Input, Select, Tree, Transfer} from 'antd'
import ETable from './../../components/ETable/index'
import Utils from './../../utils/utils'
import axios from './../../Axios/index'
import menuConfig from './../../config/menuConfig'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
export default class PermissionUser extends React.Component{
  state = {}
  componentWillMount() {
    axios.requestList(this,'/role_list',{})
  }
  // 打开创建角色弹框
  handleRole = () => {
    this.setState({
      isRoleVisible:true
    })
  }
  // 角色提交
  handleRoleSubmit= () => {
    let formData = this.roleForm.props.form.getFieldsValue()
    axios.ajax({
      url: '/role/create',
      data: {
        params: formData
      }
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          isRoleVisible: false
        })
        this.roleForm.props.form.resetFields()
        axios.requestList(this,'/role_list',{})
      }
    })
  }
  // 打开权限设置弹框
  handlePermission = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        content: '请选择一个角色！'
      })
      return
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }
  // 权限设置
  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedItem.id
    data.menus = this.state.menuInfo
    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res) {
        this.setState({
          isPermVisible: false
        })
        axios.requestList(this,'/role_list',{})
      }
    })
  }
  // 打开用户授权弹框
  handleUserAuth = () => {
    let item = this.state.selectedItem // 从封装好的ETable组件拿到的项
    if (!item) {
      Modal.info({
        content: '请选择一个角色！'
      })
      return
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
    this.getRoleUserList(item.id)
  }
  // 获取用户授权的所有用户
  getRoleUserList = (id) => {
    axios.ajax({
      url: '/role/user_list',
      data: {
        params: {
          id
        }
      }
    }).then((res) => {
      if (res) {
        this.getAuthUserList(res.result)
      }
    })
  }
  // 筛选目标用户
  getAuthUserList = (data) => {
    const dataSource = []
    const targetKeys = []
    if (data && data.length > 0) {
      data.forEach((item) => {
        const obj = {
          key: item.user_id,
          title: item.user_name,
          status: item.status
        }
        if (item.status === 1) {
          targetKeys.push(obj.key)
        }
        dataSource.push(obj)
      })
    }
    this.setState({
      dataSource,
      targetKeys
    })
  }
  // 用户授权提交
  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys
    data.role_id = this.state.selectedItem.id  // 角色id和用户id都传过去
    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res) {
        this.setState({
          isUserVisible: false
        })
        axios.requestList(this,'/role_list',{})
        Modal.success({
          content: '编辑成功！'
        })
      }
    })
  }
  render() {
    const column = [
      {
        title: '角色id',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formateDate
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status === 1 ? '启用' : '停用'
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user'
      }
    ]
    return(
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole} style={{marginRight: 20}}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission} style={{marginRight: 20}}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-warp">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            columns={column}
          />
        </div>
        {/*创建角色弹框*/}
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields()
            this.setState({
              isRoleVisible: false
            })
          }}>
          <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}/>
        </Modal>
        {/*设置权限弹框*/}
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={()=>{
            this.setState({
              isPermVisible: false
            })
          }}>
          <PermEditForm
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menuInfo: checkedKeys
              })
            }}
            wrappedComponentRef={(inst)=>this.permForm=inst}>
          </PermEditForm>
        </Modal>
        {/*用户授权弹框*/}
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}
        >
          <RoleAuthForm
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            dataSource={this.state.dataSource}
            wrappedComponentRef={(inst)=>this.permForm=inst}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}>
          </RoleAuthForm>
        </Modal>
      </div>
    )
  }
}

// 创建角色弹框form表单
class RoleForm extends React.Component {
  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('role_name')(
              <Input type="text" placeholder="请输入角色名称"/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('state')(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
RoleForm = Form.create({})(RoleForm)

// 设置权限form表单
class PermEditForm extends React.Component{
  renderTreeNode = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          { this.renderTreeNode(item.children) }
        </TreeNode>
      } else {
        return <TreeNode title={item.title} key={item.key}/>
      }
    })
  }
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    const detail_info = this.props.detailInfo
    const menuInfo = this.props.menuInfo
    return(
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name}/>
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: '1'
            })(
              <Select>
                <Option value="1">启用</Option>
                <Option value="0">停用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys) => {
            this.onCheck(checkedKeys)
          }}
          checkedKeys={menuInfo}
        >
          <TreeNode
            title="平台权限"
            key="platform_all">
            {this.renderTreeNode(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}
PermEditForm = Form.create({})(PermEditForm)

// 用户授权form表单
class RoleAuthForm extends React.Component{
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }
  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys)
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    const detail_info = this.props.detailInfo
    return(
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name}/>
        </FormItem>
        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer
            listStyle={{width: 200, height: 400}}
            dataSource={this.props.dataSource}
            targetKeys={this.props.targetKeys}
            titles={['待选用户','已选用户']}
            showSearch
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption}
            render={item => item.title}
            onChange={this.handleChange}
          />
        </FormItem>
      </Form>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm)