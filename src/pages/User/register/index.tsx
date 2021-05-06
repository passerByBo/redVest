import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';
import styles from './style.less'
import { Link } from 'umi';
import { Form, Input, Radio, Cascader, Upload, Row, Col, Button } from 'antd';
import { getProvinceList } from '@/services/user/register';
// import chinaDivisions from '@/utils/china-divisions'
const FormItem = Form.Item;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};

const Register: React.FC = () => {


  const [submitting, setSubmitting] = useState(false);
  const [count, setcount]: [number, any] = useState(0);

  let interval: number | undefined;

  const onGetCaptcha = () => {
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const submit = () => {

  }

  return (
    <div className={styles.container}>
      <div className={styles.lang}></div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>红背心商城</span>
            </Link>
          </div>
          <div className={styles.desc}>红背心商城商家认证申请</div>
        </div>

        <div className={styles.main}>
          {/* <h3> 注册</h3> */}
          <Form
            {...layout}
            onFinish={(values) => {
              console.log('values', values)
            }}
          >
            <FormItem
              label='企业名称'
              name="compName"
              rules={[
                {
                  required: true,
                  message: '企业名称不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入企业名称'
              />
            </FormItem>

            <Form.Item
              name="companytype"
              label="企业类型"
              rules={[
                {
                  required: true,
                  message: '请选择企业类型'
                }
              ]}
            >
              <Radio.Group>
                <Radio value="供方">供方</Radio>
                <Radio value="需方">需方</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="mainBusiness"
              label="主营业务"
              rules={[
                {
                  required: true,
                  message: "请输入主营业务"
                }
              ]}
            >
              <TextArea />
            </Form.Item>

            <FormItem
              label='纳税人识别号'
              name="companyregnum"
              rules={[
                {
                  required: true,
                  message: '纳税人识别号不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入纳税人识别号'
              />
            </FormItem>

            {/* <Form.Item name='divisions' label="所在省市区"
              rules={[
                {
                  required: true,
                  message: '所在省市不能为空！',
                }
              ]}
            >
              <Cascader
                placeholder="请选择所在省市区"
                options={chinaDivisions}
              />
            </Form.Item> */}

            <FormItem
              label='详细地址'
              name="adressOffice"
              rules={[
                {
                  required: true,
                  message: '详细地址不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入详细地址'
              />
            </FormItem>

            <FormItem
              label="营业执照"

            >
              <FormItem
                name="dragger"
                valuePropName="fileList"
                noStyle
                rules={[
                  {
                    required: true,
                    message: '请上传营业执照'
                  }
                ]}>
                <Upload.Dragger name="businesslicense" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                  <p className="ant-upload-hint">支持单次或批量上传</p>
                </Upload.Dragger>
              </FormItem>
            </FormItem>
            <Form.Item
              name="companyprofile"
              label="企业简介"
              rules={[
                {
                  required: true,
                  message: '请输入企业简介'
                }
              ]}
            >
              <TextArea />
            </Form.Item>

            <FormItem
              label='商家名称'
              name="shopname"
              rules={[
                {
                  required: true,
                  message: '商家名称不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入商家名称'
              />
            </FormItem>

            <FormItem
              label='商家手机号'
              name="shopmobile"
              rules={[
                {
                  required: true,
                  message: '商家手机号不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入商家手机号'
              />
            </FormItem>

            <FormItem
              label='授权联系人姓名'
              name="authorizedUsername"
              rules={[
                {
                  required: true,
                  message: '授权联系人姓名不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入授权联系人姓名'
              />
            </FormItem>

            <FormItem
              label='授权联系人电话'
              name="authorizedUserTel"
              rules={[
                {
                  required: true,
                  message: '授权联系人电话不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入授权联系人电话'
              />
            </FormItem>

            <FormItem
              label='授权联系人邮箱'
              name="authorizedUserMail"
              rules={[
                {
                  required: true,
                  message: '授权联系人邮箱不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入授权联系人邮箱'
              />
            </FormItem>

            <FormItem
              label='办公电话'
              name="officeTel"
              rules={[
                {
                  required: true,
                  message: '办公电话不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入办公电话'
              />
            </FormItem>

            {/* <FormItem label="合同附件">
              <FormItem name="dragger" valuePropName="fileList" noStyle
                rules={[
                  {
                    required: true,
                    message: '合同附件不能为空！',
                  }
                ]}
              >
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                  <p className="ant-upload-hint">支持单次或批量上传</p>
                </Upload.Dragger>
              </FormItem>
            </FormItem> */}

            <FormItem
              label='开户行'
              name="bankDeposit"
              rules={[
                {
                  required: true,
                  message: '开户行不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入开户行'
              />
            </FormItem>

            <FormItem
              label='开户名'
              name="accountName"
              rules={[
                {
                  required: true,
                  message: '开户名不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入开户名'
              />
            </FormItem>

            <FormItem
              label='银行账户'
              name="bankAccount"
              rules={[
                {
                  required: true,
                  message: '银行账户不能为空！',
                }
              ]}
            >
              <Input
                placeholder='请输入银行账户'
              />
            </FormItem>



            <Row gutter={8}>
              <Col span={17}>
                <FormItem
                  labelCol={{ span: 10, offset: 0 }}
                  label='验证码'
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '验证码不能为空',
                    },
                  ]}
                >
                  <Input
                    placeholder={'请输入验证码'}
                  />
                </FormItem>
              </Col>
              <Col span={7}>
                <Button
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : '获取验证码'}
                </Button>
              </Col>
            </Row>

            <Row>
              <Col span={24} offset={7}>
                <FormItem>
                  <Button
                    htmlType="submit"
                    size="large"
                    loading={submitting}
                    className={styles.submit}
                    type="primary"
                  >
                    注册
              </Button>
                  <Link className={styles.login} to="/user/login">
                    使用已有账户登录
              </Link>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <Footer />
    </div >

  )
}

export default Register;
