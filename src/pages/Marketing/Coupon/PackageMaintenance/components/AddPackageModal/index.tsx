import React, { useState } from 'react';
import { Modal, Input, Form, Select, Table, Card, Button } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

export interface AddModalProps {
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

const AddPackageModal: React.FC<AddModalProps> = (props) => {

    const columns = [
        {
            title: '范围类别（专题组名称）',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '范围名称（专题名称）',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '备注',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];



    const [form] = Form.useForm();
    const { visible, onCancel, onFinish } = props;
    const [productVisible, setProductVisible] = useState<boolean>(false);


    const handleFinish = async () => {
        await waitTime(2000);
        const values = await form.validateFields();
        onFinish(values);
    }

    const formItemLayout = {
        labelCol: { span: 6, offset: 1 },
        wrapperCol: { span: 14 },
    };

    return (
        <Modal
            title="卡券制作"
            visible={visible}
            centered
            onOk={() => handleFinish()}
            onCancel={onCancel}
            width={800}
        >
            <Card title="基本信息" style={{ width: '100%', marginBottom: 26 }}>
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
                        label="创建人"
                        name="parentTypeName"
                    >
                        <Input placeholder="请输入创建人" allowClear />
                    </FormItem>

                    <FormItem
                        label="创建时间"
                        name="sortLevel"
                    >
                        <Input placeholder="请输入创建时间" allowClear />
                    </FormItem>

                    <FormItem
                        label="使用类型"
                        name="desc"
                    >
                        <Input.TextArea rows={4} placeholder="请输入使用类型" />
                    </FormItem>

                    <FormItem
                        label="有效起始日期"
                        name="sort"
                    >
                        <Input placeholder="请输入排序" allowClear />
                    </FormItem>

                    <FormItem
                        label="有效截止日期"
                        name="keywords"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券名称"
                        name="isShow"
                    >
                        <Select>
                            <Option value="0">是</Option>
                            <Option value="1">否</Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        label="满足条件"
                        name="keywords"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券面额"
                        name="keywords"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券数量"
                        name="keywords"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券总额（小写）"
                        name="keywords"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券总额（大写）"
                        name="keywords"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>
                </Form>
            </Card>

            <Card title="消费券使用范围" style={{ width: '100%' }}>
                <Button onClick={() => { setProductVisible(true) }} type="primary" style={{ marginBottom: 16 }}>
                    新增
                </Button>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)
                    }}
                    rowKey='key' />
            </Card>
            <Modal
                title="选择商品信息"
                visible={productVisible}
                onOk={() => setProductVisible(false)}
                onCancel={() => setProductVisible(false)}
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)
                    }}
                    rowKey='key' />
            </Modal>
        </Modal>
    )
}

export default AddPackageModal;
