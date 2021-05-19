import { request } from 'umi';

export async function login(body: any, options?: { [key: string]: any }) {
  console.log('body', body)
  const { type, ...other } = body;
  //用户名密码登陆
  if (type === 'account') {
    return accountLogin(other, options)
  } else {
    //验证码登陆
    return authCode(other, options)
  }
}

export async function accountLogin(body: any, options?: { [key: string]: any }) {
  return request('/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getAuthCode(params: any, options?: { [key: string]: any }) {
  return request(`/login/getAuthCode/${params.phone}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getRegisterAuthCode(params: any, options?: { [key: string]: any }) {
  return request(`/customer/shopInfo/register/getAuthCode/${params.phone}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function authCode(body: any, options?: { [key: string]: any }) {
  return request('/login/authCode', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}

export async function register(body: any, options?: { [key: string]: any }){
  return request('/customer/shopInfo', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}
