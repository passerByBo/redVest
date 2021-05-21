import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-form';
import ImagePicker from '@/components/ImagePicker';

export type FormValueType = {
  id: string;
  brandDescribe: string;
  productBrand: string;
  brandNo: string;
  logo: any;
  brandImg: any;
  isvalid: string | boolean;
  sort: string;
  isShow: string | boolean;
  isRecommend: string | boolean;
  status: string | boolean;
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

  useEffect(() => {
    if (values) {
      let data = { ...values }
      //转换是否有效果
      if (data.isvalid === 'Y') {
        data.isvalid = true;
      } else {
        data.isvalid = false;
      }
      if (data.isShow === 'Y') {
        data.isShow = true;
      } else {
        data.isShow = false;
      }
      if (data.isRecommend === 'Y') {
        data.isRecommend = true;
      } else {
        data.isRecommend = false;
      }
      if (data.status === 'Y') {
        data.status = true;
      } else {
        data.status = false;
      }
      data.logo = (Array.isArray(values.logo) && values.logo.map((item: any) => item.id).join(',')) || ''
      data.brandImg = (Array.isArray(values.brandImg) && values.brandImg.map((item: any) => item.id).join(',')) || ''
      updateForm.setFieldsValue(data)
    }
  }, [values])

  return (
    <ModalForm
      form={updateForm}
      title={values && values.productBrand}
      visible={updateModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {

        const merge = { ...values, ...data }
        if (merge.isRecommend === true) {
          merge.isRecommend = 'Y';
        } else {
          merge.isRecommend = 'N';
        }
        if (merge.isShow === true) {
          merge.isShow = 'Y';
        } else {
          merge.isShow = 'N';
        }
        if (merge.isvalid === true) {
          merge.isvalid = 'Y';
        } else {
          merge.isvalid = 'N';
        }
        if (merge.status === true) {
          merge.status = 'Y';
        } else {
          merge.status = 'N';
        }
        onSubmit(merge);
      }}
    >
      <ProForm.Group>
        <ProFormText rules={[{ required: true, message: "请输入品牌名称" }]} width="md" name="productBrand" label="商品品牌" placeholder="请输入品牌名称" />
        {/* 接口中没有 */}
        <ProFormText width="md" name="siteUrl" label="品牌地址" placeholder="请输专题入品牌地址" />
      </ProForm.Group>

      {/* 缺少图片选择器 */}
      <Form.Item
        name="logo"
        label="品牌Logo"
        extra="建议图片大小不超过250kb"
      >
        <ImagePicker initData={values && values.logo} limit={1} />
      </Form.Item>

      <Form.Item
        name="brandImg"
        label="品牌区大图"
        extra="建议图片大小不超过250kb"
      >
        <ImagePicker initData={values && values.brandImg} limit={1} />
      </Form.Item>

      <ProForm.Group>
        <ProFormTextArea rules={[{ required: true, message: "请输入品牌描述" }]} width="md" name="brandDescribe" label="品牌描述" placeholder="请输入描述" />
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

export default UpdateForm;
