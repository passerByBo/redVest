import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form';
import { Form, message } from 'antd';
import { refundOrder } from '@/services/order';

export interface RefundModelProps {
  id?: string;
  code?: string;
  visible: boolean;
  onCancel(): void;
  onFinish(): void;
  orderTotalPrice?: any;
}


const RefundModel: React.FC<RefundModelProps> = (props) => {
  const { visible, onCancel, onFinish, code, orderTotalPrice } = props;
  const [form] = Form.useForm();

  if (code) {
    form.setFieldsValue({ orderNo: code, orderTotalPrice: orderTotalPrice })
  }

  return (
    <ModalForm
      form={form}
      width={480}
      visible={visible}
      title="立即退款"
      onFinish={async (fields) => {
        let hide = message.loading('正在退款中');
        try {
          let res = await refundOrder({ orderNo: fields.orderNo })
          if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('退款失败，' + res.msg);
            return;
          }

          hide();
          message.success('退款成功')
          onFinish();
        } catch (error) {
          hide();
          message.error('退款失败');
          return;
        }
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText name="orderNo" label="订单号" disabled={true} />
      <ProFormText name="orderTotalPrice" label="退款金额" disabled={true} />
    </ModalForm>
  )
}

export default RefundModel;
