import React from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';
import type { TableListItem } from '../../data.d';

const FormItem = Form.Item;
const { Option } = Select;

export type FormValueType = {
    articleName?: string;
    desc?: string;
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
            title="分类管理"
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
    );
};

export default UpdateForm;
