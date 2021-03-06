import React, { useEffect, useMemo, useRef, useState } from 'react';
import { history, useRequest } from 'umi';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, message, Popconfirm, Popover, Radio, Row, Select, Space, TreeSelect, Image } from 'antd';
import styles from '../style.less';
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { ISpecify } from '../../SpecificationModel/components/AddFormModal';
import { SpecifyItem, Specify } from '../../components/Specify';
import Preview from '../components/Preview';
import ImagePicker from '@/components/ImagePicker';
import { getMerchandiseTypeList } from '@/services/merchandise/merchandiseType';
import { editForm, getProductDetail, getSepcModel, submitForm } from '@/services/merchandise/product';
import { fullCombination } from '@/utils/utils';
import { EditableProTable } from '@ant-design/pro-table';



import Editor from '@/components/Editor'
import SelectPictureModal from '@/components/SelectPictureModal';


const initData = {
  "isRecommend": "Y",
  "isBoutique": "Y",
  "commissionSetting": "默认设置",
  "freightSetting": "免费包邮",
  "productStatus": "待上架",
  "sort": 999,
}

const { SHOW_ALL } = TreeSelect;
const { TextArea } = Input;
const { Option } = Select;
interface IProductFormProps {

}

interface ITreeNode {
  title: string;
  key: string;
  value: string;
  children: ITreeNode[]
}

const largItemLayout = {
  xl: 12,
  lg: 12,
  md: 24,
  sm: 24,
  xs: 24
}

const smallItemLayout = {
  xl: 6,
  lg: 6,
  md: 12,
  sm: 12,
  xs: 12,
}



//后续根据接口文档补充
export interface IProductAttr {
  [key: string]: string;
}

//保存预览使用的图片
let proRotationImg1: any = [];
let proLogoImg1: any = [];

const TableTitle: React.FC<{ title: string, callback: Function }> = React.memo(({ title, callback }) => {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<Input>(null);
  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible)
  }

  const handleOk = () => {
    const value = inputRef?.current?.input?.value || ''
    inputRef?.current?.handleReset()
    callback(value);
    setVisible(false)
  }

  return (
    <>
      <span>{title}</span>
      <Popover

        content={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input ref={inputRef} />
            <Space style={{ marginTop: 10 }} >
              <Button size="small" onClick={() => { setVisible(false) }}>取消</Button>
              <Button size="small" type="primary" onClick={() => { handleOk() }}>确定</Button>
            </Space>

          </div>
        }
        title={title}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <EditOutlined onClick={() => setVisible(true)} className={styles.titleIcon} />
      </Popover>

    </>
  )
})



// const components = {
//   body: {
//     row: AttrEditableRow,
//     cell: AttrEditableCell,
//   }
// }

