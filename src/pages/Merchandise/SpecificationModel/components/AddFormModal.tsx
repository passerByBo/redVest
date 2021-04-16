import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';
import styles from '../style.less';
import React, { useState } from 'react';
import { SpecifyItem, Specify } from '../../components/Specify';
import { CheckOutlined, PlusCircleOutlined } from '@ant-design/icons';
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

  const [specifyInputs, setSpecifyInputs] = useState<string[]>([]);


  function specifyChange(e, key: string) {
    setSpecify({ ...specify, [key]: e.target.value })
  }

  function addSpecify(data: ISpecify) {
    const { name, value } = data;
    setSpecifies([...specifies, name]);
    setSpecifiesMap(specifiesMap.set(name, [value]));

  }

  function specifyValueChange(e, index: number) {
    let arr = [...specifyInputs];
    arr[index] = e.target.value;
    setSpecifyInputs(arr);
  }

  function addSpecifyValue(name: string, index: number) {
    let value = specifyInputs[index];

    //将新的数据加入到Map中
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.push(value);
    setSpecifiesMap(specifiesMap.set(name, valueArr));

    //每次添加完数据后清空原来的输入框
    let arr = [...specifyInputs];
    arr[index] = '';
    setSpecifyInputs(arr);

  }

  /**
   * 删除规格值
   * @param name 规格名称
   * @param index 当前规格值所在位置
   */
  function deleteSpecifyValue(name: string, index: number): void {
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.splice(index, 1);
    specifiesMap.set(name, valueArr)
    let newMap = new Map(specifiesMap);
    setSpecifiesMap(newMap);
  }

  /**
   * 删除规格
   * @param name 规格名称
   */
  function deleteSpecify(name: string, index: number): void {
    specifiesMap.delete(name)
    setSpecifiesMap(specifiesMap);

    //删除保存的新增规格值的数组
    let arr = [...specifyInputs];
    arr.splice(index, 1);
    setSpecifyInputs(arr);
  }

  return (
    <Modal
      width={550}
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



        {
          [...specifiesMap.keys()].map((name, i) => (
            <Specify name={name} deleteBack={(name: string) => { deleteSpecify(name, i) }}>
              {
                (specifiesMap.get(name) || []).map((value: string, index: number) => (
                  <SpecifyItem value={value} deleteBack={() => { deleteSpecifyValue(name, index) }} />
                ))
              }

              <Input.Group compact style={{ width: 162, marginTop: 10 }}>
                <Input style={{ width: 120 }} value={specifyInputs[i]} onChange={(e) => { specifyValueChange(e, i) }} />
                <Button onClick={() => { addSpecifyValue(name, i) }} icon={<CheckOutlined />} type='primary'></Button>
              </Input.Group>
            </Specify>
          ))
        }

      </Form>
    </Modal>
  )
}

export default AddFormModal;
