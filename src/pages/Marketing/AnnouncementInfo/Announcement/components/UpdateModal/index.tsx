import React from 'react';
import { Form, Button, Input, Modal } from 'antd';
import type { TableListItem } from '../../data.d';

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
const FormItem = Form.Item;

export type UpdateFormState = {
    formVals: FormValueType;
};

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
    } = props;

    const itemKey = { id: values.id };

    const [form] = Form.useForm();

    const handleNext = async () => {
        const fieldsValue = await form.validateFields();
        handleUpdate({ ...itemKey, ...fieldsValue });
    };

    const renderFooter = () => {
        return (
            <>
                <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
                <Button type="primary" onClick={() => handleNext()}>
                    下一步
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
                    type: values.type,
                    title: values.title,
                }}
            >
                <FormItem
                    label="文章分类名称"
                    name="type"
                    rules={[
                        {
                            required: true, message: '请输入规则名称！'
                        },
                    ]}
                >
                    <Input placeholder="请输入分类名称" allowClear />
                </FormItem>
                <FormItem
                    label="文章标题"
                    name="title"
                    rules={[{ required: true, message: '请输入文章标题！', min: 5 }]}
                >
                    <Input.TextArea rows={4} placeholder="请输入文章标题！" />
                </FormItem>
            </Form>
        </Modal>
    );
};

export default UpdateForm;
