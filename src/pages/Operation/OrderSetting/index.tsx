import React, { useRef, useState } from 'react';
import {
    Card, InputNumber, Form, Button, Typography, Row,
    Col,
} from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const FormItem = Form.Item;

const OrderSetting: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
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
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                        businessCloseTime: 1,
                        closeTime: 1,
                        completeTime: 1
                    }}
                >

                    <FormItem
                        label="正常订单超过"
                    >
                        <Row gutter={8}>
                            <Col>
                                <Form.Item
                                    name="businessCloseTime"
                                >
                                    <InputNumber min={1} max={7} defaultValue={1} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <span style={{ lineHeight: 2 }}> 分 未付款，订单自动关闭</span>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem
                        label="发货超过"
                    >
                        <Row gutter={8}>
                            <Col>
                                <Form.Item
                                    name="closeTime"
                                >
                                    <InputNumber min={1} max={7} defaultValue={1} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <span style={{ lineHeight: 2 }}> 天 未收获，订单自动完成</span>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem
                        label="订单完成超过"
                    >
                        <Row gutter={8}>
                            <Col>
                                <Form.Item
                                    name="completeTime"
                                >
                                    <InputNumber min={1} max={7} defaultValue={1} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <span style={{ lineHeight: 2 }}> 天 自动结束交易，不能申请退款</span>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem {...tailLayout}>
                        <Button style={{ marginRight: '20px' }} type="primary" htmlType="submit">
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        </PageContainer>
    )
}

export default OrderSetting;
