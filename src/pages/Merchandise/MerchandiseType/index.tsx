import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useCallback } from 'react';
import { PageContainer} from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Popconfirm} from 'antd';
import ProTable from '@ant-design/pro-table';
import { addMerchandiseType, deleteMerchandiseType, getMerchandiseTypeList, updateMerchandiseType } from '@/services/merchandise/merchandiseType'
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import DetailDrawer from './components/DetailDrawer';
import formatRequestListParams from '@/utils/formatRequestListParams';

export interface IMerchandiseType {
  id: string;
  typeLevel: number;
  typeName: string;
  typeNo: string;
  parentLevel: string;
  parentLevelId: string;
  isShow: string;
  isValid: boolean | number;
  orderNo: string;
  typeDescribe: string;
}

const MerchandiseType: React.FC = () => {
    /** 分布更新窗口的弹窗 */
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    //新增窗口
    const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    //编辑和新增选择的数据都保存在这里
    const [currentRow, setCurrentRow] = useState<IMerchandiseType | null>(null);
    const [selectedRowsState, setSelectedRows] = useState<IMerchandiseType[]>([]);

  const columns: ProColumns<IMerchandiseType>[] = [
    {
      title: '商品类型编号',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: '商品类型名称',
      dataIndex: 'typeName',
      valueType: 'textarea',
      render: ((_, item) => {
        return (
          <a onClick={() => { setCurrentRow(item); setShowDetail(true) }}>{_}</a>
        )
      })
    },
    {
      title: '级别',
      dataIndex: 'typeLevel',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '上级分类',
      dataIndex: 'parentLevel',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '是否有效',
      dataIndex: 'isValid',
      valueType: 'textarea',
    },
    {
      title: '排序号',
      search: false,
      dataIndex: 'orderNo',
      valueType: 'textarea',
    },
    {
      title: '是否展示',
      dataIndex: 'isShow',
      valueType: 'textarea',
      search: false,
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
      const res = await deleteMerchandiseType(data.id);
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
      let res = await updateMerchandiseType({ ...fields });
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
      let res = await addMerchandiseType({ ...fields });
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
      <ProTable<IMerchandiseType>
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => { handleAddModalVisible(true) }}>
            <PlusOutlined />新建
                    </Button>
        ]}
        request={formatRequestListParams(getMerchandiseTypeList)}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
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

export default MerchandiseType;
