import React from 'react'
import {Card, Button, Modal} from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftjs from 'draftjs-to-html';
export default class Rich extends React.Component{
  // state默认值
  state = {
    showRichText: false,
    editorState: '',
    contentState: ''
  }
  // 编辑器状态发生变化时
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  // 清空文本(清空状态即可实现)
  handleClear = () => {
    this.setState({
      editorState: ''
    })
  }
  // 获取文本
  handleGetText = () => {
    this.setState({
      showRichText: true,
      editorState: ''
    })
  }
  // 文本内容改变时
  onContentStateChange = (contentState) => {
    this.setState({
      contentState
    })
  }
  render() {
    const { editorState } = this.state
    return(
      <div>
        <Card>
          <Button type="primary" onClick={this.handleClear} style={{marginRight: '20px'}}>清空按钮</Button>
          <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title="富文本编辑区域">
          <Editor
            editorState={editorState}
            // toolbarClassName="toolbarClassName"
            // wrapperClassName="wrapperClassName"
            // editorClassName="editorClassName"
            onContentStateChange={this.onContentStateChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    )
  }
}