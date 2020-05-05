import React, { Component } from "react";
import "./style.scss";

class Header extends Component {
    render() {
        return (
            <header id="header">
                <nav className="site-nav">
                    <ul className="menu">
                        <li className="menu-item">
                            <i className=""></i>
                            首页
                        </li>
                    </ul>
                </nav>
                <div className="header-warp">
                    <div className="header-background">
                    </div>
                    <div className="site-meta">
                        {/* <div className="site-title">LUYMM</div> */}
                        <div className="site-description">
                            <span>每个人都会有缺陷，就像被上帝咬过的苹果，有的人缺陷比较大，正是因为上帝特别喜欢他的芬芳。</span>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
