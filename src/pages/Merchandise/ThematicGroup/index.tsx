import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Drawer, Form, message, Popconfirm, Upload, Image } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSwitch,
  ProFormDigit
} from '@ant-design/pro-form';
import { getThematicGroupList, addThematicGroup, editThematicGroup, getThematicGroupDetail, deleteThematicGroup } from '@/services/merchandise/thematicGroup';
import formatRequestListParams from '@/utils/formatRequestListParams';
import ProDescriptions from '@ant-design/pro-descriptions';
import ImagePicker from '@/components/ImagePicker';
import { formatYAndN } from '@/utils/utils';
type ThematicGroupListItem = {
  id: string,
  isValid: string | boolean,
  endDate: string,
  sort?: number | string,
  isShow: string,
  specialGroup: string,
  specialGroupDescribe: string,
  specialGroupImgBig?: any;
  // [key: string]: string,
}


const detailColumns = [
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: '专题组名称',
    key: 'specialGroup',
    dataIndex: 'specialGroup',
  },
  {
    title: '开始日期',
    key: 'specialGroup',
    dataIndex: 'specialGroup',
  },
  {
    title: '结束日期',
    key: 'endDate',
    dataIndex: 'endDate',
  },
  {
    title: '专题组描述',
    key: 'specialGroupDescribe',
    dataIndex: 'specialGroupDescribe',
  },
  {
    title: '排序',
    key: 'sort',
    dataIndex: 'sort',
  },
  {
    title: '是否有效',
    key: 'isValid',
    dataIndex: 'isValid',
    render: (_: any) => {
      return formatYAndN(_)
    }
  },
  {
    title: '专题组图片',
    key: 'specialGroupImgBig',
    dataIndex: 'specialGroupImgBig',
    render: (_) => {
      return (
        <Image
          preview={{ mask: <EyeOutlined /> }}
          width={80}
          src={_ && Array.isArray(_) && _[0] && _[0].imgUrl}
        />
      )
    }
  },
]

