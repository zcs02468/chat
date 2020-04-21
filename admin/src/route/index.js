import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../page/index"
import EmailPage from "../page/email/index"
import BlogPage from "../page/blog/index"
import TextEditor from "../page/textEditor/index"
import SliderNav from "../SliderNav/SliderNav";
import Head from "../component/Head/index"
import detailPage from "../page/blog/detail/index"

function AppRouter() {
    return (
        <Router>
            {/* <ul>
                <li>
                    {" "}
                    <Link to="/">首页</Link>{" "}
                </li>
                <li>
                    <Link to="/email/">列表</Link>{" "}
                </li>
            </ul> */}
            <SliderNav />
            <div className="page-right">
                <Head />
                <div className="pageContent">
                    <Route path="/" exact component={HomePage} />
                    <Route path="/email" component={EmailPage} />
                    <Route path="/editor" component={TextEditor} />
                    <Route path="/blogList" component={BlogPage} />
                    <Route path="/detail/:id" component={detailPage} />
                </div>
            </div>
        </Router>
    );
}
export default AppRouter;
