import React from 'react'
import './index.less'
import menuList from './../../config/menuConfig'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component{
  state = {
    currentKey: ''
  }
  handleClick = ({ item, key }) => {
    const { dispatch } = this.props  // 获得dispatch分发事件方法
    dispatch(switchMenu(item.props.children.props.children)) // 拿到title
    this.setState({
      currentKey: key    // 设置选中
    })
  }
  componentWillMount() {
    const menuTreeNode =  this.renderMenu(menuList);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
    this.setState({
      menuTreeNode,
      currentKey
    })
  }
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }
  render() {
    return(
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>HUOG</h1>
        </div>
        <Menu
          onClick={({ item, key, keyPath }) => {this.handleClick({ item, key, keyPath })}}
          selectedKeys={[this.state.currentKey]}
          theme="dark">
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default connect()(NavLeft)