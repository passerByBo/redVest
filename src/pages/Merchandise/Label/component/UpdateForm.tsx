import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-form';

export type FormValueType = {
  id: string;
  labelname: string;
  isValid: boolean | string;
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
    //转换是否有效果
    if (values.isValid === 'Y') {
      values.isValid = true;
    } else {
      values.isValid = false;
    }

    updateForm.setFieldsValue(values)
  }



  return (
    <ModalForm
      width={400}
      form={updateForm}
      title={values && values.labelname}
      visible={updateModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {

        const merge = { ...values, ...data }

        if (merge.isValid === true) {
          merge.isValid = 'Y';
        } else {
          merge.isValid = 'N';
        }

        let success = await onSubmit(merge);
        success && updateForm.resetFields();
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="labelname" label="标签名称" placeholder="请输入标签名称" />
      </ProForm.Group>


      <ProForm.Group>
        <ProFormSwitch name="isValid" label="是否有效" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default UpdateForm;
