import React, { useEffect } from 'react';
import { Modal, Input, Form, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

export interface AddModalProps {
    visible: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void;
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
                isRecommend: "是"
            });
        }
    }, [visible])

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
                form={form}
            >
                <FormItem
                    label="分类名称"
                    name="type"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入分类名称" allowClear />
                </FormItem>
                <FormItem
                    label="上级分类名称"
                    name="parentType"
                >
                    <Input placeholder="请输入上级分类名称" allowClear />
                </FormItem>
                <FormItem
                    label="级别"
                    name="typeLevel"
                >
                    <Input placeholder="请输入级别" allowClear />
                </FormItem>
                <FormItem
                    label="描述"
                    name="journalismDescribe"
                >
                    <Input.TextArea rows={4} placeholder="请输入描述内容" />
                </FormItem>
                <FormItem
                    label="排序"
                    name="sort"
                >
                    <Input placeholder="请输入排序" allowClear />
                </FormItem>
                <FormItem
                    label="关键字"
                    name="keyword"
                >
                    <Input placeholder="请输入关键字" allowClear />
                </FormItem>
                <FormItem
                    label="是否在导航栏显示"
                    name="isRecommend"
                >
                    <Select>
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    )
}

export default AddModal;
