import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import styles from '../style.less';
import { Specify, SpecifyItem } from '../../components/Specify';
import { CheckOutlined } from '@ant-design/icons';
export type FormValueType = {
  id?: string;
  isValid?: string | boolean;
  specModelName?: string;
  specModelDescribe?: string;
  shopId?: string;
  specInfo?: string;
  createuser?: string;
  updatedate?: string;
};


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

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (fiedls: FormValueType) => {};
  addModalVisible: boolean;
};

const AddForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [addForm] = Form.useForm();
  const { addModalVisible, onSubmit, onCancel } = props;

  const [specify, setSpecify] = useState<ISpecify>({ name: '', value: '' });
  const [specifies, setSpecifies] = useState<string[]>([]);
  const [specifiesMap, setSpecifiesMap] = useState<Map<string, string[]>>(new Map());

  const [specifyInputs, setSpecifyInputs] = useState<string[]>([]);

  const [addSpecifyVisible, setAddSpecifyVisible] = useState(false);


  function specifyChange(e:any, key: string) {
    setSpecify({ ...specify, [key]: e.target.value })
  }

  function addSpecify(data: ISpecify) {
    const { name, value } = data;
    setSpecifies([...specifies, name]);
    setSpecifiesMap(specifiesMap.set(name, [value]));

  }

  function specifyValueChange(e:any, index: number) {
    let arr = [...specifyInputs];
    arr[index] = e.target.value;
    setSpecifyInputs(arr);
  }

  function addSpecifyValue(name: string, index: number) {
    let value = specifyInputs[index];

    //????????????????????????Map???
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.push(value);
    setSpecifiesMap(specifiesMap.set(name, valueArr));

    //????????????????????????????????????????????????
    let arr = [...specifyInputs];
    arr[index] = '';
    setSpecifyInputs(arr);

  }

  /**
   * ???????????????
   * @param name ????????????
   * @param index ???????????????????????????
   */
  function deleteSpecifyValue(name: string, index: number): void {
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.splice(index, 1);
    specifiesMap.set(name, valueArr)
    let newMap = new Map(specifiesMap);
    setSpecifiesMap(newMap);
  }

  /**
   * ????????????
   * @param name ????????????
   */
  function deleteSpecify(name: string, index: number): void {
    specifiesMap.delete(name)
    setSpecifiesMap(specifiesMap);

    //???????????????????????????????????????
    let arr = [...specifyInputs];
    arr.splice(index, 1);
    setSpecifyInputs(arr);
  }

  const clearData = () => {
    setSpecify({ name: '', value: '' })
    setAddSpecifyVisible(false);
  }


  return (
    <ModalForm
      {...formItemLayoutWithOutLabel}
      form={addForm}
      title={'??????????????????'}
      visible={addModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          clearData();
          setSpecifiesMap(new Map())
          onCancel(false)
          addForm.resetFields();
        }
      }}
      onFinish={async (data) => {
        const fields = { ...data }
        fields.specInfo = Object.fromEntries(specifiesMap.entries());
        let success = onSubmit(fields);
        if(success){
          clearData();
          setSpecifiesMap(new Map())
        }

      }}
    >
      <Form.Item
        name='specModelName'
        label='????????????'
      >
        <Input placeholder="?????????????????????" />
      </Form.Item>

      <Form.Item
       name='specModelDescribe'
        label='????????????'
      >
        <TextArea placeholder="?????????????????????" rows={4} />
      </Form.Item>

      <Button type='primary' onClick={() => { setAddSpecifyVisible(true) }}>???????????????</Button>

      {addSpecifyVisible && <Row className={styles.addModalWrap} gutter={24}>
        <Col className={styles.addModalCol} span={9}>
          <span className={styles.label60} >??????:</span>
          <Input onChange={(e) => specifyChange(e, 'name')} value={specify.name} placeholder='???????????????'></Input>
        </Col>
        <Col className={styles.addModalCol} span={9}>
          <span className={styles.label80}>?????????:</span>
          <Input onChange={(e) => specifyChange(e, 'value')} value={specify.value} placeholder='??????????????????'></Input>
        </Col>
        <Col className={styles.addModalCol} span={6}>
          <Space>
            <Button size="small" onClick={clearData}>??????</Button>
            <Button size="small" type='primary' onClick={() => { clearData(); addSpecify(specify) }}>??????</Button>
          </Space>
        </Col>
      </Row>}



      {
        [...specifiesMap.keys()].map((name, i) => (
          <Specify name={name} key={i} deleteBack={(name: string) => { deleteSpecify(name, i) }}>
            {
              (specifiesMap.get(name) || []).map((value: string, index: number) => (
                <SpecifyItem value={value} key={index} deleteBack={() => { deleteSpecifyValue(name, index) }} />
              ))
            }

            <Input.Group compact style={{ width: 162, marginTop: 10 }}>
              <Input style={{ width: 120 }} value={specifyInputs[i]} onChange={(e) => { specifyValueChange(e, i) }} />
              <Button onClick={() => { addSpecifyValue(name, i) }} icon={<CheckOutlined />} type='primary'></Button>
            </Input.Group>
          </Specify>
        ))
      }

    </ModalForm >

  );
});

export default AddForm;
