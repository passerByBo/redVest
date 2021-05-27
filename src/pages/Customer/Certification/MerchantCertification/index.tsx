import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { message, Button, Popconfirm } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import FlowStep from './components/FlowStep';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

import { getMerchantCertificateList, updateItem, removeItem } from '@/services/customer/index';
import formatRequestListParams from '@/utils/formatRequestListParams';
import type { TableListItem, TableListParams } from './data';

/**
 * 添加节点
 */
const handleAdd = async (fields: TableListParams) => {
    const hide = message.loading('正在添加');
    try {
        let res = await updateItem({ ...fields });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('添加失败!' + res.msg, 15);
            return false;
        }
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
 * 更新节点
 */
const handleUpdate = async (fields: TableListParams) => {
    const hide = message.loading('正在更新');
    try {
        console.log(fields);
        let res = await updateItem({ ...fields });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('更新失败!' + res.msg, 15);
            return false;
        }
        hide();
        message.success('更新成功');
        return true;
    } catch (error) {
        hide();
        message.error('更新失败！');
        return false;
    }
};

/**
 * 删除节点
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
    const hide = message.loading('正在删除');
    try {
        await removeItem({
            ids: selectedRows.map((row) => row.id).join(','),
        });
        hide();
        message.success('删除成功');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败！');
        return false;
    }
};

const MerchantCertification: React.FC = () => {
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [flowStepVisible, setFlowStepVisible] = useState<boolean>(false);

    const [formValues, setFormValues] = useState({});
    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    const [statusKey, setStatusKey] = useState<string>('代办');
    const [btnIndex, setBtnIndex] = useState<number>(0);
    const actionRef = useRef<ActionType>();

    const onTabChange = (key: string) => {
        setStatusKey(key);
        actionRef.current?.reloadAndRest?.();
    };

    const confirmAdd = async (newData: TableListParams) => {
        setAddModalVisible(false);
        let res = await handleAdd(newData);
        res && actionRef.current?.reloadAndRest?.();
    };

    const onBtnClick = (item: number) => {
        setBtnIndex(item);
        setFlowStepVisible(true);
    };

    const onCancel = () => {
        setFlowStepVisible(false);
    };

    // 删除
    const removeSingleRow = async (selectedRows: TableListItem[]) => {
        let res = await handleRemove(selectedRows)
        setSelectedRows([]);
        res && actionRef.current?.reloadAndRest?.();
    }

    const columns: ProColumns<TableListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
        },
        {
            title: '数据源id',
            dataIndex: 'id',
            valueType: 'textarea',
            hideInTable: true,
            search: false
        },
        {
            title: '来自',
            dataIndex: 'userName',
            valueType: 'textarea',
        },
        {
            title: '标题',
            dataIndex: 'title',
            render: ((_, item) => {
                return (
                    <a onClick={() => {
                        setUpdateModalVisible(true);
                        setFormValues({ id: item.id, type: statusKey });
                    }}>{_}</a>
                )
            })
        },
        {
            title: '接收时间',
            dataIndex: 'updatedate',
            valueType: 'textarea',
            search: false
        },
        {
            title: '期限',
            dataIndex: 'dueTime',
            valueType: 'textarea',
            search: false
        }
    ]

    return (
        <>
            <PageContainer
                header={{
                    title: '商家认证管理',
                }}
                tabList={[
                    {
                        tab: '代办',
                        key: '代办',
                    },
                    {
                        tab: '已办',
                        key: '已办',
                    },
                    {
                        tab: '草稿',
                        key: '草稿',
                    }
                ]}
                onTabChange={onTabChange}
            >
                <ProTable
                    headerTitle="商家认证管理"
                    actionRef={actionRef}
                    options={{ search: false, fullScreen: false, reload: true, setting: false, density: false }}
                    rowKey="id"
                    search={{
                        labelWidth: 100,
                        defaultCollapsed: false,
                    }}
                    toolBarRender={() => statusKey === '草稿' ? [
                        <Button
                            type="primary"
                            key="primary"
                            onClick={() => {
                                setAddModalVisible(true)
                            }}
                        >
                            <PlusOutlined /> 新建
                        </Button>,
                        <Popconfirm
                            placement="topRight"
                            title={'确定要删除吗？'}
                            onConfirm={() => { removeSingleRow(selectedRowsState); }}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="primary" danger><DeleteOutlined />删除</Button>
                        </Popconfirm>
                    ] : []}
                    request={formatRequestListParams(getMerchantCertificateList, { type: statusKey })}
                    columns={columns}
                    rowSelection={{
                        onChange: (_, selectedRows) => {
                            setSelectedRows(selectedRows)
                        },
                    }}
                />
            </PageContainer>
            <AddModal
                visible={addModalVisible}
                onFinish={confirmAdd}
                onCancel={() => setAddModalVisible(false)}
            />
            <UpdateModal
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        setUpdateModalVisible(false);
                        setFormValues({});
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    setUpdateModalVisible(false);
                }}
                updateModalVisible={updateModalVisible}
                values={formValues}
            />
            <FlowStep visible={flowStepVisible} onCancel={onCancel} btnIndex={btnIndex} />
        </>
    )
}
export default MerchantCertification;
