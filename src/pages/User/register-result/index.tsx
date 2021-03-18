import { Button, Result } from 'antd';
import { FormattedMessage, formatMessage, Link } from 'umi';
import React from 'react';
import { RouteChildrenProps } from 'react-router';

import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        查看邮箱
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
       返回首页
      </Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        你的账号：XXXXXXXXX已经注册等待审核
      </div>
    }
    subTitle={'等待审核通过后可以登陆拔了巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉。'}
    extra={actions}
  />
);

export default RegisterResult;
