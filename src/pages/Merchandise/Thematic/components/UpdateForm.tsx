import React from 'react';
import { Form, message } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-form';
import { getThematicGroupList } from '@/services/merchandise/thematicGroup';
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
  specialNameImg1?: any;
  specialDescribe?: string;
  specialTypeImg?: any;
};

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (fiedls: FormValueType) => {};
  updateModalVisible: boolean;
  values: FormValueType | null;
};

//奇葩又要存id 又需要上传名称
let thematicGroup: any[] = [];

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


    updateForm.setFieldsValue(values)
  }


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
      form={updateForm}
      title={values && values.specialName}
      visible={updateModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          onCancel(false)
        }
      }}
      onFinish={async (data) => {
        const merge = { id: values?.id, ...data }
        if (merge.isValid === true) {
          merge.isValid = 'Y';
        } else {
          merge.isValid = 'N';
        }
        //图片转换
        if (typeof merge.specialNameImg1 !== 'string') {
          merge.specialNameImg1 =  merge.specialNameImg1.map((item: any) => item.id).join(',')
        }
        merge.specialGroup = getNameById(merge.specialGroupId);
        onSubmit(merge);
      }}
    >
      <ProForm.Group>
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
        <ImagePicker initData={values && values.specialNameImg1} limit={1} />
      </Form.Item>
      <ProForm.Group>
        <ProFormTextArea width="xl" label="专题描述" name="specialDescribe" placeholder="请输入专题描述" />
      </ProForm.Group>


      <ProForm.Group>
        <ProFormDigit width="md" name="sort" label="排序" placeholder="请输入排序" />
        <ProFormSwitch rules={[{ required: true, message: '请选择是否有效!' }]} name="isValid" label="是否有效" />
      </ProForm.Group>

    </ModalForm >

  );
});

export default UpdateForm;
