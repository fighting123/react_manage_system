import React from 'react'
import {Card, Form, Button, Input, Checkbox, InputNumber, Radio, Select,Switch,DatePicker,TimePicker,Icon,message,Upload} from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class FormRegister extends React.Component{
  state = {
    loading: false,
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  handleSubmit = () => {
// 获取所有表单内容
    let userInfo = this.props.form.getFieldsValue()
    this.props.form.validateFields((err,values) => {
      if (!err) {
        message.success(`${userInfo.userName}恭喜你注册成功！`)
      }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 20
      }
    }
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    }
    const rowObject= {
      minRows: 4,
      maxRows: 6
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal" style={{width: 600}}>
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空！'
                    },
                    {
                      min: 5,
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
                  <Input placeholder="请输入用户名"/>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('passWord', {
                  initialValue: '',
                  rules: []
                })(
                  <Input type="password" placeholder="请输入用密码"/>
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex',{
                  initialValue: '1'
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18'
                })(
                  (
                    <InputNumber/>
                  )
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="1">咸鱼一号</Option>
                    <Option value="2">咸鱼二号</Option>
                    <Option value="3">咸鱼三号</Option>
                    <Option value="4">咸鱼四号</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: ['1', '3', '7']
                })(
                  <Select mode="multiple">
                    <Option value="1">游泳</Option>
                    <Option value="2">跑步</Option>
                    <Option value="3">羽毛球</Option>
                    <Option value="4">舞蹈</Option>
                    <Option value="5">篮球</Option>
                    <Option value="6">竞走</Option>
                    <Option value="7">骑马</Option>
                    <Option value="8">马拉松</Option>
                    <Option value="9">唱歌</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Switch/>
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birth', {
                  initialValue: moment('2018-07-31')
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD"/>
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: ''
                })(
                 <TextArea
                   autosize = {rowObject}/>
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('time')(
                 <TimePicker/>
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    onChange={this.handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('xieyi')(
                  <Checkbox>我已阅读过
                    <a href="#">协议</a>
                  </Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('submit')(
                  <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    )
}
}
// 导出一个被加工过的页面
export default Form.create()(FormRegister)