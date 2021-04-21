import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Checkbox, List, Space } from 'antd';
import classnames from 'classnames';
import React, { useState } from 'react';
import styles from './style.less';


export interface Member {
  avatar: string;
  name: string;
  id: string;
}


export interface ISelectPictureProps {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

export interface ISelectPictureState {
}


export interface IPictureCardProps {
  data: any;
  selected: boolean;
  onChange(e:any,selected: boolean): void;
  showPreview?(e: any): void;
  onDelete?(e: any): void;
}

const PictureCard: React.FC<IPictureCardProps> = (props) => {

  const { data, onChange, selected, onDelete, showPreview } = props;


  return (
    <div className={classnames(styles.pictureCard, selected ? styles.pictureCardActive : '')} onClick={(e) => {onChange(e, !selected);}}>
      <Checkbox checked={selected} className={styles.checkbox} onChange={(e) => { onChange(e, !selected) }}></Checkbox>
      <Space className={styles.icons}>
        <EyeOutlined className={styles.iconBg} onClick={(e) => { showPreview && showPreview(e); }} />
        <DeleteOutlined onClick={(e) => { onDelete && onDelete(e); }} className={styles.iconBg} />
      </Space>
      <div className={styles.bar}>{data.name || '---'}</div>
      <img className={styles.img} src={data.url || "https://pic.qqtn.com/up/2019-9/15690311636958128.jpg"} alt="图片玩命加载中！" />
    </div>
  )

}

class SelectPicture extends React.Component<ISelectPictureProps & CardListItemDataType, ISelectPictureState>{
  static Item: typeof PictureCard;
  //<div className={styles.pictureCardWrap}>
  //   {this.props.children}
  //  </div>

  render() {
    const { ...otherProps } = this.props;

    return (
      <List {...otherProps}>

      </List>
    )
  }
}

SelectPicture.Item = PictureCard;

export default SelectPicture;
