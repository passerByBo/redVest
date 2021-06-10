import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getProductList } from '@/services/merchandise/product';
import formatRequestListParams from '@/utils/formatRequestListParams';
import { Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export type UpdateFormProps = {
    useData: (values: any) => void;
};

type TableListType = {
    productName: string;
    productNo: string;
    id: string;
    productBrand: string;
    typeName: string;
    os: string;
}

const ProductTable: React.FC<UpdateFormProps> = (props) => {
    const { useData } = props;
    const columnsOperation: ProColumns<TableListType>[] = [
        {
            title: '商品名称',
            dataIndex: 'productName',
            valueType: 'textarea',
        },
        {
            title: '商品货号',
            dataIndex: 'productNo',
            valueType: 'textarea',
        },
        {
            title: '专题图片',
            search: false,
            dataIndex: 'proLogoImg1',
            render: (_: any, record: any) => {
                return (
                    _.map((item: any) => {
                        return <Image
                            preview={{ mask: <EyeOutlined /> }}
                            width={40}
                            src={item.imgUrl}
                        />
                    })
                    //     <Image
                    //     preview={{ mask: <EyeOutlined /> }}
                    //     width={40}
                    //     src={_.length !== 0 ? _[0].imgUrl : ""}
                    // />
                )
            }
        },
        {
            title: '商品品牌',
            dataIndex: 'productBrand',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '商品分类',
            dataIndex: 'typeName',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '计量单位',
            dataIndex: 'os',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a onClick={() => { useData(record) }}>使用</a>
            ],
        },
    ]
    return (
        <ProTable
            headerTitle="高级表格"
            rowKey="id"
            bordered
            pagination={{
                pageSize: 10,
            }}
            toolBarRender={false}
            search={{ labelWidth: 'auto' }}
            request={formatRequestListParams(getProductList)}
            columns={columnsOperation}
        />
    )
}
export default ProductTable;
