import React,{Component} from "react"
import axios from "axios";
import "./style.scss"
import Prism from "prismjs"
import { message, Button, Modal, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';
// import 'braft-editor/dist/output.css'
// import 'braft-extensions/dist/code-highlighter.css'
const { Dragger } = Upload;
class BlogPage extends Component {
    state= {
        title: "",
        outputContent : "",
        visible: false
    }
    handleOk = ()=> {
        console.log('确认事件');
        this.setState({
            visible: false
        })
    }
    handleCancel = ()=> {
        console.log('取消事件');
        this.setState({
            visible: false
        })
        
    }
    publishBlog = ()=> {
        const id = this.props.match.params.id
        console.log('is', id);
        this.setState({
            visible: true
        })
    }
    render() {
        const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info) {
              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
        };

        return (
            <div className="detail-page-box">
                
                <div className="blog-head">
                    <Button type="primary" onClick={this.publishBlog}>发布</Button>
                </div>
                <div className="content-page">
                    <div className="content-box">
                        <h1>{this.state.title}</h1>
                        <div className="before-highlight" dangerouslySetInnerHTML={{__html: this.state.outputContent}}></div>
                    </div>
                </div>
                <Modal
                    title="Basic Modal"
                    centered
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                        >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Modal>
            </div>
        )
    }
    componentDidMount(){
        console.log(this.props.match,'博客详情页博客详情页博客详情页')
        const id = this.props.match.params.id
        axios.get('/api/blog/getPointBlog',{
            params:{
                id: id,
            }
        }).then((res)=>{
            let data = res.data.data;
            let htmlContent = data.htmlContent
            this.setState({
                outputContent: htmlContent,
                title: data.title,
            });
            Prism.hooks.add('before-highlight', function(env) {
                env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g,'\n');
                env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/,'');
            });
        })
        .catch((error)=>{console.log('axios 获取数据失败'+error)})
    }
}

export default BlogPage;