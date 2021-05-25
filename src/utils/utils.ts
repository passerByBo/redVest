/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

//用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getIds = <T extends { [key: string]: any }>(arg: T | T[]): string => {
  if (!Array.isArray(arg)) return arg.id;
  let idArr: string[] = [];
  arg.forEach((item) => {
    idArr.push(item.id);
  });
  return idArr.join(',');
};

export const fullCombination = (arr): any[] => {
  // 第一次的结果就是二维数组的第0项
  let res = arr[0].slice();
  if (!Array.isArray(res)) {
    return [];
  }
  for (let i = 1; i < arr.length; i++) {
    const pre = res.slice();
    res = [];
    pre.forEach((item) => {
      arr[i].forEach((curr) => {
        res.push(item + ',' + curr);
      });
    });
  }
  return res;
};

// export const debounce = (fn: Function, delay = 500) => {
//   let timer: any = null;
//   return function (...args: any[]) {
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }
//     timer = setTimeout(() => {
//       fn.apply(null, args);
//     }, delay);
//   };
// };
export function formatYAndN(tag: 'Y' | 'N'){
  return  tag === 'Y' ? '是' : '否'
}
