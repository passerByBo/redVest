import { DownOutlined, FrownFilled, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Input, Tree, Button, Popover, Space, List, Pagination } from 'antd';
import React, { useState } from 'react';
import { render } from 'react-dom';

import SelectPicture from '@/components/SelectPicture';

import styles from './style.less';
const { Search } = Input;
export interface ISelectPictureModalProps {
  limit?: number;
  onCancel?(): void;
  onOk?(pics: string[]): void;
  visible?: boolean;
}



const testTreeData = [
  {
    title: '全部分组',
    key: '0',
    children: [
      {
        title: '第一类分组',
        key: '1',
      },
      {
        title: '第二类分组',
        key: '2',
      },
      {
        title: '第三类分组',
        key: '3',
      },
      {
        title: '第四类分组',
        key: '4',
      },
      {
        title: '第五类分组',
        key: '5',
      },
      {
        title: '第六类分组',
        key: '6',
      },
      {
        title: '第七类分组',
        key: '7',
      },
      {
        title: '第八类分组',
        key: '8',
      },
    ],
  }
]


const cardDatas = [
  {
    id: '1',
    url: 'https://image.shutterstock.com/image-photo/elegant-dark-apartment-interior-classic-600w-1067812865.jpg',
    name: '家具1'
  },
  {
    id: '2',
    url: 'https://img.alicdn.com/bao/uploaded/i1/892777125/O1CN01ssy5dS22VIaAls4ue_!!0-item_pic.jpg_500x500q90.jpg',
    name: '家具2'
  },
  {
    id: '3',
    url: 'https://image.shutterstock.com/image-photo/modern-living-room-sofa-furniture-260nw-549055441.jpg',
    name: '家具3'
  },
  {
    id: '4',
    url: 'https://image.shutterstock.com/image-photo/stylish-room-interior-comfortable-furniture-260nw-1485045323.jpg',
    name: '家具=4'
  },
  {
    id: '5',
    url: 'https://image.shutterstock.com/image-illustration/modern-living-room-sofa-lamp-260nw-765754276.jpg',
    name: '家具5'
  },
  {
    id: '6',
    url: 'https://image.shutterstock.com/image-photo/grey-interior-stylish-upholstered-blue-260nw-581220724.jpg',
    name: '家具6'
  },
  {
    id: '7',
    url: 'https://image.shutterstock.com/image-illustration/modern-interior-room-nice-furniture-600w-608732846.jpg',
    name: '家具7'
  },
  {
    id: '8',
    url: 'https://image.shutterstock.com/image-photo/optimistic-teenagers-room-gray-wall-600w-689989231.jpg',
    name: '家具8'
  },
  {
    id: '9',
    url: 'https://image.shutterstock.com/image-illustration/zero-gravity-sofa-hovering-living-600w-337441691.jpg',
    name: '家具9'
  },
  {
    id: '10',
    url: 'https://image.shutterstock.com/image-illustration/modern-interior-room-nice-furniture-600w-638633851.jpg',
    name: '家具10',
  },
]

const SelectPictureModal: React.FC<ISelectPictureModalProps> = (props) => {
  const { visible, limit, onCancel = () => { }, onOk = () => { } } = props;



  // const titleRoot = <div className={styles.rootNode} onClick={handleAddGroup}><span>全部分组</span></div>;
  const [groups, setGroups] = useState(testTreeData);
  const [selectGroup, setSelectGroup] = useState(testTreeData[0]);

  const [selectPictures, setSelectPirtures] = useState(new WeakMap());
  const [pictures, setPictures] = useState(cardDatas);

  const [previewImage, setPreviewImage] = useState();
  const [previewVisible, setPreviewVisible] = useState(false)

  const popoverContent = <><Input style={{ marginBottom: 16 }}></Input><br /><Space><Button size="small">取消</Button><Button loading size="small" type='primary'>确认</Button></Space></>

  const handleTreeSelected = (key, e) => {
    const { selectedNodes, selected } = e;
    if (selected) {
      setSelectGroup(selectedNodes[0])
    } else {
      setSelectGroup(testTreeData[0])
    }
  }


  const handleDeletePicture = (e, data) => {
    e.stopPropagation()
    for(let i = 0, length = pictures.length; i < length; i++) {
      if(data.id === pictures[i].id) {
        pictures.splice(i ,1);
        setPictures([...pictures]);
        break;
      }
    }
  }

  const handleShowPreview = (e, data) => {
    e.stopPropagation();
    setPreviewImage(data);
    setPreviewVisible(true);
  }

  const handleSelectedChange = (e, selected, data) => {
    if (selected) {
      selectPictures.set(data, selected);
      setSelectPirtures(selectPictures);
      setPictures([...pictures])
    } else {
      selectPictures.has(data) && selectPictures.delete(data);
      setSelectPirtures(selectPictures);
      setPictures([...pictures]);
    }
  }

  //分页加载前先判断数组中是否存在数据，如果存在直接显示下一页，不存在进行加载

  return (
    <Modal className={styles.wrap} width={1065} title='图片素材库' visible={visible} onCancel={onCancel} onOk={() => onOk(selectPictures)}>
      <Row>
        <Col flex="235px">
          <div className={styles.left}>
            <Popover placement="right" title='添加新分组' content={popoverContent} trigger="click">
              <Button className={styles.addGroupBtn} size="small" >添加分组</Button>
            </Popover>

            <Search style={{ marginTop: 5, marginBottom: 8 }} placeholder="请输入搜索内容" />
            <Tree
              onSelect={handleTreeSelected}
              defaultExpandAll
              treeData={groups}
            />
          </div>
        </Col>
        <Col flex="1">
          <div className={styles.right}>
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <b>{selectGroup.title}</b>
                <Space><Button size="small">批量上传</Button><Button size="small" type='primary'>删除</Button></Space>
              </div>
              <span className={styles.attaction}>建议尺寸：800*800，单张图片不超过256kb，最多可上传5张。</span>
            </div>
            <List
              rowKey="id"
              loading={false}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              dataSource={pictures}
              renderItem={(item: any) => {
                return (
                  <List.Item key={item.id}>
                    <SelectPicture.Item
                      selected={selectPictures.has(item)}
                      data={item}
                      onChange={(e: any, selected: boolean) => { handleSelectedChange(e, selected, item) }}
                      onDelete={(e) => { handleDeletePicture(e, item) }}
                      showPreview={(e) => { handleShowPreview(e, item) }}
                    />
                  </List.Item>
                )
              }}
            >

            </List>

            <Pagination
              style={{ float: 'right', marginBottom: 10 }}
              showSizeChanger={false}
              pageSize={12}
              defaultCurrent={1}
              total={500}
            />
          </div>
        </Col>
      </Row>

      {/* 预览图片 */}
      <Modal
        visible={previewVisible}
        title={previewImage&& previewImage.name}
        footer={null}
        onCancel={() => { setPreviewVisible(false) }}
      >
        <img alt="商品主图" style={{ width: '100%' }} src={previewImage && previewImage.url} />
      </Modal>
    </Modal>
  )
}

export default SelectPictureModal;
