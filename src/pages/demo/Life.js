import React from 'react'
import Child from './Child'
import {Button} from 'antd' // 需要结构赋值的方式引入
import './index.less'
// import 'antd/dist/antd.css'

export default class Life extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handleAdd = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return <div className="content" style={{padding: 50}}>
      <p>React生命周期介绍</p>
      <Button onClick={this.handleAdd}>点击一下</Button>
      <button onClick={this.handleAdd}>点击一下</button>
      <p>{this.state.count}</p>
      <Child name={this.state.count}></Child>
    </div>
  }
}