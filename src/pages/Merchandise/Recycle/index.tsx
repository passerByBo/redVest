import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Image, Divider, Popconfirm, message, FormInstance } from 'antd';
import ProTable from '@ant-design/pro-table';
import { deleteRecycle, exportProduct, getProductList, resetRecycle } from '@/services/merchandise/product';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { EyeOutlined } from '@ant-design/icons';
import { getIds } from '@/utils/utils';
import Export from '@/components/Export';
type ProductListItem = {
  id: string,
  shopname: string,
  productNo: string,
  skuHurryCount: string,
  skuCount: string,
  proLogoImg1: string,
  label: string,
  typeName: string,
  productName: string,
  productStatus: string,
  spuSalesVolume: string,
  [key: string]: string,
}

const Recycle: React.FC = () => {
  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();

  const resetProduct = async (data: ProductListItem | ProductListItem[]) => {
    const hide = message.loading('正在还原');
    try {
      let ids = getIds<ProductListItem>(data);
      const res = await resetRecycle({ ids, action: '还原' });
      if (res.status === 200 && res.code === 200) {
        hide();
        message.success('还原成功！');
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return;
      }

      hide();
      message.error('还原失败请重试！');
    } catch (error) {
      hide();
      message.error('还原失败，' + error.msg);
    }
  }

  const handleDelete = async (data: any) => {
    const hide = message.loading('正在删除');
    try {
      let ids = getIds<ProductListItem>(data);
      const res = await deleteRecycle({ ids, action: '删除' });
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

  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '商品编码',
      dataIndex: 'productNo',
    },
    {
      title: '商品图片',
      dataIndex: 'imgUrl',
      search: false,
      render: (_: any, record: any) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={40}
            src={_ && Array.isArray(_) && _[0] && _[0].imgUrl}
          />
        )
      },
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
    },
    {
      title: '商铺名称',
      dataIndex: 'shopname',
      valueType: 'textarea',
    },
    // {
    //   title: '专题名称',
    //   dataIndex: 'xxxxxxx',
    //   valueType: 'textarea',
    // },
    {
      title: '商品分类',
      dataIndex: 'typeName',
    },
    {
      title: '商品品牌',
      dataIndex: 'productBrand',
      valueType: 'textarea',
    },
    // {
    //   title: 'SKU库存',
    //   dataIndex: 'xxxxxxx',
    //   search: false,
    // },

    {
      title: '销量',
      dataIndex: 'spuSalesVolume',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => { resetProduct(record) }}>还原</a>
          <Divider type="vertical" />
          <Popconfirm
            placement="topRight"
            title={<p>确定要彻底删除商品编号{record.productNo}的商品吗吗？<br />彻底删除后不可还原</p>}
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
        </>
      )
    }
  ]

  return (
    <PageContainer
      header={{
        title: '商品回收站',
      }}>
      <ProTable<ProductListItem, API.PageParams>
        toolBarRender={() => [
          <Export request={exportProduct.bind(null, { ...(formRef.current?.getFieldsValue() || {}), productStatus: '已回收' })} />,
        ]}
        formRef={formRef}
        tableAlertOptionRender={false}
        tableAlertRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        request={formatRequestListParams(getProductList, { productStatus: '已回收' })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
          },
        }}

      >

      </ProTable>
    </PageContainer>
  )
}

export default Recycle;
