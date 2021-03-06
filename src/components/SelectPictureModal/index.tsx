import { DownOutlined, ExclamationCircleOutlined, FrownFilled, MehOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Input, Tree, Button, Popover, Space, List, Pagination, message, Drawer, Upload } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';

import SelectPicture from '@/components/SelectPicture';

import styles from './style.less';
import { addGroup, deletePictures, getImgGroupList, getImgList, uploadPictures } from '@/services/picture';
import { useRequest } from 'umi';
import classnames from 'classnames';

const PAGE_SIZE = 12;
const PAGE_NUM = 1;

const { confirm } = Modal;


const parseArrToMap = (arr: any[]): Map<string, any> => {
  if (!arr || arr.length === 0) return new Map();

  let map = new Map();

  arr.forEach((item) => {
    map.set(item.id, item)
  })

  return map;
}

const testUploadFileList = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-4',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-xxx',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-5',
    name: 'image.png',
    status: 'error',
  },
]


const { Search } = Input;
export interface ISelectPictureModalProps {
  limit?: number;
  onCancel?(): void;
  onOk?(pics: string[]): void;
  visible?: boolean;
  initData?: any[];
}

const formatTreeData = (arr) => {
  return arr.map((item) => {
    return {
      title: item.groupName,
      key: item.id,
    }
  })
}



const testTreeData = [
  {
    title: '????????????',
    key: '0',
    children: []
  }
]


const cardDatas = [
  {
    id: '1',
    url: 'https://image.shutterstock.com/image-photo/elegant-dark-apartment-interior-classic-600w-1067812865.jpg',
    name: '??????1'
  },
  {
    id: '2',
    url: 'https://img.alicdn.com/bao/uploaded/i1/892777125/O1CN01ssy5dS22VIaAls4ue_!!0-item_pic.jpg_500x500q90.jpg',
    name: '??????2'
  },
  {
    id: '3',
    url: 'https://image.shutterstock.com/image-photo/modern-living-room-sofa-furniture-260nw-549055441.jpg',
    name: '??????3'
  },
  {
    id: '4',
    url: 'https://image.shutterstock.com/image-photo/stylish-room-interior-comfortable-furniture-260nw-1485045323.jpg',
    name: '??????=4'
  },
  {
    id: '5',
    url: 'https://image.shutterstock.com/image-illustration/modern-living-room-sofa-lamp-260nw-765754276.jpg',
    name: '??????5'
  },
  {
    id: '6',
    url: 'https://image.shutterstock.com/image-photo/grey-interior-stylish-upholstered-blue-260nw-581220724.jpg',
    name: '??????6'
  },
  {
    id: '7',
    url: 'https://image.shutterstock.com/image-illustration/modern-interior-room-nice-furniture-600w-608732846.jpg',
    name: '??????7'
  },
  {
    id: '8',
    url: 'https://image.shutterstock.com/image-photo/optimistic-teenagers-room-gray-wall-600w-689989231.jpg',
    name: '??????8'
  },
  {
    id: '9',
    url: 'https://image.shutterstock.com/image-illustration/zero-gravity-sofa-hovering-living-600w-337441691.jpg',
    name: '??????9'
  },
  {
    id: '10',
    url: 'https://image.shutterstock.com/image-illustration/modern-interior-room-nice-furniture-600w-638633851.jpg',
    name: '??????10',
  },
]


