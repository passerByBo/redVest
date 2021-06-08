import React, { useState, useEffect } from 'react';
import ProForm, {
  ProFormText,
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

  // useEffect(() => {
  //   addForm.setFieldsValue({ isValid: "否" });
  // }, [])

  const onSearch = () => { setTableVisible(!tableVisible) };

  const useData = (useData: any) => {
    console.log("useData", useData);
    setData(useData);
    addForm.setFieldsValue({
      specialName: useData.productName,
      type: useData.typeName
    });
    setTableVisible(false);
  };

  return (
    <ModalForm
      form={addForm}
      title={'轮播精选信息'}
      visible={addModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          addForm.resetFields();
          setData(null);
          onCancel(false);
        }
      }}
      onFinish={async (formData) => {
        console.log("data--->", data.proLogoImg1);
        if (data.proLogoImg1 && Array.isArray(data.proLogoImg1)) {
          formData.specialImg = data.proLogoImg1.map((item: any) => item.id).join(',');
        }
        console.log("formData--->", formData);
        formData.isValid ? formData.isValid : formData.isValid = "false";
        onSubmit(formData);
      }}
    >
      <ProForm.Group>
        <Form.Item name="specialName" label="名称" rules={[{ required: true }]}>
          <Input.Search allowClear enterButton="参考录入" onSearch={onSearch} style={{ width: 328 }} />
        </Form.Item>
      </ProForm.Group>

      <ProForm.Group>
        <ImagePicker initData={data && data.proLogoImg1} limit={1}></ImagePicker>
      </ProForm.Group>

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
