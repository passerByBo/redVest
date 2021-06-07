import React, { useCallback, useRef, useState } from 'react';
import { ExportOutlined, PlusOutlined, StopOutlined, UpCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message } from 'antd';
import { addLabel, deleteLabel, exportLabel, getLabelList, updateLabel, validLabel } from '@/services/merchandise/label';
import formatRequestListParams from '@/utils/formatRequestListParams';
import AddForm from './component/AddForm';
import UpdateForm from './component/UpdateForm';
import { formatYAndN } from '@/utils/utils';
import Export from '@/components/Export';

export interface ILabel {
  id: string;
  labelname: string;
  isValid: string;
}



const Label: React.FC = () => {
  const formRef = useRef<FormInstance>();
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  //新增窗口
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  //编辑和新增选择的数据都保存在这里
  const [currentRow, setCurrentRow] = useState<ILabel | null>(null);
  const [selectedRowsState, setSelectedRows] = useState<ILabel[]>([]);

  const parseBody = (data: ILabel | ILabel[], flag: boolean) => {
    let body = { ids: '', isValid: flag ? 'Y' : 'N' };
    if (Array.isArray(data)) {
      let idsArr: string[] = [];
      idsArr = data.map(item => item.id)
      body.ids = idsArr.join(',')
    } else {
      body.ids = data.id;
    }
    return body;
  }

  const handleValid = useCallback(async (data: ILabel | ILabel[], flag: boolean) => {
    const valid = flag;
    const tap = valid ? '启用' : '禁用'

    if (Array.isArray(data) && data.length === 0) {
      message.warning(`请选择要${tap}的标签`)
      return;
    }

    const hide = message.loading(`正在${tap}`);
    try {
      const body = parseBody(data, valid)
      const res = await validLabel(body);
      if (res.status === 200 && res.code === 200) {
        hide();
        message.success(`${tap}成功！`);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        hide();
        message.error(`${tap}失败,${res.msg}！`);
      }
    } catch {
      hide();
      message.error(`${tap}失败请重试！`);
    }
  }, [])

  const columns: ProColumns<ILabel>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '标签名称',
      dataIndex: 'labelname',
      valueType: 'textarea',
      // tip: '规则名称是唯一的 key',
    },
    {
      title: '是否有效',
      dataIndex: 'isValid',
      search: false,
      render: (_) => {
        return <span>{formatYAndN(_ as 'Y' | 'N')}</span>
      }
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
          <a key="subscribeAlert" onClick={() => handleValid(record, record.isValid !== 'Y')}>
            {record.isValid === 'Y' ? '启用' : '禁用'}
          </a>
        </>
      )
    },
  ];

  const handleUpdateCancel = useCallback(() => {
    handleUpdateModalVisible(false)
  }, [])

  const handleDelete = async (data: any) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteLabel(data.id);
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
      let res = await updateLabel({ ...fields });
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
      let res = await addLabel({ ...fields });
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
        title: '标签管理',
      }}>
      <ProTable
       formRef={formRef}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Export request={exportLabel.bind(null, { ...(formRef.current?.getFieldsValue() || {}) })}/>,
          <Button
            key="primary1"
            onClick={() => {
              handleValid(selectedRowsState, false)
            }}
          >
            <StopOutlined />禁用
         </Button>,
          <Button
            key="primary1"
            onClick={() => {
              handleValid(selectedRowsState, true)
            }}
          >
            <UpCircleOutlined />启用
      </Button>,
          <Button
            onClick={() => { handleAddModalVisible(true) }}
            key="primary2"
            type="primary"
          >
            <PlusOutlined /> 新建
        </Button>,
        ]}
        request={formatRequestListParams(getLabelList)}
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

export default Label;
