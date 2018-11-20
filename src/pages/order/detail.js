import React from 'react'
import {Card} from 'antd'
import './detail.less'
import axios from './../../Axios/index'

export default class Detail extends React.Component{
  state = {}

  componentDidMount() {
    // 取路由参数
    let orderId = this.props.match.params.orderId
    if (orderId) {
      this.getDetailInfo(orderId)
    }
  }

  getDetailInfo = (orderId) => {
    axios.ajax({
      url: '/order/detail',
      data: {
        params: {
          orderId
        }
      }
    }).then((res) => {
      if (res.code ===0) {
        this.setState({
          orderInfo: res.result
        })
        this.renderMap(res.result)
      }
    })
  }

  renderMap = (result) => {
    this.map = new window.BMap.Map('orderDetailMap')
    // this.map.centerAndZoom('北京', 11)
    // 添加地图控件
    this.addMapControl()
    // 调用路线图绘制方法
    this.drawBikeRoute(result.position_list)
    // 绘制服务区
    this.drawServiceArea(result.area)
  }
  // 添加地图空控件
  addMapControl = () => {
    let map = this.map
    map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))
    map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))

  }
  // 绘制路线图
  drawBikeRoute = (positionList) => {
    let map = this.map
    // 起始点
    let startPoint = ''
    let endPoint = ''
    if (positionList.length > 0) {
      // 起点坐标
      let first = positionList[0]
      // 终点坐标
      let last = positionList[positionList.length - 1]
      // 起点
      // 必须以对象的格式传入
      startPoint = new window.BMap.Point(first.lon,first.lat)
      let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42),{
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      })
      let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon})
      map.addOverlay(startMarker);
      // 终点
      endPoint = new window.BMap.Point(last.lon,last.lat)
      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42),{
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      })
      let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon})
      // 所有对象都通过addOverlay来添加
      map.addOverlay(endMarker);

      // 连接路线图
      let tractPoint = []
      for(let i=0;i<positionList.length;i++) {
        let Point = positionList[i]
        tractPoint.push(new window.BMap.Point(Point.lon, Point.lat))
      }

      let polyLine = new window.BMap.Polyline(tractPoint, {
        strokeColor: '#1869AD',
        strokeWeight: 3,
        strokeOpacity: 1
      })
      map.addOverlay(polyLine)

      // 地图视野中心点
      map.centerAndZoom(endPoint, 11)
    }
  }
  drawServiceArea = (area_list) => {
    let map = this.map
    // 绘制服务区（多边形）
    let tractPoint = []
    for(let i=0;i<area_list.length;i++) {
      let Point = area_list[i]
      tractPoint.push(new window.BMap.Point(Point.lon, Point.lat))
    }
    let polygon = new window.BMap.Polygon(tractPoint,{
      strokeColor: '#CE0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.4
    })
    map.addOverlay(polygon)
  }

  render () {
    const info = this.state.orderInfo || {}
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{info.mode === 1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程重点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程里程</div>
                <div className="detail-form-content">{info.distance/1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}