import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../page/index"
import Header from "../components/header/index"

function AppRouter() {
    return (
        <Router>
            <div className="page-right">
                <Header />
                <div className="pageContent">
                    <Route path="/" exact component={HomePage} />
                </div>
            </div>
        </Router>
    );
}
export default AppRouter;
