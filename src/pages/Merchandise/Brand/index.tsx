import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Image, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { addBrand, deleteBrand, exportBrand, getBrandList, updateBrand } from '@/services/merchandise/product';
import formatRequestListParams from '@/utils/formatRequestListParams';
import DetailDrawer from './components/DetailDrawer';
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import { formatYAndN } from '@/utils/utils';
import Export from '@/components/Export';

const isvalidEnum = {
  Y: { text: '通过', status: 'Y' },
  N: { text: '不通过', status: 'N' },
};

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
  const [selectedRowsState, setSelectedRows] = useState<IBrand[]>([]);


  const columns: ProColumns<IBrand>[] = [
    {
      title: '商品品牌',
      dataIndex: 'productBrand',
      render: ((_, item: IBrand) => {
        return (
          <a onClick={() => { setCurrentRow(item); setShowDetail(true) }}>{_}</a>
        )
      })
    },
    {
      title: '品牌编号',
      dataIndex: 'brandNo',
      valueType: 'textarea',
    },
    {
      title: '品牌logo',
      dataIndex: 'logo',
      search: false,
      render: (_: any, record: any) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={40}
            src={Array.isArray(_) && _[0] && _[0].imgUrl}
          />
        )
      }
    },
    {
      title: '品牌专区大图',
      dataIndex: 'brandImg',
      search: false,
      render: (_: any, record: any) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={40}
            src={Array.isArray(_) && _[0] && _[0].imgUrl}
          />
        )
      }
    },
    {
      title: '排序',
      sorter: true,
      search: false,
      dataIndex: 'sort',
      valueType: 'digit',
    },
    {
      title: '是否推荐',
      search: false,
      dataIndex: 'isRecommend',
      render: (_) => {
        return <span>{formatYAndN(_ as any)}</span>
      }

    },
    {
      title: '是否展示',
      search: false,
      dataIndex: 'isShow',
      render: (_) => {
        return <span>{formatYAndN(_ as any)}</span>
      }
    },
    {
      title: '是否有效',
      dataIndex: 'isvalid',
      search: false,
      render: (_) => {
        return <span>{formatYAndN(_ as any)}</span>
      }
    },
    {
      title: '是否审核通过',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: isvalidEnum,
      render: (_, data) => {
        return <span>{formatYAndN((data as any).status)}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      search: false,
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true)
          }}
        >
          编辑
        </a>,
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
      const res = await deleteBrand(data.id);
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
        return;
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
      let res = await addBrand({ ...fields });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('新增失败请重试！');
        return false;
      }
      hide();
      message.success('新增成功');

    } catch (error) {
      hide();
      message.error('新增失败请重试！');
      return false;
    }

    handleAddModalVisible(false);

    if (actionRef.current) {
      actionRef.current.reload();
    }
    return true;

  }, [])



  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Export request={exportBrand}/>,
          <Button type="primary" key="primary" onClick={() => { handleAddModalVisible(true) }}>
            <PlusOutlined />新建
                    </Button>
        ]}
        request={formatRequestListParams(getBrandList)}
        columns={columns}
      // rowSelection={{
      //   onChange: (_, selectedRows) => {
      //     setSelectedRows(selectedRows);
      //   },
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
