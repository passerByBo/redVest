import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useCallback } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Image, Popconfirm, FormInstance } from 'antd';
import ProTable from '@ant-design/pro-table';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { addThematic, deleteThematic,  exportThematic,  getThematicList, updateThematic } from '@/services/merchandise/thematic';
import UpdateForm from './components/UpdateForm'
import AddForm from './components/AddForm';
import DetailDrawer from './components/DetailDrawer';
import { formatYAndN } from '@/utils/utils';
import Export from '@/components/Export';
export type ProductListItem = {
  id?: string;
  specialGroupId?: string;
  specialGroup?: string;
  specialName?: string;
  specialNameTitle?: string;
  labelname?: string;
  isValid?: string;
  sort?: number;
  specialNameImg1?: string;
  specialDescribe?: string;
  specialTypeImg?: string;
};

const Thematic: React.FC = () => {
  const formRef = useRef<FormInstance>();
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  //新增窗口
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  //编辑和新增选择的数据都保存在这里
  const [currentRow, setCurrentRow] = useState<ProductListItem | null>(null);
  const [selectedRowsState, setSelectedRows] = useState<ProductListItem[]>([]);



  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '专题名称',
      dataIndex: 'specialName',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '专题组',
      dataIndex: 'specialGroup',
    },
    {
      title: '标签',
      dataIndex: 'labelname',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '是否有效',
      dataIndex: 'isValid',
      search: false,
      render: (_) => {
        return <span>{formatYAndN(_ as any)}</span>
      }
    },
    {
      title: '专题描述',
      search: false,
      dataIndex: 'specialDescribe',
    },
    {
      title: '专题名称图片',
      search: false,
      dataIndex: 'specialNameImg1',
      render: (_:any, record:any) => {
        return (
          <Image
            preview={{ mask: <EyeOutlined /> }}
            width={40}
            src={_ && _[0].imgUrl}
          />
        )
      }
    },
    {
      title: '排序',
      search: false,
      dataIndex: 'sort',
      valueType: 'textarea',
    },
    // {
    //   title: '专题类型',
    //   dataIndex: 'specialType',
    //   valueType: 'textarea',
    // },
    // {
    //   title: '专题类型图片',
    //   search: false,
    //   dataIndex: 'specialTypeImg',
    //   render: (_:any, record:any) => {
    //     return (
    //       <Image
    //         preview={{ mask: <EyeOutlined /> }}
    //         width={40}
    //         src={_ && _[0].imgUrl}
    //       />
    //     )
    //   }
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      search: false,
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true)
          }}
        >
          编辑
        </a>,
        <Popconfirm
          placement="topRight"
          title={'确定要删除' + '吗？'}
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

      ],
    }
  ]

  const handleUpdateCancel = useCallback(() => {
    handleUpdateModalVisible(false)
  }, [])

  const handleDelete = async (data: any) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteThematic(data.id);
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
      let res = await updateThematic({ ...fields });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('编辑失败请重试！');
        return;
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
      let res = await addThematic({ ...fields });
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
    <PageContainer>
      <ProTable<ProductListItem>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Export request={exportThematic.bind(null, { ...(formRef.current?.getFieldsValue() || {}) })}/>,
          <Button type="primary" key="primary" onClick={() => { handleAddModalVisible(true) }}>
            <PlusOutlined />新建
                    </Button>
        ]}
        request={formatRequestListParams(getThematicList)}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      >

      </ProTable>
      {/* {
        selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{''}
                <a style={{
                  fontWeight: 600,
                }}>
                  {selectedRowsState.length}
                </a>
                                    项 &nbsp;&nbsp;
                                    <span>
                  这里可以统计已选项的一些参数{selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
                                    </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
                            </Button>
            <Button type="primary">批量审批</Button>
          </FooterToolbar>
        )
      } */}


      <AddForm onCancel={handleAddCancel}
        onSubmit={handleAddSubmit}
        addModalVisible={addModalVisible} />

      <UpdateForm onCancel={handleUpdateCancel}
        onSubmit={handleUpdateSubmit}
        values={currentRow}
        updateModalVisible={updateModalVisible} />

      {currentRow && <DetailDrawer detailVisible={showDetail} data={currentRow} onCancel={() => setShowDetail(false)} />}
    </PageContainer>
  )
}

export default Thematic;


