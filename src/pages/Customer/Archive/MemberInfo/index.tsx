import React, { useRef } from 'react';
import { ExportOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';

import type { TableListItem } from './data.d';
import { getList } from '@/services/customer/memberInfo';
import formatRequestListParams from '@/utils/formatRequestListParams';

const MemberInfo: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: '注册日期',
      dataIndex: 'applydate',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '企业名称',
      dataIndex: 'companyname',
      valueType: 'textarea',
    },
    {
      title: '企业类型',
      dataIndex: 'companytype',
      valueType: 'textarea',
    },
    {
      title: '会员姓名',
      dataIndex: 'username',
      valueType: 'textarea',
    },
    {
      title: '账号',
      dataIndex: 'status',
      valueType: 'textarea',
    },
    {
      title: '手机号',
      dataIndex: 'moble',
      valueType: 'textarea',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '消费积分',
      dataIndex: 'consumeIntegral',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '余额',
      dataIndex: 'balance',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'rolename',
      valueType: 'textarea',
    },
  ];
  return (
    <PageContainer
      header={{
        title: '会员信息管理',
      }}
    >
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="会员信息管理"
        actionRef={actionRef}
        rowKey="key"
        options={{ search: false, fullScreen: false, reload: true, setting: false, density: false }}
        search={{
          labelWidth: 100,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => { }}>
            <ExportOutlined /> 导出
          </Button>,
        ]}
        request={formatRequestListParams(getList)}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => { },
        }}
      />
    </PageContainer>
  );
};

export default MemberInfo;
