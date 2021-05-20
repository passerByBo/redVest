import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
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
  updateModalVisible: boolean;
  values: IMerchandiseType;
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
    if (values.isShow === 'Y') {
      values.isShow = true;
    } else {
      values.isShow = false;
    }
    console.log(values)
    updateForm.setFieldsValue({
      ...values,
      parentLevel: values.typeLevel === '1' ? values.typeName : values.parentLevel,
      typeName: values.typeName,
    })
  }



  return (
    <ModalForm
      width={400}
      form={updateForm}
      title={values && values.typeName}
      visible={updateModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {

        const merge = { ...data }

        if (merge.isShow === true) {
          merge.isShow = 'Y';
        } else {
          merge.isShow = 'N';
        }
        if (merge.isValid === true) {
          merge.isValid = 'Y';
        } else {
          merge.isValid = 'N';
        }

        if (values.typeLevel === '1') {
          merge.id = values.id;
          merge.parentLevelId = values.id;
          merge.typeLevel = 1;
        } else {
          merge.id = values.id;
          merge.parentLevelId = values.parentLevelId;
          merge.typeLevel = 2;
        }

        onSubmit(merge);
      }}
    >
      <ProFormText width="md" name="parentLevel" label="一级分类" placeholder="请输入一级分类" rules={[{ required: true, message: '请输入一级分类' }]} disabled={values && values.typeLevel === '2'} />
      { values && values.typeLevel === '2' && <ProFormText width="md" name="typeName" label="二级分类" placeholder="请输入二级分类" rules={[{ required: true, message: '请输入二级分类' }]} />}


      <ProFormTextArea width="md" name="typeDescribe" label="类型描述" placeholder="请输入类型描述" />
      <ProFormDigit width="md" name="orderNo" label="排序" placeholder="请输入排序" />

      <ProForm.Group>
        <ProFormSwitch name="isShow" label="是否展示" rules={[{ required: true, message: '请选择是否展示' }]} />
        <ProFormSwitch name="isValid" label="是否有效" rules={[{ required: true, message: '请选择是否有效' }]} />
      </ProForm.Group>


    </ModalForm >

  );
});

export default UpdateForm;
