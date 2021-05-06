import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Form, Select, DatePicker, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const FormItem = Form.Item;

export interface AddModalProps {
    visible: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void;
}

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const AddModal: React.FC<AddModalProps> = (props) => {

    const nowTime = new Date();
    const timePoint = nowTime.getFullYear() + "" + (nowTime.getMonth() + 1) + nowTime.getDay();
    const [fileList, setFileList] = useState([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]);
    const [form] = Form.useForm();
    const { visible, onCancel, onFinish } = props;

    const handleFinish = async () => {
        await waitTime(2000);
        const values = await form.validateFields();
        onFinish(values);
    }

    const formItemLayout = {
        labelCol: { span: 6, offset: 1 },
        wrapperCol: { span: 14 },
    };


    const uploadProps = {
        name: 'file',
        action: '/prod-api/mall/common/upload',
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    );


    const handleChange = ({ fileList }: any) => {
        setFileList(fileList);
    }

    return (
        <Modal
            title="商家认证申请"
            visible={visible}
            centered
            onOk={() => handleFinish()}
            onCancel={onCancel}
            width={800}
        >
            <Form
                {...formItemLayout}
                hideRequiredMark
                form={form}
                initialValues={{
                    billno: `RZ-` + timePoint,
                }}
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

                <FormItem
                    label="申请时间"
                    name="applydate"
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择发布时间"
                    />
                </FormItem>

                <FormItem
                    label="企业名称"
                    name="compName"
                >
                    <Input placeholder="请输入企业名称" allowClear />
                </FormItem>

                <FormItem
                    label="企业类型"
                    name="companytype"
                >
                    <Select>
                        <Option value="供方">供方</Option>
                        <Option value="需方">需方</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="主营业务"
                    name="mainBusiness"
                >
                    <Input.TextArea rows={4} placeholder="请输入主营业务" />
                </FormItem>

                <FormItem
                    label="纳税人识别号"
                    name="companyregnum"
                >
                    <Input placeholder="请输入纳税人识别号" allowClear />
                </FormItem>

                <FormItem
                    label="所在省"
                    name="inprovinces"
                >
                    <Select>
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="所在市"
                    name="incities"
                >
                    <Select>
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="所在区"
                    name="region"
                >
                    <Select>
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="详细地址"
                    name="adressOffice"
                >
                    <Input placeholder="请输入详细地址" allowClear />
                </FormItem>

                <FormItem
                    label="营业执照"
                    name="businesslicense"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="建议图片大小不超过250kb"
                >
                    <Upload
                        {...uploadProps}
                        showUploadList={{ showPreviewIcon: false }}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}>
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </FormItem>

                <FormItem
                    label="企业简介"
                    name="companyprofile"
                >
                    <Input.TextArea rows={4} placeholder="请输入企业简介" />
                </FormItem>

                <FormItem
                    label="商家名称"
                    name="shopname"
                >
                    <Input placeholder="请输入商家名称" allowClear />
                </FormItem>

                <FormItem
                    label="是否自营"
                    name="selfSupport"
                >
                    <Input placeholder="请输入商家名称" allowClear />
                </FormItem>

                <FormItem
                    label="商家手机号"
                    name="shopmobile"
                >
                    <Input placeholder="请输入商家手机号" allowClear />
                </FormItem>

                <FormItem
                    label="所属代理商"
                    name="nameAgent"
                >
                    <Input placeholder="请输入所属代理商" allowClear />
                </FormItem>

                <FormItem
                    label="公司授权书"
                    name="authorizedFile"
                >
                    <Upload
                        {...uploadProps}
                        showUploadList={{ showPreviewIcon: false }}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}>
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </FormItem>

                <FormItem
                    label="授权联系人姓名"
                    name="authorizedUsername"
                >
                    <Input placeholder="请输入授权联系人姓名" allowClear />
                </FormItem>

                <FormItem
                    label="授权联系人电话"
                    name="authorizedUserTel"
                >
                    <Input placeholder="请输入授权联系人电话" allowClear />
                </FormItem>

                <FormItem
                    label="授权联系人邮箱"
                    name="authorizedUserMail"
                >
                    <Input placeholder="请输入授权联系人邮箱" allowClear />
                </FormItem>

                <FormItem
                    label="办公电话"
                    name="officeTel"
                >
                    <Input placeholder="请输入办公电话" allowClear />
                </FormItem>

                <FormItem
                    label="合同附件"
                    name="contaccessory"
                >
                    <Upload
                        {...uploadProps}
                        showUploadList={{ showPreviewIcon: false }}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}>
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </FormItem>

                <FormItem
                    label="开户行"
                    name="bankDeposit"
                >
                    <Input placeholder="请输入开户行" allowClear />
                </FormItem>

                <FormItem
                    label="开户名"
                    name="accountName"
                >
                    <Input placeholder="请输入开户名" allowClear />
                </FormItem>

                <FormItem
                    label="银行账户"
                    name="bankAccount"
                >
                    <Input placeholder="请输入银行账户" allowClear />
                </FormItem>

                <FormItem
                    label="结算类型"
                    name="settlementtype"
                >
                    <Input placeholder="请输入结算类型" allowClear />
                </FormItem>
            </Form>
        </Modal>
    )
}

export default AddModal;
