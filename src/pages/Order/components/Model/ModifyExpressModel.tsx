import React, { useEffect, useState } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-form';
import { getDeliveryType } from '@/services/order';
import { message } from 'antd';

export interface RefundModelProps {
  code: string;
  visible: boolean;
  onCancel(): void;
  onFinish(): void;
}

const formatDeliveryType: <T extends { deliveryCode: string, deliveryType: string }>(arg: T[]) => { value: string; label: string }[] = (data) => {
  return data.map((item) => {
    return {
      value: item.deliveryCode,
      label: item.deliveryType
    }
  })
}


const RefundModel: React.FC<RefundModelProps> =React.memo( (props) => {
  const { visible, onCancel, onFinish, code } = props;

  const handleFinish = async (fields: any) => {
    const { delivery } = fields;
    delete fields.delivery
    fields.deliveryType = delivery.label;
    fields.deliveryCode = delivery.value;
    return onFinish(fields)
  }

  const getDelivery = async () => {
    try {
      const res = await getDeliveryType();
      if (res.status === 200 && res.code !== 200) {
        message.error('请求快递信息列表失败，' + res.msg);
        return [];
      }

      return formatDeliveryType(res.data);
    } catch (error) {
      message.error('请求快递信息列表失败请退出重试！');
      return [];
    }
  }

  // useEffect(() => {
  //   getDelivery();
  // }, [])

  return (
    <ModalForm
      width={480}
      visible={visible}
      title="修改快递"
      onFinish={handleFinish}
      modalProps={{
        onCancel: () => onCancel(),
      }}

      initialValues={{
        orderNo: code
      }}
    >
      <ProFormText name="orderNo" label="订单号" disabled={true} />
      <ProFormSelect
        fieldProps={{
          labelInValue: true,
        }}
        request={async () => await getDelivery()}
        name="delivery"
        label="快递公司"
        rules={[
          {
            required: true,
            message: '请选择快递公司！'
          }
        ]}
      />
      <ProFormText  rules={[
          {
            required: true,
            message: '请输入快递单号！'
          }
        ]} name="deliveryNo" label="快递单号" />
    </ModalForm>
  )
})

export default RefundModel;
