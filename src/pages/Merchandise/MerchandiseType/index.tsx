import { DeleteOutlined, ExclamationCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Modal, Popconfirm, Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { addMerchandiseType, deleteMerchandiseType, getMerchandiseTypeList, updateMerchandiseType } from '@/services/merchandise/merchandiseType'
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import DetailDrawer from './components/DetailDrawer';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { formatYAndN } from '@/utils/utils';

export interface IMerchandiseType {
  id: string;
  typeLevel: number | string;
  typeName: string;
  typeNo: string;
  parentLevel: string;
  parentLevelId: string;
  isShow: string | boolean;
  isValid: boolean | string;
  orderNo: string;
  typeDescribe: string;
}


//保存当前页面的数据
let loadData:IMerchandiseType[] = [];

const MerchandiseType: React.FC = () => {
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  //新增窗口
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  //编辑和新增选择的数据都保存在这里
  const [currentRow, setCurrentRow] = useState<IMerchandiseType>();
  const [selectedRowsState, setSelectedRows] = useState<IMerchandiseType[]>([]);

  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const columns: ProColumns<IMerchandiseType>[] = [
    {
      title: '商品类型编号',
      dataIndex: 'typeNo',
      valueType: 'textarea',
    },
    {
      title: '商品类型名称',
      dataIndex: 'typeName',
      valueType: 'textarea',
      // render: ((_, item) => {
      //   return (
      //     <a onClick={() => { setCurrentRow(item); setShowDetail(true) }}>{_}</a>
      //   )
      // })
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
      render: (_,data) => {
        return <span>{formatYAndN((data as any).isValid)}</span>
      }
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
      search: false,
      render: (_) => {
        return <span>{formatYAndN(_ as any)}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      search: false,
      width: 200,
      render: (text, record, _, action) => {

        return <Space>
          <a
            key="editable"
            onClick={() => {
              setCurrentRow(record);
              handleUpdateModalVisible(true)
            }}
          >
            编辑
        </a>
          <Popconfirm
            placement="topRight"
            title={'确定要删除' + '吗？'}
            onConfirm={() => { handleDelete(record.id) }}
            okText="确认"
            cancelText="取消"
          >
            <a
              key="delete"
            >
              删除
                </a>
          </Popconfirm>
          {
            record.typeLevel == '1' && <a key="add" onClick={() => { setCurrentRow(record); handleAddModalVisible(true) }}>新增下一级</a>
          }
        </Space>

      }
    }
  ]

  const handleUpdateCancel = useCallback(() => {
    handleUpdateModalVisible(false)
    setCurrentRow(undefined)
  }, [])

  const handleDelete = async (ids: string) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteMerchandiseType(ids);
      if (res.status === 200 && res.code === 200) {
        //过滤选中的key
        setExpandedRowKeys([...(expandedRowKeys.filter((id) => !ids.includes(id)))])
        hide();
        message.success('删除成功！');
        if (actionRef.current) {
          actionRef?.current?.reload();
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

  async function handleDeleteRows() {
    if (selectedRowsState.length < 1) {
      message.warning('请选择要删除的分类！')
      return;
    }
    let level1Types = selectedRowsState.filter((item) => item.typeLevel === '1');
    let content = '';
    if (level1Types.length > 0) {
      content = '将删除' + level1Types.map((item) => item.typeName).join(',') + '下的所有二级分类。'
    }
    Modal.confirm({
      title: '确定要删除选中的分类吗',
      icon: <ExclamationCircleOutlined />,
      content: content,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        let ids = selectedRowsState.map((item) => item.id).join(',')
        handleDelete(ids);
      }
    });
  }

  const handleUpdateSubmit = useCallback(async (fields) => {
    const hide = message.loading('正在编辑');
    try {
      let res = await updateMerchandiseType({ ...fields });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('编辑失败请重试！');
        return false;
      }
      hide();
      message.success('编辑成功');
      handleUpdateModalVisible(false);
      setCurrentRow(undefined);

      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      hide();
      message.error('编辑失败请重试！');
      return false;
    }



  }, [])

  const handleAddCancel = useCallback(() => {
    handleAddModalVisible(false)
    setCurrentRow(undefined);
  }, [])

  const handleAddSubmit = useCallback(async (fields) => {
    const hide = message.loading('正在增加');
    try {
      let res = await addMerchandiseType({ ...fields });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('新增失败请重试！');
        return false;
      }
      hide();
      message.success('新增成功');
      handleAddModalVisible(false);
      setCurrentRow(undefined);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      hide();
      message.error('新增失败请重试！');
      return false;
    }



  }, [])

  function handleUnfold() {
    setExpandedRowKeys(loadData.map((item) => item.id));
  }



  return (
    <PageContainer>
      <ProTable<IMerchandiseType>
        expandable={
          {
            expandedRowKeys: expandedRowKeys,
            onExpand: (expanded, record) => {
              if (expanded) {
                setExpandedRowKeys([...expandedRowKeys, record.id])
              } else {
                setExpandedRowKeys([...expandedRowKeys.filter((id) => id !== record.id)])
              }
            }
          }
        }
        tableAlertOptionRender={false}
        tableAlertRender={false}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }}
        onLoad={(dataSource) => {
          loadData = [...dataSource]
        }}
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Button key="unfold" onClick={() => { handleUnfold() }}>
            <MenuUnfoldOutlined />
            全部展开
          </Button>,
          <Button key="fold" onClick={() => { setExpandedRowKeys([]) }}>
            <MenuFoldOutlined />
            全部关闭
          </Button>,
          <Button danger key="delete" onClick={() => { handleDeleteRows() }}>
            <DeleteOutlined />
            删除
          </Button>,
          <Button type="primary" key="primary" onClick={() => { handleAddModalVisible(true) }}>
            <PlusOutlined />新增一级分类
                    </Button>
        ]}
        request={formatRequestListParams(getMerchandiseTypeList)}
        columns={columns}
      // rowSelection={{
      //   onChange: (_, selectedRows) => {
      //     setSelectedRows(selectedRows);
      //   },
      // }}
      >

      </ProTable>
      <AddForm
        onCancel={handleAddCancel}
        level={currentRow}
        onSubmit={handleAddSubmit}
        addModalVisible={addModalVisible} />

      <UpdateForm onCancel={handleUpdateCancel}
        onSubmit={handleUpdateSubmit}
        values={{...(currentRow as any)}}
        updateModalVisible={updateModalVisible} />

      { currentRow && <DetailDrawer detailVisible={showDetail} data={currentRow} onCancel={() => { setShowDetail(false); setCurrentRow(undefined) }} />}
    </PageContainer >
  )
}

export default MerchandiseType;
