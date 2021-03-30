import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm, {
    ModalForm,
    ProFormText,
    ProFormTextArea,
    ProFormSelect,
    ProFormDateRangePicker,
    DrawerForm,
    ProFormRadio,
    ProFormDatePicker,
    ProFormUploadDragger,
    ProFormSwitch
} from '@ant-design/pro-form';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/rule';
import UpdateForm from './components/UpdateForm';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import { getBrandList } from '@/services/merchandise/product';

const Label: React.FC = () => {



    return (
        <PageContainer
            header={{
                title: '标签管理',
            }}>

        </PageContainer>
    )
}

export default Label;
