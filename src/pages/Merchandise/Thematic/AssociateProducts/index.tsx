import { getProductListByThematic, getThematicDetail, updateProductList } from '@/services/merchandise/thematic';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { EyeOutlined } from '@ant-design/icons';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Descriptions, FormInstance, Image, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useRequest, history } from 'umi';
import { ProductListItem } from '..';



const AssociateProducts: React.FC<any> = () => {

  const [thrmaticDetail, setThrmaticDetail] = useState<ProductListItem & { specialProductInfoList?: Array<any> }>({});
  const [selectedRowsState, setSelectedRows] = useState<ProductListItem[]>([]);

  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const [selectedProductState, setSelectedProducts] = useState<ProductListItem[]>([]);

  const [selectProductVisible, setSelectProductVisible] = useState(false);


  let { location: { query } } = history;

  const { loading, run } = useRequest(getThematicDetail.bind(null, { id: (query as any).id }), {
    manual: true,
    onSuccess: (result, params) => {
      if (result && result.id) {
        setThrmaticDetail(result)
      } else {
        message.error('专题信息加载失败，请刷新重试')
      }
    }
  })

  useEffect(() => {
    run();
  }, [])

  useEffect(() => {
    selectProductVisible && actionRef?.current?.reload();

    //清空选择框的选择内容
    if (!selectProductVisible) {
      setSelectedProducts([])
    }
  }, [selectProductVisible])

  const description = (
    <RouteContext.Consumer>
      {
        ({ isMobile }) => (
          <Descriptions size="small" column={isMobile ? 1 : 3}>
            <Descriptions.Item label="专题组">{thrmaticDetail.specialGroup}</Descriptions.Item>
            <Descriptions.Item label="专题名称">{thrmaticDetail.specialName}</Descriptions.Item>
            <Descriptions.Item label="专题组副标题">{thrmaticDetail.specialNameTitle}</Descriptions.Item>
            <Descriptions.Item label="标签">{thrmaticDetail.labelname}</Descriptions.Item>
            <Descriptions.Item label="是否有效">{thrmaticDetail.isValid === 'Y' ? '是' : '否'}</Descriptions.Item>
            <Descriptions.Item label="排序">{thrmaticDetail.sort}</Descriptions.Item>

            <Descriptions.Item label="专题图片">
              <Image
                style={{ borderRadius: 3 }}
                preview={{ mask: <EyeOutlined /> }}
                width={40}
                height={40}
                src={thrmaticDetail.specialNameImg1 && thrmaticDetail.specialNameImg1[0] && thrmaticDetail.specialNameImg1[0].imgUrl}
              />
            </Descriptions.Item>
            <Descriptions.Item label="专题描述">{thrmaticDetail.specialDescribe}</Descriptions.Item>
          </Descriptions>
        )
      }
    </RouteContext.Consumer>
  )

  const productColumns: unknown[] = [
    {
      title: '商品编码',
      dataIndex: 'productNo',
    },
    {
      title: '商品分类名称',
      dataIndex: 'typeName',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
    },
    {
      title: '商品主图',
      dataIndex: 'proLogoImg1',
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
      title: '商品副标题',
      dataIndex: 'productTitle',
    },
    {
      title: '商铺名称',
      dataIndex: 'shopname',
      valueType: 'textarea',
    },
    {
      title: '商品品牌',
      dataIndex: 'productBrand',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: 'label',
    },
    {
      title: '包含SKU数',
      dataIndex: 'skuCount',

    },
    {
      title: 'SKU告急库存',
      dataIndex: 'skuHurryCount',
    },

  ]

  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '商品编码',
      dataIndex: 'productNo',
    },
    {
      title: '专题名称',
      dataIndex: 'specialName',
    },
    {
      title: '商品分类名称',
      dataIndex: 'typeName',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
      width: 300,
    },
    {
      title: '商品主图',
      dataIndex: 'proLogoImg1',
      render: (_: any, record: any) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={40}
            src={_ && Array.isArray(_) && _[0] && _[0].imgUrl}
          />
        )
      },
      search: false
    },
    {
      title: '商品副标题',
      dataIndex: 'productTitle',
      search: false
    },
    {
      title: '商铺名称',
      dataIndex: 'shopname',
      valueType: 'textarea',
    },
    {
      title: '商品品牌',
      dataIndex: 'productBrand',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: 'label',
      search: false,
    },
    {
      title: '包含SKU数',
      dataIndex: 'skuCount',
      search: false,

    },
    {
      title: 'SKU告急库存',
      dataIndex: 'skuHurryCount',
      search: false,
    },



  ]

  const handleSelectOk = async () => {

    let hide = message.loading('商品正在添加中')
    try {
      let params = {
        flag: 'add',
        specialId: (query as any).id,
        specialName: thrmaticDetail.specialName,
        specialGroup: thrmaticDetail.specialGroup,
        ids: selectedProductState.map(item => item.id).join(',')
      }
      let result = await updateProductList(params);

      if (result.status === 200 && result.code !== 200) {
        hide();
        message.error(result.msg);
        return;
      }
      hide();
      message.success('商品添加成功');
      setSelectProductVisible(false)
      run();
    } catch (error) {
      hide();
      message.error(error.msg);
    }

  }

  const handleDeleteProduct = async () => {

    if (selectedRowsState.length === 0) {
      message.warning('请选择要删除的商品')
      return;
    }
    let hide = message.loading('商品正在删除中')
    try {
      let params = {
        flag: 'delete',
        specialId: (query as any).id,
        specialName: thrmaticDetail.specialName,
        specialGroup: thrmaticDetail.specialGroup,
        ids: selectedRowsState.map(item => item.id).join(',')
      }
      let result = await updateProductList(params);

      if (result.status === 200 && result.code !== 200) {
        hide();
        message.error(result.msg);
        return;
      }
      hide();
      message.success('商品删除成功');
      setSelectProductVisible(false)
      run();
    } catch (error) {
      hide();
      message.error(error.msg);
    }

    //删除后清空选择的数据
    setSelectedRows([]);
    run();
  }

  return (
    <PageContainer
      title={'关联商品'}
      loading={loading}
      content={description}
    >
      <ProTable
        headerTitle={thrmaticDetail.specialName}
        columns={productColumns as any}
        dataSource={(thrmaticDetail && thrmaticDetail.specialProductInfoList) || []}
        rowKey="id"
        pagination={false}
        search={false}
        toolBarRender={() => [
          <Button key="danger" danger onClick={() => handleDeleteProduct()}>
            删除
          </Button>,
          <Button type="primary" key="primary" onClick={() => { setSelectProductVisible(true) }}>
            添加商品
          </Button>,

        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows([...selectedRows]);
          },
        }}
      >
      </ProTable>
      <Modal title="选择商品" width={'80%'} visible={selectProductVisible} onOk={() => { handleSelectOk() }} onCancel={() => { setSelectProductVisible(false) }}>
        <ProTable<ProductListItem, API.PageParams>
          pagination={{
            pageSize: 10,
          }}
          tableAlertRender={false}
          tableAlertOptionRender={false}
          actionRef={actionRef}
          rowKey="id"
          formRef={formRef}
          search={{ labelWidth: 120 }}
          request={formatRequestListParams(getProductListByThematic, { specialId: (query as any).id })}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedProducts([...selectedRows]);
            },
          }}
        >

        </ProTable>
      </Modal>

    </PageContainer >
  )
}

export default AssociateProducts;