const ProductForm: React.FC<IProductFormProps> = (props) => {

  //规格模板
  const [specify, setSpecify] = useState<ISpecify>({ name: '', value: '' });
  const [specifies, setSpecifies] = useState<string[]>([]);
  const [specifiesMap, setSpecifiesMap] = useState<Map<string, string[]>>(new Map());
  const [specifyInputs, setSpecifyInputs] = useState<string[]>([]);
  const [addSpecifyVisible, setAddSpecifyVisible] = useState(false);

  const [commission, setCommission] = useState();

  const [previewProductVisible, setPreviewProductVisible] = useState(false);

  //商品属性列表元数据
  const [productsAttr, setProductsAttr] = useState<IProductAttr[]>([]);

  const [treeData, setTreeData] = useState<ITreeNode[]>();
  const [selectedSpecModelList, setSelectedSpecModelList] = useState([]);

  //表格中选择图片
  const [selectPictureVisible, setSelectPictureVisible] = useState(false);

  //商品详细信息编辑时使用
  const [productDetail, setProductDetail] = useState<any>(null);


  //sku属性图片map
  const [skuPictureMap, setSkuPictureMap] = useState(new Map<string, any>())

  const [form] = Form.useForm();


  const { location: { query } } = history;

  //设置所有行 都是正在编辑的状态
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>();

  //选择的规格模板
  const [selectSpecModel, setSelectSpecModel] = useState('');

  const parseTreeData = (arr: any[], level?: number = 1): ITreeNode[] => {
    return arr.map((item) => {
      let children: ITreeNode[] = [];
      if (item.children && item.children.length > 0) {
        children = parseTreeData(item.children, 2);
      }
      return {
        title: item.typeName,
        value: item.id,
        children,
        key: item.id,
        selectable: level > 1,
      }
    })
  }



  const getTypeList = async () => {
    try {
      const res = await getMerchandiseTypeList();
      if (res.status === 200 && res.code === 200) {
        setTreeData(parseTreeData(res.rows))
        return;
      }
      throw new Error();
    } catch (error) {
      message.error('商品分类加载失败!')
    }
  }

  const getSpecModelList = async () => {
    try {
      const res = await getSepcModel();
      if (res.status === 200 && res.code === 200) {
        setSelectedSpecModelList(res.data);
        return;
      }

      // throw new Error();
    } catch (error) {
      message.error('商品规格属性加载失败!')
    }
  }

  const tProps = useMemo(() => {
    return {
      treeDefaultExpandAll: true,
      treeData,
      value: '',
      onChange: () => { },
      // treeCheckable: true,
      showCheckedStrategy: SHOW_ALL,
      placeholder: '请选择商品分类',
      style: {
        width: '100%',
      },
    }
  }, [treeData]);


  const formatProductSkuInfo = (arr: any) => {
    let result = [...arr];

    return result.map((item) => {
      let skuImg = item.skuImg;
      let id = '';
      if (Array.isArray(skuImg) && skuImg[0]) {
        id = skuImg[0].id;
        //捎带把数据同步到图片map中
        skuPictureMap.set(id, skuImg[0])
        setSkuPictureMap(skuPictureMap)
      }
      return {
        ...item,
        skuImg: id
      }
    })
  }

  const initPageContent = (data: any) => {

     //初始化预览的图片啊
    //保存预览使用的图片
    proRotationImg1 = data.proRotationImg1.map(((item: any) => item.imgUrl));
    proLogoImg1 = data.proLogoImg1.map(((item: any) => item.imgUrl));;

    data.isRecommend = data.isRecommend === 'Y' ? true : false;
    data.isBoutique = data.isBoutique === 'Y' ? true : false;


    data.proRotationImg1 = (data.proRotationImg1 !== '' && Array.isArray(data.proRotationImg1)) ? data.proRotationImg1.map((item: any) => item.id).join(',') : '';
    data.proLogoImg1 = (data.proLogoImg1 !== '' && Array.isArray(data.proLogoImg1)) ? data.proLogoImg1.map((item: any) => item.id).join(',') : '';

    form.setFieldsValue(data)
    const { productDetail, qualityReport1, productSkuInfo, productSpecObj, commissionSetting } = data;

    //初始化SKU属性列表使用的图片map
    //需要初始化设置选中的图片,通过表单初始化,表单初始化数据不一致不可使用需自定义initData来实现

    //初始化设置规格模板
    if (productSpecObj && productSpecObj.constructor === Object) {
      let map: Map<string, string[]> = new Map(Object.entries(productSpecObj));
      //设置数据到操作数据中
      setSpecifiesMap(map);
    }

    //初始化设置商品详情和质检报告
    form.setFieldsValue({ productDetail, qualityReport1 });
    //需要初始化设置SKU属性表格和自定义佣金表格
    setProductsAttr([...formatProductSkuInfo(productSkuInfo)]);
    //初始化自定义设置佣金
    setCommission(commissionSetting);


  }

  const initProRotationImg = useMemo(() => {
    if (productDetail) {
      const { proRotationImg1 } = productDetail;
      return proRotationImg1;
    }
    return [];
  }, [productDetail])

  const initProLogoImg = useMemo(() => {
    if (productDetail) {
      const { proLogoImg1 } = productDetail;
      return proLogoImg1;
    }
    return [];
  }, [productDetail])


  const { loading, run: getDetail } = useRequest(getProductDetail.bind(null, { productId: (query as any).id }), {
    manual: true,
    onSuccess: (result: any, params: any) => {
      if (result) {
        //将数据设置到表单内

        initPageContent({ ...result });
        setProductDetail({ ...result });
        return;
      }
      message.error('初始化商品详情失败，请重试！')
    }
  })


  useEffect(() => {
    if (query && query.id) {
      getDetail(query.id);
    }
    getTypeList();
    getSpecModelList()
  }, [])


  const specifyChange = (e: any, key: string) => {
    setSpecify({ ...specify, [key]: e.target.value })
  }

  const addSpecify = (data: ISpecify) => {
    const { name, value } = data;
    setSpecifies([...specifies, name]);
    setSpecifiesMap(specifiesMap.set(name, [value]));
    setSpecify({ name: '', value: '' });
    setAddSpecifyVisible(false);

    //同步规格值到表单中
    setProductSpec(specifiesMap);
  }

  const cancelSpecify = () => {
    setSpecify({ name: '', value: '' });
    setAddSpecifyVisible(false);
  }

  /**
 * 删除规格值
 * @param name 规格名称
 * @param index 当前规格值所在位置
 */
  const deleteSpecifyValue = (name: string, index: number): void => {
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.splice(index, 1);
    specifiesMap.set(name, valueArr)
    let newMap = new Map(specifiesMap);
    setSpecifiesMap(newMap);

    //同步规格值到表单中
    setProductSpec(newMap);
  }

  /**
   * 删除规格
   * @param name 规格名称
   */
  const deleteSpecify = (name: string, index: number): void => {
    specifiesMap.delete(name)
    setSpecifiesMap(specifiesMap);

    //删除保存的新增规格值的数组
    let arr = [...specifyInputs];
    arr.splice(index, 1);
    setSpecifyInputs(arr);

    //同步规格值到表单中
    setProductSpec(specifiesMap);
  }

  const addSpecifyValue = (name: string, index: number) => {
    let value = specifyInputs[index];

    //将新的数据加入到Map中
    let valueArr = [...(specifiesMap.get(name) || [])];
    valueArr.push(value);
    setSpecifiesMap(specifiesMap.set(name, valueArr));

    //每次添加完数据后清空原来的输入框
    let arr = [...specifyInputs];
    arr[index] = '';
    setSpecifyInputs(arr);

    //同步规格值到表单中
    setProductSpec(specifiesMap);
  }

  const specifyValueChange = (e: any, index: number) => {
    let arr = [...specifyInputs];
    arr[index] = e.target.value;
    setSpecifyInputs(arr);
  }


  const handleCommissionChange = (e: any) => {
    setCommission(e.target.value);
  }

  //选择规格模板
  const selectSpecifyChange = (name: string) => {
    setSelectSpecModel(name);
  }


  const checkSpecModel = () => {
    if (selectSpecModel === '') {
      message.warning('请选择要使用的规格模板')
      return;
    }
    for (let item of selectedSpecModelList) {
      if ((item as any).name === selectSpecModel) {
        let { value } = item;
        let map = new Map<string, any>(Object.entries(value));
        setSpecifiesMap(map);
        setProductSpec(map);
        break;
      }
    }
  }

  const setProductSpec = (map: Map<string, any>) => {
    let productSpec = Object.fromEntries(map.entries());


    if (JSON.stringify(productSpec) === '{}') {
      form?.setFieldsValue({ productSpec: null });
      return;
    }
    // for (let key of Object.keys(productSpec)) {
    //   productSpec[key] = productSpec[key].join(',')
    // }
    form?.setFieldsValue({ productSpecObj: productSpec });

  }

  const initSpecifiesData = (arr: string[]): any[] => {
    const keys = [...specifiesMap.keys()]
    return arr.map((name, index) => {
      const skuNameArr = name.split(',');
      let propertiesObj = Object.create(null);
      keys.forEach((key, index) => {
        propertiesObj[key] = skuNameArr[index];
      })

      return {
        skuName: name,
        propertiesObj,
        skuImg: '',
        articleNo: '',
        salePrice: '',
        supplyPrice: '',
        marketPrice: '',
        inventory: '',
        inventoryWarn: '',
        weight: '',
        volume: '',
        firReturnCommiss: '',
        secReturnCommiss: '',
      }
    })
  }

  //根据规格模板生成商品表格
  const genProductList = (map: Map<string, any>) => {
    if (map.size === 0) {
      message.warning('请先选择或者创建规格!');
      return;
    }
    let arr = [...map].reduce((prev: any, next: any) => {
      prev.push(next[1])
      return prev;
    }, [])

    let result = initSpecifiesData(fullCombination(arr));
    setProductsAttr([...result]);
  }

  /**
 * 修改列
 * @param value
 * @param key
 */
  const hangleColumnChange = (value: string | number, key: string) => {
    let newDataSource = productsAttr.map(item => ({
      ...item,
      [key]: value
    }));

    setProductsAttr(newDataSource as any);
  }
  const productYColumn = [
    {
      title: 'SKU属性',
      dataIndex: 'skuName',
      editable: false
    },
    {
      title: '商品图片',
      dataIndex: 'skuImg',
      editable: false,
      render: (_: any, row: any) => {
        return <Space>
          {row.skuImg !== "" && <Image preview={{ mask: <EyeOutlined /> }} src={_} className={styles.tableItemImage} />}
          {/* {row.skuImg !== "" && < Button onClick={() => { deleteSkuImg(row) }} size="small" shape="circle" icon={<DeleteOutlined />} />} */}
          {/* {row.skuImg === "" && <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={() => skuRowSelectPicture(_, row)} />} */}
          {/* <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={() => skuRowSelectPicture(_, row)} /> */}
        </Space>
      }
    },
    {
      title: <TableTitle title='货号' callback={(value: string) => { hangleColumnChange(value, 'articleNo') }} />,
      dataIndex: 'articleNo',
      editable: false,
    },
    {
      title: <TableTitle title='销售价' callback={(value: string) => { hangleColumnChange(value, 'salePrice') }} />,
      dataIndex: 'salePrice',
      editable: false,
    },
    {
      title: <TableTitle title='成本价' callback={(value: string) => { hangleColumnChange(value, 'supplyPrice') }} />,
      dataIndex: 'supplyPrice',
      editable: false,
    },
    {
      title: <TableTitle title='划线价' callback={(value: string) => { hangleColumnChange(value, 'marketPrice') }} />,
      dataIndex: 'marketPrice',
      editable: false,
    },
    {
      title: <TableTitle title='库存' callback={(value: string) => { hangleColumnChange(value, 'inventory') }} />,
      dataIndex: 'inventory',
      editable: false,
    },
    {
      title: <TableTitle title='库存预警值' callback={(value: string) => { hangleColumnChange(value, 'inventoryWarn') }} />,
      dataIndex: 'inventoryWarn',
      editable: false,
    },
    {
      title: <TableTitle title='重量' callback={(value: string) => { hangleColumnChange(value, 'weight') }} />,
      dataIndex: 'weight',
      editable: false,
    },
    {
      title: <TableTitle title='体积' callback={(value: string) => { hangleColumnChange(value, 'volume') }} />,
      dataIndex: 'volume',
      editable: false,
    },
    {
      title: <TableTitle title='一级返佣(%)' callback={(value: number) => { hangleColumnChange(value, 'firReturnCommiss') }} />,
      dataIndex: 'firReturnCommiss',
      dataType: 'inputNumber',
      editable: true,
    },
    {
      title: <TableTitle title='二级返佣(%)' callback={(value: number) => { hangleColumnChange(value, 'secReturnCommiss') }} />,
      dataIndex: 'secReturnCommiss',
      dataType: 'inputNumber',
      editable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text: any, record: any, _: any, action: any) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.skuName);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title={`确定要删除${record.skuName}吗？`}
          onConfirm={() => {
            setProductsAttr(productsAttr.filter((item) => item.skuName !== record.skuName));
          }}
        >
          <a
            key="delete"
          >
            删除
        </a>
        </Popconfirm>
        ,
      ],
    }
  ]

  const [skuRowIndex, setSkuRowIndex] = useState(-1);

  //编辑行图片信息
  const selectPictureCallback = (imgs: any) => {
    setSelectPictureVisible(false);
    let urlArr = imgs.map((item: any) => item.id);
    let pictureId = productsAttr[skuRowIndex].skuImg;
    //如果当前已经选择了图片做替换操作，需要同步清空原来存储的map值
    if (pictureId !== '' && skuPictureMap.has(pictureId)) {
      skuPictureMap.delete(pictureId);
      setSkuPictureMap(skuPictureMap)
    }

    productsAttr[skuRowIndex].skuImg = urlArr[0];

    //当前选中的图片存储在图片的map中
    //这里目前只支持一张图片的上传和保存
    skuPictureMap.set(imgs[0].id, imgs[0])
    setSkuPictureMap(skuPictureMap)

    setProductsAttr([...productsAttr]);
  }

  //保存当前正在编辑的行
  const skuRowSelectPicture = (id: string, row: any) => {

    for (let i = 0, length = productsAttr.length; i < length; i++) {
      let item = productsAttr[i];
      if (item.skuName === row.skuName) {
        setSkuRowIndex(i);
        break;
      }
    }

    setSelectPictureVisible(true);
  }

  //将当前的sku图片设置为空
  const deleteSkuImg = (row: any) => {
    for (let i = 0, length = productsAttr.length; i < length; i++) {
      let item = productsAttr[i];
      if (item.skuName === row.skuName) {
        const pictureId = productsAttr[skuRowIndex].skuImg;
        //默认为一张图片，如果多张图片请遍历删除
        if (skuPictureMap.has(pictureId)) {
          skuPictureMap.delete(pictureId)
          setSkuPictureMap(skuPictureMap)
        }


        productsAttr[skuRowIndex].skuImg = '';

        setProductsAttr([...productsAttr]);
        break;
      }
    }
  }


  const productAttrColumn = [
    {
      title: 'SKU属性',
      dataIndex: 'skuName',
      editable: false,
    },
    {
      title: '商品图片',
      dataIndex: 'skuImg',
      editable: false,
      render: (_: any, row: any) => {
        let pictures: any = null;
        if (skuPictureMap.has(_)) {
          pictures = skuPictureMap.get(_);
        }

        return <Space>
          {row.skuImg !== "" && <Image preview={{ mask: <EyeOutlined /> }} src={pictures && pictures.imgUrl} className={styles.tableItemImage} />}
          {row.skuImg !== "" && < Button onClick={() => { deleteSkuImg(row) }} size="small" shape="circle" icon={<DeleteOutlined />} />}
          {/* {row.skuImg === "" && <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={() => skuRowSelectPicture(_, row)} />} */}
          <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={() => skuRowSelectPicture(_, row)} />
        </Space>
      }
    },
    {
      title: <TableTitle title='货号' callback={(value: string) => { hangleColumnChange(value, 'articleNo') }} />,
      dataIndex: 'articleNo',
      editable: true,
    },
    {
      title: <TableTitle title='销售价' callback={(value: string) => { hangleColumnChange(value, 'salePrice') }} />,
      dataIndex: 'salePrice',
      editable: true,
    },
    {
      title: <TableTitle title='成本价' callback={(value: string) => { hangleColumnChange(value, 'supplyPrice') }} />,
      dataIndex: 'supplyPrice',
      editable: true,
    },
    {
      title: <TableTitle title='划线价' callback={(value: string) => { hangleColumnChange(value, 'marketPrice') }} />,
      dataIndex: 'marketPrice',
      editable: true,
    },
    {
      title: <TableTitle title='库存' callback={(value: string) => { hangleColumnChange(value, 'inventory') }} />,
      dataIndex: 'inventory',
      editable: true,
    },
    {
      title: <TableTitle title='库存预警值' callback={(value: string) => { hangleColumnChange(value, 'inventoryWarn') }} />,
      dataIndex: 'inventoryWarn',
      editable: true,
    },
    {
      title: <TableTitle title='重量' callback={(value: string) => { hangleColumnChange(value, 'weight') }} />,
      dataIndex: 'weight',
      editable: true,
    },
    {
      title: <TableTitle title='体积' callback={(value: string) => { hangleColumnChange(value, 'volume') }} />,
      dataIndex: 'volume',
      editable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text: any, record: any, _: any, action: any) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.skuName);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title={`确定要删除${record.skuName}吗？`}
          onConfirm={() => {
            setProductsAttr(productsAttr.filter((item) => item.skuName !== record.skuName));
          }}
        >
          <a
            key="delete"
          >
            删除
        </a>
        </Popconfirm>
        ,
      ],
    },
  ]


  const submitData = async (values: any) => {
    console.log('xxx', productsAttr, skuPictureMap)
    await form.validateFields();
    let tag = '创建';
    if (query && query.id) {
      tag = '编辑';
    }

    const hide = message.loading(`商品正在${tag}中`)
    try {
      let result = null;
      //代表当前是编辑
      if (query && query.id) {
        values = { id: productDetail.id, ...values };
        result = await editForm(values);
      } else {
        result = await submitForm(values);
      }


      if (result.status === 200 && result.code !== 200) {
        hide();
        message.error(`商品${tag}失败，${result.msg}`);
        return;
      }

      hide();
      message.success(`商品${tag}成功！`);
      history.push('/merchandise/product/list');
    } catch (error) {
      hide();
      message.error(`商品${tag}失败，请重试！`)
    }

  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        initialValues={productDetail || initData}
        onFinish={(values) => {
          console.log('values', values)
        }}
        onFinishFailed={() => { }}
      >
        <PageContainer loading={loading}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label={'商品分类'}
                  name="typeId"
                  rules={[{ required: true, message: '请选择商品分类' }]}
                >
                  <TreeSelect {...tProps} placeholder="一级类目 < 二级类目" >
                    TreeNode
                  </TreeSelect>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...largItemLayout}>
                <Form.Item
                  label={'商品名称'}
                  name="productName"
                  rules={[{ required: true, message: '请输入商品名称' }]}
                >
                  <Input placeholder="请输入商品名称" />
                </Form.Item>
              </Col>
              <Col {...largItemLayout}>
                <Form.Item
                  label={'商品副标题'}
                  name="productTitle"
                  rules={[{ required: true, message: '请输入商品副标题名称' }]}
                >
                  <Input placeholder="请输入商品副标题名称" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col {...smallItemLayout}>
                <Form.Item
                  label={'商品品牌'}
                  name="productBrand"
                  rules={[{ required: true, message: '请输入商品品牌' }]}
                >
                  <Input placeholder="请输入商品品牌" />
                </Form.Item>
              </Col>
              <Col {...smallItemLayout}>
                <Form.Item
                  label={'货号'}
                  name="productNo"
                >
                  <Input placeholder="请输入商品货号" />
                </Form.Item>
              </Col>
              <Col {...smallItemLayout}>
                <Form.Item
                  label={'单位'}
                  name="productUnit"
                >
                  <Input placeholder="请输入单位" />
                </Form.Item>
              </Col>
              <Col {...smallItemLayout}>
                <Form.Item
                  label={'商品排序'}
                  name="sort"
                >
                  <Input type='number' placeholder="请输入商品排序" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} >
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label={'商品简介'}
                  name="productDescribe"
                >
                  <TextArea placeholder="请输入商品简介" allowClear />
                </Form.Item>

              </Col>
            </Row>
          </Card>

          <Card title="商品图文信息" className={styles.card} bordered={false}>

            <Row>
              <Col span={24}>
                <Form.Item
                  label={'商品封面主图'}
                  name="proLogoImg1"
                  rules={[{ required: true, message: '请选择商品封面主图' }]}
                  extra="建议图片大小不超过250kb"
                >
                  <ImagePicker selectedBack={(pictures: any) => { proLogoImg1 = pictures }} initData={initProRotationImg} limit={1} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label={'商品轮播图'}
                  name="proRotationImg1"
                  rules={[{ required: true, message: '请选择商品轮播图' }]}
                  extra="建议图片大小不超过250kb"
                >
                  <ImagePicker selectedBack={(pictures: any) => { proRotationImg1 = pictures }} initData={initProLogoImg} limit={5}></ImagePicker>
                </Form.Item>
              </Col>
            </Row>

            <Card type="inner" title="商品规格" className={styles.card}>
              <Row>
                <Form.Item
                  name="productSpecObj"
                  rules={[{ required: true, message: '规格属性不能为空' }]}
                >
                  <Col span={24} className={styles.specifyRow}>
                    <span className={classnames(styles.label, styles.right10)}>选择规格模板:</span>
                    <Input.Group className={styles.right10} compact style={{ width: 265 }}>
                      <Select
                        value={selectSpecModel}
                        showSearch
                        placeholder="选择规格模板"
                        optionFilterProp="children"
                        onChange={(e) => { selectSpecifyChange(e) }}
                        style={{ width: 200 }}
                      // filterOption={(input, option) => {}}
                      >
                        {
                          selectedSpecModelList && selectedSpecModelList.map((item: any, index: number) => {
                            return <Option key={item.name + index} value={item.name}>{item.name}</Option>
                          }
                          )
                        }
                      </Select>
                      <Button onClick={() => checkSpecModel()}>确认</Button>

                    </Input.Group>
                    <Button type="primary" ghost className={styles.right10} onClick={() => { setAddSpecifyVisible(true) }}>添加新规格</Button>
                    <Button type="primary" onClick={() => genProductList(specifiesMap)}>立即生成</Button>
                  </Col>

                </Form.Item>
              </Row>

              {
                addSpecifyVisible && (
                  <Row className={styles.addModalWrap} gutter={24}>
                    <Col className={styles.addModalCol} span={9}>
                      <span className={styles.label60} >规格:</span>
                      <Input onChange={(e) => specifyChange(e, 'name')} value={specify.name} placeholder='请输入规格'></Input>
                    </Col>
                    <Col className={styles.addModalCol} span={9}>
                      <span className={styles.label80}>规格值:</span>
                      <Input onChange={(e) => specifyChange(e, 'value')} value={specify.value} placeholder='请输入规格值'></Input>
                    </Col>
                    <Col className={styles.addModalCol} span={6}>
                      <Space>
                        <Button size="small" onClick={() => { cancelSpecify() }}>取消</Button>
                        <Button size="small" type='primary' onClick={() => { addSpecify(specify) }}>确认</Button>
                      </Space>
                    </Col>
                  </Row>
                )
              }


              {
                [...specifiesMap.keys()].map((name, i) => (
                  <Specify key={name} name={name} deleteBack={(name: string) => { deleteSpecify(name, i) }}>
                    {
                      (Array.isArray(specifiesMap.get(name)) && specifiesMap.get(name) || []).map((value: string, index: number) => (
                        <SpecifyItem key={index} value={value} deleteBack={() => { deleteSpecifyValue(name, index) }} />
                      ))
                    }

                    <Input.Group compact style={{ width: 162, marginTop: 10 }}>
                      <Input style={{ width: 120 }} value={specifyInputs[i]} placeholder="请输入规格值" onChange={(e) => { specifyValueChange(e, i) }} />
                      <Button onClick={() => { addSpecifyValue(name, i) }} icon={<CheckOutlined />} type='primary'></Button>
                    </Input.Group>
                  </Specify>
                ))
              }
            </Card>

            <EditableProTable
              bordered
              rowKey="skuName"
              headerTitle="SKU属性表"
              maxLength={5}
              recordCreatorProps={false}
              toolBarRender={() => [
              ]}
              columns={productAttrColumn}
              value={productsAttr}
              onChange={setProductsAttr}
              editable={{
                type: 'multiple',
                editableKeys,
                onChange: setEditableRowKeys,
              }}
            />
            <Form.Item name="productSkuInfo">
            </Form.Item>
            <Row>
              <Col span={24}>
                <Form.Item name="productDetail" label="商品详情" rules={[{ required: true, message: '请输入商品详情' }]} >
                  <Editor initData={(productDetail && productDetail.productDetail) || null} placeholder="请输入商品详情！" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item name="qualityReport1" label="质检报告" rules={[{ required: true, message: '请输入质检报告' }]} >
                  <Editor initData={(productDetail && productDetail.qualityReport1) || null} placeholder="请输入质检报告！" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col  {...smallItemLayout}>
                <Form.Item name="productStatus" label="商品状态">
                  <span>待上架</span>
                  {/* <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={'上架'}>上架</Radio>
                    <Radio value={'下架'}>下架</Radio>
                  </Radio.Group> */}
                </Form.Item>
              </Col>
              <Col  {...smallItemLayout}>
                <Form.Item name="isRecommend" label="首页推荐">
                  <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={'Y'}>开启</Radio>
                    <Radio value={'N'}>关闭</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col  {...smallItemLayout}>
                <Form.Item name="isBoutique" label="精品推荐">
                  <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={'Y'}>开启</Radio>
                    <Radio value={'N'}>关闭</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col  {...smallItemLayout}>
                <Form.Item name="freightSetting" label="运费设置">
                  <Radio.Group onChange={() => { }} value={1}>
                    <Radio value={'免费包邮'}>免费包邮</Radio>
                    <Radio value={'邮费到付'}>邮费到付</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="commissionSetting" label="佣金设置">
              <Radio.Group onChange={handleCommissionChange} value={commission}>
                <Radio value={'默认设置'}>默认设置</Radio>
                <Radio value={'自定义设置'}>自定义设置</Radio>
              </Radio.Group>
            </Form.Item>
            {
              commission === '自定义设置' &&
              (
                <EditableProTable
                  bordered
                  rowKey="skuName"
                  headerTitle="自定义佣金表"
                  maxLength={5}
                  recordCreatorProps={false}
                  toolBarRender={() => [
                  ]}
                  columns={productYColumn as any}
                  value={productsAttr}
                  onChange={setProductsAttr}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onChange: setEditableRowKeys,
                  }}
                />
              )
            }

          </Card>
        </PageContainer>
        <FooterToolbar>
          {/* {getErrorInfo(error)} */}
          <Button onClick={() => { setPreviewProductVisible(true) }} loading={false}>
            预览
        </Button>
          <Button type="primary" onClick={() => {
            setProductsAttr([...productsAttr])
            form.setFieldsValue({ productSkuInfo: productsAttr })
            submitData(form.getFieldsValue());
          }} loading={false}>
            提交
        </Button>
        </FooterToolbar>
      </Form >
      <SelectPictureModal initData={[]} limit={1} visible={selectPictureVisible} onOk={selectPictureCallback} onCancel={() => { setSelectPictureVisible(false) }} />
      <Preview product={{ ...form?.getFieldsValue(), proRotationImg1, proLogoImg1, productsAttr }} visible={previewProductVisible} onCancel={() => { setPreviewProductVisible(false) }} />
    </>

  )
}

export default ProductForm;
