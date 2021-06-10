import React, { useState } from 'react';
import ProForm, {
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-form';

import { Form, Input, Card } from 'antd';
import ImagePicker from '@/components/ImagePicker';
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
  const [data, setData] = useState<any>(null);
  const onSearch = () => { setTableVisible(!tableVisible) };

  const useData = (useData: any) => {
    console.log(useData);
    setData(useData);
    addForm.setFieldsValue({
      ...useData
    });
    setTableVisible(false);
  };

  return (
    <ModalForm
      width={1400}
      form={addForm}
      title={'新增专题'}
      visible={addModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (formData) => {
        if (data.specialNameImg1 && Array.isArray(data.specialNameImg1)) {
          formData.specialImg = data.specialNameImg1.map((item: any) => item.id).join(',');
        }
        console.log("data--->", data);
        console.log("formData--->", formData);
        onSubmit(formData);
      }}
    >
      <ProForm.Group>
        <Form.Item name="specialName" label="专题名称" rules={[{ required: true }]}>
          <Input.Search allowClear enterButton="参考录入" onSearch={onSearch} style={{ width: 328 }} />
        </Form.Item>
      </ProForm.Group>

      <ProForm.Group>
        <ProFormTextArea width="md" name="specialDescribe" label="专题描述" placeholder="请输入专题描述" />
      </ProForm.Group>

      <ProForm.Group>
        <ImagePicker initData={data && data.specialNameImg1} limit={1}></ImagePicker>
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
