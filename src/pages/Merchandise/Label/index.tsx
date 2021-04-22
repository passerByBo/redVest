import React, { useRef, useState } from 'react';
import { ExportOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Space } from 'antd';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import LabelForm from './component/labelForm';
const Label: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const [modelFormVisible, setModelFormVisible] = useState(false);

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
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
            }}
          >
            编辑
        </a>
          <Divider type="vertical" />
          <a key="subscribeAlert">
            禁用
        </a>
          <Divider type="vertical" />
          <a key="subscribeAlert">
            置顶
       </a>
          <Divider type="vertical" />
          <a key="subscribeAlert">
            上移
      </a>
        </>
      )
    },
  ];

  return (
    <PageContainer
      header={{
        title: '标签管理',
      }}>
      <ProTable
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="primary"
            onClick={() => {
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
          <Button
            key="primary1"
            onClick={() => {
            }}
          >
            <StopOutlined />禁用
         </Button>,
          <Button
            onClick={() => setModelFormVisible(true)}
            key="primary2"
            type="primary"
          >
            <PlusOutlined /> 新建
        </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {

          },
        }}
      />
      <LabelForm visible={modelFormVisible}  setModalVisit={setModelFormVisible}></LabelForm>
    </PageContainer>
  )
}

export default Label;
