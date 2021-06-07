import React, { useCallback, useRef, useState } from 'react';
import { DeleteOutlined,PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, FormInstance, message, Popconfirm } from 'antd';

import formatRequestListParams from '@/utils/formatRequestListParams';
import AddForm from './component/AddForm';
import UpdateForm from './component/UpdateForm';
import { addUnit, deleteUnit, exportUnit, getUnitList, updateUnit } from '@/services/merchandise/unit';
import Export from '@/components/Export';

export interface IUnit {
  id: string;
  productUnit: string;
}



const Unit: React.FC = () => {
  const formRef = useRef<FormInstance>();
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  //新增窗口
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  //编辑和新增选择的数据都保存在这里
  const [currentRow, setCurrentRow] = useState<IUnit | null>(null);
  const [selectedRowsState, setSelectedRows] = useState<IUnit[]>([]);




  const columns: ProColumns<IUnit>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '单位名称',
      dataIndex: 'productUnit',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            key="config"
            onClick={() => {
              setCurrentRow(record);
              handleUpdateModalVisible(true);
            }}
          >
            编辑
        </a>
          <Divider type="vertical" />
          <Popconfirm
            placement="topRight"
            title={'确定要删除' + record.productUnit + '吗？'}
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
    },
  ];

  const handleUpdateCancel = useCallback(() => {
    handleUpdateModalVisible(false)
  }, [])

  const parseIds = (data: IUnit | IUnit[]) => {
    let ids = '';
    if (Array.isArray(data)) {
      let idArr = data.map(item => item.id);
      ids = idArr.join(',');
    } else {
      ids = data.id;
    }

    return ids;
  }

  const handleDelete = async (data: IUnit | IUnit[]) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteUnit(parseIds(data));
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
      let res = await updateUnit({ ...fields });
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
      let res = await addUnit({ ...fields });
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
    <PageContainer
      header={{
        title: '单位管理',
      }}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        tableAlertOptionRender={false}
        tableAlertRender={false}
        search={{
          labelWidth: 120,
        }}
        formRef={formRef}
        toolBarRender={() => [
          <Export request={exportUnit.bind(null, { ...(formRef.current?.getFieldsValue() || {}) })} />,
          <Popconfirm
            placement="topRight"
            title={'确定要删除选中的所有单位' + '吗？'}
            onConfirm={() => { handleDelete(selectedRowsState) }}
            okText="确认"
            cancelText="取消"
          >
            <Button
              key="delete"
              danger
            >
              <DeleteOutlined />删除
        </Button>
          </Popconfirm>,
          // <Button
          //   key="primary"
          //   onClick={() => {
          //   }}
          // >
          //   <ExportOutlined /> 导出
          // </Button>,
          <Button
            onClick={() => { handleAddModalVisible(true) }}
            key="primary2"
            type="primary"
          >
            <PlusOutlined /> 新建
        </Button>,
        ]}
        request={formatRequestListParams(getUnitList)}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          },
        }}
      />
      <AddForm onCancel={handleAddCancel}
        onSubmit={handleAddSubmit}
        addModalVisible={addModalVisible} />

      <UpdateForm onCancel={handleUpdateCancel}
        onSubmit={handleUpdateSubmit}
        values={currentRow}
        updateModalVisible={updateModalVisible} />

    </PageContainer>
  )
}

export default Unit;
