import React, { useRef, useState } from 'react';
import { PlusOutlined, ImportOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSwitch,

} from '@ant-design/pro-form'

import { rule } from '@/services/ant-design-pro/rule';
const Area: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const [addFormVisible, setModalVisit] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: '代码',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '上级代码',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '中文名称',
      dataIndex: 'name',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '省级名称',
      dataIndex: 'name',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '地级市名称',
      dataIndex: 'status',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '县级名称',
      dataIndex: 'name',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '邮政编码',
      dataIndex: 'callNo',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '有效性',
      dataIndex: 'status',
      valueType: 'textarea',
      search: false,
    },
  ]
  return (
    <PageContainer
      header={{
        title: '省市区管理',
      }}
    >
      <ProTable<API.RuleListItem, API.PageParams>
        search={false}
        headerTitle="省市区管理"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setModalVisit(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
            }}
          >
            <ImportOutlined />数据导入
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          },
        }}
      />

      {
        selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{' '}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
              项 &nbsp;&nbsp;
              <span>

                </span>
              </div>
            }
          >
            <Button type='primary' danger>批量删除</Button>
          </FooterToolbar>
        )
      }

      {/* 新增省市区表单 */}
      <ModalForm
        title='新建省市区信息'
        visible={addFormVisible}
        onFinish={async () => { return true }}
        onVisibleChange={setModalVisit}
      >

        <ProForm.Group>
          <ProFormText width='md' name='code' label='代码' rules={[{ required: true, message: '请输入代码' }]} />
          <ProFormText width='md' name='code2' label='上级代码' rules={[{ required: true, message: '请输入上级代码' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='chname' label='中文名称' rules={[{ required: true, message: '请输入中文名称' }]} />
          <ProFormText width='md' name='areaname' label='省级名称' rules={[{ required: true, message: '请输入省级名称' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='code' label='地级市名称' rules={[{ required: true, message: '请输入地级市名称' }]} />
          <ProFormText width='md' name='code2' label='县级名称' rules={[{ required: true, message: '请输入县级名称' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='code' label='邮政编码' rules={[{ required: true, message: '请输入邮政编码' }]} />
          <ProFormText width='md' name='code2' label='节点类型' rules={[{ required: true, message: '请输入节点类型' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='code' label='控制类型' rules={[{ required: true, message: '请输入控制类型' }]} />
          <ProFormSwitch name="isShow" label="有效性" />
        </ProForm.Group>

      </ModalForm>
    </PageContainer>
  )
}

export default Area;
