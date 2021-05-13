import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useCallback, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Switch } from 'antd';
// import AddFormModal from './components/AddFormModal'
import ProTable from '@ant-design/pro-table';

import formatRequestListParams from '@/utils/formatRequestListParams';
import { getSpecModelList, addSpecModel, deleteSpecMode, updateSpecMode } from '@/services/merchandise/model';
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import DetailDrawer from './components/DetailDrawer';

export interface ISpecationModel {
  id?: string;
  isValid?: string;
  specModelName?: string;
  specModelDescribe?: string;
  shopId?: string;
  specInfo?: string;
  createuser?: string;
  updatedate?: string;
}


const SpecificationModel: React.FC = () => {
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  //新增窗口
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  //编辑和新增选择的数据都保存在这里
  const [currentRow, setCurrentRow] = useState<ISpecationModel | null>(null);
  const [selectedRowsState, setSelectedRows] = useState<ISpecationModel[]>([]);


  const columns: ProColumns = [
    {
      title: '模板名称',
      dataIndex: 'specModelName',
      valueType: 'textarea'
    },
    {
      title: '模板描述',
      dataIndex: 'specModelDescribe',
      search: false,
      valueType: 'textarea'
    },
    {
      title: '创建人',
      dataIndex: 'createuser',
      valueType: 'textarea'
    },
    {
      title: '创建时间',
      dataIndex: 'createdate',
      search: false,
      valueType: 'dateTime'
    },
    {
      title: '是否启用',
      dataIndex: 'user',
      search: false,
      render: (_, record) => {
        const checked = _ === 'Y' ? true : false;
        return (
          <span>{checked ? '启用' : '禁用'}</span>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => {
        const checked = record.isValid === 'Y' ? true : false;
        return <a>{checked ? '禁用' : '启用'}</a>
       }
    }
  ]


  const handleUpdateCancel = useCallback(() => {
    handleUpdateModalVisible(false)
  }, [])

  const handleDelete = async (data: any) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteSpecMode(data.id);
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
      let res = await updateSpecMode({ ...fields });
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
      let res = await addSpecModel({ ...fields });
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
    <PageContainer
      header={{
        title: '规格模板库',
      }}>
      <ProTable
        actionRef={actionRef}
        rowKey='id'
        request={formatRequestListParams(getSpecModelList)}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => { }}>
            <ExportOutlined /> 导出
          </Button>,
          <Button type="primary" onClick={() => { handleAddModalVisible(true) }}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => { },
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

      {/* <AddFormModal visible={addFormModalVisible} onOk={() => {setAddFormModalVisible(false)}} onCancel={() => {setAddFormModalVisible(false)}}/> */}


    </PageContainer>
  )
}

export default SpecificationModel;

