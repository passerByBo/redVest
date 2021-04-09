import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Switch } from 'antd';
import AddFormModal from './components/AddFormModal'
import ProTable from '@ant-design/pro-table';

import { rule } from '@/services/ant-design-pro/rule';


const SpecificationModel: React.FC = () => {


  const actionRef = useRef<ActionType>()

  const [addFormModalVisible, setAddFormModalVisible] = useState(true);
  const columns: ProColumns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      valueType: 'textarea'
    },
    {
      title: '模板描述',
      dataIndex: 'desc',
      search: false,
      valueType: 'textarea'
    },
    {
      title: '创建人',
      dataIndex: 'user',
      valueType: 'textarea'
    },
    {
      title: '创建时间',
      dataIndex: 'updatedAt',
      search: false,
      valueType: 'dateTime'
    },
    {
      title: '是否启用',
      dataIndex: 'user',
      search: false,
      render: (_, record) => (
        <Switch defaultChecked onChange={(() => { })} />
      )
    }
  ]

  return (
    <PageContainer
      header={{
        title: '规格模板库',
      }}>
      <ProTable
        actionRef={actionRef}
        rowKey='id'
        request={rule}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => { }}>
            <ExportOutlined /> 导出
          </Button>,
          <Button type="primary" onClick={() => {setAddFormModalVisible(true) }}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => { },
        }}
      >

      </ProTable>

      <AddFormModal visible={addFormModalVisible} onOk={() => {setAddFormModalVisible(false)}} onCancel={() => {setAddFormModalVisible(false)}}/>
    </PageContainer>
  )
}

export default SpecificationModel;
