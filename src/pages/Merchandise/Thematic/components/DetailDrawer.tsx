import { getThematicDetail } from '@/services/merchandise/thematic';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Drawer, Image } from 'antd';
import React from 'react';
import { ProductListItem } from '..';
import { useRequest } from 'umi';
import { EyeOutlined } from '@ant-design/icons';
interface IDetailDrawerProps {
  detailVisible?: boolean;
  data?: ProductListItem | null
  onCancel: () => void
}

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

  const { detailVisible, data ,onCancel} = props;

  //由于上个页面已经执行了初始化操作，在上个页面这里未显示的情况下会导致提前执行
  //不可使用useMemo+React.memo的方式进行初始化，因为React.memo里面不能使用useRequest
  //现有问题每次进来不重新请求
  const { data: dataSource, error, loading } = useRequest(() => {
    return getThematicDetail({ id: (data as ProductListItem).id });
  });


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
      <ProDescriptions<API.RuleListItem>
        loading={loading}
        column={2}
        title={data?.specialGroup}
        dataSource={dataSource}
        columns={detailColumns}
      />


    </Drawer>
  )
}

export default DetailDrawer;
