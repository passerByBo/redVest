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

import { getArticleSortList, addArticleSortList, removeRule, updateRule } from '@/services/marketing/announcement';
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
            ...fields
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

const Announcement: React.FC = () => {
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({});
    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    const actionRef = useRef<ActionType>();

    const confirmAdd = async (newData: TableListItem) => {
        const res = await handleAdd(newData);
        if (res) {
            setAddModalVisible(false);
            actionRef.current?.reloadAndRest?.();
        }
    };

    const removeSingleRow = async (selectedRows: TableListItem[]) => {
        const res = await handleRemove(selectedRows)
        if (res) {
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
        }
    }

    const columns: ProColumns<TableListItem>[] = [
        {
            title: '文章分类名称',
            dataIndex: 'type',
            valueType: 'textarea',
        },
        {
            title: '文章标题',
            dataIndex: 'title',
            valueType: 'textarea',
        },
        {
            title: '文章重要性',
            dataIndex: 'isRecommend',
            valueType: 'textarea',
        },
        {
            title: '是否展示',
            dataIndex: 'isShow',
            valueType: 'textarea',
        },
        {
            title: '外部链接',
            dataIndex: 'urladdress',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '作者',
            dataIndex: 'author',
            valueType: 'textarea',
        },
        {
            title: '发布时间',
            dataIndex: 'releaseDate',
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
                title: '公告管理',
            }}
        >
            <ProTable<TableListItem>
                actionRef={actionRef}
                rowKey="id"
                options={{ search: false, fullScreen: false, reload: true, setting: false, density: false }}
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
                    <Button danger
                        onClick={() => {
                            removeSingleRow(selectedRowsState);
                        }}
                    >
                        批量删除
                    </Button>
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

export default Announcement;
