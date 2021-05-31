import React from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';
import { ProFormDatePicker } from '@ant-design/pro-form';
import type { TableListItem } from '../../data.d';

const FormItem = Form.Item;
const { Option } = Select;

export type FormValueType = {
    type?: string;
    title?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => void;
    updateModalVisible: boolean;
    values: Partial<TableListItem>;
};

export type UpdateFormState = {
    formVals: FormValueType;
};

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
    } = props;

    console.log(values);

    const handleSave = async () => {
        const fieldsValue = { ... await form.validateFields() };
        fieldsValue.id = values.id
        handleUpdate(fieldsValue);
    };

    const renderFooter = () => {
        return (
            <>
                <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
                <Button type="primary" onClick={() => handleSave()}>
                    保存
                </Button>
            </>
        );
    };

    return (
        <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title="规则配置"
            visible={updateModalVisible}
            footer={renderFooter()}
            onCancel={() => handleUpdateModalVisible()}
        >
            <Form
                {...formLayout}
                form={form}
                initialValues={{
                    ...values
                }}
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
    );
};

export default UpdateForm;
