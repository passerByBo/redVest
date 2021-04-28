import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Form, message, Upload } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  DrawerForm,
  ProFormDatePicker,
  ProFormUploadDragger,
  ProFormSwitch,
  ProFormDigit
} from '@ant-design/pro-form';
import { getThematicGroupList, addThematicGroup } from '@/services/merchandise/thematicGroup';
import formatRequestListParams from '@/utils/formatRequestListParams';
type ThematicGroupListItem = {
  id: string,
  topicName: string,
  productBrandId: string,
  isEffective: string,
  isShow: string,
  isRecommented: string,
  updatedAt: string,
  [key: string]: string,
}
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


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
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<ThematicGroupListItem[]>([]);
  //编辑商品
  const [editProduct, setEditProduct] = useState<ThematicGroupListItem>();


  const [fileList, setFileList] = useState([]);


  const columns: ProColumns<ThematicGroupListItem>[] = [
    {
      title: '专题组名称',
      dataIndex: 'specialGroup',
      render: ((_, item) => {
        return (
          <a onClick={() => { setEditProduct(item); setShowDetail(true) }}>{_}</a>
        )
      })
    },
    {
      title: '是否有效',
      dataIndex: 'isValid',
      valueType: 'textarea',
      search: false,
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
      valueType: 'textarea',
    },
    {
      title: '开始日期',
      sorter: true,
      dataIndex: 'startDate',
      valueType: 'dateTime',
    },
    {
      title: '结束日期',
      sorter: true,
      dataIndex: 'endDate',
      valueType: 'dateTime',
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
            console.log(text);
          }}
        >
          编辑
                </a>,
        <a
          key="delete"
          onClick={() => {
            console.log(record);
            // setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
                </a>,
      ],
    },
  ]

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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

  //处理上传图片form数据
  if (fields.hasOwnProperty('specialGroupImgBig')) {
    const specialGroupImgBig = fields.specialGroupImgBig;
    console.log(specialGroupImgBig)
    let picArr:string[] = [];
    specialGroupImgBig.forEach((proxy) => {
      if(proxy.status === 'done') {
        let res = proxy.response;
        if(res.status === 200){
          picArr.push(res.fileName)
        }
      }
    })
    fields.specialGroupImgBig = picArr.join(',')
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


  const uploadProps = {
    name: 'file',
    action: '/prod-api/mall/common/upload',
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  }

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
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log(_, selectedRows);
            setSelectedRows(selectedRows);
          },
        }}
      >
      </ProTable>
      {
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
                  {/* 这里可以统计已选项的一些参数{selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万 */}
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
      }
      <ModalForm
        omitNil={true}
        initialValues={{ isValid: false }}
        title='新建专题组'
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProForm.Group>
          <ProFormText width="md" name="specialGroup" label="专题组" placeholder="请输入名称" />
          <ProFormDigit label="排序" name="sort" width="md" />
        </ProForm.Group>

        <ProFormSwitch name="isValid" label="是否有效" />

        {/* <ProFormUploadDragger {...uploadProps } max={4} label="专题组图片" name="specialGroupImgBig" /> */}

        <Form.Item
          name="specialGroupImgBig"
          label="专题组图片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="建议图片大小不超过250kb"
        >
          <Upload {...uploadProps}
          showUploadList={{ showPreviewIcon: false }}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}>
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>


        <ProForm.Group>
          <ProFormDatePicker width="md" name="startDate" label="开始日期" />
          <ProFormDatePicker width="md" name="endDate" label="结束日期" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormTextArea width="xl" label="专题组描述" name="specialGroupDescribe" />
        </ProForm.Group>
      </ModalForm>



      <DrawerForm
        visible={showDetail}
        title={editProduct ? editProduct.productName : '专题组'}
        onVisibleChange={setShowDetail}
        onFinish={async () => {
          await waitTime(2000)
          message.success('提交成功');
          return true;
        }}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              <Button
                key="save"
                type="primary"
                onClick={() => {
                  props.submit();
                }}
              >
                保存
                             </Button>
            ];
          },
        }}
      >
        <ProForm.Group>
          <ProFormText width="md" name="name" label="专题组" placeholder="请输入名称" />
        </ProForm.Group>

        <ProFormSwitch name="isShow" label="是否有效" />

        <ProForm.Group>
          <ProFormText width="md" name="contract" label="排序" placeholder="请输入名称" />
        </ProForm.Group>

        <ProFormUploadDragger max={4} label="专题组图片" name="productsPics" />

        <ProForm.Group>
          <ProFormDatePicker name="date" label="开始日期" />
          <ProFormDatePicker name="date" label="结束日期" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormTextArea width="xl" label="专题组描述" name="remark" />
        </ProForm.Group>

      </DrawerForm>
    </PageContainer>
  )
}

export default ThematicGroup;
