import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Modal, Select, Spin, Cascader, message, Radio } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ImagePicker from '@/components/ImagePicker';
import type { TableListItem } from '../../data.d';
import { getItemDetail } from '@/services/customer/index';
import { getProvinceList } from '@/services/user/register';
import { transactItem } from '@/services/customer/index';
import { useRequest } from 'umi';
import {
    ProFormDatePicker,
} from '@ant-design/pro-form';
import Moment from 'moment';

interface IOptions {
    value: number;
    label: string;
    isLeaf?: boolean;
}

export type FormValueType = {
    articleName?: string;
    desc?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => void;
    updateModalVisible: boolean;
    values: any;
};
const { Option } = Select;
const FormItem = Form.Item;

const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
};

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

/**
 * 添加节点
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在办理');
    try {
        let res = await transactItem({ ...fields });
        if (res.status === 200 && res.code !== 200) {
            hide();
            message.error('办理失败!' + res.msg, 15);
            return false;
        }
        hide();
        message.success('办理成功');
        return true;
    } catch (error) {
        hide();
        message.error('办理失败！');
        return false;
    }
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
    } = props;

    const [form] = Form.useForm();
    const [transactForm] = Form.useForm();
    const [transactVisible, setTransactVisible] = useState<boolean>(false);
    const [chinaDivisionsOptions, setChinaDivisionsOptions] = useState<IOptions[]>([]);
    const [data, setData] = useState<any>(null);

    // 办理
    const doTransact = async () => {
        const transactFormData = await transactForm.validateFields();
        const formData = await form.validateFields();
        if (formData.businesslicense && Array.isArray(formData.businesslicense)) {
            formData.businesslicense = formData.businesslicense.map((item: any) => item.id).join(',');
        }
        if (formData.authorizedFile && Array.isArray(formData.authorizedFile)) {
            formData.authorizedFile = formData.authorizedFile.map((item: any) => item.id).join(',');
        }
        if (formData.contaccessory && Array.isArray(formData.contaccessory)) {
            formData.contaccessory = formData.contaccessory.map((item: any) => item.id).join(',');
        }
        formData.id = data.id;
        console.log(transactFormData, formData);
        setTransactVisible(false);
        handleUpdateModalVisible();
        handleAdd({ ...formData, ...transactFormData });
    }

    // 保存
    const handleSave = async () => {
        const fieldsValue = { ...await form.validateFields() };
        if (fieldsValue.businesslicense && Array.isArray(fieldsValue.businesslicense)) {
            fieldsValue.businesslicense = fieldsValue.businesslicense.map((item: any) => item.id).join(',');
        }
        if (fieldsValue.authorizedFile && Array.isArray(fieldsValue.authorizedFile)) {
            fieldsValue.authorizedFile = fieldsValue.authorizedFile.map((item: any) => item.id).join(',');
        }
        if (fieldsValue.contaccessory && Array.isArray(fieldsValue.contaccessory)) {
            fieldsValue.contaccessory = fieldsValue.contaccessory.map((item: any) => item.id).join(',');
        }
        fieldsValue.applydate = Moment(fieldsValue.applydate._d).format('YYYY-MM-DD');
        fieldsValue.id = data.id;
        handleUpdate({ ...fieldsValue });
    };

    // 格式化省市区
    function formatCascaderData<T>(arr: T[], tag: boolean = false) {
        if (!arr || !Array.isArray(arr)) return [];
        return arr.map((item) => {
            return { ...item, isLeaf: tag }
        })
    }

    // 加载省市区
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

    const renderFooter = () => {
        return (
            <>
                <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
                {
                    values.type === "草稿"
                    &&
                    <>
                        <Button type="primary" onClick={() => { handleSave() }}>
                            保存
                        </Button>
                        <Button htmlType="button" onClick={() => setTransactVisible(true)}>
                            办理
                        </Button>
                    </>
                }
            </>
        );
    };

    const { loading, run } = useRequest(getItemDetail.bind(null, { id: values.id }), {
        manual: true,
        onSuccess: (result) => {
            if (result) {
                form.setFieldsValue({
                    ...result,
                    // applydate: moment(result.applydate, 'YYYY-MM-DD')
                });
                setData(result);
            } else {
                message.error('详细信息加载失败！')
            }

        }
    })

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
        if (updateModalVisible) {
            run();
        }
    }, [updateModalVisible])

    return (
        <Modal
            width={800}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title="分类管理"
            visible={updateModalVisible}
            footer={renderFooter()}
            onCancel={() => { handleUpdateModalVisible(); form.resetFields() }}
        >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} spinning={loading} style={{ textAlign: "center", marginLeft: 380 }} />
            {
                !loading
                &&
                <>
                    <Form
                        {...formLayout}
                        form={form}
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
                            <Input placeholder="请输入单据编号" allowClear disabled />
                        </FormItem>
                        <ProFormDatePicker fieldProps={{ format: 'YYYY-MM-DD' }} required placeholder={"选择申请时间"} width="md" name="applydate" label="申请时间" />
                        {/* <FormItem
                            label="申请时间"
                            name="applydate"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <DatePicker
                                disabled={values.type !== "草稿"}
                                style={{ width: '100%' }}
                                placeholder="选择发布时间"
                            />
                        </FormItem> */}

                        <FormItem
                            label="企业名称"
                            name="compName"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input placeholder="请输入企业名称" allowClear disabled={values.type !== "草稿"} />
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
                            <Select disabled={values.type !== "草稿"}>
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
                            <Input.TextArea rows={4} placeholder="请输入主营业务" disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入纳税人识别号" allowClear disabled={values.type !== "草稿"} />
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
                                disabled={values.type !== "草稿"}
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
                            <Input placeholder="请输入详细地址" allowClear disabled={values.type !== "草稿"} />
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
                            <ImagePicker initData={data && data.businesslicense} limit={1}></ImagePicker>
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
                            <Input.TextArea rows={4} placeholder="请输入企业简介" disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入商家名称" allowClear disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入商家手机号" allowClear disabled={values.type !== "草稿"} />
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
                            <Select disabled={values.type !== "草稿"}>
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
                            <ImagePicker initData={data && data.authorizedFile} limit={1}></ImagePicker>
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
                            <Input placeholder="请输入授权联系人姓名" allowClear disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入授权联系人电话" allowClear disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入授权联系人邮箱" allowClear disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入办公电话" allowClear disabled={values.type !== "草稿"} />
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
                            <ImagePicker initData={data && data.contaccessory} limit={1}></ImagePicker>
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
                            <Input placeholder="请输入开户行" allowClear disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入开户名" allowClear disabled={values.type !== "草稿"} />
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
                            <Input placeholder="请输入银行账户" allowClear disabled={values.type !== "草稿"} />
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
                            <Select disabled={values.type !== "草稿"}>
                                <Option value="按周结算">按周结算</Option>
                                <Option value="按月结算">按月结算</Option>
                            </Select>
                        </FormItem>
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
                                    <Radio value={'通过'}>通过</Radio>
                                    <Radio value={'不通过'}>不通过</Radio>
                                </Radio.Group>

                            </Form.Item>

                            <Form.Item name="auditOpinion" label="审核意见" rules={[{ required: true }]}>
                                <Input.TextArea />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            }
        </Modal>
    );
};

export default UpdateForm;
