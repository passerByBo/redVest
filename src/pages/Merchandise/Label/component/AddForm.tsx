import React from 'react';
import { Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-form';

export type FormValueType = {
  id?: string;
  specialGroupId?: string;
  specialGroup?: string;
};

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (fiedls: FormValueType) => {};
  addModalVisible: boolean;
};

const AddForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [addForm] = Form.useForm();
  const { addModalVisible, onSubmit, onCancel } = props;

  return (
    <ModalForm
      width={400}
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
        if (fields.isValid) {
          fields.isValid = 'Y';
        } else {
          fields.isValid = 'N';
        }
        let success = await onSubmit(fields);
        success && addForm.resetFields();
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

export default AddForm;
