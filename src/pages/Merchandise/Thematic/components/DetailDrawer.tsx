import { getThematicDetail } from '@/services/merchandise/thematic';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Drawer, Image, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProductListItem } from '..';
import { useRequest } from 'umi';
import { EyeOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table';
interface IDetailDrawerProps {
  detailVisible?: boolean;
  data?: ProductListItem | null
  onCancel: () => void
}

export interface IProduct {
  productBrand: string;
  shopname: string;
  productStatus: string;
  productNo: string;
  productName: string;
  specialId: string;
}

type productArr = {
  specialProductInfoList: IProduct[];
}

const tableColumns:ProColumns<IProduct>[] = [
  {
    title: '商铺名称',
    dataIndex: 'shopname',
  },
  {
    title: '商品名称',
    dataIndex: 'productName',
  },
  {
    title: '商品货号',
    dataIndex: 'productNo',
  },
  {
    title: '商品品牌',
    dataIndex: 'productBrand',
  },
  {
    title: '商品状态',
    dataIndex: 'productStatus',
  }
]

const DetailDrawer: React.FC<IDetailDrawerProps> = (props) => {

  const detailColumns: unknown[] = [
    {
      title: '专题数据ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '专题组数据ID',
      key: 'specialGroupId',
      dataIndex: 'specialGroupId',
    },
    {
      title: '专题组名称',
      key: 'specialGroup',
      dataIndex: 'specialGroup',
    },
    {
      title: '专题名称',
      key: 'specialName',
      dataIndex: 'specialName',
    },
    {
      title: '专题副标题',
      key: 'specialNameTitle',
      dataIndex: 'specialNameTitle',
    },
    {
      title: '标签',
      key: 'labelname',
      dataIndex: 'labelname',
    },
    {
      title: '是否有效',
      key: 'isValid',
      dataIndex: 'isValid',
    },
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
    },

    {
      title: '专题描述',
      key: 'specialDescribe',
      dataIndex: 'specialDescribe',
    },
    {
      title: '专题类型',
      key: 'specialType',
      dataIndex: 'specialType',
    },
    {
      title: '专题图片',
      key: 'specialNameImg1',
      dataIndex: 'specialNameImg1',
      render: (_) => {
        return (
          <Image
            style={{ borderRadius: 3 }}
            preview={{ mask: <EyeOutlined /> }}
            width={100}
            height={100}
            src={_ as string}
          />
        )
      }
    },
    {
      title: '专题组图片',
      key: 'specialTypeImg',
      dataIndex: 'specialTypeImg',
      render: (_) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={80}
            src={_ as string}
          />
        )
      }
    },
  ]

  const { detailVisible, data, onCancel } = props;
  const [dataSource, setDataSource] = useState<(ProductListItem & productArr) | null>(null)
  const { loading, run } = useRequest(getThematicDetail.bind(null, { id: (data as ProductListItem).id }), {
    manual: true,
    onSuccess: (result, params) => {
      setDataSource(result)
    }
  })


  useEffect(() => {
    if (detailVisible) {
      run();
    }
  }, [detailVisible])





  return (
    <Drawer
      title={'专题详情'}
      width={700}
      visible={detailVisible}
      onClose={() => {
        onCancel();
      }}
      closable={false}
    >
      <ProDescriptions
        loading={loading}
        column={2}
        title={data?.specialGroup}
        dataSource={ dataSource}
        columns={detailColumns}
      />

      <Table
        columns={tableColumns}
        rowKey={record => record.specialId}
        dataSource={dataSource?.specialProductInfoList}
        pagination={false}
        loading={loading}
        bordered
      />

    </Drawer>
  )
}

export default DetailDrawer;
