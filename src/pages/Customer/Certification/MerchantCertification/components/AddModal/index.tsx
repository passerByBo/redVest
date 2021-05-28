import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Select, DatePicker, message, Button, Radio, Cascader } from 'antd';
import { getProvinceList } from '@/services/user/register';
import { transactItem } from '@/services/customer/index';
import ImagePicker from '@/components/ImagePicker';
import {
    ProFormDatePicker,
} from '@ant-design/pro-form';

const { Option } = Select;
const FormItem = Form.Item;

export interface AddModalProps {
    visible: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void;
}

interface IOptions {
    value: number;
    label: string;
    isLeaf?: boolean;
}
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const nowTime = new Date();
const timePoint = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + nowTime.getDay();

const initData = {
    "compName": "汇安居(北京)信息科技有限公司1",
    "companytype": "供方",
    "mainBusiness": "技术推广；经济贸易咨询；市场调查；承办展览展示；会议服务；家庭劳务服务；销售家用电器、电子产品、五金交电、建筑材料、机械设备、专用设备、汽车配件；维修家用电器；装卸服务；搬运服务；仓储服务；分批包装；配送服务；维修家具；软件开发；专业承包。",
    "companyregnum": "911101120" + getRandomInt(9) + getRandomInt(9) + "609815N",
    "inprovinces": "北京市",
    "incities": "北京市",
    "region": ["11", "1101", "110103"],
    "selfSupport": "是",
    "nameAgent": "北京代理",
    "adressOffice": "北京市通州区物流基地兴贸二街16号581室",
    "businesslicense": "红背心fg_logo.png",
    "companyprofile": "红背心成立于2014年，是汇安居（北京）信息科技有限公司打造的一个为全国家居电商提供专业的仓储、配送、安装、维修以及售后服务一体化的服务平台。红背心以“专注服务，安全高效”为品牌理念，为商家提供一站式售后解决方案，帮助商家为消费者提供高标准的家具送装服务体验。同时结合互联网应用技术实现全供应链的全程节点管控和信息管理同步，为商家提供全链数据和信息支持，进一步降低商家物流、售后服务成本。也为全国师傅提供行业内标准化、规范化的事业平台。",
    "shopname": "红背心自营商城" + getRandomInt(999),
    "shopmobile": "176001330" + getRandomInt(9) + getRandomInt(9),
    "authorizedFile": "红背心fg_logo.png",
    "authorizedUsername": "红背心自营店长",
    "authorizedUserTel": "152101885" + getRandomInt(9) + getRandomInt(9),
    "authorizedUserMail": "jianghua@hongbeixin.com",
    "officeTel": "152101408" + getRandomInt(9) + getRandomInt(9),
    "contaccessory": "红背心fg_logo.png",
    "bankDeposit": "招商银行",
    "accountName": "科技信息公司" + getRandomInt(999),
    "bankAccount": "621010101010101010",
    "settlementtype": "按周结算"
}

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 6 },
};

function formatCascaderData<T>(arr: T[], tag: boolean = false) {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.map((item) => {
        return { ...item, isLeaf: tag }
    })
}

