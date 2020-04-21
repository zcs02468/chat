import React,{Component} from "react"
import axios from "axios";
import "./style.scss"
import Prism from "prismjs"
// import 'braft-editor/dist/output.css'
// import 'braft-extensions/dist/code-highlighter.css'

class BlogPage extends Component {
    state= {
        title: "",
        outputContent : ""
    }
    render() {
        return (
            <div className="detail-page-box">
                <div>博客详情页</div>
                <div className="content-page">
                    <div className="content-box">
                        <h1>{this.state.title}</h1>
                        <div className="before-highlight" dangerouslySetInnerHTML={{__html: this.state.outputContent}}></div>
                    </div>
                </div>
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