import React, { Component } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, message  } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.css";
const { Option } = Select;

class EmailSearch extends Component {
    formRef = React.createRef();
    constructor(props) {
        super()
    }
    
    state = {
        ModalText: "Content of the modal",
        visible: false,
        confirmLoading: false,
        layout: {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        },
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        console.log('this.formRef.current.submit()',this.formRef.current.submit());
        
        // console.log('this.formRef.current.submit()',this.formRef.current.submit());
        // axios.post('http://127.0.0.1:7000/api/email/createTimingEmail',{
        // console.log('this.props.form',this.formRef.current.submit());
        
        
        // form.submit();
        // const [form] = Form.useForm();
        // form.validateFields().then(values => {
        //   form.resetFields();
        //   console.log( values,'#########' );
        
        // //   onCreate(values);
        // })
        // .catch(info => {
        //   console.log('Validate Failed:', info);
        // });
        // setTimeout(() => {
        //     this.setState({
        //         visible: false,
        //         confirmLoading: false,
        //     });
        // }, 2000);
    };

    handleCancel = () => {
        console.log("Clicked cancel button");
        this.setState({
            visible: false,
        });
    };
    onFinish = (fieldsValue) => {
        this.setState({
            confirmLoading: true,
        });
        console.log("Success:", fieldsValue);
        console.log(fieldsValue['fromTime'].format('YYYY-MM-DD HH:mm:ss') );
        console.log('Received values of form: ', fieldsValue);
        const obj = {
            fromName: fieldsValue.fromName,
            subject: fieldsValue.subject,
            toEmail: fieldsValue.toEmail,
            fromTime: fieldsValue['fromTime'].format('YYYY-MM-DD HH:mm:ss'),
            fromFrequency: fieldsValue.fromFrequency,
        }
        // for (let i = 0; i < 20; i++) {
        //     const obj = {
        //         fromName: `${i}aa`,
        //         subject: `主题${i}`,
        //         toEmail: `${i}@qq.com`,
        //         fromTime: '2020-04-16 15:13:54',
        //         fromFrequency: 'once',
        //     }
            axios.post('/api/email/createTimingEmail',obj)
            .then((res) => {
                message.success('数据保存成功');
            }).catch(err=> {
                message.error('数据保存失败');
            })
            
        // }

    };
    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    // handleChange =(value) => {
    //     console.log( '选择框', value );
        
    // }
    render() {
        const { visible, confirmLoading, layout } = this.state;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (
            <div className="handle-area">
                <Button type="primary" icon={<PlusOutlined />} onClick={this.showModal}>
                    新增
                </Button>
                <Modal title="新增邮件" visible={visible} onOk={this.handleOk} confirmLoading={confirmLoading} onCancel={this.handleCancel} centered={true} cancelText="取消" okText="确认" maskClosable={false}>
                    <Form name="nest-messages" {...layout} ref={this.formRef}  onFinish={this.onFinish}>
                        <Form.Item
                            name="fromName"
                            label="发送者昵称"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="subject" label="邮件主题" rules={[{ required: true, message: '请输入邮件主题!'}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="toEmail"
                            label="接收者邮箱地址"
                            rules={[
                                {
                                    type: "email",
                                    message: "输入的电子邮件无效!",
                                },
                                {
                                    required: true,
                                    message: "请输入您的电子邮件!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="fromTime" label="发送时间" {...config}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                        <Form.Item name="fromFrequency" label="发送频率" 
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select defaultValue="everyday" style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="everyday">每日</Option>
                                <Option value="once">一次</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default EmailSearch;
