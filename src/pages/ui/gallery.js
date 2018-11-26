import React from 'react'
import {Card, Row, Col, Modal} from 'antd'
import './ui.less'
const { Meta } = Card;

export default class Galley extends React.Component {

  openGallery = (item) => {
    this.setState({
      visible: true,
      imgSrc: 'gallery/' + item
    })
  }
  state = {
    visible: false
  }
  render() {
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ]
    const imgList = imgs.map((subList) => subList.map((item) =>
      <Card
        hoverable
        cover={<img src={'gallery/' + item} alt=""/>}
        key={item}
        onClick={() => this.openGallery(item)}
        style={{marginBottom: 24}}>
        <Meta
          title="Europe Street beat"
          description="www.instagram.com"
        />
      </Card>
    ))
    return (
      <div>
        <div className="card-warp">
          <Row gutter={24}>
            {
              imgList.map((item, index) => <Col md={4} key={index}>{item}</Col>
            )}
          </Row>
          <Modal
            visible={this.state.visible}
            onCancel={() => {
              this.setState({
                visible: false
              })
            }}
            title="图片画廊"
            footer={null}
            width={400}>
            {<img src={this.state.imgSrc} alt="" style={{width: '100%'}}/>}
          </Modal>
        </div>
      </div>
    )
  }
}