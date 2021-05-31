import React, { useEffect } from 'react';
import { Modal, Input, Form, Select } from 'antd';
import { ProFormDatePicker } from '@ant-design/pro-form';

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

    const formItemLayout = {
        labelCol: { span: 6, offset: 1 },
        wrapperCol: { span: 14 },
    };


    const handleFinish = async () => {
        const values = await form.validateFields();
        onFinish(values);
    }

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                isShow: "是"
            });
        }
    }, [visible])

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
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="作者"
                    name="author"
                >
                    <Input placeholder="请输入作者名称" allowClear />
                </FormItem>

                <ProFormDatePicker required placeholder={"选择发布时间"} width="md" name="releaseDate" label="发布时间" />
            </Form>
        </Modal>
    )
}

export default AddModal;
