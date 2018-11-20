import React from 'react'
import {Card, Tabs, message, Icon} from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;
export default class Tab extends React.Component {
  newTabIndex = 0;
  callback = (key) => {
    message.info("Hi,您选择了页签:" + key)
  }
  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  componentWillMount() {
    const panes = [
      {
        title: "tab 1",
        content: "tab 1",
        key: "1"
      },
      {
        title: "tab 2",
        content: "tab 2",
        key: "2"
      },
      {
        title: "tab 3",
        content: "tab 3",
        key: "3"
      }
    ]
    this.setState({
      panes,
      activeKey: panes[0].key
    })
  }
  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">content of tab pane 1</TabPane>
            <TabPane tab="Tab 2" key="2" disabled>content of tab pane 2</TabPane>
            <TabPane tab="Tab 3" key="3">content of tab pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图标页签" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={<span><Icon type="plus"/>tab 1</span>} key="1">content of tab pane 1</TabPane>
            <TabPane tab={<span><Icon type="edit"/>tab 2</span>} key="2">content of tab pane 2</TabPane>
            <TabPane tab={<span><Icon type="delete"/>tab 3</span>} key="3">content of tab pane 3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab可关闭卡片式页签" className="card-warp">
          <Tabs
            type="editable-card"
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            onEdit={this.onEdit}>
            {
              this.state.panes.map((item) => {
                return (<TabPane tab={item.title} key={item.key}>item.content</TabPane>)
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}