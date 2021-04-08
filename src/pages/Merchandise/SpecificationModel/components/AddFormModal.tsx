import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';
import styles from '../style.less';
import React, { useState } from 'react';
const { TextArea } = Input;
export interface AddFormModalProps {
  visible: boolean;
  onOk(): void;
  onCancel(): void;
}

export interface ISpecify {
  name: string;
  value: string;
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 23, offset: 1 },
  },
};

const AddFormModal: React.FC<AddFormModalProps> = (props) => {
  const { visible, onOk, onCancel } = props;

  const [specify, setSpecify] = useState<ISpecify>({ name: '', value: '' });
  const [specifies, setSpecifies] = useState<string[]>([]);
  const [specifiesMap, setSpecifiesMap] = useState<Map<string, string[]>>(new Map());


  function specifyChange(e, key: string) {
    setSpecify({ ...specify, [key]: e.target.value })
  }

  function addSpecify(data: ISpecify) {
    const { name, value } = data;
    setSpecifies([...specifies, name]);
    setSpecifiesMap(specifiesMap.set(name, [value]));

    console.log(specifies,specifiesMap)
  }

  return (
    <Modal
      title='新增规格模板'
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form name='add_form' {...formItemLayoutWithOutLabel} onFinish={() => { }}>
        <Form.Item
          label='模板名称'
        >
          <Input placeholder="请输入模板名称" />
        </Form.Item>

        <Form.Item
          label='模板描述'
        >
          <TextArea placeholder="请输入模板描述" rows={4} />
        </Form.Item>

        <Button type='primary'>添加新规格</Button>

        <Row className={styles.addModalWrap} gutter={24}>
          <Col className={styles.addModalCol} span={9}>
            <span className={styles.label60} >规格:</span>
            <Input onChange={(e) => specifyChange(e, 'name')} value={specify.name} placeholder='请输入规格'></Input>
          </Col>
          <Col className={styles.addModalCol} span={9}>
            <span className={styles.label80}>规格值:</span>
            <Input onChange={(e) => specifyChange(e, 'value')} value={specify.value} placeholder='请输入规格值'></Input>
          </Col>
          <Col className={styles.addModalCol} span={6}>
            <Space>
              <Button size="small">取消</Button>
              <Button size="small" type='primary' onClick={() => { addSpecify(specify) }}>确认</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddFormModal;
