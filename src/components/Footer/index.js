import React from 'react'
import './index.less'

export default class Footer extends React.Component{
  render() {
    return(
      <div className="footer">
        <span>React-Admin ©{new Date().getFullYear()} Created by 1102194607@qq.com</span>
      </div>
    )
  }
}