import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
    ModalForm,
    ProFormText,
    ProFormTextArea,
    ProFormSelect,
    ProFormDateRangePicker,
    DrawerForm,
    ProFormRadio,
    ProFormDatePicker,
    ProFormUploadDragger,
    ProFormSwitch
} from '@ant-design/pro-form';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import UpdateForm from './components/UpdateForm';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';

type ProductListItem = {
    id: string,
    topicName: string,
    productBrandId: string,
    isEffective: string,
    isShow: string,
    isRecommented: string,
    [key: string]: string,
}
const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

//编辑商品
// const [editProduct, setEditProduct] = useState<ProductListItem>();
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: API.RuleListItem) => {
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
            name: fields.name,
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

const handleRemove = async (selectedRows: API.RuleListItem[]) => {
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
const Thematic: React.FC = () => {
    /** 新建窗口的弹窗 */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /** 分布更新窗口的弹窗 */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: '专题组',
            dataIndex: 'name',
            render: (dom, entity) => {
                return (
                    <a
                        onClick={() => {
                            setCurrentRow(entity);
                            setShowDetail(true);
                        }}
                    >
                        {dom}
                    </a>
                );
            },
        },
        {
            title: '专题名称',
            dataIndex: 'status',
            valueType: 'textarea',
        },
        {
            title: '标签',
            dataIndex: 'status',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否有效',
            dataIndex: 'name',
            search: false,
            render: (dom, entity) => {
                return (
                    <a
                        onClick={() => {
                            alert('专题组图片')
                        }}
                    >
                        {dom}
                    </a>
                );
            },
        },
        {
            title: '专题描述',
            sorter: true,
            search: false,
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
        },
        {
            title: '专题名称图片',
            sorter: true,
            search: false,
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
        },
        {
            title: '排序',
            search: false,
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: '专题类型',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                    }}
                >
                    编辑
              </a>,
            ],
        },
        {
            title: '专题类型图片',
            search: false,
            dataIndex: 'desc',
            valueType: 'textarea',
        }
    ]


    return (
        <PageContainer>
            <ProTable<API.RuleListItem, API.PageParams>
                actionRef={actionRef}
                rowKey="key"
                search={{ labelWidth: 120 }}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => { handleModalVisible(true) }}>
                        <PlusOutlined />新建
                    </Button>
                ]}
                request={rule}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            >

            </ProTable>
            {
                selectedRowsState?.length > 0 && (
                    <FooterToolbar
                        extra={
                            <div>
                                已选择{''}
                                <a style={{
                                    fontWeight: 600,
                                }}>
                                    {selectedRowsState.length}
                                </a>
                                    项 &nbsp;&nbsp;
                                    <span>
                                    这里可以统计已选项的一些参数{selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
                                    </span>
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
                )
            }
            <ModalForm
                title='新建专题'
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(value as API.RuleListItem);

                    if (success) {
                        handleModalVisible(false);

                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProForm.Group>
                    <ProFormText width="md" name="name" label="专题组" placeholder="请输入名称" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="name" label="专题名称" placeholder="请输入名称" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="name" label="专题副标题" placeholder="请输入名称" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="contract" label="标签" placeholder="请输入名称" />
                </ProForm.Group>

                <ProFormUploadDragger max={4} label="专题组图片" name="productsPics" />

                <ProForm.Group>
                    <ProFormTextArea width="xl" label="专题组描述" name="remark" />
                </ProForm.Group>

                <ProFormSwitch name="isShow" label="是否有效" />

                <ProForm.Group>
                    <ProFormText width="md" name="contract" label="排序" placeholder="请输入名称" />
                </ProForm.Group>
            </ModalForm>
            <DrawerForm
                visible={showDetail}
                // title={editProduct ? editProduct.productName : '专题组'}
                onVisibleChange={setShowDetail}
                onFinish={async () => {
                    await waitTime(2000)
                    message.success('提交成功');
                    return true;
                }}
                submitter={{
                    render: (props, defaultDoms) => {
                        return [
                            <Button
                                key="save"
                                type="primary"
                                onClick={() => {
                                    props.submit();
                                }}
                            >
                                保存
                             </Button>
                        ];
                    },
                }}
            >
                <ProForm.Group>
                    <ProFormText width="md" name="name" label="专题组" placeholder="请输入名称" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="name" label="专题名称" placeholder="请输入名称" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="name" label="专题副标题" placeholder="请输入名称" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="contract" label="标签" placeholder="请输入名称" />
                </ProForm.Group>

                <ProFormUploadDragger max={4} label="专题组图片" name="productsPics" />

                <ProForm.Group>
                    <ProFormTextArea width="xl" label="专题组描述" name="remark" />
                </ProForm.Group>

                <ProFormSwitch name="isShow" label="是否有效" />

                <ProForm.Group>
                    <ProFormText width="md" name="contract" label="排序" placeholder="请输入名称" />
                </ProForm.Group>
            </DrawerForm>
        </PageContainer>
    )
}

export default Thematic;
