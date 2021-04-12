import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import type { FormValueType } from './components/UpdateModal';
import { queryRule, updateRule, addRule, removeRule } from './service';
import AddModal from './components/AddModal'
import UpdateModal from './components/UpdateModal'

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
    const hide = message.loading('正在添加');
    try {
        await addRule({ ...fields });
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('正在配置');
    try {
        await updateRule({
            articleName: fields.articleName,
            desc: fields.desc,
            key: fields.key,
        });
        hide();
        message.success('配置成功');
        return true;
    } catch (error) {
        hide();
        message.error('配置失败请重试！');
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
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.key),
        });
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};


const Classification: React.FC = () => {

    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);

    const [formValues, setFormValues] = useState({});

    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    const actionRef = useRef<ActionType>();

    const onFinish = (newData: TableListItem) => {
        handleAdd(newData);
        if (actionRef.current) {
            actionRef.current.reload();
        }
        setAddModalVisible(false);
    };

    const removeSingleRow = (itemData: TableListItem) => {
        const keys: number[] = [itemData.key];
        removeRule({
            key: keys,
        });
        message.success('删除成功，即将刷新');
        actionRef.current?.reloadAndRest?.();
    }


    const columns: ProColumns<TableListItem>[] = [
        {
            title: '序号',
            dataIndex: 'key',
            valueType: 'index',
            search: false,
        },
        {
            title: '文章分类名称',
            dataIndex: 'articleName',
            valueType: 'textarea',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '分类级别',
            dataIndex: 'sortLevel',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '上级分类名称',
            dataIndex: 'parentTypeName',
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
            dataIndex: 'isShow',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '关键字',
            dataIndex: 'keywords',
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
                <a onClick={() => removeSingleRow(record)}>删除</a>
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
                rowKey="key"
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
                request={(params) => queryRule({ ...params })}
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
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                    <Button type="primary">批量审批</Button>
                </FooterToolbar>
            )}
            <AddModal
                visible={addModalVisible}
                onFinish={onFinish}
                onCancel={() => setAddModalVisible(false)} />
            <UpdateModal
                onSubmit={async (value) => {
                    console.log('UpdateModal', value);
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
