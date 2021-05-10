import React, { useRef, useState } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { Button, Switch, message, Form } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, {
    ModalForm,
    ProFormText,
} from '@ant-design/pro-form'

import { getExpressList, updateExpressList } from '@/services/operation/index';
import formatRequestListParams from '@/utils/formatRequestListParams';

type TableListType = {
    id: string;
    billNo: string;
    billName: string;
    isValid: string;
}

type paramsType = {
    id: string;
    billNo?: string;
    billName?: string;
    isValid?: string;
}

const ExpressModel: React.FC<TableListType> = () => {
    const [addForm] = Form.useForm();
    const actionRef = useRef<ActionType>();
    const [formValues, setFormValues] = useState<TableListType | null>(null);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const [selectedRowsState, setSelectedRows] = useState<TableListType[]>([]);

    // 更新状态
    const setItemStatues = async (fields: paramsType) => {
        try {
            await updateExpressList({
                id: fields.id,
                billNo: fields.billNo,
                billName: fields.billName,
                isValid: fields.isValid,
            });
            message.success('更新成功');
            if (actionRef.current) {
                actionRef.current.reload();
            }
            setUpdateFormVisible(false);
            return true;
        } catch (error) {
            message.error('更新失败！');
            return false;
        }
    };

    const columns: ProColumns<TableListType>[] = [
        {
            title: '单据编号',
            dataIndex: 'billNo',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '单据名称',
            dataIndex: 'billName',
            valueType: 'textarea',
        },
        {
            title: '是否启用',
            dataIndex: 'isValid',
            valueType: 'option',
            render: (_, record) => {
                const isValid = record.isValid === 'Y' ? true : false;
                return (
                    <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        defaultChecked={isValid}
                        onChange={() => { setItemStatues({ id: record.id, isValid: !isValid ? 'Y' : 'N' }) }}
                    />
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [<a onClick={() => {
                setUpdateFormVisible(true);
                setFormValues(record);
                addForm.setFieldsValue({
                    billNo: record.billNo,
                    billName: record.billName,
                });
            }}>编辑</a>, <a onClick={() => { }}>删除</a>],
        },
    ]

    return (
        <PageContainer
            header={{
                title: '快递单模板',
            }}
        >
            <ProTable<TableListType>
                actionRef={actionRef}
                rowKey="id"
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                        }}
                    >
                        <ExportOutlined />导出
                    </Button>,
                ]}
                request={formatRequestListParams(getExpressList)}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows)
                    },
                }}
            />
            {
                selectedRowsState?.length > 0 && (
                    <FooterToolbar
                        extra={
                            <div>
                                已选择{' '}
                                <a
                                    style={{
                                        fontWeight: 600,
                                    }}
                                >
                                    {selectedRowsState.length}
                                </a>{' '}
                                项 &nbsp;&nbsp;
                                <span>
                                </span>
                            </div>
                        }
                    >
                        <Button type='primary' danger>批量删除</Button>
                    </FooterToolbar>
                )
            }
            <ModalForm
                form={addForm}
                title='修改快递模板'
                visible={updateFormVisible}
                onFinish={async (data) => {
                    if (formValues) {
                        const itemKey = { id: formValues.id };
                        setItemStatues({ ...itemKey, ...data })
                    }
                }}
                onVisibleChange={setUpdateFormVisible}
            >
                <ProForm.Group>
                    <ProFormText width='md' name='billNo' label='单据编号' rules={[{ required: true, message: '请输入单据编号' }]} />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width='md' name='billName' label='单据名称' rules={[{ required: true, message: '请输入单据名称' }]} />
                </ProForm.Group>

            </ModalForm>
        </PageContainer>
    )
}

export default ExpressModel;
