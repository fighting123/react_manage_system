import React from 'react'
import {Row, Col, Modal} from 'antd'
import { withRouter } from 'react-router-dom'
import Util from '../../utils/utils'
import axios from '../../Axios'
import { connect } from 'react-redux'
import './index.less'
class Header extends React.Component{
  state = {}
  componentWillMount() {
    this.setState({
      userName: 'huog'
    })
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({
        sysTime
      })
    },1000)
    this.getWeatherAPIData()
  }
  getWeatherAPIData() {
    let city = '西安'
    axios.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=RZnjwNlhySfIkdNIljxdq8yY`
    }).then((res) => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0]
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather,
        })
      }
    })
  }
  handleLoginOut = (type) => {
    let _this = this
    Modal[type]({
      content: '确定退出系统么？',
      onOk(){
        _this.props.history.push('/login');
      },
      onCancel(){
      }
    })
  }
  render() {
    const menuType = this.props.menuType
    return(
      <div className="header">
        <Row className="header-top">
          {
            menuType ? <Col span="6" className="logo">
              <img src="/assets/logo-ant.svg" alt=""/>
              <span>通用管理系统</span>
            </Col> : ''
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a onClick={() => {this.handleLoginOut('confirm')}}>退出</a>
          </Col>
        </Row>
        {/*如果没有这个参数则说明是通用页面的头部，不需要显示面包屑*/}
        {
          menuType ? '' : <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              {this.props.menuName}
            </Col>
            <Col span="20" className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-pic">
              <img src={this.state.dayPictureUrl} alt=""/>
            </span>
              <span className="weather-detail">{this.state.weather}</span>
            </Col>
          </Row>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(withRouter(Header))  // 连接