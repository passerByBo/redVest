import React, { useState } from 'react';
import ProForm, {
  ProFormText,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
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
      specialName: useData.productName,
      type: useData.typeName,
      proLogoImg1: useData.proLogoImg1,
    });
    setTableVisible(false);
  };

  return (
    <ModalForm
      form={addForm}
      title={'新增品牌'}
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
        <Form.Item name="specialName" label="名称" rules={[{ required: true }]}>
          <Input.Search allowClear enterButton="参考录入" onSearch={onSearch} style={{ width: 328 }} />
        </Form.Item>
      </ProForm.Group>

      {/* 缺少图片选择器 */}

      <ProForm.Group>
        <ProFormText width="md" name="type" label="类型" placeholder="请输入类型" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSwitch name="isValid" label="是否有效" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDigit width="md" name="sort" label="排序" placeholder="请输入排序" />
      </ProForm.Group>
      {
        tableVisible &&
        <Card><ProductTable useData={useData} /></Card>
      }
    </ModalForm >

  );
});

export default AddForm;