const SelectPictureModal: React.FC<ISelectPictureModalProps> = React.memo((props) => {
  const { visible, limit, initData, onCancel = () => { }, onOk = () => { } } = props;



  // const titleRoot = <div className={styles.rootNode} onClick={handleAddGroup}><span>????????????</span></div>;
  const [groups, setGroups] = useState(testTreeData);
  const [selectGroup, setSelectGroup] = useState(testTreeData[0]);

  const [selectPictures, setSelectPirtures] = useState(new Map());
  const [pictures, setPictures] = useState(cardDatas);

  const [previewImage, setPreviewImage] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);

  const wrapSpan = useRef(null);

  const [uploadBlockVisible, setUploadBlockVisible] = useState(false);

  const [uploadPictureList, setUploadPictureList] = useState(testUploadFileList);

  const [total, setTotal] = useState(1);

  const uploadRef = useRef(null);


  const { loading, run } = useRequest(getImgGroupList, {
    manual: true,
    onSuccess: (result, params) => {
      (groups as any)[0].children = [...formatTreeData(result.rows)];
      setGroups([...groups])
    }
  })


  const getImageListFn = (fn: Function): Function => {
    return (...args: any[]) => {
      return fn.bind(null, ...args)
    }
  }

  const { loading: loadingPicture, run: getImageList } = useRequest(getImageListFn(getImgList)({ pageSize: 12, pageNum: 1 }), {
    manual: true,
    onSuccess: (result, params) => {
      let total = result.total;
      setTotal(total)
      setPictures(result.rows)
    }
  })

  useEffect(() => {
    if (visible) {
      //??????????????????????????????????????????????????????????????????????????????????????????
      //initStatus();
      //????????????????????????????????????
      initData && setSelectPirtures(parseArrToMap([...initData]))
      run();
      getImageList();
    }
  }, [visible])



  const handleTreeSelected = (key, e) => {
    const { selectedNodes, selected } = e;
    let config = null;
    if (selected) {
      selectedNodes[0].key !== selectGroup.key && setSelectGroup(selectedNodes[0]);
      selectedNodes[0].key != 0 && (config = { groupId: selectedNodes[0].key })
    } else {
      setSelectGroup(testTreeData[0])
    }

    //??????????????????
    getImageList({ ...(config || {}) });
  }


  const handleDeletePicture = (e, data) => {
    e.stopPropagation()
    for (let i = 0, length = pictures.length; i < length; i++) {
      if (data.id === pictures[i].id) {
        pictures.splice(i, 1);
        setPictures([...pictures]);
        break;
      }
    }
  }

  const handleShowPreview = (e, data: any) => {
    e.stopPropagation();
    setPreviewImage(data);
    setPreviewVisible(true);
  }

  const handleSelectedChange = (e, selected, data) => {
    if (selected) {
      if (limit !== undefined && selectPictures.size >= (limit as number)) {
        playAnimation();
        return;
      }

      selectPictures.set(data.id, data);
      setSelectPirtures(selectPictures);
      setPictures([...pictures])

    } else {
      selectPictures.has(data.id) && selectPictures.delete(data.id);
      setSelectPirtures(selectPictures);
      setPictures([...pictures]);
    }
  }

  const playAnimation = () => {
    try {
      ((wrapSpan as any).current as HTMLSpanElement).className = classnames(styles.limitSpan);
      window.requestAnimationFrame((time) => {
        window.requestAnimationFrame((time) => {
          ((wrapSpan as any).current as HTMLSpanElement).className = classnames(styles.limitSpan, styles.limitSpanWarning);
        })
      })
    } catch (error) {
      console.error(error)
    }

  }

  //???????????????????????????????????????????????????????????????????????????????????????????????????????????????


  const [groupName, setGroupName] = useState('');
  const [popoverVisible, setPopoverVisible] = useState(false)
  const groupNameChange = useCallback((e) => {
    setGroupName(e.target.value)
  }, [])
  const handleClearPopover = useCallback(() => {
    setPopoverVisible(false); setGroupName('');
  }, [groupName, popoverVisible])

  const { loading: addGroupLoading, run: runAddGroup } = useRequest(addGroup.bind(null, { groupName }), {
    manual: true,
    onSuccess: (result, params) => {
      //???????????????????????????????????????????????????
      handleClearPopover();
      message.success('??????????????????!')
      run();
    }
  })

  const handleAddGroup = useCallback(() => {
    if (!groupName || groupName === '') {
      message.warning('????????????????????????')
    }
    runAddGroup();
  }, [groupName])




  const popoverContent =
    <>
      <Input value={groupName} onChange={groupNameChange} style={{ marginBottom: 16 }}></Input>
      <br />
      <Space>
        <Button size="small" onClick={handleClearPopover}>??????</Button>
        <Button loading={addGroupLoading} size="small" type='primary' onClick={handleAddGroup}>??????</Button>
      </Space>
    </>

  const uploadButton = useMemo(
    () => (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    , []);


  const handleImageChange = async (e) => {
    let { files } = e.target
    if (!files || files.length === 0) return;
    const formData = new FormData();
    for (let file of files) {
      formData.append('file', file)
    }

    formData.append('groupId', selectGroup.key);
    try {
      let hide = message.loading('???????????????????????????')
      let res = await uploadPictures(formData);
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('?????????????????????' + res.msg);
        e.target.target.value = null;
        return;
      }

      hide();
      message.success('?????????????????????')
      e.target.value = '';
      getImageList({ groupId: selectGroup.key });
    } catch (error) {
      console.log('error', error)
      message.error('??????????????????????????????')
      e.target.value = '';
    }

  }

  const handleUploadFile = useCallback(() => {
    uploadRef && (uploadRef as any).current.click();
  }, [])

  const handlePaginationChange = (pageNum: number) => {
    let config: any = {};
    selectGroup.key != '0' && (config = { groupId: selectGroup.key })
    config.pageNum = pageNum;
    getImageList({ ...config });
  }


  const handleDeleteSelected = useCallback(() => {

    if (selectPictures.size === 0) {
      message.warning('???????????????????????????!');
      return;
    }

    console.log(selectPictures.size, selectPictures)

    confirm({
      title: '??????',
      icon: <ExclamationCircleOutlined />,
      content: '????????????????????????????????????',
      onOk: async () => {
        let ids: string[] = [];
        selectPictures.forEach((item) => {
          ids.push(item.id)
        })
        deletePicture(ids.join(','));
      },
      onCancel() { },
    });
  }, [selectPictures])

  const handleDelete = useCallback((picture) => {
    confirm({
      title: '??????',
      icon: <ExclamationCircleOutlined />,
      content: '???????????????????????????',
      onOk: async () => {
        let ids: string = picture.id;
        deletePicture(ids);
      },
      onCancel() { },
    });
  }, [selectPictures])

  const deletePicture = async (ids: string) => {
    let hide = message.loading('??????????????????')
    try {
      let res = await deletePictures({ ids })
      if (res.status === 200 && res.code !== 200) {
        hide();
        message.error('?????????????????????' + res.msg);
        return;
      }

      hide();
      message.success('??????????????????');
      setSelectPirtures(new Map())
      handlePaginationChange(1);
    } catch (error) {
      hide()
      message.error('?????????????????????????????????');

    }
  }

  const mapToPictureString = (map: Map<string, any>): string[] => {
    let images: any[] = [];
    map.forEach((item) => images.push({ ...item }));
    return images;
  }

  const initStatus = () => {
    setSelectPirtures(new Map());
    setSelectGroup(testTreeData[0]);
  }

  return (
    // <Modal className={styles.wrap} width={1300 - (uploadBlockVisible ? 0 : 255)} title='???????????????' visible={visible} onCancel={onCancel} onOk={() => { }}>
    <Modal className={styles.wrap} width={1065} title='???????????????' visible={visible} onCancel={onCancel} onOk={() => { onOk(mapToPictureString(selectPictures)) }}>
      {/* <Drawer
        getContainer={false}
        style={{ position: 'absolute', zIndex: 10001 }}
        title="Multi-level drawer"
        width={400}
        onClose={() => { setDrawerVisible(false) }}
        visible={drawerVisible}
        mask={false}
      >
      </Drawer> */}

      <Row >
        <Col flex="235px">
          <div className={styles.left}>
            <Popover visible={popoverVisible} placement="right" title='???????????????' content={popoverContent} trigger="click">
              <Button className={styles.addGroupBtn} onClick={() => { setPopoverVisible(true) }} size="small" >????????????</Button>
            </Popover>

            <Search style={{ marginTop: 5, marginBottom: 8 }} placeholder="?????????????????????" />
            <Tree
              defaultSelectedKeys={[groups[0].key]}
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
                {/* <Space><Button size="small" onClick={() => setUploadBlockVisible(!uploadBlockVisible)}>{uploadBlockVisible ? '????????????' : '?????????'}</Button><Button size="small" type='primary'>??????</Button></Space> */}
                <Space>
                  {
                    selectGroup.key !== '0' &&
                    <Button onClick={handleUploadFile} size="small" >????????????</Button>
                  }
                  <Button size="small" type='primary' onClick={() => handleDeleteSelected()}>??????</Button>

                </Space>
                <input multiple ref={uploadRef} style={{ display: 'none' }} type="file" onChange={(e) => handleImageChange(e)} />
              </div>
              <span className={styles.attaction}>???????????????800*800????????????????????????256kb
                {
                  limit !== undefined ?
                    [
                      '???',
                      <span ref={wrapSpan} className={classnames(styles.limitSpan, selectPictures.size > limit ? styles.limitSpanWarning : '' + selectPictures.size)}>
                        <span className={styles.s1}>???</span>
                        <span className={styles.s2}>???</span>
                        <span className={styles.s2}>???</span>
                        <span className={styles.s3}>???</span>
                        <span className={styles.s4}>???</span>
                        <span className={styles.s5}>{limit}</span>
                        <span className={styles.s6}>???</span>
                        <span className={styles.s7}>???</span>
                        <span className={styles.s8}>??????</span>
                      </span>
                    ]
                    : ','
                }
                <span>????????????{selectPictures.size}???</span>
              </span>
            </div>
            <List
              style={{ minHeight: 600 }}
              rowKey="id"
              loading={loadingPicture}
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
                      selected={selectPictures.has(item.id)}
                      data={item}
                      onChange={(e: any, selected: boolean) => { handleSelectedChange(e, selected, item) }}
                      onDelete={() => { handleDelete(item) }}
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
              pageSize={PAGE_SIZE}
              defaultCurrent={1}
              total={total}
              onChange={handlePaginationChange}
            />
          </div>
        </Col>
        {/* <Col style={{ transition: 'all 0.3s', overflow: 'hidden' }} flex={uploadBlockVisible ? '255px' : '0px'}>
          <div className={styles.uploadBlock}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={uploadPictureList}
              onPreview={() => { }}
              onChange={() => { }}
            >
              {uploadPictureList.length >= 8 ? null : uploadButton}
            </Upload>
          </div>
        </Col> */}
      </Row>

      {/* ???????????? */}
      <Modal
        visible={previewVisible}
        title={previewImage && previewImage.name}
        footer={null}
        onCancel={() => { setPreviewVisible(false) }}
      >
        <img alt="????????????" style={{ width: '100%' }} src={previewImage && previewImage.imgUrl} />
      </Modal>
    </Modal>
  )
})

export default SelectPictureModal;
