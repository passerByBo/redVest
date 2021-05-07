import React from 'react';
import { Form } from 'antd';
import ProForm, {
  ProFormText,
  ModalForm
} from '@ant-design/pro-form';

export type FormValueType = {
  id: string;
  productUnit: string;
};

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (fiedls: FormValueType) => {};
  updateModalVisible: boolean;
  values: FormValueType | null;
};

const UpdateForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [updateForm] = Form.useForm();
  const { values, updateModalVisible, onSubmit, onCancel } = props;


  if (values) {
    updateForm.setFieldsValue(values)
  }



  return (
    <ModalForm
      width={400}
      form={updateForm}
      title={values && values.productUnit}
      visible={updateModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {

        const merge = { ...values, ...data }

        let success = await onSubmit(merge);
        success && updateForm.resetFields();
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="productUnit" label="单位名称" placeholder="请输入单位名称" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default UpdateForm;
