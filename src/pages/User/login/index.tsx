import {
  LockOutlined,
  UserOutlined,
  WechatOutlined,
  MobileOutlined
} from '@ant-design/icons';
import { Alert, message, Tabs, Space } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login, getAuthCode, authCode } from '@/services/user/login';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
/** 此方法会跳转到 redirect 参数所在的位置 */

const goto = () => {
  //根据如何进入的登录页做跳转，如果直接进的登陆那么完成后再次跳转到登陆
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [checkPhoneNumber, setPhoneNumber] = useState(false);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo.data.user });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);

    try {
      const res = await login({ ...values, type });
      if (res.status == '200' && res.token) {
        message.success('登录成功！');
        //保存session到本地
        sessionStorage.setItem('token', res.token);
        //请求用户信息包括权限等
        await fetchUserInfo();
        goto();
        return;
      } else {
        message.error(res.msg)
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(res);
    } catch (error) {
      message.error('登录失败，请重试！');
    }

    setSubmitting(false);
  };

  const { status, code, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang}></div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>红背心商城</span>
            </Link>
          </div>
          {/* <div className={styles.desc}>描述信息可以填写在这里</div> */}
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登陆',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab='账户密码登录'
              />
              <Tabs.TabPane
                key="mobile"
                tab='手机号登录'
              />
            </Tabs>

            {status === 200 && code === 100002 && type === 'account' && (
              <LoginMessage
                content='账户或密码错误！'
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="请输入用户名！"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名！',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="请输入密码！"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </>
            )}

            {/* 验证手机号 */}
            {status === 'error' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="phoneNumber"
                  placeholder='手机号'
                  rules={[
                    {
                      required: true,
                      message: '手机号是必填项！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '不合法的手机号！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder='请输入验证码'
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} 获取验证码`;
                    }

                    return '获取验证码'
                  }}
                  phoneName="phoneNumber"
                  name="authCode"
                  rules={[
                    {
                      required: true,
                      message: '验证码是必填项！',
                    },
                  ]}
                  onGetCaptcha={async (phone) => {
                    const result = await getAuthCode({
                      phone,
                    });

                    if (result.status !== 200 || result.code !== 200) {
                      switch (result.code) {
                        case 900001:
                          message.error(`${phone}${result.msg}请先注册！`);
                          return;
                      }
                      message.error(`获取验证码失败,${result.msg}`);
                      return;
                    }

                    message.success('获取验证码成功！');
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码 ?
              </a>
            </div>
          </ProForm>
          <div className={styles.otherWrap}>
            <Space className={styles.other}>
              其他登录方式 :
            <WechatOutlined className={styles.icon} />
            </Space>
            <a style={{ textAlign: 'right' }} onClick={() => history.push('/user/register')}>去注册~</a>
          </div>

        </div>
      </div>


      <Footer />
    </div>
  );
};

export default Login;
