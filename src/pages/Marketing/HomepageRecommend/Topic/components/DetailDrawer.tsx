import ProDescriptions from '@ant-design/pro-descriptions';
import { Drawer, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { EyeOutlined } from '@ant-design/icons';
import { IBrand } from '..';
import { getBrandDetail } from '@/services/merchandise/product';
import { getTopicDetail } from '@/services/marketing/topic';
interface IDetailDrawerProps {
  detailVisible?: boolean;
  data?: IBrand | null
  onCancel: () => void
}

const DetailDrawer: React.FC<IDetailDrawerProps> = (props) => {

  const detailColumns: unknown[] = [
    {
      title: '专题名称',
      dataIndex: 'specialName',
    },
    {
      title: '专题描述',
      dataIndex: 'specialDescribe',
    },
    {
      title: '专题图片',
      dataIndex: 'specialImg',
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
      dataIndex: 'isValid',
    },
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
    },
  ]

  const { detailVisible, data, onCancel } = props;
  const [dataSource, setDataSource] = useState<IBrand | null>(null)
  const { loading, run } = useRequest(getTopicDetail.bind(null, { id: (data as IBrand).id }), {
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
