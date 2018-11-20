import React from 'react'
import { withRouter } from 'react-router-dom';
import {Form, Input, Button, message, Icon, Checkbox} from 'antd'
const FromItem = Form.Item
class Login extends React.Component{
  handleSubmit = () => {
    // 获取所有表单内容
    let userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err,values) => {
      if (!err) {
        message.success(`${userInfo.userName}恭喜你登录成功！当前密码为：${userInfo.passWord}`)
        this.props.history.push('/home');
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;

    return (
      <Form style={{width: 300, margin: '300px auto'}}>
        <FromItem>
          {
            getFieldDecorator('userName', {
              initialValue: 'Jack',
              rules: [
                {
                  required: true,
                  message: '用户名不能为空！'
                },
                {
                  min: 1,
                  max: 10,
                  message: '长度不在范围内！'
                },
                {
                  pattern: /^\w/g,
                  message: '用户名必须为数字、英文字母！'
                },
                {
                  pattern: new RegExp('^\\w+$','g'),
                  message: '用户名必须为数字、英文字母！'
                }
              ]
            })(
              <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
            )
          }
        </FromItem>
        <FromItem>
          {
            getFieldDecorator('passWord', {
              initialValue: '111',
              rules: []
            })(
              <Input  prefix={<Icon type="lock"/>} placeholder="请输入用密码"/>
            )
          }
        </FromItem>
        <FromItem>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>记住密码</Checkbox>
            )
          }
          <a href="#" style={{float: 'right'}}>忘记密码</a>
        </FromItem>
        <FromItem>
          <Button type="primary" onClick={this.handleSubmit} style={{width: '100%'}}>登录</Button>
        </FromItem>
      </Form>
    )
  }
}
// 导出一个被加工过的页面
export default Form.create()(withRouter(Login))