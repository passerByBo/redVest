import { Button, Result } from 'antd';
import { Link, history } from 'umi';
import React from 'react';
import { RouteChildrenProps } from 'react-router';

import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    {/* <a href="/">
      <Button size="large" type="primary">
        查看表单
      </Button>
    </a> */}
    <Link to="/">
      <Button size="large" type="primary">
        返回首页
      </Button>
    </Link>
  </div>
);

const name = history?.location?.query?.name;

const RegisterResult: React.FC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        你的账户：{name}，已经提交申请等待审核
      </div>
    }
    subTitle={'请耐心等待审核通过后，即可拥有权限登录平台'}
    extra={actions}
  />
);

export default RegisterResult;
