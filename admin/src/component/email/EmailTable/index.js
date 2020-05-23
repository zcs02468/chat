import React, { Component } from "react";
import { Table, Tag, Pagination } from "antd";
import moment from "moment";
import axios from "axios";
import "./style.css"

class EmailTable extends Component {
    state = {
        data:[],
        count: 10,
    }
    columns = [
        {
            title: "接收者邮箱地址",
            dataIndex: "toEmail",
        },
        {
            title: "发送时间",
            dataIndex: "fromTime",
        },
        {
            title:"创建时间",
            dataIndex: "createTime",
            render: val => {
                return val ? moment(Number(val)).format('YYYY-MM-DD HH:mm:ss') : ''
            }
        },
        {
            title: "是否放入公开信箱",
            dataIndex: "open",
            render: val => {
                return val ? "是" : "否"
            }
        },
        {
            title: '状态',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {
                        tags == 0 ? <Tag color="processing">未发送</Tag> : ( tags == 1 ? <Tag color="green">已发送</Tag> : <Tag color="error">发送失败</Tag>)
                    }
                </span>
            ),
        },
    ];
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
        },
        getCheckboxProps: (record) => ({
            name: record.name,
        }),
    }
    
    getPointEmailList=(params = {})=> {
        let {page = 1,pageSize = 10} = params;
        axios.get('/api/email/getEmailList',{
            params:{
                page: page,
                pageSize: pageSize
            }
        }).then((res)=>{
            console.log('res', res.data.data);
            const data = res.data.data;
            this.setState({
                data: data.list,
                count: data.count
            })
        })
        .catch((error)=>{console.log('axios 获取数据失败'+error)})
    }

    paginationOnChange = (page) => {
        this.getPointEmailList({
            page: page,
            pageSize: 10
        })
        
    }

    componentDidMount = ()=>{
        this.getPointEmailList()
    }
    render() {
        const rowSelection = this.rowSelection
        const data = this.state.data
        return(
            <div className="email-table">
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    bordered
                    columns={this.columns}
                    dataSource={data}
                    pagination={false}
                ></Table>
                <div className="pagination-box">
                    <Pagination defaultCurrent={1} total={this.state.count} onChange={this.paginationOnChange}/>
                </div>
            </div>
        )
    }
}


export default EmailTable;
