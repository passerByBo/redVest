import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { RequestConfig, RunTimeLayoutConfig, useModel } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import { queryCurrentUser } from '@/services/user/userInfo';
import logo from '../public/logo_white.png';
const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

const noLoginRoute = () => {
  const { location } = history;
  const { pathname } = location
  let nologinArr: string[] = [
    '/user/login',
    '/user/register',
    '/user/register-result',
  ]

  if (nologinArr.includes(pathname)) {
    return true;
  }
  return false;
}


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  token?: string,
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: (token: string) => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async (token: string) => {
    try {
      const currentUser = await queryCurrentUser(token);
      return currentUser;
    } catch (error) {
      console.log('取失败')
      //errorhander报出错误所以导致又回到了登陆
      //可能以任意链接的方式进入到登陆
      //获取用户信息失败跳转到登陆
      //error handler也会处理一次错误
      if (!noLoginRoute()) {
        history.push('/user/login');
      }

    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    //不是登录页面从本地获取token，然后获取本地数据，需要根据返回的状态判断当前的token是否有效果
    //如果token失效跳转到登录页
    let token = sessionStorage.getItem('token') || '';
    const currentUser = await fetchUserInfo(token);
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}


// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    title: '红背心商城',
    logo,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && !noLoginRoute()) {
        history.push('/user/login');
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 * 目前存在的问题是只要出现这类错误都会将页面跳转到登录页，需要排查
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  console.log(JSON.stringify(error));
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader: any = {};
  //给用户添加token
  if (!noLoginRoute()) {
    let token = sessionStorage.getItem('token');
    authHeader.Authorization = token;
  }
  return {
    url: `${url}`,
    options: { ...options, headers: authHeader },
  };
};


const resHeaderInterceptor = (response: Response, options: RequestOptionsInit) => {
  return response;
}




// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  prefix: isDev ? 'http://10.10.10.54:8088/prod-api' : '',
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [resHeaderInterceptor],
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        // success: resData.status == 200 && resData.code != 401,
        success: resData.status == 200,
      };
    },
  },
}
