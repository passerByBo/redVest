import React, { useRef, useState } from 'react';
import { PlusOutlined, ImportOutlined } from '@ant-design/icons';
import { Button, message, Form } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSwitch,
} from '@ant-design/pro-form'

import { getAreaList, removeArea, addArea } from '@/services/operation/index';
import formatRequestListParams from '@/utils/formatRequestListParams';

type TableListType = {
  id: string;
  itemno: string;
  pno: string;
  cnname: string;
  exttext1: string;
  exttext2: number;
  exttext3: string;
  exttext4: number;
  isactive: string;
}

const columns: ProColumns<TableListType>[] = [
  {
    title: '代码',
    dataIndex: 'itemno',
    valueType: 'textarea',
  },
  {
    title: '上级代码',
    dataIndex: 'pno',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '中文名称',
    dataIndex: 'cnname',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '省级名称',
    dataIndex: 'exttext1',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '地级市名称',
    dataIndex: 'exttext2',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '县级名称',
    dataIndex: 'exttext3',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '邮政编码',
    dataIndex: 'exttext4',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '有效性',
    dataIndex: 'isactive',
    valueEnum: {
      0: { text: '无效' },
      1: { text: '有效' },
    },
    search: false,
  },
]

/**
 * 删除节点
 */
const handleRemove = async (selectedRows: TableListType[]) => {
  const hide = message.loading('正在删除');
  try {
    await removeArea({
      ids: selectedRows.map((row) => row.id).join(','),
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败！');
    return false;
  }
};

/**
 * 添加节点
 */
const handleAdd = async (fields: TableListType) => {
  const hide = message.loading('正在添加');
  try {
    await addArea({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败！');
    return false;
  }
};

const Area: React.FC<TableListType> = () => {
  const [addForm] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const [addFormVisible, setModalVisit] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState<TableListType[]>([]);

  // 增加
  const confirmAdd = (newData: TableListType) => {
    setModalVisit(false);
    handleAdd(newData);
    actionRef.current?.reloadAndRest?.();
  };

  // 删除
  const removeSingleRow = (selectedRows: TableListType[]) => {
    handleRemove(selectedRows)
    setSelectedRows([]);
    actionRef.current?.reloadAndRest?.();
  }

  return (
    <PageContainer
      header={{
        title: '省市区管理',
      }}
    >
      <ProTable<TableListType>
        search={false}
        headerTitle="省市区管理"
        actionRef={actionRef}
        rowKey="id"
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
        request={formatRequestListParams(getAreaList)}
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
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
              </div>
            }
          >
            <Button
              onClick={() => {
                removeSingleRow(selectedRowsState);
              }}
              type='primary'
              danger>批量删除</Button>
          </FooterToolbar>
        )
      }

      {/* 新增省市区表单 */}
      <ModalForm
        form={addForm}
        title='新建省市区信息'
        visible={addFormVisible}
        onFinish={async (data) => {
          const fields = { ...data }
          if (fields.isactive === true) {
            fields.isactive = '1';
          } else {
            fields.isactive = '0';
          }
          confirmAdd(fields);
        }}
        onVisibleChange={setModalVisit}
      >
        <ProForm.Group>
          <ProFormText width='md' name='itemno' label='代码' rules={[{ required: true, message: '请输入代码' }]} />
          <ProFormText width='md' name='pno' label='上级代码' rules={[{ required: true, message: '请输入上级代码' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='cnname' label='中文名称' rules={[{ required: true, message: '请输入中文名称' }]} />
          <ProFormText width='md' name='exttext1' label='省级名称' rules={[{ required: true, message: '请输入省级名称' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='exttext2' label='地级市名称' rules={[{ required: true, message: '请输入地级市名称' }]} />
          <ProFormText width='md' name='exttext3' label='县级名称' rules={[{ required: true, message: '请输入县级名称' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='exttext4' label='邮政编码' rules={[{ required: true, message: '请输入邮政编码' }]} />
          <ProFormText width='md' name='isleaf' label='节点类型' rules={[{ required: true, message: '请输入节点类型' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width='md' name='issys' label='控制类型' rules={[{ required: true, message: '请输入控制类型' }]} />
          <ProFormSwitch name="isactive" label="有效性" />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  )
}

export default Area;
