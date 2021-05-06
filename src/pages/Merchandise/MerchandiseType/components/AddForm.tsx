import React from 'react';
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
};

const AddForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [addForm] = Form.useForm();
  const { addModalVisible, onSubmit, onCancel } = props;

  return (
    <ModalForm
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
        onSubmit(fields);
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="productBrand" label="商品品牌" placeholder="请输入商品品牌" />
        {/* 接口中没有 */}
        <ProFormText width="md" name="specialAddress" label="品牌地址" placeholder="请输专题入品牌地址" />
      </ProForm.Group>

      {/* 缺少图片选择器 */}

      <ProForm.Group>
        <ProFormTextArea width="md" name="brandDescribe" label="品牌描述" placeholder="请输入描述" />
        <ProFormDigit width="md" name="sort" label="排序" placeholder="请输入排序" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSwitch name="isRecommend" label="是否推荐" />
        <ProFormSwitch name="isShow" label="是否展示" />
        <ProFormSwitch name="isvalid" label="是否有效" />
        <ProFormSwitch name="status" label="是否审核通过" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default AddForm;
