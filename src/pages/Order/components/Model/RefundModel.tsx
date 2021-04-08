import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form';

export interface RefundModelProps {
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

const RefundModel: React.FC<RefundModelProps> = (props) => {
  const { visible, onCancel, onFinish, code } = props;

  return (
    <ModalForm
      width={480}
      visible={visible}
      title="立即退款"
      onFinish={async () => { await waitTime(2000); onFinish(); }}
      modalProps={{
        onCancel: () => onCancel(),
      }}

      initialValues={{
        code: code
      }}
    >
      <ProFormText name="code" label="订单号" disabled={true} />
      <ProFormSelect
        fieldProps={{
          labelInValue: true,
        }}
        request={async () => [
          { label: '不同意退款', value: '0' },
          { label: '同意退款', value: '1' },
        ]}
        name="aaaaa"
        label="退款审核"
      />
      <ProFormText name="sdasd" label="原因描述" />
    </ModalForm>
  )
}

export default RefundModel;
