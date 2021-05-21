import React from 'react';
import { Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-form';
import ImagePicker from '@/components/ImagePicker';

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
      title={'新增品牌'}
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
        <ProFormText  rules={[{required: true, message:"请输入品牌名称"}]} width="md" name="productBrand" label="商品品牌" placeholder="请输入品牌名称" />
        {/* 接口中没有 */}
        <ProFormText width="md" name="siteUrl" label="品牌地址" placeholder="请输专题入品牌地址" />
      </ProForm.Group>

      {/* 缺少图片选择器 */}
      <Form.Item
        name="logo"
        label="品牌Logo"
        extra="建议图片大小不超过250kb"
      >
        <ImagePicker limit={1} />
      </Form.Item>

      <Form.Item
        name="brandImg"
        label="品牌区大图"
        extra="建议图片大小不超过250kb"
      >
        <ImagePicker limit={1} />
      </Form.Item>

      <ProForm.Group>
        <ProFormTextArea rules={[{required: true, message:"请输入品牌描述"}]} width="md" name="brandDescribe" label="品牌描述" placeholder="请输入描述" />
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
