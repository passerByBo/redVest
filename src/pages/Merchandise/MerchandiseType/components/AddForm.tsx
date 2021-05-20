import React, { useEffect } from 'react';
import { Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-form';
import { IMerchandiseType } from '..';


export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: IMerchandiseType) => void;
  onSubmit: (fiedls: IMerchandiseType) => {};
  addModalVisible: boolean;
  level?: IMerchandiseType;
};


const AddForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [addForm] = Form.useForm();
  const { addModalVisible, onSubmit, onCancel, level } = props;

  useEffect(() => {
    if (addModalVisible && level) {
      addForm.setFieldsValue({ parentLevel: level.typeName });
    }
  }, [addModalVisible])

  return (
    <ModalForm
      width={400}
      form={addForm}
      title={'新增品牌'}
      visible={addModalVisible}
      initialValues={{ isShow: false, isValid: false }}
      onVisibleChange={(visible) => {
        if (!visible) {
          addForm.resetFields();
          onCancel(false)
        }
      }}
      onFinish={async (data) => {
        const fields = { ...data }
        if (fields.isValid === true) {
          fields.isValid = 'Y';
        } else {
          fields.isValid = 'N';
        }
        if (fields.isShow === true) {
          fields.isShow = 'Y';
        } else {
          fields.isShow = 'N';
        }
        fields.typeLevel = '1';
        if (level) {
          fields.typeLevel = '2';
        }
        level && (fields.parentLevelId = level.id);
        let success  = onSubmit(fields);
        success && addForm.resetFields();
      }}
    >
      <ProFormText width="md" name="parentLevel" label="一级分类" placeholder="请输入一级分类" rules={[{ required: true, message: '请输入一级分类' }]} disabled={!!level} />
      { level && <ProFormText width="md" name="typeName" label="二级分类" placeholder="请输入二级分类" rules={[{ required: true, message: '请输入二级分类' }]} />}


      <ProFormTextArea width="md" name="typeDescribe" label="类型描述" placeholder="请输入类型描述" />
      <ProFormDigit width="md" name="orderNo" label="排序" placeholder="请输入排序" />

      <ProForm.Group>
        <ProFormSwitch name="isShow" label="是否展示" rules={[{ required: true, message: '请选择是否展示' }]} />
        <ProFormSwitch name="isValid" label="是否有效" rules={[{ required: true, message: '请选择是否有效' }]} />
      </ProForm.Group>

    </ModalForm >

  );
});

export default AddForm;
