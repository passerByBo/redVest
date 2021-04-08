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

const ShipModel: React.FC<RefundModelProps> = (props) => {
  const { visible, onCancel, onFinish, code } = props;

  return (
    <ModalForm
      width={480}
      visible={visible}
      title="去发货"
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
          { label: '顺丰快递', value: '1' },
          { label: '中通快递', value: '2' },
          { label: '圆通快递', value: '3' },
          { label: '韵达快递', value: '4' },
        ]}
        name="aaaaa"
        label="快递公司"
      />
      <ProFormText name="sdasd" label="快递单号" />
    </ModalForm>
  )
}

export default ShipModel;
