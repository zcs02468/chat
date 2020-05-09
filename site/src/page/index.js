import React, { Component } from "react";
import { Card, List } from "antd";
import axios from "axios";
import "./style.scss";
import { Link } from "react-router-dom";

class BlogPage extends Component {
    constructor() {
        super();
        this.getPointBlogList();
    }
    state = {
        list: [],
        count: 0,
    };
    getPointBlogList = (params = {}) => {
        let { page = 1, pageSize = 10 } = params;
        axios
            .get("/api/blog/getBlogList", {
                params: {
                    page: page,
                    pageSize: pageSize,
                },
            })
            .then((res) => {
                console.log("res", res.data.data);
                const data = res.data.data;
                this.setState({
                    list: data.list,
                    count: data.count,
                });
                console.log();
            })
            .catch((error) => {
                console.log("axios 获取数据失败" + error);
            });
    };

    render() {
        return (
            <div className="blog-page">
                <div className="blog-head">头部区域</div>
                <div className="blog-content">
                    <List
                        rowKey="id"
                        split={false}
                        className="list-box"
                        dataSource={this.state.list}
                        renderItem={(item) => (
                            <List.Item>
                                <Link to={`/detail/${item._id}`}>
                                    <Card className="card-box" style={{ width: 928 }}>
                                        <div className="imgBox">
                                            {/* <img alt={item.title} src={item.cover} /> */}
                                            <img alt={item.title} src="https://cdn.zrahh.com:4433/usr/uploads/2019/06/1326502380.jpg" />
                                        </div>
                                        <div className="card-content">
                                            <h2>{item.title}</h2>
                                        </div>
                                        <div></div>
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default BlogPage;
