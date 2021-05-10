import React, { useCallback } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Form, message } from 'antd';
import { orderRemark } from '@/services/order';

export interface RemarkOrderModelProps {
  code?: string;
  visible: boolean;
  id?: string
  onCancel(): void;
  onFinish(): void;
}


const RemarkOrderModel: React.FC<RemarkOrderModelProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, onCancel, onFinish, code } = props;

  if (code) {
    form.setFieldsValue({ orderNo: code })
  }

  const handleSubmit = useCallback(async (field) => {
    field.type = 'remark';
    let hide = message.loading('正在备注中');
    try {
      let res = await orderRemark({ ...field })
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('备注失败' + res.msg);
        return;
      }

      hide();
      message.success('订单备注成功！');
      onFinish();
      form.resetFields();
    } catch (error) {
      hide();
      message.error('订单备注失败！');
    }
  }, [])

  return (
    <ModalForm
      form={form}
      width={480}
      visible={visible}
      title="备注订单"
      onFinish={handleSubmit}
      modalProps={{
        onCancel: () => { form.resetFields();onCancel()},
      }}
    >
      <ProFormText name="orderNo" label="订单号" disabled={true} />
      <ProFormTextArea
        name="shopRemark"
        label="备注"
        placeholder="请输入备注"
        fieldProps={{ rows: 4 }}
      />
    </ModalForm>
  )
}

export default RemarkOrderModel;
