import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { history } from 'umi';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { getSKUList, skuOrderExport } from '@/services/sku-ledger';
import Export from '@/components/Export';
const List: React.FC = (props) => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: 'SKU编码',
      dataIndex: 'articleNo',
      search: false,
    },
    {
      title: '商品分类名称',
      dataIndex: 'typeName',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      valueType: 'textarea',
    },
    {
      title: 'SKU规格属性',
      dataIndex: 'skuName',
    },
    {
      title: '单位',
      dataIndex: 'productUnit',
      valueType: 'textarea',
      search: false
    },
    {
      title: '销售价',
      dataIndex: 'salePrice',
      valueType: 'textarea',
      search: false

    },
    {
      title: '成本价',
      dataIndex: 'supplyPrice',
      search: false,
    },
    {
      title: '划线价',
      dataIndex: 'marketPrice',
      search: false,
    },
    {
      title: 'SKU库存数量',
      dataIndex: 'inventory',
      search: false,
      // render: (_, record) => (
      //   <a onClick={() => { history.push(`/sku/list/stock-logger?id=${record.id}`) }}>{_}</a>
      // )
    },
    {
      title: '出库数量',
      dataIndex: 'salesVolume',
      search: false,
      render: (_, record) => (
        <a onClick={() => { history.push(`/sku/list/checklist?id=${record.id}`) }}>{_}</a>
      )
    },
    {
      title: '库存预警值',
      dataIndex: 'inventoryWarn',
      valueType: 'textarea',
      search: false,
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   search: false,
    //   render(_: string, record: any) {
    //     return (
    //       <a onClick={() => handleEditRow(record)}>编辑</a>
    //     )
    //   }

    // }
  ]

  // const [editVisible, setEditVisible] = useState(false);
  // const [editForm] = Form.useForm();

  // function handleEditRow(data: any) {

  // }


  const { location: { pathname } } = history;

  const { children } = props;

  return (
    <>
      {
        pathname === '/sku/list' ? <PageContainer title='SKU台账列表'>
          {/* <ModalForm
            form={editForm}
            title={'编辑预警值'}
            visible={editVisible}
            onFinish={async (data) => {
              <ProForm.Group>
              <InputNumber width="md" name="specialNameTitle" label="库存预警值" placeholder="请输入专题副标题" />
            </ProForm.Group>


            }}
          >
          </ModalForm > */}
          <ProTable
            actionRef={actionRef}
            rowKey="key"
            search={{ labelWidth: 120 }}
            request={formatRequestListParams(getSKUList)}
            toolBarRender={() => [
              <Export request={skuOrderExport} />
            ]}
            columns={columns}
            rowSelection={{
              onChange: (_, selectedRows) => {

              },
            }}

          />
        </PageContainer> : children
      }
    </>

  )
}

export default List;
