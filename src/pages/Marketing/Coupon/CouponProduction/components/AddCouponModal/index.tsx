import React, { useState, useRef } from 'react';
import { Modal, Input, Form, Select, Table, Card, Button, DatePicker, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { getCounponRangeList, addCounponRangeList, getCounponRangeListAdded, removeCounponRangeList } from '@/services/marketing/couponProduction';
import formatRequestListParams from '@/utils/formatRequestListParams';

const { Option } = Select;
const FormItem = Form.Item;

export interface AddModalProps {
    visible: boolean;
    onCancel(): void;
    onFinish: Function;
}

type CounponRangeListTable = {
    id: string,
    bindid: string,
    rangeType: string,
    rangeName: string,
    remark: string,
    refId: string,
    refTablename: string,
}

const initData = {
    "billno": "20200412123456",
    "bindid": "uyt0678d-4436-4ec6-8d34-ee944c44485k",
    "applyman": "admin",
    "applymanid": "1",
    "useType": "公开",
    "cardName": "满1000元兑换券",
    "exceedMoney": 1000,
    "cardMoney": 200,
    "cardCount": 10,
    "totalMoneyLower": 2000,
    "totalMoneyCapitals": "贰仟元整"
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        await addCounponRangeList({ ...fields });
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败！');
        return false;
    }
};

/**
 * 删除节点
 */
const handleRemove = async (fields: CounponRangeListTable[]) => {
    const hide = message.loading('正在删除');
    try {
        await removeCounponRangeList({
            ids: fields.map((row) => row.id).join(','),
        });
        hide();
        message.success('删除成功');
        return true;
    } catch (error) {
        hide();
        console.log(error);
        message.error('删除失败！');
        return false;
    }
};

const AddCouponModal: React.FC<AddModalProps> = (props) => {
    const [form] = Form.useForm();
    const { visible, onCancel, onFinish } = props;
    const [productVisible, setProductVisible] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();

    const handleFinish = async () => {
        const values = await form.validateFields();
        onFinish(values);
    }

    const formItemLayout = {
        labelCol: { span: 6, offset: 1 },
        wrapperCol: { span: 14 },
    };

    const useData = async (useData: any) => {
        let result = await handleAdd(useData)
        result && actionRef.current?.reloadAndRest?.();
        setProductVisible(false);
    };

    const deleteData = async (useData: CounponRangeListTable[]) => {
        let result = await handleRemove(useData)
        result && actionRef.current?.reloadAndRest?.();
    };

    const columnsSelectTable = [
        {
            title: '专题组名称',
            dataIndex: 'rangeType',
        },
        {
            title: '专题名称',
            dataIndex: 'rangeName',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_: any, record: any) => [
                <a onClick={() => { useData(record) }}>使用</a>
            ],
        },
    ];

    const columns = [
        {
            title: '范围类别（专题组名称）',
            dataIndex: 'rangeType',
        },
        {
            title: '范围名称（专题名称）',
            dataIndex: 'rangeName',
        },
        {
            title: '备注',
            dataIndex: 'refTablename',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_: any, record: any) => [
                <a onClick={() => { deleteData([record]) }} style={{ color: 'red' }}>删除</a>
            ],
        },
    ];
    return (
        <Modal
            title="卡券制作"
            visible={visible}
            centered
            footer={[
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={() => handleFinish()}>
                    保存
                </Button>,
                <Button
                    type="primary"
                    onClick={() => { console.log('办理') }}
                >
                    办理
                </Button>,
            ]}
            onOk={() => handleFinish()}
            onCancel={onCancel}
            width={800}
        >
            <Card title="基本信息" style={{ width: '100%', marginBottom: 26 }}>
                <Form
                    {...formItemLayout}
                    hideRequiredMark
                    form={form}
                    initialValues={initData}
                >
                    <FormItem
                        label="单据编号"
                        name="billno"
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
                        name="applyman"
                    >
                        <Input placeholder="请输入创建人" allowClear />
                    </FormItem>

                    <FormItem
                        label="创建时间"
                        name="applyDate"
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择发布时间"
                        />
                    </FormItem>

                    <FormItem
                        label="使用类型"
                        name="useType"
                    >
                        <Select>
                            <Option value="公开">公开</Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        label="有效起始日期"
                        name="startDate"
                    >
                        <DatePicker />
                    </FormItem>

                    <FormItem
                        label="有效截止日期"
                        name="endDate"
                    >
                        <DatePicker />
                    </FormItem>

                    <FormItem
                        label="卡券名称"
                        name="cardName"
                    >
                        <Input placeholder="请输入卡券名称" allowClear />
                    </FormItem>

                    <FormItem
                        label="满足条件"
                        name="exceedMoney"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券面额"
                        name="cardMoney"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券数量"
                        name="cardCount"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券总额（小写）"
                        name="totalMoneyLower"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>

                    <FormItem
                        label="卡券总额（大写）"
                        name="totalMoneyCapitals"
                    >
                        <Input placeholder="请输入关键字" allowClear />
                    </FormItem>
                </Form>
            </Card>

            <Card title="消费券使用范围" style={{ width: '100%' }}>
                <ProTable
                    rowKey="id"
                    bordered
                    actionRef={actionRef}
                    pagination={{
                        pageSize: 10,
                    }}
                    options={{ search: false, fullScreen: false, reload: true, setting: false, density: false }}
                    toolBarRender={() => [
                        <Button onClick={() => { setProductVisible(true) }} type="primary">
                            <PlusOutlined />新增
                        </Button>
                    ]}
                    search={false}
                    request={formatRequestListParams(getCounponRangeListAdded)}
                    columns={columns}
                />
            </Card>
            <Modal
                width={600}
                title="选择范围"
                visible={productVisible}
                onOk={() => setProductVisible(false)}
                onCancel={() => setProductVisible(false)}
            >
                <ProTable
                    rowKey="id"
                    bordered
                    pagination={{
                        pageSize: 10,
                    }}
                    toolBarRender={false}
                    request={formatRequestListParams(getCounponRangeList)}
                    columns={columnsSelectTable}
                />
            </Modal>
        </Modal>
    )
}

export default AddCouponModal;
