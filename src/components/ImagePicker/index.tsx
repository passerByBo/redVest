import React, { useCallback, useEffect, useState } from 'react';
import { Image, Space } from 'antd';
import styles from './style.less'
import classnames from 'classnames';
import SelectPictureModal from '../SelectPictureModal';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
export interface IImagePickerProps {
  limit?: number;
  visible: boolean;
  onOk?: (images: IProduct[]) => void;
  onCancel?: () => void;
  value?: any;
  onChange?: Function;
}

export interface IProduct {
  [key: string]: string;
}

export interface IFormData {
  [key: string]: string
}

const ImagePicker: React.FC<IImagePickerProps> = React.memo((props) => {

  const { visible, onOk, value, onChange, limit, ...others } = props;
  console.log(props, 'xxxxx')
  const [selectPictures, setSelectPictures] = useState<IProduct[]>([]);

  const triggerChange = (changedValue: string) => {
    onChange?.(changedValue)
  }


  const getPicturesUrls = (pictures: IProduct[]): string => {
    if (!Array.isArray(pictures) || pictures.length === 0) return '';
    return pictures.map((picture) => picture.imgUrl).join(',');
  }

  const handleOk = (pictures: IProduct[]) => {
    //不需要每次都累加选择的图片，每次返回的都是全部选项
    setSelectPictures([...pictures]);
    triggerChange(getPicturesUrls(pictures));
    onOk && onOk(pictures);
  }

  const handleDeleteSelected = useCallback((e, picture: IProduct) => {
    e.stopPropagation();

    let index = 0;
    while (index < selectPictures.length) {
      if (selectPictures[index].id === picture.id) {
        selectPictures.splice(index, 1);
        setSelectPictures([...selectPictures])
        return;
      }
      index++;
    }


  }, [selectPictures])

  const IconStyle = {
    fontSize: 16
  }

  return (
    <div className={styles.imaListWrap}>

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
        !limit || (limit && selectPictures.length < limit) && (<div className={classnames(styles.pictureCardContainer, styles.selectBtn)}>
          {
            props.children
          }
        </div>)
      }
      <SelectPictureModal initData={selectPictures} limit={limit} visible={visible} onOk={handleOk} {...others} />
    </div>
  )
});


export default ImagePicker;
