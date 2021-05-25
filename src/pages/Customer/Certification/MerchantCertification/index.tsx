import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { message, Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import FlowStep from './components/FlowStep';
import AddModal from './components/AddModal';

import { getMerchantCertificateList, saveApply } from '@/services/customer/index';
import formatRequestListParams from '@/utils/formatRequestListParams';
import type { TableListItem, TableListParams } from './data';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListParams) => {
    const hide = message.loading('正在添加');
    try {
        await saveApply({ ...fields });
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
 *
 * @param fields
 */
// const handleUpdate = async (fields: FormValueType) => {
// const hide = message.loading('正在更新');
// try {
//     await updateRule({
//         type: fields.type,
//         journalismDescribe: fields.journalismDescribe,
//         id: fields.id,
//     });
//     hide();
//     message.success('更新成功');
//     return true;
// } catch (error) {
//     hide();
//     message.error('更新失败！');
//     return false;
// }
// };

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
    // const hide = message.loading('正在删除');
    // try {
    //     await removeRule({
    //         ids: selectedRows.map((row) => row.id).join(','),
    //     });
    //     hide();
    //     message.success('删除成功');
    //     return true;
    // } catch (error) {
    //     hide();
    //     message.error('删除失败！');
    //     return false;
    // }
};

const MerchantCertification: React.FC = () => {
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [flowStepVisible, setFlowStepVisible] = useState<boolean>(false);
    const [statusKey, setStatusKey] = useState<string>('代办');
    const [btnIndex, setBtnIndex] = useState<number>(0);
    const actionRef = useRef<ActionType>();
    const onTabChange = (key: string) => {
        setStatusKey(key);
        actionRef.current?.reloadAndRest?.();
    };

    const confirmAdd = (newData: TableListParams) => {
        setAddModalVisible(false);
        handleAdd(newData);
        actionRef.current?.reloadAndRest?.();
    };

    const onBtnClick = (item: number) => {
        setBtnIndex(item);
        setFlowStepVisible(true);
    };

    const onCancel = () => {
        setFlowStepVisible(false);
    };

    const columns: ProColumns<TableListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
        },
        {
            title: '来自',
            dataIndex: 'userName',
            valueType: 'textarea',
        },
        {
            title: '标题',
            dataIndex: 'title',
            valueType: 'textarea'
        },
        {
            title: '类型',
            dataIndex: 'billType',
            valueType: 'textarea'
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
        },
        {
            title: '审核结果',
            dataIndex: 'status',
            valueType: 'textarea',
            search: statusKey === '1' ? false : undefined,
            hideInTable: statusKey === '1'
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            hideInTable: statusKey !== '3',
            render: (_, record) => [
                <a onClick={() => { onBtnClick(0) }}>跟踪</a>,
                <a onClick={() => { onBtnClick(1) }}>催办</a>,
                <a onClick={() => { onBtnClick(2) }}>撤销</a>],
        },
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
                        tab: '发起',
                        key: '发起',
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
                    toolBarRender={() => [
                        <Button
                            type="primary"
                            key="primary"
                            onClick={() => {
                                setAddModalVisible(true)
                            }}
                        >
                            <PlusOutlined /> 新建
                        </Button>,
                    ]}
                    request={formatRequestListParams(getMerchantCertificateList, { type: statusKey })}
                    columns={columns}
                    rowSelection={{
                        onChange: (_, selectedRows) => {
                        },
                    }}
                />
            </PageContainer>
            <AddModal
                visible={addModalVisible}
                onFinish={confirmAdd}
                onCancel={() => setAddModalVisible(false)}
            />
            <FlowStep visible={flowStepVisible} onCancel={onCancel} btnIndex={btnIndex} />
        </>
    )
}
export default MerchantCertification;
