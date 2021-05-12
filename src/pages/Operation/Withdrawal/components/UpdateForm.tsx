import React from 'react';
import { Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormRadio
} from '@ant-design/pro-form';

export type FormValueType = {
  id?: string;
  extractMoney?: string;
  status?: string;
  remark?: string;
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
  updateForm.setFieldsValue(values)
  return (
    <ModalForm
      form={updateForm}
      title={"提现审核"}
      visible={updateModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {
        const merge = { ...values, ...data }
        onSubmit(merge);
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="extractMoney" label="提现金额" disabled />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormRadio.Group
          label="请选择"
          name="status"
          options={['通过', '不通过']}
          rules={[{ required: true, message: '请选择审核结果' }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormTextArea width="xl" label="审核意见" name="remark" placeholder="请输入审核意见" rules={[{ required: true, message: '请输入审核意见' }]} />
      </ProForm.Group>
    </ModalForm >

  );
});

export default UpdateForm;
