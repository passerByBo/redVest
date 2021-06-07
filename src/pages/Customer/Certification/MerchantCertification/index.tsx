import React, { useState, useRef } from 'react';
import { message, Button, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
// import FlowStep from './components/FlowStep';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import { getMerchantCertificateList, updateItem, removeItem } from '@/services/customer/index';
import formatRequestListParams from '@/utils/formatRequestListParams';
import type { TableListItem, TableListParams } from './data';

/**
 * 商家认证管理主表添加节点
 */
const handleAdd = async (fields: TableListParams) => {
    const hide = message.loading('正在添加');
    try {
        let res = await updateItem({ ...fields });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('添加失败!' + res.msg, 10);
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
 * 商家认证管理主表更新节点
 */
const handleUpdate = async (fields: TableListParams) => {
    const hide = message.loading('正在更新');
    try {
        let res = await updateItem({ ...fields });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('更新失败!' + res.msg, 10);
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
 * 商家认证管理主表删除节点
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
    const hide = message.loading('正在删除');
    try {
        let res = await removeItem({
            ids: selectedRows.map((row) => row.id).join(','),
        });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('删除失败!' + res.msg, 10);
            return false;
        }
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
    const [formValues, setFormValues] = useState({});
    const [statusKey, setStatusKey] = useState<string>('草稿');
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    // const [flowStepVisible, setFlowStepVisible] = useState<boolean>(false);
    // const [btnIndex, setBtnIndex] = useState<number>(0);
    const actionRef = useRef<ActionType>();

    // tab切换
    const onTabChange = (key: string) => {
        setStatusKey(key);
        actionRef.current?.reloadAndRest?.();
    };

    // 主表新建
    const addNewItem = async (newData: TableListParams) => {
        const res = await handleAdd(newData);
        if (res) {
            setAddModalVisible(false);
            actionRef.current?.reloadAndRest?.();
        }
    };

    // 主表删除
    const removeItems = async (selectedRows: TableListItem[]) => {
        const res = await handleRemove(selectedRows)
        if (res) {
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
        }
    }

    // 主表更新
    const updateItems = async (value: any) => {
        const res = await handleUpdate(value);
        if (res) {
            setUpdateModalVisible(false);
            setFormValues({});
            actionRef.current?.reloadAndRest?.();
        }
    }

    //刷新主表
    const doRefresh = () => {
        console.log("doRefresh")
        actionRef.current?.reloadAndRest?.();
    }
    // const onBtnClick = (item: number) => {
    //     setBtnIndex(item);
    //     setFlowStepVisible(true);
    // };

    // const onCancel = () => {
    //     setFlowStepVisible(false);
    // };
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
                        tab: '草稿',
                        key: '草稿',
                    },
                    {
                        tab: '待办',
                        key: '待办',
                    },
                    {
                        tab: '已办',
                        key: '已办',
                    }
                ]}
                onTabChange={onTabChange}
            >
                {/* 主表 */}
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
                            onConfirm={() => { removeItems(selectedRowsState); }}
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
            {/* 新建 */}
            <AddModal
                visible={addModalVisible}
                onFinish={addNewItem}
                onCancel={() => setAddModalVisible(false)}
                doRefresh={doRefresh}
            />
            {/* 详情 */}
            <UpdateModal
                values={formValues}
                updateModalVisible={updateModalVisible}
                onSubmit={updateItems}
                doRefresh={doRefresh}
                onCancel={() => setUpdateModalVisible(false)}
            />
            {/* <FlowStep visible={flowStepVisible} onCancel={onCancel} btnIndex={btnIndex} /> */}
        </>
    )
}
export default MerchantCertification;
