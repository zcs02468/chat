import React, { Component } from "react";
import EmailTable from "../../component/email/EmailTable/index"
import EmailSearch from "../../component/email/EmailSearch/index"
// import TimeRelatedForm from "../../component/email/index"
import "./style.css"

class EmailPage extends Component {
    render() {
        return (
            <div className="email-page">
                <EmailSearch />
                <EmailTable />
                {/* <TimeRelatedForm /> */}
            </div>
        )
    }
}

export default EmailPage;
// import React,{Component} from "react"

// class Email extends Component {
//     render() {
//         return (
//             <div className="emailPage">
//                 <div className="top-Search">头部搜索区域</div>

//             </div>
//         )
//     }
// }

// export default Email;
