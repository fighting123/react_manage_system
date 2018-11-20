import React from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme'  // 导入主题
// 导入所有图表（太冗余）
// import echarts from 'echarts'

// 按需加载(避免加载整个包)
import echarts from 'echarts/lib/echarts' // 核心组件都在lib下面
// 导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends React.Component{

  componentWillMount() {
    echarts.registerTheme('lightTheme', echartTheme) // 使用自定义主题
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [  // 整个数据源
        {
          name: 'ofo',
          type: 'bar',
          data: ['1000', '3000', '2000', '1000', '5000', '4000', '3000']
        }
      ]
    }
    return option
  }
  getOption2 = () => {
    let option = {
      title: {
        text: '用户订单'
      },
      legend: {
        data: ['ofo', '摩拜', '哈罗']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'ofo',
          type: 'bar',
          data: ['1000', '3000', '2000', '1000', '5000', '4000', '3000']
        },
        {
          name: '摩拜',
          type: 'bar',
          data: ['1000', '2000', '3000', '5000', '5000', '4000', '2000']
        },
        {
          name: '哈罗',
          type: 'bar',
          data: ['3000', '3000', '4000', '1000', '1000', '2000', '3000']
        }
      ]
    }
    return option
  }
  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts option={this.getOption()} theme="lightTheme" style={{height: 500}}/>
        </Card>
        <Card title="柱形图表之二">
          <ReactEcharts option={this.getOption2()} theme="lightTheme" style={{height: 500}}/>
        </Card>
      </div>
    )
  }
}