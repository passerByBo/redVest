import React, { useEffect, useState } from 'react';
import styles from '../style.less';
import { Button, Col, Form, Input, message, Row, Space } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { Specify, SpecifyItem } from '../../components/Specify';
import { CheckOutlined } from '@ant-design/icons';
import { getSpecModeDetail } from '@/services/merchandise/model';

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
  updateModalVisible: boolean;
  values: FormValueType;
};

const UpdateForm: React.FC<UpdateFormProps> = React.memo((props) => {
  const [updateForm] = Form.useForm();
  const { values, updateModalVisible, onSubmit, onCancel } = props;


  const [detail, setDetail] = useState(values);


  const [specify, setSpecify] = useState<ISpecify>({ name: '', value: '' });
  const [specifies, setSpecifies] = useState<string[]>([]);
  const [specifiesMap, setSpecifiesMap] = useState<Map<string, string[]>>(new Map());

  const [specifyInputs, setSpecifyInputs] = useState<string[]>([]);

  const [addSpecifyVisible, setAddSpecifyVisible] = useState(false);


  const parseJsonStringToMap = (json: any) => {
    try {
      // let newJSON = json.replace(/\'/g, '"');
      // let obj = JSON.parse(newJSON);
      let newMap = new Map(Object.entries(json));
      return newMap;
    } catch (error) {
      console.error(error)
    }

    return null;
  }

  const getDetail = async () => {
    try {
      let res = await getSpecModeDetail({ modelId: values.id });
      if (res.status === 200 && res.code !== 200) {
        message.error(res.msg);
        return;
      }
      setDetail(res.data);
      updateForm.setFieldsValue(res.data)
      setSpecifiesMap(parseJsonStringToMap(res.data.specInfo) as Map<string, string[]>);

    } catch (error) {
      message.error('????????????????????????????????????');
    }
  }


  useEffect(() => {
    //?????????????????????
    if (updateModalVisible) {
      getDetail()
    }
  }, [updateModalVisible])


  // if (values) {
  //   updateForm.setFieldsValue(values)
  // }

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
    setSpecifyInputs([]);
  }

  return (
    <ModalForm
      {...formItemLayoutWithOutLabel}
      form={updateForm}
      title={'??????????????????'}
      visible={updateModalVisible}
      onVisibleChange={(visible) => {
        if (!visible) {
          clearData();
          setSpecifiesMap(new Map())
          onCancel(false)
        }
      }}
      onFinish={async (data) => {
        const fields = { ...data }
        fields.id = detail.id;
        clearData();
        fields.specInfo = Object.fromEntries(specifiesMap.entries());
        let success = await onSubmit(fields);
        if (success) {
          setSpecifiesMap(new Map())
          clearData();
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

    </ModalForm >


  );
});

export default UpdateForm;