/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    // await removeRule({
    //   key: selectedRows.map((row) => row.key),
    // });
    // hide();
    // message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const ThematicGroup: React.FC = () => {

  const [updateForm] = Form.useForm();

  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<ThematicGroupListItem[]>([]);
  //编辑商品
  const [editProduct, setEditProduct] = useState<ThematicGroupListItem | null>(null);

  //选择
  const [currentRow, setCurrentRow] = useState<ThematicGroupListItem | undefined>();


  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (editProduct) {
      updateForm.setFieldsValue({ ...initUpdateForm(editProduct) });
    } else {
      updateForm.resetFields();
    }
  }, [editProduct])


  const initUpdateForm = (data: ThematicGroupListItem): object => {
    if (!data) return {};
    let newData: ThematicGroupListItem = { ...data };
    if (newData.isValid === 'Y') {
      newData.isValid = true;
    } else {
      newData.isValid = false;
    }
    newData.specialGroupImgBig = Array.isArray(newData.specialGroupImgBig) ? newData.specialGroupImgBig.map((item) => item.id).join(',') : ''
    return newData;
  }

  const handleDelete = async (data: any) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteThematicGroup(data.id);
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

  const columns: ProColumns<ThematicGroupListItem>[] = [
    {
      title: '专题组名称',
      dataIndex: 'specialGroup',
      render: ((_, item) => {
        return (
          <a onClick={() => { setCurrentRow(item); setShowDetail(true) }}>{_}</a>
        )
      })
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
      title: '排序',
      dataIndex: 'sort',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '专题组图片',
      dataIndex: 'specialGroupImgBig',
      search: false,
      render: (_: any, record: any) => {
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
      title: '开始日期',
      sorter: true,
      dataIndex: 'startDate',
      valueType: 'date',
    },
    {
      title: '结束日期',
      sorter: true,
      dataIndex: 'endDate',
      valueType: 'date',
    },
    {
      title: '专题组描述',
      search: false,
      dataIndex: 'specialGroupDescribe',
      valueType: 'textarea',
    },
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
            // action.startEditable?.(record.id);
            console.log(record)
            setEditProduct({ ...record });
            handleModalVisible(true)
          }}
        >
          编辑
                </a>,
        <Popconfirm
          placement="topRight"
          title={'确定要删除' + record.specialGroup + '吗？'}
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
    },
  ]
  /**
 * 添加节点
 *
 * @param fields
 */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    if (fields.hasOwnProperty('isValid')) {
      fields.isValid ? fields.isValid = 'Y' : fields.isValid = 'N'
    }

    try {
      let res = await addThematicGroup({ ...fields });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('添加失败请重试！');
        return false;
      }
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  const handleEdit = async (fields) => {
    const hide = message.loading('正在编辑');
    fields.id = (editProduct as any).id;
    try {
      let res = await editThematicGroup({ ...fields });
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('编辑失败请重试！');
        return false;
      }
      hide();
      message.success('编辑成功');
      return true;
    } catch (error) {
      hide();
      message.error('编辑失败请重试！');
      return false;
    }
  };

  return (
    <PageContainer>
      <ProTable<ThematicGroupListItem>
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => { handleModalVisible(true) }}>
            <PlusOutlined />新建
                    </Button>
        ]}
        // request={getThematicGroupList}
        request={formatRequestListParams(getThematicGroupList)}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     console.log(_, selectedRows);
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      >
      </ProTable>
      {/* {
        false && selectedRowsState?.length > 0 && (
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
      <ModalForm
        form={updateForm}
        // initialValues={editProduct || { isValid: false }}
        title={editProduct ? editProduct.specialGroup : '新建专题组'}
        visible={createModalVisible}
        onVisibleChange={(visible) => {
          if (!visible) {
            setEditProduct(null);
          }
          handleModalVisible(visible)
        }}
        onFinish={async (value) => {
          value.isValid = 'N';
          if (value.hasOwnProperty('isValid') && value.isValid) {
            value.isValid = 'Y';
          }

          let success;
          if (editProduct) {
            success = await handleEdit(value);
          } else {
            success = await handleAdd(value);
          }
          if (success) {
            setEditProduct(null);
            handleModalVisible(false);
            updateForm.resetFields();
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText rules={[{
            required: true,
            message: '请输入专题组名称!',
          }]} width="md" name="specialGroup" label="专题组" placeholder="请输入名称" />
          <ProFormDigit rules={[{
            required: true,
            message: '请输入排序值',
          }]} label="排序" name="sort" width="md" />
        </ProForm.Group>

        <ProFormSwitch rules={[{
          required: true,
          message: '请选择是否有效',
        }]} name="isValid" label="是否有效" />

        {/* <ProFormUploadDragger {...uploadProps } max={4} label="专题组图片" name="specialGroupImgBig" /> */}

        <Form.Item
          name="specialGroupImgBig"
          label="专题组图片"
          extra="建议图片大小不超过250kb"
        >
          <ImagePicker initData={(editProduct && editProduct.specialGroupImgBig) || []} limit={1} />
        </Form.Item>


        <ProForm.Group>
          <ProFormDatePicker width="md" name="startDate" label="开始日期" />
          <ProFormDatePicker width="md" name="endDate" label="结束日期" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormTextArea width="xl" label="专题组描述" name="specialGroupDescribe" />
        </ProForm.Group>
      </ModalForm>

      <Drawer
        title={'专题组详情'}
        width={700}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.specialGroup && (
          <ProDescriptions
            column={2}
            title={currentRow?.specialGroup}
            request={getThematicGroupDetail}
            params={{
              id: currentRow?.id,
            }}
            columns={detailColumns as ThematicGroupListItem[]}
          />
        )}
      </Drawer>
    </PageContainer>
  )
}

export default ThematicGroup;
