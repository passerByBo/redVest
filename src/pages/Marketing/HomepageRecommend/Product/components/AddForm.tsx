import React, { useState } from 'react';
import ProForm, {
  ProFormText,
  ModalForm,
  ProFormSwitch,
  ProFormDigit, ProFormDatePicker
} from '@ant-design/pro-form';

import { Form, Input, Card } from 'antd';

import ProductTable from './ProductList';

export type FormValueType = {
  id?: string;
  specialGroupId?: string;
  specialGroup?: string;
  specialName?: string;
  specialNameTitle?: string;
  labelname?: string;
  isValid?: boolean | string;
  sort?: number;
  specialNameImg1?: string;
  specialDescribe?: string;
  specialTypeImg?: string;
};

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (fiedls: FormValueType) => {};
  addModalVisible: boolean;
};

const AddForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [addForm] = Form.useForm();
  const { addModalVisible, onSubmit, onCancel } = props;
  const [tableVisible, setTableVisible] = useState<boolean>(false);
  const onSearch = () => { setTableVisible(!tableVisible) };

  const useData = (useData: any) => {
    console.log(useData);
    addForm.setFieldsValue({
      productName: useData.productName,
      productNo: useData.productNo
    });
    setTableVisible(false);
  };

  return (
    <ModalForm
      width={1400}
      form={addForm}
      title={'新增产品'}
      visible={addModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {
        const fields = { ...data }
        if (fields.isRecommend === true) {
          fields.isRecommend = 'Y';
        } else {
          fields.isRecommend = 'N';
        }
        if (fields.isShow === true) {
          fields.isShow = 'Y';
        } else {
          fields.isShow = 'N';
        }
        if (fields.isvalid === true) {
          fields.isvalid = 'Y';
        } else {
          fields.isvalid = 'N';
        }
        if (fields.status === true) {
          fields.status = 'Y';
        } else {
          fields.status = 'N';
        }
        onSubmit(fields);
      }}
    >
      <ProForm.Group>
        <Form.Item name="productName" label="商品名称" rules={[{ required: true }]}>
          <Input.Search allowClear enterButton="参考录入" onSearch={onSearch} style={{ width: 328 }} />
        </Form.Item>
      </ProForm.Group>

      {/* <ProForm.Group>
        <ProFormText width="md" name="productName" label="商品名称" placeholder="请输入商品名称" />
        <Input.Search placeholder="input search text" style={{ width: 200 }} />
      </ProForm.Group> */}

      {/* 缺少图片选择器 */}

      <ProForm.Group>
        <ProFormText width="md" name="productNo" label="商品货号" placeholder="请输入商品货号" rules={[{ required: true }]} />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSwitch name="isValid" label="是否推荐" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDatePicker name="startDate" label="推荐开始日期" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDatePicker name="endDate" label="推荐结束日期" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDigit width="md" name="sort" label="排序" placeholder="请输入排序" />
      </ProForm.Group>
      {
        tableVisible &&
        <Card><ProductTable useData={useData} /></Card>
      }
    </ModalForm>
  );
});

export default AddForm;
