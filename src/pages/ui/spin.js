import React from 'react'
import {Card, Spin, Icon, Alert} from 'antd'
import './ui.less'

export default class Loadings extends React.Component{
  render() {
    const icon = <Icon type="loading" style={{ fontSize: 24 }}/>
    return(
      <div>
        <Card title="Spin用法" className="card-warp">
          <Spin size="small"></Spin>
          <Spin style={{ margin:'0 10px'}}></Spin>
          <Spin size="large"></Spin>
          <Spin indicator={icon} style={{marginLeft: 10}}></Spin>
        </Card>
        <Card title="内容遮罩" className="card-warp">
          <Alert message="Alert message title" description="Further details about the context of this alert."
                 type="info" className="setMarginBottom"/>
          <Spin>
            <Alert message="Alert message title" description="Further details about the context of this alert."
                   type="warning" className="setMarginBottom"/>
          </Spin>
          <Spin tip="加载中">
            <Alert message="Alert message title" description="Further details about the context of this alert."
                   type="warning" className="setMarginBottom"/>
          </Spin>
          <Spin indicator={icon}>
            <Alert message="Alert message title" description="Further details about the context of this alert."
                   type="warning" className="setMarginBottom"/>
          </Spin>
        </Card>
      </div>
    )
  }
}