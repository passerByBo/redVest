import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';

export interface RemarkOrderModelProps {
  code: string;
  visible: boolean;
  onCancel(): void;
  onFinish(): void;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const RemarkOrderModel: React.FC<RemarkOrderModelProps> = (props) => {
  const { visible, onCancel, onFinish, code } = props;

  return (
    <ModalForm
      width={480}
      visible={visible}
      title="备注订单"
      onFinish={async () => { await waitTime(2000); onFinish(); }}
      modalProps={{
        onCancel: () => onCancel(),
      }}

      initialValues={{
        code: code
      }}
    >
      <ProFormText  name="code" label="订单号" disabled={true} />
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入备注"
        fieldProps={{rows: 4}}
      />
    </ModalForm>
  )
}

export default RemarkOrderModel;
