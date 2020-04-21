import React, { Component } from "react";
import { Menu } from "antd";
import IconFont from "../component/IconFont/index";
import "./SliderNav.css";
import { Link, withRouter }  from 'react-router-dom'
// const location = useLocation();

// console.log(location,'location'  );

class SliderNav extends Component {
    // constructor(props) {
    //     super();
        
    // }


    handleClick = (e) => {
        console.log("click ", e);
    };
    state = {
        navList: [
            {
                name: "首页",
                icon: "icon-mode",
                key: "/"
            },
            {
                name: "邮件订阅管理",
                icon: "icon-email",
                key: "/email"
            },
            {
                name: "博客管理",
                icon: "icon-email",
                key: "/blogList"
            },
            {
                name: "博客编辑",
                icon: "icon-email",
                key: "/editor"
            },
            {
                name: "博客详情页",
                icon: "icon-email",
                key: "/detail/5e9d5ad0427c712e1ccec093"
            },
        ]
    };

    render() {
        return (
                <div className="nav-box">
                    <Menu 
                        onClick={this.handleClick} 
                        style={{ width: 256 }} 
                        mode="inline" 
                        defaultSelectedKeys="/"
                        selectedKeys={[this.props.history.location.pathname]} 
                        className="nav">
                        {this.state.navList.map((item, index) => {
                            return (
                                <Menu.Item key={item.key}>
                                    <Link to={item.key}>
                                        <IconFont type={item.icon} />
                                        <span>{item.name}</span>
                                    </Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </div>
        );
    }
}

export default withRouter(SliderNav);
