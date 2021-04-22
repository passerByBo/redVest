import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { message, Modal } from 'antd';
import React from 'react';

export interface ILabelFormProps {
  visible: boolean;
  setModalVisit(visible: boolean): void;
}

const LabelForm: React.FC<ILabelFormProps> = (props) => {
  const { visible, setModalVisit } = props;
  return (
    <ModalForm
      width={500}
      title="新建表单"
      visible={visible}
      onFinish={async () => {
        message.success('提交成功');
        return true;
      }}
      onVisibleChange={setModalVisit}
    >
      <ProFormText
        name="name"
        label="标签名称"
        tooltip="最长为 24 位"
        placeholder="请输入标签名称"
      />
      <ProFormText
        name="code"
        label="序号"
        placeholder="请输入序号"
      />
    </ModalForm>
  )
}

export default LabelForm;
