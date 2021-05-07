import { getThematicDetail } from '@/services/merchandise/thematic';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Drawer, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { EyeOutlined } from '@ant-design/icons';
import { IBrand } from '..';
import { getBrandDetail } from '@/services/merchandise/product';
interface IDetailDrawerProps {
  detailVisible?: boolean;
  data?: IBrand | null
  onCancel: () => void
}

const DetailDrawer: React.FC<IDetailDrawerProps> = (props) => {

  const detailColumns: unknown[] = [
    {
      title: '品牌ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '品牌名称',
      key: 'productBrand',
      dataIndex: 'productBrand',
    },
    {
      title: '品牌编号',
      key: 'brandNo',
      dataIndex: 'brandNo',
    },
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
    },
    {
      title: '品牌Logo',
      key: 'logo',
      dataIndex: 'logo',
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
      title: '品牌专区大图',
      key: 'brandImg',
      dataIndex: 'brandImg',
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
      title: '是否有效',
      key: 'isvalid',
      dataIndex: 'isvalid',
    },

    {
      title: '是否展示',
      key: 'isShow',
      dataIndex: 'isShow',
    },

    {
      title: '是否推荐',
      key: 'isRecommend',
      dataIndex: 'isRecommend',
    },
    {
      title: '是否审核通过',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '品牌描述',
      key: 'brandDescribe',
      dataIndex: 'brandDescribe',
    }
  ]

  const { detailVisible, data, onCancel } = props;
  const [dataSource, setDataSource] = useState<IBrand | null>(null)
  const { loading, run } = useRequest(getBrandDetail.bind(null, { id: (data as IBrand).id }), {
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
      title={'品牌详情'}
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
        title={data?.productBrand}
        dataSource={dataSource}
        columns={detailColumns}
      />

    </Drawer>
  )
}

export default DetailDrawer;
