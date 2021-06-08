import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Image, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { updateBrand } from '@/services/merchandise/product';
import { addBanner, deleteBanner, getBannerList } from '@/services/marketing/banner';
import formatRequestListParams from '@/utils/formatRequestListParams';
import DetailDrawer from './components/DetailDrawer';
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';

export interface IBrand {
    id: string;
    brandDescribe: string;
    productBrand: string;
    brandNo: string;
    logo: string;
    brandImg: string;
    isvalid: string;
    sort: string;
    isShow: string;
    isRecommend: string;
    status: string;
}

const Brand: React.FC = () => {
    /** 分布更新窗口的弹窗 */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    //新增窗口
    const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    //编辑和新增选择的数据都保存在这里
    const [currentRow, setCurrentRow] = useState<IBrand | null>(null);

    const columns: ProColumns<IBrand>[] = [
        {
            title: '名称',
            dataIndex: 'specialName',
            valueType: 'textarea',
        },
        {
            title: '类型',
            dataIndex: 'type',
            valueType: 'textarea',
        },
        {
            title: '专题图片',
            dataIndex: 'specialImg',
            search: false,
            render: (_: any, record: any) => {
                return (
                    _.map((item: any) => {
                        return <Image
                            preview={{ mask: <EyeOutlined /> }}
                            width={40}
                            src={item.imgUrl}
                        />
                    })

                )
            }
        },
        {
            title: '是否有效',
            dataIndex: 'isValid',
            search: false,
            valueEnum: {
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        {
            title: '排序',
            sorter: true,
            search: false,
            dataIndex: 'sort',
            valueType: 'digit',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            search: false,
            width: 200,
            render: (text, record, _, action) => [
                <Popconfirm
                    placement="topRight"
                    title={'确定要删除' + '吗？'}
                    onConfirm={() => { handleDelete(record) }}
                    okText="确认"
                    cancelText="取消"
                >
                    <a
                        key="delete"
                    >
                        删除
                </a>
                </Popconfirm>

            ],
        }
    ]


    const handleUpdateCancel = useCallback(() => {
        handleUpdateModalVisible(false)
    }, [])

    const handleDelete = async (data: any) => {
        const hide = message.loading('正在删除');
        try {
            const res = await deleteBanner(data.id);
            if (res.status === 200 && res.code === 200) {
                hide();
                message.success('删除成功！');
                if (actionRef.current) {
                    actionRef.current.reload();
                }
                return;
            }

            hide();
            message.error('删除失败请重试！');
        } catch (error) {
            hide();
            message.error('删除失败请重试！');
        }
    }

    const handleUpdateSubmit = useCallback(async (fields) => {
        const hide = message.loading('正在编辑');
        try {
            let res = await updateBrand({ ...fields });
            if (res.status === 200 && res.code !== 200) {
                hide();
                message.error('编辑失败请重试！');
            }
            hide();
            message.success('编辑成功');
        } catch (error) {
            hide();
            message.error('编辑失败请重试！');
        }

        handleUpdateModalVisible(false);

        if (actionRef.current) {
            actionRef.current.reload();
        }

    }, [])

    const handleAddCancel = useCallback(() => {
        handleAddModalVisible(false)
    }, [])

    const handleAddSubmit = useCallback(async (fields) => {
        const hide = message.loading('正在增加');
        try {
            let res = await addBanner({ ...fields });
            if (res.status === 200 && res.code !== 200) {
                hide();
                message.error('新增失败请重试！');
            }
            hide();
            message.success('新增成功');
        } catch (error) {
            hide();
            message.error('新增失败请重试！');
        }

        handleAddModalVisible(false);

        if (actionRef.current) {
            actionRef.current.reload();
        }

    }, [])



    return (
        <PageContainer>
            <ProTable
                actionRef={actionRef}
                rowKey="id"
                search={{ labelWidth: 120 }}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => { handleAddModalVisible(true) }}>
                        <PlusOutlined />新建
                    </Button>
                ]}
                request={formatRequestListParams(getBannerList)}
                columns={columns}
            // rowSelection={{
            //     onChange: (_, selectedRows) => {
            //         setSelectedRows(selectedRows);
            //     },
            // }}
            >

            </ProTable>

            <AddForm onCancel={handleAddCancel}
                onSubmit={handleAddSubmit}
                addModalVisible={addModalVisible} />

            <UpdateForm onCancel={handleUpdateCancel}
                onSubmit={handleUpdateSubmit}
                values={currentRow}
                updateModalVisible={updateModalVisible} />

            {currentRow && <DetailDrawer detailVisible={showDetail} data={currentRow} onCancel={() => setShowDetail(false)} />}
        </PageContainer>
    )
}

export default Brand;