/**
 * 添加节点
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        let res = await transactItem({ ...fields });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('添加失败!' + res.msg, 15);
            return false;
        }
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败！');
        return false;
    }
};

const AddModal: React.FC<AddModalProps> = (props) => {
    const [form] = Form.useForm();
    const [transactForm] = Form.useForm();
    const { visible, onCancel, onFinish } = props;
    const [transactVisible, setTransactVisible] = useState<boolean>(false);
    const [chinaDivisionsOptions, setChinaDivisionsOptions] = useState<IOptions[]>([]);

    // 保存
    const handleFinish = async (values: any) => {
        console.log('handleFinish', values);
        onFinish(values);
    }

    // 办理
    const handleTransact = () => {
        setTransactVisible(true)
    }

    const doTransact = async () => {
        const transactFormData = await transactForm.validateFields();
        const formData = await form.validateFields();
        console.log(transactFormData, formData);
        setTransactVisible(false);
        onCancel();
        handleAdd({ ...formData, ...transactFormData });
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

    useEffect(() => {
        getProvinceList().then(res => {
            if (res.status === 200 && res.code === 200) {
                setChinaDivisionsOptions(formatCascaderData<IOptions>([...res.data]))
            }
        }, error => {
            message.error('加载省市区数据出错！')
        });
    }, [])

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                billno: `RZ-` + timePoint + getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9),
                ...initData
            });
        }
    }, [visible])

    return (
        <Modal
            title="商家认证申请"
            visible={visible}
            centered
            footer={null}
            onCancel={onCancel}
            width={900}
        >
            <Form
                {...formItemLayout}
                form={form}
                // initialValues={initData}
                onFinish={handleFinish}
            >
                <FormItem
                    label="单据编号"
                    name="billno"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入单据编号" disabled />
                </FormItem>

                <ProFormDatePicker required placeholder={"选择申请时间"} width="md" name="applydate" label="申请时间" />

                <FormItem
                    label="企业名称"
                    name="compName"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入企业名称" allowClear />
                </FormItem>

                <FormItem
                    label="企业类型"
                    name="companytype"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Select>
                        <Option value="供方">供方</Option>
                        <Option value="需方">需方</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="主营业务"
                    name="mainBusiness"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input.TextArea rows={4} placeholder="请输入主营业务" />
                </FormItem>

                <FormItem
                    label="纳税人识别号"
                    name="companyregnum"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入纳税人识别号" allowClear />
                </FormItem>

                <Form.Item
                    name='region'
                    label="所在省市区"
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
                    label="详细地址"
                    name="adressOffice"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入详细地址" allowClear />
                </FormItem>

                <Form.Item
                    label={'营业执照'}
                    name="businesslicense"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <ImagePicker limit={1}></ImagePicker>
                </Form.Item>

                <FormItem
                    label="企业简介"
                    name="companyprofile"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input.TextArea rows={4} placeholder="请输入企业简介" />
                </FormItem>

                <FormItem
                    label="商家名称"
                    name="shopname"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入商家名称" allowClear />
                </FormItem>

                <FormItem
                    label="商家手机号"
                    name="shopmobile"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入商家手机号" allowClear />
                </FormItem>

                <FormItem
                    label="所属代理商"
                    name="nameAgent"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Select>
                        <Option value="北京代理">北京代理</Option>
                        <Option value="平台">平台</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="公司授权书"
                    name="authorizedFile"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <ImagePicker limit={1}></ImagePicker>
                </FormItem>

                <FormItem
                    label="授权联系人姓名"
                    name="authorizedUsername"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入授权联系人姓名" allowClear />
                </FormItem>

                <FormItem
                    label="授权联系人电话"
                    name="authorizedUserTel"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入授权联系人电话" allowClear />
                </FormItem>

                <FormItem
                    label="授权联系人邮箱"
                    name="authorizedUserMail"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入授权联系人邮箱" allowClear />
                </FormItem>

                <FormItem
                    label="办公电话"
                    name="officeTel"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入办公电话" allowClear />
                </FormItem>

                <FormItem
                    label="合同附件"
                    name="contaccessory"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <ImagePicker limit={1}></ImagePicker>
                </FormItem>

                <FormItem
                    label="开户行"
                    name="bankDeposit"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入开户行" allowClear />
                </FormItem>

                <FormItem
                    label="开户名"
                    name="accountName"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入开户名" allowClear />
                </FormItem>

                <FormItem
                    label="银行账户"
                    name="bankAccount"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input placeholder="请输入银行账户" allowClear />
                </FormItem>

                <FormItem
                    label="结算类型"
                    name="settlementtype"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Select>
                        <Option value="按周结算">按周结算</Option>
                        <Option value="按月结算">按月结算</Option>
                    </Select>
                </FormItem>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                        保存
                    </Button>
                    <Button htmlType="button" onClick={handleTransact}>
                        办理
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title="办理"
                visible={transactVisible}
                onOk={doTransact}
                onCancel={() => {
                    setTransactVisible(false)
                }}
            >
                <Form {...formItemLayout} form={transactForm} initialValues={{ status: '通过' }}>

                    <FormItem
                        label="是否自营"
                        name="selfSupport"
                        rules={[
                            {
                                required: true
                            },
                        ]}
                    >
                        <Select>
                            <Option value="是">是</Option>
                            <Option value="否">否</Option>
                        </Select>
                    </FormItem>

                    <Form.Item name='status' label="请选择" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value={'审核通过'}>通过</Radio>
                            <Radio value={'审核未通过'}>不通过</Radio>
                        </Radio.Group>

                    </Form.Item>

                    <Form.Item name="auditOpinion" label="审核意见" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Modal>
    )
}

export default AddModal;
