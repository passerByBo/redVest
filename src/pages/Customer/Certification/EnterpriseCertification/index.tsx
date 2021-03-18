import React, { useRef, useState } from 'react';
import { PlusOutlined, ShareAltOutlined, MailOutlined, RollbackOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormUploadButton,
  ProFormTextArea
} from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const EnterpriseCertification: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const [enterpriseAppVisible, setEnterpriseAppVisible] = useState(false)
  const [selectItem, setSelectItem] = useState<API.RuleListItem>({});
  const [revokeModalVisible,setRevokeModalVisible] = useState(false);



  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '来自',
      dataIndex: 'desc',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '标题',
      dataIndex: 'name',
      valueType: 'textarea',
      render(_, item) {
        return (
          <a onClick={() => { setSelectItem(item); setEnterpriseAppVisible(true) }}>{_}</a>
        )
      }
    },
    {
      title: '接收时间',
      dataIndex: 'updatedAt',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '期限',
      dataIndex: 'updatedAt',
      valueType: 'textarea',
      search: false,
    }
  ]

  const [columnsState, setColumnsState] = useState(columns)

  const handleUrge = () => {
    Modal.confirm({
      title: '催办',
      icon: <ExclamationCircleOutlined />,
      content: '确认要催办当前的办理者吗？',
      okText: '确认',
      cancelText: '取消',
    });
  }

  //tab切换
  const onTabChange = (key: string) => {
    let newColumns = [...columnsState]
    let isGen = newColumns[newColumns.length - 1].dataIndex === 'option';
    if (!isGen && key === 'initiate') {
      newColumns.push({
        title: '操作',
        width: 250,
        dataIndex: 'option',
        render: (text, record, _, action) => [
          <Button type="primary" ghost style={{ marginRight: 8 }} icon={<ShareAltOutlined />} size='small'>跟踪</Button>,
          <Button onClick={handleUrge} style={{ marginRight: 8 }} icon={<MailOutlined />} size='small' >催办</Button>,
          <Button onClick={(() => {setRevokeModalVisible(true)})} danger icon={<RollbackOutlined />} size='small'>撤销</Button>
        ],
      })
    } else if (isGen) {
      newColumns.pop()
    }

    setColumnsState(newColumns)
  }
  
  return (
    <PageContainer
      onTabChange={onTabChange}
      header={{
        title: '企业认证管理',
      }}
      tabList={[
        {
          tab: '代办',
          key: 'agent',
        },
        {
          tab: '已办',
          key: 'done',
        },
        {
          tab: '发起',
          key: 'initiate',
        },
        {
          tab: '说明',
          key: 'desc',
        },
      ]}
    >
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={"企业认证管理"}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setEnterpriseAppVisible(true)
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columnsState}
        rowSelection={{
          onChange: (_, selectedRows) => {
          },
        }}
      />

      <ModalForm
        visible={enterpriseAppVisible}
        title={"企业认证管理(" + (selectItem.name || '新建的') + ')'}
        modalProps={{
          onCancel: () => {
            //需要根据具体业务这里做作废还是保存还是办理的工作
            setEnterpriseAppVisible(false)
          }
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
          return true;
        }}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              <Button
                key="void"
                type="primary"
                danger
                onClick={() => {
                  props.submit();
                  alert('作废')
                }}
              >
                作废
              </Button>,
              <Button
                key="save"
                type="primary"
                ghost
                onClick={() => {
                  props.submit();
                  alert('保存')
                }}
              >
                保存
              </Button>,
              <Button
                key="handle"
                type="primary"
                onClick={() => {
                  props.submit();
                  alert('办理')
                }}
              >
                办理
              </Button>,
            ];
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="docNumber"
            label="单据编号"
            disabled
            initialValue="QYRZ-20210315-02018"
          />
          <ProFormText width="md" name="applicationTime" label="申请时间" disabled initialValue="2021-03-15" />
        </ProForm.Group>


        <ProForm.Group>
          <ProFormText
            width="md"
            name="company"
            label="企业名称"
            rules={[{ required: true, message: '请输入企业名称！' }]}
          />
          <ProFormSelect
            width="md"
            name="companyType"
            label="企业类型"
            placeholder="请选择企业类型！"
            valueEnum={{
              '需方': '需方',
              '供应商': '供应商',
            }}
            tooltip='【需方】为物资需求方即为甲方；【供应商】为物资提供方即为乙方；'
            rules={[{ required: true, message: '请选择企业类型！' }]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="taxpayerIdNumber"
            label="纳税人识别号"
            placeholder="请填写纳税人识别号！"
            rules={[{ required: true, message: '请填写纳税人识别号！' }]}
          />
          <ProFormText width="md" name="province" label="所在省" placeholder="请填所在省份！" rules={[{ required: true, message: '请填所在省份！' }]} />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="city" label="所在市" placeholder="请填写所在市！" rules={[{ required: true, message: '请填写所在市！' }]} />
          <ProFormText width="md" name="address" label="所在市" placeholder="请填写详细地址！" rules={[{ required: true, message: '请填写详细地址！' }]} />
        </ProForm.Group>




        <ProForm.Group>
          <ProFormUploadButton
            width="md"
            name="businessLicense"
            label="营业执照"
            max={1}
            action="/upload.do"
            extra="上传营业执照"
            rules={[{ required: true, message: '请上传营业执照！' }]}
          // accept=""
          />

          <ProFormUploadButton
            width="md"
            name="accountBank"
            label="开户行"
            max={1}
            action="/upload.do"
            extra="上传开户行"
            rules={[{ required: true, message: '请上传开户行！' }]}
          // accept=""
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="name" label="姓名" placeholder="请输入姓名！" rules={[{ required: true, message: '请输入姓名！' }]} />
          <ProFormText width="md" name="department" label="部门" placeholder="请输入部门！" initialValue='企业管理员' />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="jobTitle" label="职务" placeholder="请输入职务！" rules={[{ required: true, message: '请输入职务！' }]} />
          <ProFormText width="md" name="phone" label="手机号" placeholder="请输入手机号！" rules={[{ required: true, message: '请输入手机号！' }]} />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱！" rules={[{ required: true, message: '请输入邮箱！' }]} />
        </ProForm.Group>
      </ModalForm>

      <ModalForm
        visible={revokeModalVisible}
        title="撤销"
        modalProps={{
          onCancel: () => setRevokeModalVisible(false),
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values.name);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText
          width="lg"
          name="title"
          label="流程标题"
          readonly
          initialValue="某某流程的审批流程标题"
        />

        <ProFormTextArea
          name="text"
          label="名称"
          placeholder="请输入名称"
        />
      </ModalForm>
    </PageContainer>
  )
}

export default EnterpriseCertification;
