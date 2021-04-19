import React, { useState, useRef } from 'react';
import { Modal, Button, Steps, Result, Form, Input } from 'antd';

const { Step } = Steps;
const FormItem = Form.Item;

export interface FlowStepProps {
    visible: boolean;
    btnIndex: number;
    onCancel(): void;
}
const FlowStep: React.FC<FlowStepProps> = (props) => {

    const formItemLayout = {
        labelCol: { span: 6, offset: 1 },
        wrapperCol: { span: 14 },
    };

    const { visible, btnIndex, onCancel } = props;
    const [form] = Form.useForm();

    const desc1 = (
        <div>
            <div>曲丽丽</div>
            <div>2016-12-12 12:32</div>
        </div>
    );
    const desc2 = (
        <div>
            <div>平台管理员</div>
            <div>待处理</div>
        </div>
    );

    const getModalContent = () => {
        if (btnIndex === 0) {
            return (
                <>
                    <div style={{ width: '100%', textAlign: 'center' }}>已等待12小时30分钟</div>
                    <Steps current={0} progressDot >
                        <Step title="已提交" description={desc1} />
                        <Step title="未完成" description={desc2} />
                    </Steps>
                </>
            );
        }
        if (btnIndex === 1) {
            return (
                <Result
                    status="success"
                    title="操作成功"
                    subTitle="一系列的信息描述，很短同样也可以带标点。"
                />
            );
        }
        return (
            <Form
                {...formItemLayout}
                hideRequiredMark
                form={form}
                name="basic"
            >
                <FormItem
                    label="单据编号"
                    name="articleName"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入单据编号" allowClear />
                </FormItem>
                <FormItem
                    label="单据编号"
                    name="articleName"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input.TextArea rows={4} placeholder="请输入描述内容" />
                </FormItem>
            </Form>
        );

    };
    return (
        <Modal
            title={btnIndex === 0 ? "流程展示" : ""}
            visible={visible}
            centered
            onCancel={() => { onCancel() }}
            footer={
                <Button key="submit" type="primary" onClick={() => { onCancel() }}>
                    确定
                </Button>
            }
        >
            {getModalContent()}
        </Modal>
    )
}

export default FlowStep;