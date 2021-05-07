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
        <ProFormText width="md" name="specialName" label="专题名称" placeholder="请输入专题名称" />
      </ProForm.Group>

      {/* 缺少图片选择器 */}

      <ProForm.Group>
        <ProFormTextArea width="md" name="specialDescribe" label="专题描述" placeholder="请输入专题描述" />

      </ProForm.Group>

      <ProForm.Group>
        <ProFormSwitch name="isValid" label="是否有效" />
      </ProForm.Group>


      <ProForm.Group>
        <ProFormDigit width="md" name="sort" label="排序" placeholder="请输入排序" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default AddForm;
