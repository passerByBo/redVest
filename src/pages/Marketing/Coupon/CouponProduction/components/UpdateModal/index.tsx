import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Input, Modal, Select, Spin, message, Radio, Card } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import type { TableListItem } from '../../data';
import { transactItem } from '@/services/customer/index';
import { useRequest } from 'umi';
import {
    ProFormDatePicker,
} from '@ant-design/pro-form';
import Moment from 'moment';
import { getCounponRangeList, addCounponRangeList, getCounponRangeListAdded, removeCounponRangeList, handletransact, getItemDetail } from '@/services/marketing/couponProduction';
import formatRequestListParams from '@/utils/formatRequestListParams';

type CounponRangeListTable = {
    id: string,
    bindid: string,
    rangeType: string,
    rangeName: string,
    remark: string,
    refId: string,
    refTablename: string,
}

export type FormValueType = {
    articleName?: string;
    desc?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
    closeUpdateModal: Function;
    onSubmit: (values: FormValueType) => void;
    updateModalVisible: boolean;
    values: any;
};
const { Option } = Select;
const FormItem = Form.Item;

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
};

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

/**
 * 添加节点
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在办理');
    try {
        let res = await transactItem({ ...fields });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('办理失败!' + res.msg, 15);
            return false;
        }
        hide();
        message.success('办理成功');
        return true;
    } catch (error) {
        hide();
        message.error('办理失败！');
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

const UpdateModal: React.FC<UpdateFormProps> = (props) => {
    const {
        onSubmit: handleUpdate,
        closeUpdateModal,
        updateModalVisible,
        values,
    } = props;

    console.log(values.bindid);

    const actionRef = useRef<ActionType>();
    const [form] = Form.useForm();
    const [transactForm] = Form.useForm();
    const [productVisible, setProductVisible] = useState<boolean>(false);
    const [transactVisible, setTransactVisible] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);

    const deleteData = async (useData: CounponRangeListTable[]) => {
        let result = await handleRemove(useData)
        result && actionRef.current?.reloadAndRest?.();
    };

    const useData = async (useData: any) => {
        const fields = { ...useData }
        fields.bindid = '111';
        let result = await handleAdd(fields)
        result && actionRef.current?.reloadAndRest?.();
        setProductVisible(false);
    };

    // 办理
    const doTransact = async () => {
        const transactFormData = await transactForm.validateFields();
        const formData = await form.validateFields();
        if (formData.businesslicense && Array.isArray(formData.businesslicense)) {
            formData.businesslicense = formData.businesslicense.map((item: any) => item.id).join(',');
        }
        if (formData.authorizedFile && Array.isArray(formData.authorizedFile)) {
            formData.authorizedFile = formData.authorizedFile.map((item: any) => item.id).join(',');
        }
        if (formData.contaccessory && Array.isArray(formData.contaccessory)) {
            formData.contaccessory = formData.contaccessory.map((item: any) => item.id).join(',');
        }
        formData.id = data.id;
        console.log(transactFormData, formData);
        setTransactVisible(false);
        // handleUpdateModalVisible();
        handleAdd({ ...formData, ...transactFormData });
    }

    // 保存
    const handleSave = async () => {
        const fieldsValue = { ...await form.validateFields() };
        if (fieldsValue.businesslicense && Array.isArray(fieldsValue.businesslicense)) {
            fieldsValue.businesslicense = fieldsValue.businesslicense.map((item: any) => item.id).join(',');
        }
        if (fieldsValue.authorizedFile && Array.isArray(fieldsValue.authorizedFile)) {
            fieldsValue.authorizedFile = fieldsValue.authorizedFile.map((item: any) => item.id).join(',');
        }
        if (fieldsValue.contaccessory && Array.isArray(fieldsValue.contaccessory)) {
            fieldsValue.contaccessory = fieldsValue.contaccessory.map((item: any) => item.id).join(',');
        }
        fieldsValue.applydate = Moment(fieldsValue.applydate._d).format('YYYY-MM-DD');
        fieldsValue.id = data.id;
        handleUpdate({ ...fieldsValue });
    };


    const renderFooter = () => {
        return (
            <>
                <Button onClick={() => closeUpdateModal()}>取消</Button>
                {
                    values.type === "草稿"
                    &&
                    <>
                        <Button type="primary" onClick={() => { handleSave() }}>
                            保存
                        </Button>
                        <Button htmlType="button" onClick={() => setTransactVisible(true)}>
                            办理
                        </Button>
                    </>
                }
            </>
        );
    };

    const { loading, run } = useRequest(getItemDetail.bind(null, { id: values.id }), {
        manual: true,
        onSuccess: (result) => {
            console.log(1);
            if (result) {
                form.setFieldsValue({
                    ...result,
                });
                setData(result);
            } else {
                message.error('详细信息加载失败！')
            }

        }
    })

    useEffect(() => {
        if (updateModalVisible) {
            run();
        }
    }, [updateModalVisible])

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

    return (
        <Modal
            title="卡券制作"
            visible={updateModalVisible}
            destroyOnClose
            centered
            footer={[
                <Button key="submit" type="primary" onClick={() => { }}>
                    保存
                </Button>,
                <Button
                    type="primary"
                    onClick={() => { setTransactVisible(true) }}
                >
                    发布
                </Button>,
            ]}
            // onOk={() => handleFinish()}
            onCancel={() => { closeUpdateModal(); values.bindid = "" }}
            width={800}
        >
            <Card title="基本信息" style={{ width: '100%', marginBottom: 26 }}>
                <Form
                    {...formItemLayout}
                    hideRequiredMark
                    form={form}
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
                        hidden
                    >
                        <Input />
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
                    request={formatRequestListParams(getCounponRangeListAdded, { bindid: values.bindid })}
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
    );
};

export default UpdateModal;
