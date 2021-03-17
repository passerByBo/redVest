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
} from '@ant-design/pro-form';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import UpdateForm from './components/UpdateForm';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { getProductTypeList } from '@/services/merchandise/product';
import type { FormValueType } from './components/UpdateForm';
/**
 * 添加节点
 *
 * @param fields
 */
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
const MerchandiseType: React.FC = () => {
    /** 新建窗口的弹窗 */
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    /** 分布更新窗口的弹窗 */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
    //编辑商品
    const [editProduct, setEditProduct] = useState<ProductListItem>()
    const columns: ProColumns<ProductListItem>[] = [
        {
            title: '商品类型编号',
            dataIndex: 'id',
            render: ((_, item) => {
                return (
                    <a onClick={() => { setEditProduct(item); setShowDetail(true) }}>{_}</a>
                )
            })
        },
        {
            title: '商品类型名称',
            dataIndex: 'topicName',
            valueType: 'textarea',
        },
        {
            title: '级别',
            dataIndex: 'productBrandId',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '上级分类',
            dataIndex: 'topicName',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否有效',
            dataIndex: 'isEffective',
            valueType: 'textarea',
        },
        {
            title: '排序号',
            search: false,
            dataIndex: 'productBrandId',
            valueType: 'textarea',
        },
        {
            title: '类型图片',
            search: false,
            dataIndex: 'imageType',
            valueType: 'textarea',
        },
        {
            title: '是否展示',
            dataIndex: 'isShow',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommented',
            valueType: 'textarea',
            search: false,
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
                request={getProductTypeList}
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
            <UpdateForm
                onSubmit={async (value: any) => {
                    console.log("UpdateForm");
                    const success = await handleUpdate(value);

                    if (success) {
                        handleUpdateModalVisible(false);
                        setCurrentRow(undefined);

                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalVisible(false);
                    setCurrentRow(undefined);
                }}
                updateModalVisible={updateModalVisible}
                values={currentRow || {}}
            />
            <ModalForm
                title='新建专题组'
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
                    <ProFormText
                        width="md"
                        name="name"
                        label="签约客户名称"
                        tooltip="最长为 24 位"
                        placeholder="请输入名称"
                    />

                    <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
                    <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
                </ProForm.Group>
                <ProForm.Group>
                    <ProFormSelect
                        options={[
                            {
                                value: 'chapter',
                                label: '盖章后生效',
                            },
                        ]}
                        width="xs"
                        name="useMode"
                        label="合同约定生效方式"
                    />
                    <ProFormSelect
                        width="xs"
                        options={[
                            {
                                value: 'time',
                                label: '履行完终止',
                            },
                        ]}
                        name="unusedMode"
                        label="合同约定失效效方式"
                    />
                </ProForm.Group>
                <ProFormText width="sm" name="id" label="主合同编号" />
                <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
                <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
            </ModalForm>
            <DrawerForm
                visible={showDetail}
                title={editProduct ? editProduct.productName : '商品基础信息'}
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
                <ProForm.Group title='商品基本信息'>
                    <ProFormText width="md" name="sortWeights" label="排序" placeholder="请填排序权重！" />
                    <ProFormText width="md" name="categories" label="商品分类" placeholder="请填写商品分类！" rules={[{ required: true, message: '请填写商品分类！' }]} />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="sortWeights" label="专题名称" placeholder="请填专题名称！" rules={[{ required: true, message: '请填专题名称！' }]} />
                    <ProFormText width="md" name="categories" label="商品名称" placeholder="请填写商品名称！" rules={[{ required: true, message: '请填写商品名称！' }]} />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="sortWeights" label="商品简称" placeholder="请填写商品简称！" />
                    <ProFormText width="md" name="categories" label="商品修饰语" placeholder="请填写商品修饰语！" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="sortWeights" label="商品品牌" placeholder="请填写商品品牌！" />
                    <ProFormText width="md" name="categories" label="商品规格" placeholder="请填写商品规格！" rules={[{ required: true, message: '请填写商品规格！' }]} />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormRadio.Group
                        name="radio"
                        label="状态"
                        options={[
                            {
                                label: '上架',
                                value: '上架',
                            },
                            {
                                label: '下架',
                                value: '下架',
                            }
                        ]}
                    />

                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="categories" label="商品介绍" placeholder="请填写商品介绍！" />
                    <ProFormText width="md" name="sortWeights" label="商品货号" placeholder="请填商品货号！" rules={[{ required: true, message: '请填商品货号！' }]} />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="categories" label="库存数量" placeholder="请填写库存数量！" />
                    <ProFormText width="md" name="sortWeights" label="本店售价" placeholder="请填本店售价！" />
                </ProForm.Group>

                <ProForm.Group>
                    <ProFormText width="md" name="categories" label="市场售价" placeholder="请填写市场售价！" />
                    <ProFormText width="md" name="sortWeights" label="返现比例" placeholder="请填返现比例！" />
                </ProForm.Group>

                <ProForm.Group title='营销信息'>
                    <ProFormText width="md" name="categories" label="市场售价" placeholder="请填写市场售价！" />
                    <ProFormText width="md" name="sortWeights" label="返现比例" placeholder="请填返现比例！" />
                </ProForm.Group>


            </DrawerForm>
        </PageContainer>
    )
}

export default MerchandiseType;
