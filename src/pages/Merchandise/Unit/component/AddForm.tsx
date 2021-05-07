import React from 'react';
import { Form } from 'antd';
import ProForm, {
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';

export type FormValueType = {
  id?: string;
  productUnit?: string;
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
      title={'新增单位'}
      visible={addModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {
        const fields = { ...data }
        let success = await onSubmit(fields);
        success && addForm.resetFields();
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="productUnit" label="单位名称" placeholder="请输入单位名称" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default AddForm;
