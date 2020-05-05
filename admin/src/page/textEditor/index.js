

import React from 'react'
import { message } from "antd";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import axios from "axios";
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import HeaderId from 'braft-extensions/dist/header-id'
import "./style.scss"
BraftEditor.use(CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
}))

BraftEditor.use(HeaderId())
export default class EditorDemo extends React.Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null),
        title: '',
        id: ''
    }

    async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        const htmlContent = ''
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
    }
    titleChange(e) {
        console.log('e.target.value',e.target.value);
        this.setState({
            title: e.target.value
        })
        
    }
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML();
        const rawContent = this.state.editorState.toRAW();
        const obj = {
            id: this.state.id,
            title: this.state.title,
            rawContent: rawContent,
            htmlContent: htmlContent,
            
        }
        axios.post('/api/blog/saveBlog',obj)
        .then((res) => {
            if( this.state.id === '' ) {
                this.setState({
                    id: res.data.data
                })
                message.success('数据保存成功');
            }else {
                message.success('数据更新成功');
            }
        }).catch(err=> {
            this.setState({
                confirmLoading: false,
            });
            message.error('数据保存失败');
        })
        // const result = await saveEditorContent(htmlContent)
    }


    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    render () {

        const { editorState } = this.state
        return (
            <div className="my-component editor-container">
                <div className="title-box">
                    <div className="title">
                        <textarea rows="1" maxLength="128" placeholder="请输入标题" value={this.state.title} onChange ={this.titleChange.bind(this) }></textarea>
                    </div>
                </div>
                <div className="editor-box">
                    <BraftEditor
                        value={editorState}
                        onChange={this.handleEditorChange}
                        onSave={this.submitContent}
                        id="editor-with-code-highlighter"
                    />
                </div>
            </div>
        )

    }

}