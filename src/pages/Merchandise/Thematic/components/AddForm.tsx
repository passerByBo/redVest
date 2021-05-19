import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-form';
import ImagePicker from '@/components/ImagePicker';
import { getThematicGroupList } from '@/services/merchandise/thematicGroup';

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

//奇葩又要存id 又需要上传名称  后台真鸡儿
let thematicGroup: any[] = [];

const AddForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [addForm] = Form.useForm();
  const { addModalVisible, onSubmit, onCancel } = props;

  async function getThematicGroup() {
    try {
      let res = await getThematicGroupList();
      if (res.status === 200 && res.code !== 200) {
        message.error('初始化专题组列表失败，' + res.msg);
        return [];
      }

      let { rows } = res.data;
      let listEnum = parseDataToList(rows);
      thematicGroup = [...listEnum]
      return listEnum;
    } catch (error) {
      message.error('初始化专题组列表失败');
      return [];
    }
  }

  function parseDataToList(arr: any[]) {
    return arr.map((item) => {
      return {
        label: item.specialGroup,
        value: item.id
      }
    })
  }

  function getNameById(id: string) {
    for (let item of thematicGroup) {
      if (item.value === id) {
        return item.label;
      }
    }
  }

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
        if (fields.isValid === true) {
          fields.isValid = 'Y';
        } else {
          fields.isValid = 'N';
        }

        fields.specialGroup =getNameById( fields.specialGroupId);
        onSubmit(fields);
      }}
    >
      <ProForm.Group>
        {/* <ProFormText name="specialGroup" label="专题组" placeholder="请输入专题组名称" /> */}
        <ProFormSelect
          width="md"
          name="specialGroupId"
          label="专题组"
          placeholder="请选择专题组名称"
          request={async () => getThematicGroup()}
          rules={[{ required: true, message: '请输入专题组名称!' }]}
        />
        <ProFormText width="md" rules={[{ required: true, message: '请输入专题名称!' }]} name="specialName" label="专题名称" placeholder="请输专题入名称" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText width="md" name="specialNameTitle" label="专题副标题" placeholder="请输入专题副标题" />
        <ProFormText width="md" name="labelname" label="标签" placeholder="请输入标签" />
      </ProForm.Group>

      <Form.Item
        name="specialNameImg1"
        label="专题图片"
        extra="建议图片大小不超过250kb"
      >
        <ImagePicker limit={1} />
      </Form.Item>

      <ProForm.Group>
        <ProFormTextArea width="xl" label="专题组描述" name="specialDescribe" placeholder="请输入专题组描述" />
      </ProForm.Group>


      <ProForm.Group>
        <ProFormDigit width="md" name="contract" label="排序" placeholder="请输入排序" />
        <ProFormSwitch rules={[{ required: true, message: '请选择是否有效!' }]} name="isValid" label="是否有效" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default AddForm;
