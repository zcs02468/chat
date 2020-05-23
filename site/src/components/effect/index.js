import React, { Component } from "react";
import "./style.scss";
import Snow from "./snow";

class Header extends Component {
    componentDidMount() {
        Snow();
    }
    render() {
        return (
            <div className="effect-box">
                <canvas id="Snow" width="1920" height="937"></canvas>
            </div>
        );
    }
}

export default Header;
