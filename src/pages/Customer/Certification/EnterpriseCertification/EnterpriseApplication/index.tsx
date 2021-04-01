import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, DatePicker, Radio, Row, Col, Space, Upload } from 'antd';

const { Option } = Select

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

const provinceData = ['Zhejiang', 'Jiangsu'];

const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
};

const EnterpriseAppComponent: React.FC = () => {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const [cities, setCities] = React.useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = React.useState(cityData[provinceData[0]][0]);

  const handleProvinceChange = value => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = value => {
    setSecondCity(value);
  };

  return (
    <PageContainer
      header={{
        title: '企业认证管理新增',
      }}
    >
      <div style={{ backgroundColor: 'white', padding: '24px', minHeight: '280px', }}>
        <Row>
          <Col span={12} offset={8}>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
              <Form.Item name="note1" label="单据编号">
                <Input />
              </Form.Item>
              <Form.Item name="note2" label="申请时间">
                <DatePicker />
              </Form.Item>
              <Form.Item name="note3" label="企业名称" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="note4" label="企业类型" rules={[{ required: true }]} wrapperCol={{ span: 18 }}>
                <Radio.Group>
                  <Radio value="a">【需方】为物资需求方即甲方</Radio>
                  <Radio value="b">【供应商】为物资提供方即乙方</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="note5" label="纳税人识别号" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="note6" label="所在省市区" rules={[{ required: true }]}>
                <Space>
                  <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
                    {provinceData.map(province => (
                      <Option key={province}>{province}</Option>
                    ))}
                  </Select>
                  <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
                    {cities.map(city => (
                      <Option key={city}>{city}</Option>
                    ))}
                  </Select>
                </Space>
              </Form.Item>
              <Form.Item name="note7" label="详细地址" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="note8" label="营业执照" rules={[{ required: true }]}>
                <Upload {...props}>
                  <Button type="primary" icon={<UploadOutlined />}>上传</Button>
                </Upload>,
              </Form.Item>
              <Form.Item name="note9" label="开户行" rules={[{ required: true }]}>
                <Upload {...props}>
                  <Button type="primary" icon={<UploadOutlined />}>上传</Button>
                </Upload>,
              </Form.Item>
              <Form.Item name="note99" label="姓名" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="note999" label="部门">
                <Input />
              </Form.Item>
              <Form.Item name="note9999" label="职务" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="note99999" label="手机号" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="note999999" label="邮箱" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </PageContainer >
  )
}

export default EnterpriseAppComponent;
