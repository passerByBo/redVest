import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Form, Select, Radio, Card, Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormDatePicker } from '@ant-design/pro-form';
import { nanoid } from 'nanoid'

import { getCounponRangeList, addCounponRangeList, getCounponRangeListAdded, removeCounponRangeList, handletransact } from '@/services/marketing/couponProduction';
import formatRequestListParams from '@/utils/formatRequestListParams';

const { Option } = Select;
const FormItem = Form.Item;

export interface AddModalProps {
    visible: boolean;
    closeAddModal: Function;
    addNewItem: Function;
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
 * 添加节点
 *
 * @param fields
 */
const handleTransact = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        await handletransact({ ...fields });
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

const formItemLayout = {
    labelCol: { span: 6, offset: 1 },
    wrapperCol: { span: 14 },
};

const nowTime = new Date();
const timePoint = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + nowTime.getDay();
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


const AddCouponModal: React.FC<AddModalProps> = (props) => {
    const [form] = Form.useForm();
    const [transactForm] = Form.useForm();
    const actionRef = useRef<ActionType>();
    const { visible, closeAddModal, addNewItem } = props;
    const [productVisible, setProductVisible] = useState<boolean>(false);
    const [transactVisible, setTransactVisible] = useState<boolean>(false);
    const [currentBindid, setCurrentBindid] = useState<string>("");

    // 保存
    const handleFinish = async () => {
        const values = await form.validateFields();
        addNewItem(values);
    }

    const useData = async (useData: any) => {
        const fields = { ...useData }
        fields.bindid = form.getFieldValue("bindid");
        let result = await handleAdd(fields)
        result && actionRef.current?.reloadAndRest?.();
        setProductVisible(false);
    };

    const deleteData = async (useData: CounponRangeListTable[]) => {
        let result = await handleRemove(useData)
        result && actionRef.current?.reloadAndRest?.();
    };

    const doTransact = async () => {
        const values1 = await transactForm.validateFields();
        const values2 = await form.validateFields();
        let result = await handleTransact({ ...values1, ...values2 })
        setTransactVisible(false)
        closeAddModal();
        result && actionRef.current?.reloadAndRest?.();
    }

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
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_: any, record: any) => [
                <a onClick={() => { deleteData([record]) }} style={{ color: 'red' }}>删除</a>
            ],
        },
    ];

    useEffect(() => {
        if (visible) {
            const currBinid = nanoid();
            form.setFieldsValue({
                bindid: currBinid,
                billno: `RZ-` + timePoint + getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9),
            });
            setCurrentBindid(currBinid);
        }
    }, [visible])

    return (
        <Modal
            title="卡券制作"
            visible={visible}
            centered
            footer={[
                <Button key="submit" type="primary" onClick={handleFinish}>
                    保存
                </Button>,
                <Button
                    type="primary"
                    onClick={() => { setTransactVisible(true) }}
                >
                    发布
                </Button>,
            ]}
            onOk={() => handleFinish()}
            onCancel={() => { closeAddModal(); actionRef.current?.reloadAndRest?.(); }}
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
                        label="关联id"
                        name="bindid"
                    >
                        <Input disabled />
                    </FormItem>

                    <FormItem
                        label="创建人"
                        name="applyman"
                    >
                        <Input placeholder="请输入创建人" allowClear />
                    </FormItem>

                    <ProFormDatePicker required placeholder={"选择发布时间"} width="md" name="applyDate" label="创建时间" />

                    <FormItem
                        label="使用类型"
                        name="useType"
                    >
                        <Select>
                            <Option value="公开">公开</Option>
                        </Select>
                    </FormItem>

                    <ProFormDatePicker required placeholder={"选择有效起始日期"} width="md" name="startDate" label="有效起始日期" />

                    <ProFormDatePicker required placeholder={"选择有效截止日期"} width="md" name="endDate" label="有效截止日期" />

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
                    request={formatRequestListParams(getCounponRangeListAdded, { bindid: currentBindid })}
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
            <Modal
                title="办理"
                visible={transactVisible}
                onOk={doTransact}
                onCancel={() => {
                    setTransactVisible(false)
                }}
            >
                <Form {...formItemLayout} form={transactForm} initialValues={{ status: '审核通过' }}>
                    <Form.Item name='status' label="请选择" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value={'审核通过'}>审核通过</Radio>
                            <Radio value={'审核未通过'}>审核未通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="auditOpinion" label="审核意见" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Modal>
    )
}

export default AddCouponModal;
