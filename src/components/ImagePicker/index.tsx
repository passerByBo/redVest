import React, { useCallback, useEffect, useState } from 'react';
import { Image, Space } from 'antd';
import styles from './style.less'
import classnames from 'classnames';
import SelectPictureModal from '../SelectPictureModal';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';



export interface IImagePickerProps {
  limit?: number;
  value?: any;
  onChange?: Function;
  type?: 'card' | 'button',
  selectedBack?: (pictures: string[]) => void;
}

export interface IProduct {
  [key: string]: string;
}

export interface IFormData {
  [key: string]: string
}

const ImagePicker: React.FC<IImagePickerProps> = React.memo((props) => {


  const { type = 'card', selectedBack = () => { }, value, onChange, children, limit, ...others } = props;

  const [selectPictures, setSelectPictures] = useState<IProduct[]>([]);
  const [selectPictureVisible, setSelectPictureVisible] = useState(false);

  const triggerChange = (changedValue: string) => {
    onChange?.(changedValue)
  }

  const uploadButton = (
    <div className={styles.updateBtn} onClick={() => { setSelectPictureVisible(true) }}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>选择图片</div>
    </div>
  );


  const getPicturesUrls = (pictures: IProduct[]): string => {
    if (!Array.isArray(pictures) || pictures.length === 0) return '';
    return pictures.map((picture) => picture.imgUrl).join(',');
  }

  const getPicturesArr = (pictures: IProduct[]): string[] => {
    if (!Array.isArray(pictures) || pictures.length === 0) return [];
    return pictures.map((picture) => picture.imgUrl);
  }

  const handleOk = (pictures: IProduct[]) => {
    //不需要每次都累加选择的图片，每次返回的都是全部选项
    type === 'card' && setSelectPictures([...pictures]);
    triggerChange(getPicturesUrls(pictures));
    selectedBack(getPicturesArr(pictures))
    setSelectPictureVisible(false)
  }

  const handleDeleteSelected = useCallback((e, picture: IProduct) => {
    e.stopPropagation();

    let index = 0;
    while (index < selectPictures.length) {
      if (selectPictures[index].id === picture.id) {
        selectPictures.splice(index, 1);
        setSelectPictures([...selectPictures]);
        triggerChange(getPicturesUrls([...selectPictures]));
        return;
      }
      index++;
    }


  }, [selectPictures])

  const IconStyle = {
    fontSize: 16
  }

  return (
    <>
      {
        type === 'button' && <span onClick={() => { setSelectPictureVisible(true) }}>{children}</span>
      }
      {type === 'card' && <div className={styles.imaListWrap}>
        {
          selectPictures.map((picture) => (
            <div className={styles.pictureCardContainer}>
              <div className={styles.pictureCardContainerItem}>
                <Image className={styles.itemInfo} src={picture.imgUrl}
                  preview={{
                    mask: <Space>
                      <EyeOutlined style={IconStyle} />
                      <DeleteOutlined style={IconStyle} onClick={(e) => handleDeleteSelected(e, picture)} />
                    </Space>
                  }} />
              </div>
            </div>
          )
          )
        }


        {
          (!limit || (limit && selectPictures.length < limit)) && (<div className={classnames(styles.pictureCardContainer, styles.selectBtn)}>
            {
              uploadButton
            }
          </div>)
        }
      </div>}
      <SelectPictureModal initData={selectPictures} limit={limit} visible={selectPictureVisible} onOk={handleOk} onCancel={() => { setSelectPictureVisible(false) }} {...others} />
    </>
  )
});


export default ImagePicker;
