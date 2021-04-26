import React, { useRef, useState } from 'react';
import { Card, InputNumber, Form, Button } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

const OrderSetting: React.FC = () => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <PageContainer
            header={{
                title: '订单设置',
            }}
        >
            <Card>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={() => { }}
                    onFinishFailed={() => { }}
                >
                    <Form.Item
                        label="正常订单超过"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <InputNumber min={1} max={10} defaultValue={3} />
                        <span>分 未付款，订单自动关闭</span>
                    </Form.Item>

                    <Form.Item
                        label="发货超过"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <InputNumber min={1} max={10} defaultValue={7} />
                        <span>天 未收获，订单自动完成</span>
                    </Form.Item>

                    <Form.Item
                        label="订单完成超过"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <InputNumber min={1} max={7} defaultValue={7} />
                        <span>天 自动结束交易，不能申请退款</span>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button style={{ marginRight: '20px' }} type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button htmlType="button" onClick={() => { }}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </PageContainer>
    )
}

export default OrderSetting;
