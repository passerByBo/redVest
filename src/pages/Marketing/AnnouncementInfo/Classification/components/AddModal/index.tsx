import React from 'react';
import { Button, Modal, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip, message } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

export interface RemarkOrderModelProps {
    visible: boolean;
    onCancel(): void;
    onFinish: Function;
}

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const AddModal: React.FC<RemarkOrderModelProps> = (props) => {

    const [form] = Form.useForm();
    const { visible, onCancel, onFinish } = props;

    const handleFinish = async () => {
        await waitTime(2000);
        const values = await form.validateFields();
        message.success('提交成功');
        onFinish(values);
    }

    const formItemLayout = {
        labelCol: { span: 6, offset: 1 },
        wrapperCol: { span: 14 },
    };

    return (
        <Modal
            title="文章分类维护单"
            visible={visible}
            centered
            onOk={() => handleFinish()}
            onCancel={onCancel}
            width={800}
        >
            <Form
                {...formItemLayout}
                hideRequiredMark
                form={form}
                name="basic"
            >
                <FormItem
                    label="分类名称"
                    name="articleName"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入分类名称" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="上级分类名称"
                    name="parentTypeName"
                >
                    <Input placeholder="请输入上级分类名称" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="级别"
                    name="sortLevel"
                >
                    <Input placeholder="请输入级别" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="描述"
                    name="desc"
                >
                    <Input.TextArea rows={4} placeholder="请输入描述内容" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="排序"
                    name="sort"
                >
                    <Input placeholder="请输入排序" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="关键字"
                    name="keywords"
                >
                    <Input placeholder="请输入关键字" />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="是否在导航栏显示"
                    name="isShow"
                >
                    <Select>
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    )
}

export default AddModal;
