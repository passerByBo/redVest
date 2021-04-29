import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import type { FormValueType } from './components/UpdateModal';
import AddModal from './components/AddModal'
import UpdateModal from './components/UpdateModal'
import { getArticleSortList, addArticleSortList, removeRule, updateRule } from '@/services/marketing/articleSort';
import formatRequestListParams from '@/utils/formatRequestListParams';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
    const hide = message.loading('正在添加');
    try {
        await addArticleSortList({ ...fields });
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
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');
    try {
        await updateRule({
            type: fields.type,
            journalismDescribe: fields.journalismDescribe,
            id: fields.id,
        });
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
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
    const hide = message.loading('正在删除');
    try {
        await removeRule({
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


const Classification: React.FC = () => {
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({});
    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    const actionRef = useRef<ActionType>();

    const confirmAdd = (newData: TableListItem) => {
        setAddModalVisible(false);
        handleAdd(newData);
        actionRef.current?.reloadAndRest?.();
    };

    const removeSingleRow = (selectedRows: TableListItem[]) => {
        handleRemove(selectedRows)
        setSelectedRows([]);
        actionRef.current?.reloadAndRest?.();
    }

    const columns: ProColumns<TableListItem>[] = [
        {
            title: '文章分类名称',
            dataIndex: 'type',
            valueType: 'textarea',
        },
        {
            title: '描述',
            dataIndex: 'journalismDescribe',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '分类级别',
            dataIndex: 'typeLevel',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '上级分类名称',
            dataIndex: 'parentType',
            valueType: 'textarea',
        },
        {
            title: '排序',
            dataIndex: 'sort',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否显示在导航栏',
            dataIndex: 'isRecommend',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '关键字',
            dataIndex: 'keyword',
            valueType: 'textarea',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a onClick={() => {
                    setUpdateModalVisible(true);
                    setFormValues(record);
                }}>编辑</a>,
                <a onClick={() => removeSingleRow([record])}>删除</a>
            ],
        },
    ]
    return (
        <PageContainer
            header={{
                title: '文章分类管理',
            }}
        >
            <ProTable<TableListItem>
                actionRef={actionRef}
                options={{ search: false, fullScreen: false, reload: true, setting: false, density: false }}
                rowKey="id"
                search={{
                    labelWidth: 120,
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
                request={formatRequestListParams(getArticleSortList)}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
                        </div>
                    }
                >
                    <Button
                        onClick={() => {
                            removeSingleRow(selectedRowsState);
                        }}
                    >
                        批量删除
                    </Button>
                    <Button type="primary">批量审批</Button>
                </FooterToolbar>
            )}
            <AddModal
                visible={addModalVisible}
                onFinish={confirmAdd}
                onCancel={() => setAddModalVisible(false)} />
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
                    setFormValues({});
                }}
                updateModalVisible={updateModalVisible}
                values={formValues}
            />
        </PageContainer>
    )
}

export default Classification;
