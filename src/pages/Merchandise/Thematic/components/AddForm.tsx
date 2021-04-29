import React from 'react';
import { Form} from 'antd';
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
  onSubmit: (fiedls:FormValueType) => {};
  addModalVisible: boolean;
};

const AddForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [addForm] = Form.useForm();
  const {  addModalVisible, onSubmit, onCancel } = props;

  return (
    <ModalForm
      form={addForm}
      title={'新增专题'}
      visible={addModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {
        const fields = {  ...data }
        if (fields.isValid === true) {
          fields.isValid = 'Y';
        } else {
          fields.isValid = 'N';
        }
        onSubmit(fields);
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="specialGroup" label="专题组" placeholder="请输入专题组名称" />
        <ProFormText width="md" name="specialName" label="专题名称" placeholder="请输专题入名称" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText width="md" name="specialNameTitle" label="专题副标题" placeholder="请输入专题副标题" />
        <ProFormText width="md" name="labelname" label="标签" placeholder="请输入标签" />
      </ProForm.Group>


      <ProForm.Group>
        <ProFormTextArea width="xl" label="专题组描述" name="specialDescribe"  placeholder="请输入专题组描述" />
      </ProForm.Group>


      <ProForm.Group>
        <ProFormDigit width="md" name="contract" label="排序" placeholder="请输入排序" />
        <ProFormSwitch name="isValid" label="是否有效" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default AddForm;
