import React from 'react';
import { Modal, Input, Form, Select, DatePicker } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

export interface AddModalProps {
    visible: boolean;
    onCancel(): void;
    onFinish: Function;
}

const AddModal: React.FC<AddModalProps> = (props) => {

    const [form] = Form.useForm();
    const { visible, onCancel, onFinish } = props;

    const handleFinish = async () => {
        const values = await form.validateFields();
        onFinish(values);
    }

    const formItemLayout = {
        labelCol: { span: 6, offset: 1 },
        wrapperCol: { span: 14 },
    };

    return (
        <Modal
            title="公告管理"
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
                    label="文章分类名称"
                    name="type"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入文章分类名称" allowClear />
                </FormItem>

                <FormItem
                    label="文章标题"
                    name="title"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入文章标题" allowClear />
                </FormItem>

                <FormItem
                    label="文章重要性"
                    name="isRecommend"
                >
                    <Input placeholder="请选择文章重要性" allowClear />
                </FormItem>

                <FormItem
                    label="外部链接"
                    name="urladdress"
                >
                    <Input placeholder="请输入外部链接" allowClear />
                </FormItem>

                <FormItem
                    label="是否展示"
                    name="isShow"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Select>
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="作者"
                    name="author"
                >
                    <Input placeholder="请输入作者名称" allowClear />
                </FormItem>

                <FormItem
                    label="发布时间"
                    name="releaseDate"
                    rules={[{ required: true, message: '请选择开始时间！' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择发布时间"
                    />
                </FormItem>
            </Form>
        </Modal>
    )
}

export default AddModal;
