import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import styles from './style.less'
import { Link, history } from 'umi';
import { Form, Input, Radio, Cascader, Row, Col, Button, message, Upload } from 'antd';
import { getProvinceList, register } from '@/services/user/register';
import { getAuthCode, getRegisterAuthCode } from '@/services/user/login';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
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

const initData = {
  "compName": "汇安居(北京)信息科技有限公司",
  "companytype": "供方",
  "mainBusiness": "技术推广；经济贸易咨询；市场调查；承办展览展示；会议服务；家庭劳务服务；销售家用电器、电子产品、五金交电、建筑材料、机械设备、专用设备、汽车配件；维修家用电器；装卸服务；搬运服务；仓储服务；分批包装；配送服务；维修家具；软件开发；专业承包。",
  "companyregnum": "91110112089609815N",
  "inprovinces": "北京市",
  "incities": "北京市",
  "region": [],
  "adressOffice": "北京市通州区物流基地兴贸二街16号581室",
  // "businesslicense": "红背心fg_logo.png",
  "companyprofile": "红背心成立于2014年，是汇安居（北京）信息科技有限公司打造的一个为全国家居电商提供专业的仓储、配送、安装、维修以及售后服务一体化的服务平台。红背心以“专注服务，安全高效”为品牌理念，为商家提供一站式售后解决方案，帮助商家为消费者提供高标准的家具送装服务体验。同时结合互联网应用技术实现全供应链的全程节点管控和信息管理同步，为商家提供全链数据和信息支持，进一步降低商家物流、售后服务成本。也为全国师傅提供行业内标准化、规范化的事业平台。",
  "shopname": "红背心自营商城",
  "shopmobile": "17600133016",
  // "authorizedFile": "红背心fg_logo.png",
  "authorizedUsername": "红背心自营店长",
  "authorizedUserTel": "15210140885",
  "authorizedUserMail": "jianghua@hongbeixin.com",
  "officeTel": "15210140885",
  // "contaccessory": "红背心fg_logo.png",
  "bankDeposit": "招商银行",
  "accountName": "科技信息公司",
  "bankAccount": "621010101010101010",
}



interface IOptions {
  value: number;
  label: string;
  isLeaf?: boolean;
}


function formatCascaderData<T>(arr: T[], tag: boolean = false) {
  if (!arr || !Array.isArray(arr)) return [];
  return arr.map((item) => {
    return { ...item, isLeaf: tag }
  })
}

const Register: React.FC = () => {


  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [count, setcount]: [number, any] = useState(0);
  const [chinaDivisionsOptions, setChinaDivisionsOptions] = useState<IOptions[]>([]);


  useEffect(() => {
    getProvinceList().then(res => {
      if (res.status === 200 && res.code === 200) {
        setChinaDivisionsOptions(formatCascaderData<IOptions>([...res.data]))
      }
    }, error => {
      message.error('加载省市区数据出错！')
    })
  }, [])

  let interval: number | undefined;

  const onGetCaptcha = async () => {

    //获取验证码以前需要校验表单输入
    try {
      await form.validateFields(['shopmobile']);
    } catch (error) {
      message.error('请先输入商家手机号然后再获取验证码');
      return;
    }
    const hide = message.loading('请求玩命发送中！')
    try {
      const res = await getRegisterAuthCode({
        phone: form.getFieldValue('shopmobile')
      });
      if (res.status === 200 && res.code === 200) {
        message.success('验证码已经发送，请在手机上查看');
        hide()
        let counts = 59;
        setcount(counts);
        interval = window.setInterval(() => {
          counts -= 1;
          setcount(counts);
          if (counts === 0) {
            clearInterval(interval);
          }
        }, 1000);
        return;
      }
      hide()
      message.error(res.msg)
    } catch (error) {
      hide()
      message.error('发送验证码失败，请重试')
    }


  };

  const submit = async (fields: any) => {
    fields.region = fields.region.pop();


    // fields.contaccessory = 'https://img2.baidu.com/it/u=507575223,907330772&fm=26&fmt=auto&gp=0.jpg';
    // fields.businesslicense = 'https://img2.baidu.com/it/u=507575223,907330772&fm=26&fmt=auto&gp=0.jpg';
    // fields.authorizedFile = 'https://img2.baidu.com/it/u=507575223,907330772&fm=26&fmt=auto&gp=0.jpg';

    fields.contaccessory = fields.contaccessory.map((item:any) => item.response.fileName).join(',')
    fields.businesslicense = fields.businesslicense.map((item:any) => item.response.fileName).join(',')
    fields.authorizedFile = fields.authorizedFile.map((item:any) => item.response.fileName).join(',')

    let hide = message.loading('正在注册中！')
    try {
      let res = await register(fields);
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('注册失败，' + res.msg);
        return false;
      }
      hide();
      return true;
    } catch (error) {
      hide();
      message.error('注册失败请重试！');
      return false;
    }

  }

  const loadDivisionsData = async (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    try {
      const res = await getProvinceList({ pNo: targetOption.value });
      if (res.status === 200 && res.code === 200) {
        targetOption.children = formatCascaderData<IOptions>([...res.data], targetOption.value.length >= 4);
        targetOption.loading = false;
        setChinaDivisionsOptions([...chinaDivisionsOptions]);
      } else {
        message.error(res.msg)
      }
    } catch (error) {
      message.error('加载省市区数据出错，刷新后重试')
    }

  }


  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadChange = (info:any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
    }
    if (status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
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
            initialValues={initData}
            {...layout}
            form={form}
            onFinish={async (values) => {
              console.log('values',values)
              let success = await submit(values);
              if (success) {
                history.push('/user/register-result?name=' + form.getFieldValue('compName'))
              }
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
              <TextArea  placeholder='请输入主营业务' rows={8} />
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

            <Form.Item name='region' label="所在省市区"
              rules={[
                {
                  required: true,
                  message: '所在省市不能为空！',
                }
              ]}
            >
              <Cascader
                placeholder="请选择所在省市区"
                options={chinaDivisionsOptions}
                loadData={loadDivisionsData}
                changeOnSelect
              />
            </Form.Item>

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

            <Form.Item label="营业执照">
              <Form.Item name="businesslicense"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                  {
                    required: true,
                    message: '营业执照不能为空！',
                  }
                ]}>
                <Upload.Dragger multiple={true} name="file" action="/prod-api/mall/common/upload" onChange={(info:any) => uploadChange(info)}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                  <p className="ant-upload-hint">支持单次或批量上传</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>


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
              <TextArea  placeholder='请输入企业简介' rows={8} />
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

            <Form.Item label="公司授权书">
              <Form.Item name="authorizedFile"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                  {
                    required: true,
                    message: '公司授权书不能为空！',
                  }
                ]}>
                <Upload.Dragger multiple={true} name="file" action="/prod-api/mall/common/upload" onChange={(info:any) => uploadChange(info)}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                  <p className="ant-upload-hint">支持单次或批量上传</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>




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

            <Form.Item label="合同附件">
              <Form.Item name="contaccessory"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                  {
                    required: true,
                    message: '合同附件不能为空！',
                  }
                ]}>
                <Upload.Dragger multiple={true} name="file" action="/prod-api/mall/common/upload" onChange={(info:any) => uploadChange(info)}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                  <p className="ant-upload-hint">支持单次或批量上传</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

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
                  name="authCode"
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
