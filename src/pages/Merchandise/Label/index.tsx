import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDateRangePicker,
  DrawerForm,
  ProFormRadio,
  ProFormDatePicker,
  ProFormUploadDragger,
  ProFormSwitch
} from '@ant-design/pro-form';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import UpdateForm from './components/UpdateForm';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import { getBrandList } from '@/services/merchandise/product';
import { queryRule } from './service';
const Label: React.FC = () => {

  const actionRef = useRef<ActionType>();


  const columns: ProColumns<any> = [
    {
      title: '',
      dataIndex: 'callNo',

    },

  ]

  return (
    <PageContainer
      header={{
        title: '标签管理',
      }}>
      {/* <ProTablegit
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
            }}
          >
            <PlusOutlined /> "新建"
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      /> */}
    </PageContainer>
  )
}

export default Label;
